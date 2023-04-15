import { useNavigate, useParams } from "react-router-dom";
import styles from './Attendace.module.css';
import ReactDOM from 'react-dom/client';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { cookieExists, getCookieValue } from "../../tools/cookies";
import { AiOutlineClockCircle } from 'react-icons/ai';
import { detailFormat } from "../../tools/date_formatting";
import $ from 'jquery';
import { isCurrentTimeInRange, isInWeekPeriod } from "../../tools/time_checking";

const students = [];

const StudentList = (props) =>
{
      const [attendance, setAttendance] = useState({ status: null, note: "" });

      const render = useRef(false);

      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.get('http://localhost:3030/TS/attendance/studentAttendance', { params: { sessionNumber: props.sessionNumber, className: props.class_name, ID: props.id } })
                        .then(res =>
                        {
                              // console.log(res);
                              if (res.data.length !== 0)
                              {
                                    // res.data.Note
                                    setAttendance({ status: res.data.Status, note: res.data.Note });
                                    $(`.attendance_check_${ props.id }`).each(function ()
                                    {
                                          if (parseInt($(this).val()) === res.data.Status)
                                          {
                                                $(this).prop("checked", true);
                                          }
                                          else
                                          {
                                                $(this).prop("checked", false);
                                          }
                                    });
                              }
                        })
                        .catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const handleCheck = (event) =>
      {
            students[props.number - 1].status = parseInt(event.target.value);
            $(`.attendance_check_${ props.id }`).each(function ()
            {
                  if ($(this).val() === event.target.value)
                  {
                        $(this).prop("checked", true);
                  }
                  else
                  {
                        $(this).prop("checked", false);
                  }
            });
      }

      const handleNote = (event) =>
      {
            students[props.number - 1].note = $(event.target).val();
      }

      return (
            <tr>
                  <th scope="row" className='col-1'>{ props.number }</th>
                  <td className='col-3'>{ props.name }</td>
                  <td className='col-1'><button className={ `${ styles.detail }` }><a href="#">Detail</a></button></td>
                  <td className='col-1'><input value="2" className={ `attendance_check_${ props.id }` } onChange={ handleCheck } type="checkbox" style={ { width: "30px", height: "30px" } }></input></td>
                  <td className='col-1'><input value="1" className={ `attendance_check_${ props.id }` } onChange={ handleCheck } type="checkbox" style={ { width: "30px", height: "30px", marginLeft: "20px" } }></input></td>
                  <td className='col-1'><input value="0" className={ `attendance_check_${ props.id }` } onChange={ handleCheck } type="checkbox" style={ { width: "30px", height: "30px", marginLeft: "20px" } }></input></td>
                  <td className='col-3'><input type="text" style={ { width: "300px", marginLeft: "30px" } } onChange={ handleNote } defaultValue={ attendance.note }></input></td>
            </tr>
      );
}

