import { useEffect, useState } from "react";
import styles from "./lists.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const Lists = () => {
  const [todo,settodo] =useState()
  const [state, setstate] = useState([]);
  const [add,setadd] =useState()
  const [dragid,setdragid] =useState()
  const [dragtext,setdragtext] =useState()
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");






//listdat function here

  const listdata = async() => {
   const  date = new Date();
   const years = date.getTime();
    const params = {
      id:years,
    }
    window.location.reload();
   await axios.post("http://localhost:8000/tododata",params).then((res)=>{}).catch((err)=>{console.log(err)})
  
  };




// tokendelete function here
  const tokendelete = () => {
    localStorage.removeItem("token");
    console.log("dleteloguot")
      navigate("/");
  };




  //textdata function here
  const textdata = (e) => {
  
   settodo(e.target.value)
  }




  // adddata function here
  const adddata = async(event) => {
 
    const params = {
      id:event,
      text:todo
    }
    window.location.reload();
    await axios.post("http://localhost:8000/textdata",params).then((res)=>{}).catch((err)=>console.log(err))
   
  }





  // todolist  function here
  const todolist = async() => {
   await axios.get("http://localhost:8000/todolist").then((res)=>{setstate(res.data)
  console.log(res.data)
  }).catch((err)=>console.log(err))


  }




  //checkbox function here

  const checkbox = async(e,parm1) => {
    setadd(prev=>prev+1)
    const params = {
      id:e.target.value,
      _id:parm1
    }
    window.location.reload();
   await axios.post("http://localhost:8000/tododelete",params).then((res)=>{}).catch((err)=>console.log(err))
 setadd(23)
 
  }



  //  handledragstart function here

  const handleDragStart = (event, id,dragid) => {
    setdragid(dragid)
    setdragtext(event.target.innerText)
    event.dataTransfer.setData('text/plain', id);
  };








  // handledrop function here
  const handleDrop = async(event,dropid) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    console.log(id,"id1",dropid,dragid,dragtext)
    
const params ={
  id:id,
  dropid:dropid,
  dragid:dragid,
  dragtext:dragtext
}

console.log(params)

window.location.reload();
await axios.post("http://localhost:8000/dro",params).then((res)=>{}).catch((err)=>console.log(err))



   
  };





  // handledragover function here
  const handleDragOver = (event) => {
    event.preventDefault();
  };




  useEffect(() => {
 todolist()

  },[]);






  return (

      <div className={styles.list}>




        <div className={styles.welcome}>
          <h4>Welcome User</h4>
          <h4 onClick={tokendelete}>Logout</h4>
        </div>



         {/* todolist start here */}
        <div className={styles.todolist}>
      

      {/* lists  div are here */}
      {state.map((ele,i)=>(
           <div className={styles.todoapp}
           onDrop={(event)=>handleDrop(event,ele.id)}
           onDragOver={handleDragOver}>
            <h3 style={{"paddingTop":"0px","backgroundColor":"wheat","marginTop":"0px"}}>List {i+1}</h3>
            {ele.awards.map((el)=>
               <p  
               draggable
                key={el._id}
                value={el.award}
                onDragStart={(event) => handleDragStart(event,el._id ,ele.id)}
                 style={{"opacity":"0.5",textAlign:"left",color:"","backgroundColor":"aqua","borderRadius":"5px",padding:"0.5px"}}><input value={ele.id} onChange={(e) =>checkbox(e,el._id)} type="checkbox"/>{el.award}</p>
             
            )}
            
            <input  onChange={textdata}></input>
            <button key={ele.id} onClick={()=>adddata(ele.id)}>ADD</button>
          </div>
      ))}
        

          {/* create a new list are here */}
            <div className={styles.add}>
              <div style={{"backgroundColor":"wheat"}}><h3 style={{"paddingTop":"0px","marginTop":"0px"}}>Create New List</h3></div>
              
              <h3 className={styles.plus} onClick={listdata}>+</h3>
            </div>

     
        </div>
        {/* todolist end here */}




      </div>
  
  );
};
