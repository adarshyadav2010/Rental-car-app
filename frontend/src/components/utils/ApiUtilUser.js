
const API_USER="https://car-rent-backend.onrender.com"


function addUser(UserData){
    return fetch(`${API_USER}/user/register`, {
        method: 'POST',
       headers:{
        "content-type":"application/json",
       } ,
       body:JSON.stringify(UserData)
    })
    .then(res => res.json())
}

export {addUser}