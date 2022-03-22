export function setToken(token){
    localStorage.setItem("authorization",token);
}

export function getToken(){
    return localStorage.getItem("authorization") || "";
}

export function isLogin(){
    return getToken()?true:false;
}

export function removeToken(){
    localStorage.removeItem("authorization");
}