const Teacher = (props) =>
{
      const render = useRef(false);

      const [room, setRoom] = useState();
      const [time, setTime] = useState({});
      const [status, setStatus] = useState({});
      const [makeup, setMakeup] = useState(null);
      const [teacher, setTeacher] = useState({});
      const [supervisor, setSupervisor] = useState({});

      const addStudent = (id) =>
      {
            students.push({ id: id, status: null, note: null });
      };

      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.get('http://localhost:3030/TS/attendance/session', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              setRoom(res.data.Classroom_ID);
                              setTime({ date: detailFormat(res.data.Session_date), start: res.data.Start_hour, end: res.data.End_hour });
                              if (res.data.Status === 2)
                                    setStatus({ status: "On going", color: "#0B8700" });
                              else if (res.data.Status === 1)
                                    setStatus({ status: "Finished", color: "#7E7E7E" });
                              else
                                    setStatus({ status: "Cancelled", color: "#FF0000" });
                              setMakeup(res.data.Session_number_make_up_for);
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/teacher', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              setTeacher({ id: res.data.ID, name: res.data.name });
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/supervisor', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              // console.log(res);
                              setSupervisor({ id: res.data.ID, name: res.data.name });
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/students', {
                        params: {
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              let temp = [];
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    addStudent(res.data[i].Student_ID);
                                    temp.push(<StudentList key={ i } number={ i + 1 } name={ res.data[i].name } id={ res.data[i].Student_ID } sessionNumber={ props.sessionNumber } class_name={ props.className } />);
                              }
                              const root = ReactDOM.createRoot(document.getElementById('student_list'));
                              root.render(<>{ temp }</>);
                        })
                        .catch(error => console.log(error));
                  render.current = true;
            }
      });

      const handleSubmit = () =>
      {
            const currentDate = detailFormat(new Date());
            console.log(students);
            if (time.date === currentDate)
            {
                  if (isCurrentTimeInRange(time.start, time.end))
                  {
                        for (let i = 0; i < students.length; i++)
                        {
                              if (students[i].status === null)
                              {
                                    $(`.${ styles.empty }`).css("display", "flex");
                                    return;
                              }
                        }
                        for (let i = 0; i < students.length; i++)
                        {
                              axios.post('http://localhost:3030/TS/attendance/teacherUpdate', {
                                    params: {
                                          sessionNumber: props.sessionNumber,
                                          className: props.className,
                                          id: students[i].id,
                                          status: students[i].status,
                                          note: students[i].note
                                    }
                              })
                                    .then(res =>
                                    {
                                          console.log(res.data);
                                    })
                                    .catch(error => { console.log(error); });
                        }
                        $(`.${ styles.complete }`).css("display", "flex");
                  }
                  else
                        $(`.${ styles.invalidDay }`).css("display", "flex");
            }
            else
                  $(`.${ styles.invalidDay }`).css("display", "flex");
      }


      return (
            <>
                  <form className="w-100 h-100">
                        <div className={ `w-100 d-flex` } style={ { height: '40%' } }>
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '33%' } }>
                                    <h1>Session { props.sessionNumber }</h1>
                                    <p className="d-flex align-items-center"><AiOutlineClockCircle />{ time.date }: { time.start } - { time.end }</p>
                                    <p>Room: { room }</p>
                                    <p>Status: <span style={ { color: status.color } }>{ status.status }</span></p>
                                    { makeup && <p>Make up for session { makeup }</p> }
                              </div>
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '33%' } }>
                                    <h3 className="mb-3">Teacher: { teacher.name }</h3>
                                    <img alt="avatar" src="https://cdn3.iconfinder.com/data/icons/avatar-91/130/avatar__girl__teacher__female__women-512.png" style={ { height: '70%', width: '70%' } }></img>
                                    <button className={ `mt-3 ${ styles.detail }` }>Detail</button>
                              </div >
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '33%' } }>
                                    <h3 className="mb-3">Supervisor: { supervisor.name }</h3>
                                    <img alt="avatar" src="https://www.shareicon.net/data/512x512/2016/07/26/801997_user_512x512.png" style={ { height: '70%', width: '70%' } }></img>
                                    <button className={ `mt-3 ${ styles.detail }` }>Detail</button>
                              </div>
                        </div>
                        <div className={ `w-100` } style={ { height: '50%' } } >
                              <table className="table table-hover m-0 w-100">
                                    <thead style={ { borderBottom: "2px solid black" } }>
                                          <tr>
                                                <th scope="col" className='col-1'>#</th>
                                                <th scope="col" className='col-3'>Name</th>
                                                <th scope="col" className='col-1'></th>
                                                <th scope="col" className='col-1'>On class</th>
                                                <th scope="col" className='col-1'>Late</th>
                                                <th scope="col" className='col-1'>Absent</th>
                                                <th scope="col" className='col-3'>Note</th>
                                          </tr>
                                    </thead>
                              </table>
                              <div className="overflow-auto w-100" style={ { height: '80%', boxSizing: "border-box" } }>
                                    <table className="table table-hover m-0 w-100">
                                          <tbody id="student_list">
                                          </tbody>
                                    </table>
                              </div>
                              {/* <div className="d-flex align-items-center justify-content-center mt-4">
                                    <p className="m-0">Class note:</p>
                                    <textarea className="mx-3" style={ { width: '400px', minHeight: '60px', resize: 'none' } }></textarea>
                              </div> */}
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-5">
                              <button type="button" className={ `${ styles.back } mx-3` } onClick={ () => { window.location.href = "/MyClasses/" + props.className; } }>Back</button>
                              <button type="button" onClick={ handleSubmit } className={ `${ styles.confirm } mx-3` }>Confirm</button>
                        </div>
                  </form>
            </>
      );
}

