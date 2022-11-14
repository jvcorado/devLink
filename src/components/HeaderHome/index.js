import './header.css';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConection';
import { signOut } from 'firebase/auth';

export const HeaderHome = ()=>{
    

    return(
        <header className="header">
           <nav className='nav-header'>
            <Link to="/">
                Home
            </Link>
           </nav>
        </header>
    )
}