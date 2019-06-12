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

        teacherInfo: null
    };

    const reducer = (state = initialstate,action) => {
         
        switch (action.type) {
            case 'SetStudentInfo':
                return{
                    ...initialstate,
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
                
        
            default:
                break;
        }
        return state;
    }

    export default reducer;