const Supervisor = (props) =>
{
      const render = useRef(false);

      const [room, setRoom] = useState();
      const [time, setTime] = useState({});
      const [status, setStatus] = useState({});
      const [makeup, setMakeup] = useState(null);
      const [teacher, setTeacher] = useState({});
      const [supervisor, setSupervisor] = useState({});

      const teacherAttendace = { status: null, note: "" };

      const addStudent = (id) =>
      {
            students.push({ id: id, status: null, note: null });
      };

      useEffect(() =>
      {
            if (!render.current)
            {
                  axios.get('http://localhost:3030/TS/attendance/session', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              setRoom(res.data.Classroom_ID);
                              setTime({ date: detailFormat(res.data.Session_date), start: res.data.Start_hour, end: res.data.End_hour });
                              if (res.data.Status === 2)
                                    setStatus({ status: "On going", color: "#0B8700" });
                              else if (res.data.Status === 1)
                                    setStatus({ status: "Finished", color: "#7E7E7E" });
                              else
                                    setStatus({ status: "Cancelled", color: "#FF0000" });
                              setMakeup(res.data.Session_number_make_up_for);
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/teacher', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              setTeacher({ id: res.data.ID, name: res.data.name });
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/supervisor', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              // console.log(res);
                              setSupervisor({ id: res.data.ID, name: res.data.name });
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/students', {
                        params: {
                              className: props.className
                        }
                  })
                        .then(res =>
                        {
                              let temp = [];
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    addStudent(res.data[i].Student_ID);
                                    temp.push(<StudentList key={ i } number={ i + 1 } name={ res.data[i].name } id={ res.data[i].Student_ID } />);
                              }
                              const root = ReactDOM.createRoot(document.getElementById('student_list'));
                              root.render(<>{ temp }</>);
                        })
                        .catch(error => console.log(error));
                  axios.get('http://localhost:3030/TS/attendance/teacherAttendance', { params: { sessionNumber: props.sessionNumber, className: props.class_name, ID: teacher.id } })
                        .then(res =>
                        {
                              if (res.data.length !== 0)
                              {
                                    teacherAttendace.status = res.data.Status;
                                    teacherAttendace.note = res.data.Note;

                                    $(`.teacher_attendace_check`).each(function ()
                                    {
                                          if (parseInt($(this).val()) === teacherAttendace.status)
                                          {
                                                $(this).prop("checked", true);
                                          }
                                          else
                                          {
                                                $(this).prop("checked", false);
                                          }
                                    });
                              }
                        })
                        .catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const handleSubmit = () =>
      {
            if (isInWeekPeriod(time.date))
            {
                  if (teacherAttendace.status === null)
                  {
                        $(`.${ styles.teacherMissing }`).css("display", "flex");
                        return;
                  }
                  for (let i = 0; i < students.length; i++)
                  {
                        if (students[i].status === null)
                        {
                              $(`.${ styles.empty }`).css("display", "flex");
                              return;
                        }
                  }
                  // for (let i = 0; i < students.length; i++)
                  // {
                  //       axios.post('http://localhost:3030/TS/attendance/teacherUpdate', {
                  //             params: {
                  //                   sessionNumber: props.sessionNumber,
                  //                   className: props.className,
                  //                   id: students[i].id,
                  //                   status: students[i].status,
                  //                   note: students[i].note
                  //             }
                  //       })
                  //             .then(res =>
                  //             {
                  //                   console.log(res.data);
                  //             })
                  //             .catch(error => { console.log(error); });
                  // }
                  axios.post('http://localhost:3030/TS/attendance/supervisorUpdate', {
                        params: {
                              sessionNumber: props.sessionNumber,
                              className: props.className,
                              id: teacher.id,
                              status: teacherAttendace.status,
                              note: teacherAttendace.note
                        }
                  })
                        .then(res =>
                        {
                              console.log(res.data);
                        })
                        .catch(error => { console.log(error); });
                  $(`.${ styles.complete }`).css("display", "flex");
            }
            else
                  $(`.${ styles.invalidDay }`).css("display", "flex");
      }

      const handleTeacherCheck = (event) =>
      {
            teacherAttendace.status = parseInt(event.target.value);
            $(`.teacher_attendace_check`).each(function ()
            {
                  if ($(this).val() === event.target.value)
                  {
                        $(this).prop("checked", true);
                  }
                  else
                  {
                        $(this).prop("checked", false);
                  }
            });
      }


      return (
            <>
                  <form className="w-100 h-100">
                        <div className={ `w-100 d-flex` } style={ { height: '40%' } }>
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '25%' } }>
                                    <h1>Session { props.sessionNumber }</h1>
                                    <p className="d-flex align-items-center"><AiOutlineClockCircle />{ time.date }: { time.start } - { time.end }</p>
                                    <p>Room: { room }</p>
                                    <p>Status: <span style={ { color: status.color } }>{ status.status }</span></p>
                                    { makeup && <p>Make up for session { makeup }</p> }
                              </div>
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '27.5%' } }>
                                    <h3 className="mb-3">Teacher: { teacher.name }</h3>
                                    <img alt="avatar" src="https://cdn3.iconfinder.com/data/icons/avatar-91/130/avatar__girl__teacher__female__women-512.png" style={ { height: '70%', width: '70%' } }></img>
                                    <button className={ `mt-3 ${ styles.detail }` }>Detail</button>
                              </div >
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '20%' } }>
                                    <div className="d-flex justify-content-around align-items-center w-100">
                                          <div>
                                                <h4>On class</h4>
                                                <input type="checkbox" style={ { width: "30px", height: "30px" } } onChange={ handleTeacherCheck } value="2" className="teacher_attendace_check"></input>
                                          </div>
                                          <div>
                                                <h4>Late</h4>
                                                <input type="checkbox" style={ { width: "30px", height: "30px" } } onChange={ handleTeacherCheck } value="1" className="teacher_attendace_check"></input>
                                          </div>
                                          <div>
                                                <h4>Absent</h4>
                                                <input type="checkbox" style={ { width: "30px", height: "30px" } } onChange={ handleTeacherCheck } value="0" className="teacher_attendace_check"></input>
                                          </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                          <div className="d-flex flex-column justify-content-center align-items-center">
                                                <h4>Note</h4>
                                                <textarea style={ { width: '250px', minHeight: '60px', resize: 'none' } } onChange={ (event) => { teacherAttendace.note = event.target.value; } } className="teacher_attendace_note" defaultValue={ teacherAttendace.note }></textarea>
                                          </div>
                                    </div>
                              </div >
                              <div className="h-100 d-flex flex-column justify-content-center align-items-center" style={ { width: '27.5%' } }>
                                    <h3 className="mb-3">Supervisor: { supervisor.name }</h3>
                                    <img alt="avatar" src="https://www.shareicon.net/data/512x512/2016/07/26/801997_user_512x512.png" style={ { height: '70%', width: '70%' } }></img>
                                    <button className={ `mt-3 ${ styles.detail }` }>Detail</button>
                              </div>
                        </div>
                        <div className={ `w-100` } style={ { height: '50%' } } >
                              <table className="table table-hover m-0 w-100">
                                    <thead style={ { borderBottom: "2px solid black" } }>
                                          <tr>
                                                <th scope="col" className='col-1'>#</th>
                                                <th scope="col" className='col-3'>Name</th>
                                                <th scope="col" className='col-1'></th>
                                                <th scope="col" className='col-1'>On class</th>
                                                <th scope="col" className='col-1'>Late</th>
                                                <th scope="col" className='col-1'>Absent</th>
                                                <th scope="col" className='col-3'>Note</th>
                                          </tr>
                                    </thead>
                              </table>
                              <div className="overflow-auto w-100" style={ { height: '80%', boxSizing: "border-box" } }>
                                    <table className="table table-hover m-0 w-100">
                                          <tbody id="student_list">
                                          </tbody>
                                    </table>
                              </div>
                              <div className="d-flex align-items-center justify-content-center mt-4">
                                    <p className="m-0">Class note:</p>
                                    <textarea className="mx-3" style={ { width: '400px', minHeight: '60px', resize: 'none' } }></textarea>
                              </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-5">
                              <button type="button" className={ `${ styles.back } mx-3` } onClick={ () => { window.location.href = "/MyClasses/" + props.className; } }>Back</button>
                              <button type="button" onClick={ handleSubmit } className={ `${ styles.confirm } mx-3` }>Confirm</button>
                        </div>
                  </form>
            </>
      );
}

