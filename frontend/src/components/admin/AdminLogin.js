import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminLogin() {

    const navigate = useNavigate();

    const [inputdata, setInputData] = useState({
        Email: "",
        Password: ""
    });
    const [error, setError] = useState("")
    const handleEmailChange = (e) => {
        setError("")
        setInputData({ ...inputdata, Email: e.target.value });
    }

    const handlePasswordChange = (e) => {
        setError("")
        setInputData({ ...inputdata, Password: e.target.value });
    }
    


    const onSubmitData = async (e) => {
        e.preventDefault();
        // console.log(inputdata);
        const { Email, Password } = inputdata;


        if (Email === "") {
            toast.error("Email is required");
        }
        else if (!Email.includes("@")) {
            toast.error("Enter Valid Email !")
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
        else {
            fetch("https://car-rent-backend.onrender.com/admin/login" ,{

            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(inputdata)
          }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.status==="Login successful"){
              localStorage.setItem("token-admin" , JSON.stringify(res.token));
              localStorage.setItem("Admin-name" , JSON.stringify(res.Name));
              localStorage.setItem("Admin-Id" , JSON.stringify(res.adminId))
              navigate("/admin-page")
            }else if(res.status==="failed"){
                setError(res.message)
            }
          })
        }
    }

    return (
        <>
            <div className="form-card" id='form' >
                <form action="post" onSubmit={onSubmitData}>
                    <h4 className='sign-up'>Admin Login</h4><br></br>
                    <h6 style={{ color: "red" }}>{error}</h6>
                    <input type="Email" name="Email" onChange={handleEmailChange} placeholder='Email' className='input-field' />

                    <input type="Password" onChange={handlePasswordChange} placeholder='Password' className='input-field' />

                    <div className="login-signup">
                        <Link to='/admin/register' ><span >Create Account</span></Link>
                        <button type='submit'className="save-details">Sign In</button>
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
                    theme="light"
                />
            </div>
        </>
    )
}


export default AdminLogin