// import React from "react";
// import '../../styles/bookings.css';
// import { StateContextsData } from "../../context/StateContext";
// import Map from "../../Map";

// export default function Bookings() {
//     const { travelData} = StateContextsData;
//     console.log(travelData)

//     return (
//         <div className="booking-container">
//             <div className="each-books">
//                 <div className="booked-car">
//                     <img src={`https://car-rent-backend.onrender.com/cars/817b84f9b570ce2ef4d65d892f62f22d`} alt="car-img" className="img-car" />
//                     <div className="car-details">
//                         <p className="gap">Tata Nano</p>
//                         <p className="gap">Car Model</p>
//                         <p >car details</p>
//                     </div>
//                     <div className="travel-details">
//                         <div className="traveldata">
//                             <div className="details">
//                                 <div>
//                                     <span >Origin : </span> <span > start place</span>
//                                 </div>
//                                 <div>
//                                     <span > Destination: </span> <span > reached place</span>
//                                 </div>
//                                 <div>
//                                     <span >Start-Date: </span> <span > start time</span>
//                                 </div>
//                                 <div>
//                                     <span >End-Date : </span> <span > returning time</span>
//                                 </div>
//                             </div>
//                             <div className="map-img">
//                                 <Map origin={'india'} destination={'bangladesh'} className='mai-hoon-map' id="mapsdes" />
//                             </div>

//                         </div>
//                     </div>
//                     <div className="details1">
//                         <div>
//                             <span >Booking ID : </span> <span > start place</span>
//                         </div>
//                         <div>
//                             <span > Booking Date: </span> <span > reached place</span>
//                         </div>
//                         <div>
//                             <span >Booking Time: </span> <span > start time</span>
//                         </div>
//                     </div>
//                     <div className="controlstyle">
//                         <div>
//                             <button className="edit-sty">Edit</button>
//                         </div>
//                         <div>
//                             <button className="cancel-sty">Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }