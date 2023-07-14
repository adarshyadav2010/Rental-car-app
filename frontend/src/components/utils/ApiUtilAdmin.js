
const API_ADMIN="https://car-rent-backend.onrender.com"


function addAdmin(AdminData){
    console.log(`${API_ADMIN}/admin/register`)
    return fetch(`${API_ADMIN}/admin/register`, {
        
        method: 'POST',
       headers:{
        "content-type":"application/json",
       } ,
       body:JSON.stringify(AdminData)
    })
    .then(res => res.json())
}

export {addAdmin}