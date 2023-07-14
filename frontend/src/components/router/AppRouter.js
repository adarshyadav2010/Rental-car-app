import React from "react";
import { BrowserRouter, Routes,Route, Switch, Link, Outlet } from 'react-router-dom';
import HomePage from "../homePage/HomePage";
import AdminRegister from "../admin/AdminRegister";
import AdminLogin from "../admin/AdminLogin";
import UserRegister from "../user/UserRegister";
import UserLogin from "../user/UserLogin";
import HomeCard from "../homePage/HomeCard";
import AdminPage from "../admin/adminPage/AdminPage";
import UserPage from "../user/userPage/UserPage";
import UserOrder from "../user/userPage/UserOrder";
import AddCar from "../admin/adminPage/AddCar";
import EditCar from "../admin/adminPage/EditCar";
import Payment from "../user/payment/Payment";
import UserBookings from "../user/userPage/UserBookings";
import EditPayment from "../user/payment/EditPayment";


export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route path="/" element={<HomeCard/>}/>
            {/* <Outlet /> */}
            </Route>
            <Route path="user" element={<HomePage/>}>
                <Route path="login" element={<UserLogin />} />
                <Route path="register" element={<UserRegister />} />
            </Route>
            <Route path="admin" element={<HomePage/>}>
                <Route path="login" element={<AdminLogin/>} />
                <Route path="register" element={<AdminRegister/>} />
            </Route>
            <Route path='/admin-page' element={<AdminPage/>}/>
            <Route path="user-page" element={<UserPage/>}/>
            <Route path='/orderpage' element={<UserOrder/>}/>
            <Route path='/add-car-details' element={<AddCar/>}/>
            <Route path='/edit-car-details' element={<EditCar/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path="/my-bookings" element={<UserBookings/>}/>
            <Route path="/edit-payment" element={<EditPayment/>}/>
        </Routes>
        

    </BrowserRouter>
}