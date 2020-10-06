import React,{ forwardRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))
const arr1 = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
const TimeTable =forwardRef(({ schedule, loading,sessions ,handleRadioChange },ref) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('');
    const [workingDays, setWorkingDays] = React.useState([]);
    const [columns, setColumns] = React.useState(['Time']);
    const [time, setTime] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [slots, setSlots] = React.useState(0);
    const [mr, setMr] = React.useState([])

      
      const rows1 = [
        { id: 1, Mon: 'Snow', Tue: 'Jon', Wed: 'hey',Thu:'' },
        
      ];
      
    
    useEffect(() => {
    // if(schedule.count()>0){
      heading();
    // }
      
  }, []);
   
  const getHrs = (date) => {
    var res = new Date(date).getHours();
    return res;
}
const getMins = (mins) => {
    var res = new Date(mins).getMinutes();
    return res;
}
const getTime = (time) => {
    var hours = new Date(time).getHours();
    var minutes = new Date(time).getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
const getLine = (x) => {
    
    let newText=x.split (' ').map ((item, i) => <p key={i}>{item}</p>);
    console.log(newText);
    return newText;
}
  const heading=()=> {

    var workingDays = schedule[0].workingDays.split(',');
   
    arr1.forEach(data => {
      workingDays.forEach(item => {
        if (data == item) {
          columns.push(data);
          
        }
      });

    });

    //Time slots
    var startTime = new Date(schedule[0].stime);
    var endTime = new Date(schedule[0].stime);
    endTime.setHours( endTime.getHours() + getHrs(schedule[0].wtime) );
    endTime.setMinutes(endTime.getMinutes()+getMins(schedule[0].wtime));
    
    let dura=0;
    var noOfSlots=0;
    if (schedule[0].duration == "One Hour")
    {
        dura = 60;
    }

    else if (schedule[0].duration == "Thirty mins")
    {
        dura = 30;
    }
    while (startTime.setMinutes(startTime.getMinutes()+ dura) <= endTime)
    {
       
            time.push(getTime(startTime))
        
        noOfSlots++;
    }

   setMr(rows)

  
   // rows1.filter(n=>n.id===1).map(n=>{n.Thu='test'});
    //setRows(rows1);

    var arr2d = [ ];
    var sessionCnt = 0;
    let sessionLen = sessions.length;
    const sessionList=sessions;
    var session_copy=sessionList;
    let val = 0;
    let value = 0;
    let l=sessionLen *5;

      for (let i = 0; i < schedule[0].dayCount; i++) {
          var newArr = [];
          for (let j = 0; j < noOfSlots; j++) {
              newArr.push([]);
          }
          arr2d[i] = newArr;
      }

        //   for (let i = 0; i < schedule[0].dayCount; i++)
        //     {
        //       var newArr=[];
        //       for (let j = 0; j < noOfSlots; j++)
        //       {
        //         sessionCnt++;
        //         consolsessionList[sessionCnt]); 

        //       }
        //      ;
        //   }
         // console.log(arr2d[0][0].length); 
         // arr2d[0,0].push(sessions[0]);
          //console.log(sessionList[2].Duration );       


      do {
          for (let i = 0; i < schedule[0].dayCount; i++) {
              for (let j = 0; j < noOfSlots; j++) {
                  if (sessionCnt < sessionLen) {
                      if (arr2d[i][j].length > 0)//checking aray has values
                      {
                          let test = true;
                          while (test) {
                              arr2d[i][j].forEach(element => {
                                  if (sessionCnt < sessionLen && element.groupIdSub == sessionList[sessionCnt].groupIdSub) {
                                      j++;
                                  }
                                  else {
                                      test = false;
                                  }
                              });
                          }
                          if (sessionCnt < sessionLen) {
                              val = (sessionList[sessionCnt].Duration) * 60 / dura;
                              //for half sessions
                              let test1 = true;
                              while (test1) {
                                  if ((j + val) > noOfSlots) {
                                      //date check for half sessions
                                      if (i + 1 < schedule[0].dayCount) {
                                          i++;
                                      }
                                      j = 0;
                                  }
                                  else {
                                      test1 = false;
                                  }
                              }
                              //empty session copy
                              var testing1 = sessionList[sessionCnt];
                              // if (session_copy.includes(testing1))
                              // {
                              //     const index1 = session_copy.indexOf(testing1);
                              //     session_copy.splice(index1,1);
                              // }
                              for (let y = 0; y < val; y++) {
                                  if ((j + y) < noOfSlots) {
                                      arr2d[i][j + y].push(sessionList[sessionCnt]);
                                  }
                                  else {
                                      break;
                                  }
                              }
                              j = j + val - 1;
                              sessionCnt++;
                          }
                      }
                      else {
                          let val1 = 0;
                          //empty session copy
                          var testing1 = sessionList[sessionCnt];
                          // if (session_copy.includes(testing1))
                          // {
                          //     const index11 = session_copy.indexOf(testing1);
                          //     session_copy.splice(index11,1);
                          // }
                         
                          val1 = (sessionList[sessionCnt].Duration) * 60 / dura;
                          //for half sessions
                          let test1 = true;
                          while (test1) {
                              if ((j + val1) > noOfSlots) {
                                  //date check for half sessions
                                  if (i + 1 < schedule[0].dayCount) {
                                      i++;
                                  }
                                  j = 0;
                              }
                              else {
                                  test1 = false;
                              }
                          }
                          for (let y = 0; y < val1; y++) {
                              if ((j + y) < noOfSlots) {
                                  arr2d[i][j + y].push(sessionList[sessionCnt]);
                              }
                          }
                          j = j + val1 - 1;
                          sessionCnt++;
                      }
                  }
                  else {
                      break;
                  }
              }
          }
          l--;
      } while (l > 0);

        
      let i = 0;
   
    console.log(arr2d);
    var showArr=[];
    for (var h = 0; h < noOfSlots; h++)
            {var showArrRow=[];
                for (var j = 0; j <=schedule[0].dayCount; j++)
                {

                    
                    var session = "";
                    if(j==0){
                        session=time[h];
                        
                    }else{
                        
                       if(arr2d[j-1][h]!=null){
                        arr2d[j-1][h].forEach(element => {
                            
                           
                                session = session + " " +element.subName+ "\n" +element.groupIdSub;
                            
                            
                              //  MainTitle.Content = "Group Id- "+searchVal;
                        });
                       }
                    }
                    
                   
                    showArrRow.push(session);
                    console.log(showArrRow);
                }
                showArr.push(showArrRow);
            }

            
        setMr(showArr);
        console.log(showArr);
  }
   
    return (
    //     <div style={{ height: 400, width: '100%' }}>
    //     <DataGrid rows={mr} columns={columns}  hideFooter='true' disableColumnResize='false'   />
    //   </div>
    <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="locations table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map(col=>(
                                <TableCell>{col}</TableCell>
                            ))

                        }
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mr.map(row=>(
                        <TableRow >
                            {row.map(x=>(
                                
                                <TableCell>{getLine(x)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                        
                
                </TableBody>
            </Table>
        </TableContainer>
    )
})

export default TimeTable;