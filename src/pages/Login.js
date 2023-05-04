import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {userSignUp, userSignIn} from "../api/auth";

function Login(){

    const [showSignup, setShowSignUp] = useState(true);
    
    const [userId, setUserId]= useState("");
    const [password, setPassword]= useState("");
    const [userName, setUserName]= useState("");
    const [userEmail, setUserEmail]= useState("");
    const [userType, setUserType]= useState("CUSTOMER");
    const [message, setMessage] = useState("");
    const [error,setError]=useState(false);


    const toggleSignup = ()=>{
        clearState();
        setShowSignUp(!showSignup);
    }

    const clearState = ()=>{

        setUserId("");
        setPassword("");
        setUserName("");
        setUserEmail("");
        setError(false);
        setMessage("");

    }

    const onSignUp=(e)=>{

        const data = {
            name:userName,
            userId:userId,
            email:userEmail,
            userType:userType,
            password:password
        };

        e.preventDefault();

        if(userId.length < 5){
            setError(true);
            setMessage("UserId should be of 5 to 10 characters");
            return;
        }
        else if(password.length < 5 || password.length > 12){
            setError(true);
            setMessage("Password should of 5 to 12 characters");
            return;
        };


        //API call

        userSignUp(data)
        .then(res=>{
            console.log(res);
            setError(false);
            setMessage("SignUp successful");
        })
        .catch((err)=>{
            if(err.response.status===400){
                setError(true);
                setMessage(err.response.data.message);
            }
        })

    }

    const onLogin=(e)=>{

        const data = {userId,password};
        e.preventDefault();

        userSignIn(data)
        .then(res => {
            console.log(res);
            setError(false);
            setMessage("Login Successful");
        })
        .catch((err)=>{
            if(err.response.status){
                setError(true);
                setMessage(err.response.data.message);
            }
        })

    }

    const updateSignUpData = (e)=>{

        const id = e.target.id;

        if(id==="userId"){
            setUserId(e.target.value);
        }
        else if(id==="password"){
            setPassword(e.target.value);
        }
        else if(id==="email"){
            setUserEmail(e.target.value);
        }
        else{
            setUserName(e.target.value)
        }
        
        

    }

    return <div className="bg-info d-flex justify-content-center align-items-center vh-100" >

        <div style={{width:30 + "rem"}} className="card p-3 rounded-4 shadow-lg">

            <h4 className="text-info"> { showSignup ? "Sign Up" : "Log In" } </h4>

            <form onSubmit={ showSignup ? onSignUp : onLogin } >

                <div className="input-group">
                    <input className="form-control m-1" type="text" value={userId} id="userId" onChange={updateSignUpData} placeholder="UserId" />
                </div>
                
                {

                    showSignup && 
                    
                    <>
                <div className="input-group">
                    <input className="form-control m-1" type="text" value={userName} id="userName" onChange={updateSignUpData} placeholder="Username" />
                </div>

                <div className="input-group">
                    <input className="form-control m-1"  value={userEmail} id="email"  onChange={updateSignUpData} type="email" placeholder="Email" />
                </div>
                </>
            
            }


<div className="input-group">
              <input className="form-control m-1" value={password}  id="password" onChange={updateSignUpData} type="password" placeholder="Password"/>
               </div>

              {
                showSignup && 
               <DropdownButton
                title={userType}
                id="userType"
                variant="light"
                align="end"
                >

                    <Dropdown.Item eventKey="CUSTOMER" > CUSTOMER </Dropdown.Item>
                    <Dropdown.Item eventKey="ENGINEER" > ENGINEER </Dropdown.Item>

                </DropdownButton>

              }
                
                <div className="input-group">
                    <input className="btn btn-info form-control text-white m-1 cursor-pointer" type="submit" 
                    value= {showSignup ? "Sign Up" : "Log In" } />
                </div>


                <div className="text-info m-1" onClick={toggleSignup} >
                    {
                        showSignup ? "Already have an account ? LogIn"
                        : "Don't have an account ? Sign Up"
                    }
                </div>

                <div className={error ? "text-danger" :  "text-success"} > {message}  </div>

                
            </form>
        </div>

    </div>

}

export default Login;