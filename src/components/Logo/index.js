import './logo.css'
import { Link } from "react-router-dom"

import jvcorado from './jvDark.jpeg'

export const Logo = (props)=>{
    return(
        <Link className="logo logo-admin" to='/login'>
           <img src={jvcorado} alt="jvcorado" />
        </Link>
    )
}