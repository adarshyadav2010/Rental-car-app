import React, { useContext, useEffect, useState } from "react";
import UserNav from "../../navbar/UserNav";
import { StateContextsData } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import '../../styles/Payment.css';
import Map from "../../Map";

export default function EditPayment() {
    const navigate = useNavigate();
    const {CarData, EditPaymentDetails, headerData, setEditPaymentDetails } = useContext(StateContextsData);
    const [existingData, setExistingData]= useState({})
    console.log(EditPaymentDetails, 'editpayment')
    let { BookingId, date, time, image, name, Details, carDetails, type, pricing, pricekm, total, Tax, perKm, origin, destination } = EditPaymentDetails
    EditPaymentDetails.MapImg = headerData.MapImg
    date = new Date().toLocaleDateString();
    time = new Date().toLocaleTimeString();
    BookingId = new Date().getTime();
    let Distance, Subtotal;
    if (!isNaN(existingData.distance)) {
        Distance = parseInt(existingData.distance);
        pricing = parseInt(existingData.perKm)
        Subtotal = (pricing * Distance);
        Tax = parseInt((Subtotal) * 0.20);
        total = Subtotal + Tax;
    } else {
        Distance = 240
        pricing = parseInt(existingData.perKm)
        Subtotal = (pricing * Distance)
        Tax = parseInt((Subtotal) * 0.20);
        total = Subtotal + Tax;
    }
    useEffect(()=>{

        setExistingData(EditPaymentDetails)
        
       },[])
       console.log(existingData, 'existingdata')

    function editformsubmitFunc(e) {
        e.preventDefault();

        fetch(`https://car-rent-backend.onrender.com/orders/${EditPaymentDetails._id}`, {

            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(EditPaymentDetails),
        }).then(res => res.json())
            .then(data => console.log(data))

        navigate("/my-bookings")

    }
    return (
        <div className='payment-container'>
            <UserNav />
            <form onSubmit={editformsubmitFunc} id="Edit-form-payment-details">
                <div>
                    <div className='box-of-payment'>
                        <div className="contanermaginc-lum">
                            <div className="cardetail-app">
                                <div className="upper">
                                    <h3>Edit Booking Details</h3>
                                    <div className="comp">
                                        <div className="bobob">
                                            <li className='name-of-the-page-payment-of-the-car'>Car Name :  </li>
                                            <li className='name-of-the-page-payment-of-the-car'>Car Model:</li>
                                        </div>
                                        <div className="bobob">
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{existingData.name}</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{existingData.model}</li>
                                        </div>
                                        <div className="image-of-car-in-rental-payment">
                                            <img src={`https://car-rent-backend.onrender.com/cars/${existingData.image}`} alt="not availble" className='img' />
                                        </div>
                                    </div>
                                </div>
                                <div className="midddle">
                                    <div className="data">
                                        <li className='name-of-the-page-payment-of-the-car'>Origin : </li>
                                        <li className='name-of-the-page-payment-of-the-car'> Destination : </li>
                                        <li className='name-of-the-page-payment-of-the-car'>Start-Dtate : </li>
                                        <li className='name-of-the-page-payment-of-the-car'>End-Date : </li>
                                    </div>
                                    <div className="data">
                                    <input type="text" name="origin" className="edit-form-payment-details" id="origin-of-the-edit-page" onChange={(e)=>setEditPaymentDetails({...EditPaymentDetails,origin:e.target.value})} value={EditPaymentDetails.origin}/><br/>
                                    <input type="text" name="destination" className="edit-form-payment-details" onChange={(e)=>setEditPaymentDetails({...EditPaymentDetails,destination:e.target.value})} value={EditPaymentDetails.destination} /><br/>
                                    <input type="date" name="startDate" className="edit-form-payment-details" onChange={(e)=>setEditPaymentDetails({...EditPaymentDetails,startDate:e.target.value})} value={EditPaymentDetails.startDate} /><br/>
                                    <input type="date" name="endDate" className="edit-form-payment-details" onChange={(e)=>setEditPaymentDetails({...EditPaymentDetails,endDate:e.target.value})} value={EditPaymentDetails.endDate}/><br/>
                                    </div>
                                    <div className="image-of-hte-map">
                                        <Map origin={headerData.origin} destination={headerData.destination} className='mai-hoon-map' />

                                        {/* <div id="map-of-the-payment-page-we-change-that-position">
                </div> */}
                                    </div>
                                </div>
                                <div className="lower">
                                    <div className="boomking-cont-dgg">
                                        <div className="bookingId">
                                            <li className='name-of-the-page-payment-of-the-car'>Booking ID : </li>
                                            <li className='name-of-the-page-payment-of-the-car'>Booking Date : </li>
                                            <li className='name-of-the-page-payment-of-the-car'>Booking Time : </li>
                                        </div>
                                        <div className="bookingId">
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{BookingId}</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{date}</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'> {time}</li>
                                        </div>

                                    </div>
                                    <div className="cancel-button-of-page">
                                        <button className='cncl-brfd' onClick={() => navigate("/my-bookings")}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="payment">
                                <div className="payupper">
                                    <h3>Payment Details</h3>
                                    <div className='order-details'>
                                        <div className="parameter">
                                            <li className='name-of-the-page-payment-of-the-car'>price/Km</li>
                                            <li className='name-of-the-page-payment-of-the-car'>Distance</li>
                                            <li className='name-of-the-page-payment-of-the-car'>SubTotal</li>
                                            <li className='name-of-the-page-payment-of-the-car'>Tax(gst)</li>
                                        </div>
                                        <div className="data-gogog">
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{pricing}/KM</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{Distance} Km</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{Subtotal} RS</li>
                                            <li className='ans-of-the-file-payment-in-data-of-file'>{Tax} RS</li>
                                        </div>
                                    </div>
                                </div>
                                <div className="paylower">
                                    <li className='indiv-sub-class name-of-the-page-payment-of-the-car'>Grand TOTAL</li>
                                    <li className='ans-of-the-file-payment-in-data-of-file-total'>{total} RS</li>
                                </div>

                                <button className='payment-button' type="submit">proceed</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}