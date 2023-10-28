import {useEffect, useState} from "react"
import axios from "axios"
import styles from "./lists.module.css";
import { useNavigate } from "react-router-dom";
const Userdetail = {
    email:"",
    password:""
}

export const Login = () => {

    const [login,setlogin] =useState(Userdetail)

    const navigate = useNavigate();

 

    const logindata =(e) => {
        const {name,value} =e.target

        console.log(name,value)

        setlogin({ ...login, [name]: value });

    }

    

const Userdata = async() =>{

    navigate("/lists")
 await axios.post("http://localhost:8000/login",login).then((res)=>{

localStorage.setItem('token', JSON.stringify(res.data));
}).catch((err)=>console.log(err))



}


useEffect(()=>{
    const usertoken=  localStorage.getItem('token');
   
   
})

return(
    <div className={styles.login}>
    <div  >
        <h1>Login</h1>
        <input onChange={logindata} placeholder="Email" name="email" ></input>
        <br></br>
        <input onChange={logindata} placeholder="Password" name="password"></input>
        <br></br>
        <button onClick={Userdata}>Login</button>
  
    </div>
    </div>
)


}