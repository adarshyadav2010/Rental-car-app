
const API_BASE_URL= 'https://car-rent-backend.onrender.com';
// const AdminId = JSON.parse(localStorage.getItem("Admin-Id"))


function GetCars(){
    console.log(`${API_BASE_URL}/cars`)

  return fetch(`${API_BASE_URL}/cars`,{
    headers:{
        "authorization":JSON.parse(localStorage.getItem("token-admin"))
    }
  })
  .then(res=>{
    console.log(res)
    return res.json()
  }
    )
}

// const userId =  JSON.parse(localStorage.getItem("User-id"))


// function GetOrders(){
//     console.log(`${API_BASE_URL}/orders/${userId}`)
//   return fetch(`${API_BASE_URL}/orders/${userId}`,{
//     headers:{
//         "authorization":JSON.parse(localStorage.getItem("token-user"))
//     }
//   })
//   .then(res=>{
//     console.log(res)
//     return res.json()
//   }
//     )
// }


function GetCar(id){
    return fetch(`${API_BASE_URL}/cars/${id}`,{
      headers:{
          "authorization":JSON.parse(localStorage.getItem("token-admin"))
      }
    })
    .then(res=>res.json())
  }

function addCar(cardata){
    return fetch(`${API_BASE_URL}/cars`, {
        method: 'POST',
        headers:{
            "authorization":JSON.parse(localStorage.getItem("token-admin"))
        },
       body: cardata
    })
    .then(res => res.json())
}

function deleteCar(id){
    return fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'DELETE',
        headers:{
            "authorization":JSON.parse(localStorage.getItem("token-admin"))
        },
    }).then(res => {
        if(res.status === 200){
            return true
        }
        return false
    })
}

export {addCar, GetCars,deleteCar, GetCar}