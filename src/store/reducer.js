

  const initialstate = {

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
        classroom : {
            studentId : [],
            teacherId : []
        },

        classroomMarksTable : []
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
            
            case 'SetClassroomInfo':
                var newStudentIdArray = [];
                var newTeacherIdArray = [];
                newStudentIdArray = newStudentIdArray.concat(action.ClassroomInfo.studentId)
                newTeacherIdArray = newTeacherIdArray.concat(action.ClassroomInfo.teacherId);
                return{
                     ...state,
                     classroom : {
                         studentId:newStudentIdArray,
                         teacherId: newTeacherIdArray
                     }
                }

            case 'SetClassroomMarksTable':
                var newClassroomMarksTable = [];
                newClassroomMarksTable = newClassroomMarksTable.concat(action.ClassroomMarksTableInfo)
                return{
                       ...state,
                       classroomMarksTable: newClassroomMarksTable
                }

            default:
                break;
        }
        return state;
    }

    export default reducer;



