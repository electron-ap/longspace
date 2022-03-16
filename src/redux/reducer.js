export default function reducer(preState = '',action){
    console.log('reducer',preState,action);
    const { type, payload } = action;
    switch (type){
        case "login":
            return payload.user_name;

        default:
            return 'ssss';
    }

}
