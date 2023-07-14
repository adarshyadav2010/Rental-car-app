import React, { useState ,} from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';
import UserLogin from './UserLogin';
import { Link } from 'react-router-dom';

import {addUser} from '../utils/ApiUtilUser'

function UserRegister() {

    const [inputdata, setInputData] = useState({
        Name: "",
        Email: "",
        Contact: "",
        Password: "",
        Confirm_Password: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputdata, [name]: value });
    }


    const [err, setErr] = useState("")
    const navigate = useNavigate();
    const onSubmitData = async (e) => {
        e.preventDefault();
        console.log(inputdata);
        const { Name, Email, Contact, Password, Confirm_Password } = inputdata;

        if (Email === "") {
            toast.error("Email is required");
        }
        else if (Name === "") {
            toast.error("Enter Valid Email !")
        }
        else if (!Email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        else if (Contact.length < 10) {
            toast.error("Enter Valid Phone number!")
        }
        else if (Password === "") {
            toast.error("Password is required")
        }
        else if (Password.length < 4) {
            toast.error("Password is too short")
        }
        else if (Password.length > 20) {
            toast.error("Password is too Long")
        }
        else if (Confirm_Password !== Password) {
            toast.error("password is not Matching")
        }
        else {
            addUser(inputdata).then(data=>{

                if(data.status==="failed"){
                    console.log(data.message)
                  setErr(data.message)
                }else if(data.status==="success"){
                    toast.success("Registered Successfully");
                    // console.log('success')
                  setErr("")
                  setInputData({
                    Name: "",
                    Email: "",
                    Contact: "",
                    Password: "",
                    Confirm_Password: ""
                  })
                //   navigate('/user/login')
                }
              });

        }

    }

    return (
        <>
            <div className="form-card" id='form type'>

                <form onSubmit={onSubmitData}>
                    <h4 className='sign-up'>Register in your Account</h4>
                    <h6 style={{ color: "red" }}>{err}</h6>
                    <input type="text" name="Name" className='input-field' onChange={handleInput} placeholder='Name' value={inputdata.Name} />

                    <input type="Email" name="Email" className='input-field' onChange={handleInput} placeholder='Email' value={inputdata.Email} />

                    <input type="tel" name="Contact" className='input-field' onChange={handleInput} placeholder='Contact' value={inputdata.Contact} />

                    <input type="Password" className='input-field' onChange={handleInput} placeholder='Password' name='Password' value={inputdata.Password} />

                    <input type="Password" className='input-field' onChange={handleInput} placeholder='Confirm Password' name='Confirm_Password' value={inputdata.Confirm_Password} />

                    <div className="login-signup">
                        <Link to='/user/login' ><span >Sign in</span></Link>
                        <button className="save-details" type='submit'>Register</button>
                        
                    </div>
                </form>
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    theme="dark"
                />
            </div>
        </>
    )
}

export default UserRegister;
