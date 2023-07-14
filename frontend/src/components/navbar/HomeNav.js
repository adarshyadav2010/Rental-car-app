import React from 'react';
import '../styles/styles.css';
import applogo from '../images/logo-car-rent.jpg';

export default function HomeNav(){
    return (
        <header>
            <nav id='page-nav'>
                <div className='nav-item'>
                    <img className='logo-img' src={applogo} type='jpg' alt='app-logo'/>
                </div>
            </nav>
        </header>
        
    )
}