import { Link } from "react-router-dom"

import jvcorado from './foto-jv.jpeg'

export const Logo = (props) => {
    return (
        <Link className="w-[80px] h-[80px] object-cover overflow-y-hidden rounded-xl bg-transparent " to='/login'>
            <img src={jvcorado} alt="jvcorado" />
        </Link>
    )
}