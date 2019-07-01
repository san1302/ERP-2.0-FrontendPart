

  const initialstate = {
        
        token :{
            isAuth: false ,
            token: null ,
            userId: null
        } ,
        studentInfo : {
            _id: undefined,
            roll: undefined,
            password: undefined,
            name: undefined,
            email: undefined,
            branch: undefined,
            semester: undefined,
            markId : undefined,
            classroomId : undefined
        },

        teacherInfo:{
                _id: undefined,
                roll: undefined,
                password: undefined,
                name: undefined,
                email: undefined,
                branch: undefined,
                semester: undefined,
                classroomId: undefined
        } ,
        studentMarks : [],
        studentAttendance : [],
        classroom : {
            studentId : [],
            teacherId : [],
            subjects :[]
        },

        classroomMarksTable : [],

       classroomAttendanceTable:[]
    };

    const reducer = (state = initialstate,action) => {
         
        switch (action.type) {
            case 'SetStudentInfo':
                return{
                    ...state,
                    studentInfo : {
                        _id : action.studentInfo._id,
                         roll: action.studentInfo.roll,
                        password: action.studentInfo.password,
                        name: action.studentInfo.name,
                        email: action.studentInfo.email,
                        branch: action.studentInfo.branch,
                        semester: action.studentInfo.semester,
                        markId : action.studentInfo.markId
                       // classroomId : action.studentInfo.
                    }

                } 


             case 'SetTeacherInfo':
                return{
                    ...state,
                    teacherInfo : {
                        _id : action.teacherInfo._id,
                        roll: action.teacherInfo.roll,
                        password: action.teacherInfo.password,
                        name: action.teacherInfo.name,
                        email: action.teacherInfo.email,
                        branch: action.teacherInfo.branch,
                        semester: action.teacherInfo.semester
                       // classroomId : action.teacherInfo.
                    }

                } 
                
            case 'SetStudentMarks':
                      
                   var newArray = [];
                   newArray = newArray.concat(action.studentMarks)
                return{
                      ...state,
                      studentMarks:newArray
                }

            case 'SetStudentAttendance':
                var newArray = [];
                   newArray = newArray.concat(action.studentAttendance)
                return{
                      ...state,
                      studentAttendance:newArray
                }
            
            case 'SetClassroomInfo':
                var newStudentIdArray = [];
                var newTeacherIdArray = [];
                var newSubjectsArray = [];
                newStudentIdArray = newStudentIdArray.concat(action.ClassroomInfo.studentId)
                newTeacherIdArray = newTeacherIdArray.concat(action.ClassroomInfo.teacherId);
                newSubjectsArray = newSubjectsArray.concat(action.ClassroomInfo.subjects);
                return{
                     ...state,
                     classroom : {
                         studentId: newStudentIdArray,
                         teacherId: newTeacherIdArray,
                         subjects : newSubjectsArray
                     }
                }

            case 'SetClassroomMarksTable':
                var newClassroomMarksTable = [];
                newClassroomMarksTable = newClassroomMarksTable.concat(action.ClassroomMarksTableInfo)
                return{
                       ...state,
                       classroomMarksTable: newClassroomMarksTable
                }
            
            case 'SetClassroomAttendanceTable':
                var newClassroomAttendanceTable = [];
                newClassroomAttendanceTable = newClassroomAttendanceTable.concat(action.ClassroomAttendanceTableInfo)
                return{
                       ...state,
                       classroomAttendanceTable: newClassroomAttendanceTable
                }

            case 'SetTokenInfo':
                return{
                    ...state,
                    token : {
                           isAuth: action.TokenInfo.isAuth,
                            token: action.TokenInfo.token,
                            userId: action.TokenInfo.userId
                     }
                }

            default:
                break;
        }
        return state;
    }

    export default reducer;



