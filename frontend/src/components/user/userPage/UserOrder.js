import React, { useContext, useEffect, useState } from "react";
import UserNav from "../../navbar/UserNav";
import { useNavigate } from 'react-router-dom';
import UserHeader from "./UserHeader";
import { StateContextsData } from "../../context/StateContext";
import { Link } from "react-router-dom";
import HomePage from "../../homePage/HomePage";

export default function UserOrder() {
    const TokenUser = JSON.parse(localStorage.getItem("token-user"))
    const { CarData, setCarData } = useContext(StateContextsData);
    let [data, setdata] = useState([])
    useEffect(() => {

        fetch("https://car-rent-backend.onrender.com/cars", {

            headers: {
                "authorization": JSON.parse(localStorage.getItem("token-user "))
            }
        }).then(res => res.json())
            .then(res => setdata(res));
    }, [])
    data = data.reverse()
    return (
        <>
        {TokenUser?
            <div className='admin-container'>
                <UserNav />
                <br />
                <UserHeader />
                <br />
                <div className='header-cls'>

                </div>
                <div className="user-container">
                    {data.map((cardata, i) => {
                        return <div key={i} className="car-container">
                            <div className="img-container">
                                <img src={`https://car-rent-backend.onrender.com/cars/${cardata.image}`} className="img-container" id="car-img" alt="img-car" />
                            </div>
                            <div className="card-2nd">
                                <div className="car-details1">
                                    <span>{cardata.name}</span>
                                    <span className="distance-det">{cardata.perkm} KM/RS</span>
                                </div>
                                <div className="person-nos">6 person</div>
                            </div>

                            <div className="user-date-details">
                                <span className="fare">Fare Details</span>
                                <Link to='/payment'><span onClick={() => setCarData(cardata)} className="booknow">Book Now</span></Link>
                            </div>
                        </div>
                        })
                    }
                </div>
            </div>
            : <HomePage/>
        }

        </>
    )
}
