import React, { useContext, useEffect, useState } from "react";
import UserNav from "../../navbar/UserNav";
import '../../styles/bookings.css';
import '../../styles/styles.css';
import {GetOrders} from '../../utils/ApiUtils'
import { Link, useNavigate } from "react-router-dom";
import { StateContextsData } from "../../context/StateContext";
import HomePage from "../../homePage/HomePage";

export default function UserBookings(){
    const navigate = useNavigate()
    const {Bookdata,setBookData, setEditPaymentDetails, headerData}=useContext(StateContextsData);
   const TokenUser= JSON.parse(localStorage.getItem("token-user"))
    const userId=JSON.parse(localStorage.getItem("userId"))
    useEffect(()=>{
        console.log(userId)
     fetch(`https://car-rent-backend.onrender.com/orders/${userId}`)
        .then(res=>{
            console.log(res)
            return res.json()})
        .then(data=>{
            console.log(data)
            return setBookData((data.data).reverse())})
    },[])
    // console.log(Bookdata)


    function deleteCarData(id){
        console.log(id)
        fetch(`https://car-rent-backend.onrender.com/${id}`, {

            method: 'DELETE',
            headers:{
                "authorization":JSON.parse(localStorage.getItem("token-user"))
            },
        }).then(res => {
            console.log(res)
            if(res.status === 200){
                return true
            }
            return false
        })
   
    }
    console.log(Bookdata)
  
    return(
        <>
        {TokenUser ? <>
        <div className='admin-container'>
            <UserNav/>
            <div className="admin-page">
                <h3>My Bookings</h3>
                {Bookdata.map((data, i) => {
                    return <div key={i}>
                        <div className="booking-container">
            <div className="each-books">
                <div className="booked-car">
                    <img src={`https://car-rent-backend.onrender.com/cars/${data.image}`} alt="car-img" className="img-car" />
                    <div className="car-details">
                        <p className="gap">{data.name}</p>
                        <p className="gap">{data.type}</p>
                        <p >{data.carDetails}</p>
                    </div>
                    <div className="travel-details">
                        <div className="traveldata">
                            <div className="details">
                                <div>
                                    <span >Origin : </span> <span >{data.origin}</span>
                                </div>
                                <div>
                                    <span > Destination: </span> <span > {data.destination}</span>
                                </div>
                                <div>
                                    <span >Start-Date: </span> <span > {data.startDate}</span>
                                </div>
                                <div>
                                    <span >End-Date : </span> <span > {data.endDate}</span>
                                </div>
                            </div>
                            <div className="map-img">
                                {/* <Map origin={data.origin} destination={data.destination} className='mai-hoon-map' id="mapsdes" /> */}
                                <img src={data.MapImg} alt="unable to view map" id="mapsdes" className="map-img"/>
                            </div>

                        </div>
                    </div>
                    <div className="details1">
                        <div>
                            <span >Booking ID : </span> <span > {data.BookingId}</span>
                        </div>
                        <div>
                            <span > Booking Date: </span> <span > {data.date}</span>
                        </div>
                        <div>
                            <span >Booking Time: </span> <span > {data.time}</span>
                        </div>
                    </div>
                    <div className="controlstyle">
                        <div>
                            <Link to='/edit-payment'><button className="edit-sty" onClick={()=>setEditPaymentDetails(data)}>Edit</button></Link>
                        </div>
                        <div>
                            <button className="cancel-sty" onClick={()=>deleteCarData(data._id)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        </div>
                })
                }
            </div>

        </div>
        </>
        :<HomePage/>
        }
        </>
    )
}