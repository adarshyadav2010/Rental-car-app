import React, { useContext } from 'react';
import '../../styles/styles.css';
import { Link } from 'react-router-dom';
import { StateContextsData } from '../../context/StateContext';

export default function UserHeader() {
    const {headerData ,setheaderData,setTravelData}=useContext(StateContextsData);
    setTravelData(headerData)

    return (
        <header id='header-user'>
            <div className='header-cls'>
                    <li>{headerData.origin}</li>
                    <li>--:</li>
                    <li>{headerData.destination}</li>
                    <li>{headerData.startDate}</li>
                    <li>-</li>
                    <li>{headerData.endDate}</li>
                {/* <div>Origin</div>
                <div>--:</div>
                <div>Destination</div>
                <div>Start Date</div>
                <div>End Date</div> */}
                
                <Link to='/user-page'><button className="save-details modify-btn" onClick={()=>setheaderData(headerData)}>Modify</button></Link>
                
            </div>
        </header>

    )
}
