import React, { useContext, useState } from "react";
import UserNav from "../../navbar/UserNav";
import { useNavigate } from 'react-router-dom';
import { StateContextsData } from "../../context/StateContext";
import HomePage from "../../homePage/HomePage";

export default function UserPage() {
    const navigate = useNavigate();
    const TokenUser = JSON.parse(localStorage.getItem("token-user"))
    
    const { traveldata, setTravelData, setheaderData } = useContext(StateContextsData);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTravelData({ ...traveldata, [name]: value })
    }

    const save = (e) => {
        e.preventDefault();
        // console.log(traveldata)
        const {origin,destination,startDate,endDate}=traveldata;
        const data = new FormData();
        data.append("origin", origin);
        data.append("destination", destination)
        data.append("startDate", startDate)
        data.append("endDate", endDate)
        navigate('/orderpage')
    }

    setheaderData(traveldata);

    return (
        <>
            {TokenUser ?
                <div className='home-container'>
                    <UserNav />
                    <div className="page-design">
                        <div className="user-card-div">
                            <div>
                                <h3 className="quote-style">
                                    Cart A Car for rent here! <br />
                                    Bag the trip of Moments && Memories Yaayy (^ _ *)
                                </h3>
                                <form id="forms" onSubmit={save}>
                                    <input type="text" className="input-field" placeholder="Origin Name" required name="origin" onChange={handleInput} value={traveldata.origin}/>

                                    <input type="text" className="input-field" placeholder="Destination Name" required name="destination" onChange={handleInput} value={traveldata.destination}/>

                                    <label for="start-date">Start Date:</label>

                                    <input id="start-date" type="date" className="input-field1" placeholder='Starting Date' required name="startDate" onChange={handleInput} value={traveldata.startDate}/>

                                    <label for="return-date">Return Date:</label>

                                    <input id='return-date' type="date" className="input-field1" placeholder="Return Date" required name="endDate" onChange={handleInput} value={traveldata.endDate}/>
                                    <div className="check-pos">
                                        <button className="save-details check-btn">Check</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                : <HomePage/>
            }     
        
        </>
    )
}

