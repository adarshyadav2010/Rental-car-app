import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarCards({car}) {
    const navigate =useNavigate();
    
    return (
        <div className="car-container" onClick={()=>navigate("/edit-car-page")}>
            <div className="img-container">
                <img src={``} id="car-img" alt="img-car"
                    onClick={() => {
                        // if (AdminId !== d.AdminId) {
                        //     console.log(d.AdminId)
                        //     setErr("You Don`t Have Access To Edit This Details");
                        //     setOk("OK")
                        // }
                        // else {
                        //     console.log(d.AdminId)
                        //     setEdit(d);
                        //     Navigater("/edit-car-details")
                        // }

                    }} />
            </div>
            <div className="card-2nd">
                <div className="person-nos">6 person</div>
                <div className="car-details">
                    <span>name</span> 
                    <span className="distance-det">per km KM/RS</span>
                </div>
            </div>
            
            <hr/>
            <div className="date-details">
                <span >Available Date</span>
                <span >start - till</span>
            </div>
        </div>
    )
}