
import {Routes,Route} from "react-router-dom"
import { Login } from "../Components/login"
import { Lists } from "../Components/lists"

export const Router = () => {



return(
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/lists" element={<Lists/>}/>
    </Routes>
)


}