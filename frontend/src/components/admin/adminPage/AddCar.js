import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminNav from "../../navbar/AdminsNav"
import { StateContextsData } from "../../context/StateContext"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NewCar from "./NewCar";
import HomePage from "../../homePage/HomePage";
import { addCar } from "../../utils/ApiUtils";

export default function AddCar() {
    const navigator1 = useNavigate()
    const {setCar} = useContext(StateContextsData)
    const [data, setData] = useState({
        name:"",
        type:"",
        model:"",
        milage:"",
        image:"",
        availableFrom:"",
        availableTill:"",
        perKm:"",
        description:"",
        carDetails:"",
        Details:"",
        AdminId: ""
      })
      const [loader , setLoader] = useState(false);
      const TokenAdmin= JSON.parse(localStorage.getItem("token-admin"))
      function submitFunction(e){
        e.preventDefault()
        const newformData = new FormData(e.target)
        const AdminId = JSON.parse(localStorage.getItem("Admin-Id"))
        newformData.append("AdminId", AdminId)
        console.log(newformData)
        addCar(newformData).then(data=>{
            setCar(d=>{
              return [data,...d]
          })
          setLoader(false)
          setData({
              name:"",
              type:"",
              model:"",
              milage:"",
              image:"",
              availableFrom:"",
              availableTill:"",
              perKm:"",
              description:"",
              carDetails:"",
              Details:""
          })
          navigator1("/admin-page")
       })
    }

    return (
        <div className='addcar-container'>
            { TokenAdmin? <>
            <AdminNav />
                <div className="addcar-page">
                    <h4 className="heading-admin">Add Car Details</h4>
                    <form id="add-car-form" onSubmit={submitFunction}>
                        <NewCar data={data} setData={setData}/>
                        <div className="input-gap-bottom " id="btn-cancel-add-detail-container">
                            <button id="btn-cancel-add-detail" onClick={() => navigator1("/admin-page")}>Cancel</button>
                            <button id="btn-Add-add-detail-ans-save" onClick={() => setLoader(true)} type="submit">Add</button>
                        </div>
                    </form>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loader}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                </>:<HomePage/>
            }
        </div>
    )
}