const Attendance = () =>
{
      const className = useParams().name;
      const session = useParams().session;

      const render = useRef(false);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            if (!cookieExists('userType') || !cookieExists('id'))
                  Navigate("/");
            if (!render.current)
            {
                  const target = ReactDOM.createRoot(document.getElementById('attendance'));
                  if (getCookieValue("id").includes("TEACHER"))
                        target.render(<Teacher className={ className } sessionNumber={ session } />);
                  else
                        target.render(<Supervisor className={ className } sessionNumber={ session } />);
                  render.current = true;
            }
      })

      return (
            <div className={ `h-100 ${ styles.page } d-flex align-items-center justify-content-center` }>
                  <div className={ `d-flex flex-column align-items-center ${ styles.board }` } id="attendance">
                  </div>
                  <div className={ `${ styles.empty } flex-column justify-content-around align-items-center` }>
                        <h1>One or more students' attendace have not been checked!</h1>
                        <button className={ `${ styles.confirm }` } style={ {
                              width: "150px", height: "50px", fontSize: "30px"
                        } } onClick={ () => { $(`.${ styles.empty }`).css("display", "none") } }>Okay</button>
                  </div>
                  <div className={ `${ styles.invalidDay } flex-column justify-content-around align-items-center` }>
                        <h1>You can not check students' attendance right now!</h1>
                        <button className={ `${ styles.confirm }` } style={ {
                              width: "150px", height: "50px", fontSize: "30px"
                        } } onClick={ () => { $(`.${ styles.invalidDay }`).css("display", "none") } }>Okay</button>
                  </div>
                  <div className={ `${ styles.complete } flex-column justify-content-around align-items-center` }>
                        <h1>Attendance check complete!</h1>
                        <button className={ `${ styles.confirm }` } style={ {
                              width: "150px", height: "50px", fontSize: "30px"
                        } } onClick={ () => { $(`.${ styles.complete }`).css("display", "none") } }>Okay</button>
                  </div>
                  <div className={ `${ styles.teacherMissing } flex-column justify-content-around align-items-center` }>
                        <h1>You did not check teacher's attendance!</h1>
                        <button className={ `${ styles.confirm }` } style={ {
                              width: "150px", height: "50px", fontSize: "30px"
                        } } onClick={ () => { $(`.${ styles.teacherMissing }`).css("display", "none") } }>Okay</button>
                  </div>
            </div>
      );
}

export default Attendance;