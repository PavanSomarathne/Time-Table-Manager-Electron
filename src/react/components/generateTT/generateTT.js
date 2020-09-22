import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import Table from './Table';
import Pagination from './Pagination';
import AddSchedule from './AddSchedule';
import DeleteSchedule from './DeleteSchedule';
import EditSchedule from './EditSchedule';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    table: {
        marginTop: theme.spacing(2),
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    }
}))

const createData = (_id, dayCount, workingDays, stime, duration, wtime) => {
    return { _id, dayCount, workingDays, stime, duration, wtime };
}

const WorkingHours = () => {
    const classes = useStyles();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [schedulesPerPage] = useState(3);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const childRef = useRef();
    // get current Schedules
    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchSchedules = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_SCHEDULE);

        ipcRenderer.on(channels.LOAD_SCHEDULE, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SCHEDULE);
            const sh = arg;
            const shArray = sh.map(s => createData(s._id, s.dayCount, s.workingDays, s.stime, s.duration, s.wtime))
            setSchedules(shArray);
        });
        setLoading(false);
        childRef.current.resetSelected();
    }



    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchSchedules();

    }, []);

    // refresh table
    const scheduleUpdated = () => {
        fetchSchedules();
    }

    // Schedule selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tSchedules = schedules;
        const edit = tSchedules.filter(l => (l._id === value))[0];
        setEditable(edit);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function StudentTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5}}
                    renderInput={(params) => <TextField  {...params} label="year & Semester" variant="outlined" />}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Program" variant="outlined" />}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Group" variant="outlined" />}
                />
                <Button variant="contained" color="primary" style={{ marginLeft: '30%'}}>
                    Print
                </Button>
            </div>
        </Paper>;
    }
    function LecturerTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Lecurer" variant="outlined" />}
                />
                <Button variant="contained" color="primary" >
                    Print
                </Button>
            </div>
        </Paper>;
    }
    function RoomTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Building" variant="outlined" />}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    size="small"
                    getOptionLabel={(option) => option.title}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Room" variant="outlined" />}
                />
                <Button variant="contained" color="primary" style={{ marginLeft: '50%'}} >
                    Print
                </Button>
            </div>
        </Paper>;
    }
    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (value == 0) {
            return <StudentTT />;
        } else if (value == 1) {
            return <LecturerTT />;
        } else {
            return <RoomTT />;
        }

    }
    return (
        <div className="locations">

            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchSchedules}
                >
                    <RefreshIcon />
                </IconButton>
            </div>

            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Student" />
                    <Tab label="Lecturer" />
                    <Tab label="Room" />
                </Tabs>
            </Paper>

            <div className={classes.row}>
                <Table
                    schedules={currentSchedules}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                    ref={childRef}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    schedulesPerPage={schedulesPerPage}
                    totalSchedules={schedules.length}
                    paginate={paginate}
                />
            </div>

            <Greeting isLoggedIn={value} />
        </div>
    )
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default WorkingHours