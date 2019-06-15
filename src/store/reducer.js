

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
        studentMarks : Map
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

                  var newMap = new Map();
                  newMap = action.studentMarks;
                return{
                      ...state,
                      studentMarks: newMap
                }

            default:
                break;
        }
        return state;
    }

    export default reducer;



