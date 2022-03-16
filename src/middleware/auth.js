export function setToken(token){
    localStorage.setItem("Authorization",token);
}

export function getToken(){
    return localStorage.getItem("Authorization") || "";
}

export function isLogin(){
    return getToken()?true:false;
}

export function removeToken(){
    localStorage.removeItem("Authorization");
}