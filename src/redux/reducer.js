export default function reducer(preState = '',action){
    console.log('reducer',preState,action);
    const { type, data } = action;
    switch (type){
        case "login":
            return data.user_name;

        default:
            return 'ssss';
    }

}
