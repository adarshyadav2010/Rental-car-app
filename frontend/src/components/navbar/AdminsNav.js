import React from 'react';
import '../styles/styles.css';
import applogo from '../images/logo-car-rent.jpg';
import { Link } from 'react-router-dom';

export default function AdminNav(){
    return (
        <header>
            <nav id='admin-nav'>
                <div className='admin-img'>
                    <img className='logo-img' src={applogo} type='jpg' alt='app-logo'/>
                </div>
                <div className='admin-logout'>
                    <Link to='/'><button className='log-out' onClick={()=>localStorage.clear()}> LogOut</button></Link>
                </div>
            </nav>
        </header>
        
    )
}