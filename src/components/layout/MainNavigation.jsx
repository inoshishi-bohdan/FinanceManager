import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../store/authentication-context';
import OffCanvas from './OffCanvas';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../ui/NavigationButton';

function MainNavigation() {
   const { isAuthenticated, changeIsAuthenticated } = useContext(AuthContext)
   const navigate = useNavigate();

   function handleLogout() {
      changeIsAuthenticated(false);
   }

   return (
      <nav className={`navbar navbar-expand-lg fixed-top ${classes['custom-navbar']}`}>
         <div className={`container-fluid justify-content-center justify-content-sm-between ${classes['custom-container-fluid']}`}>
            <NavLink className={`navbar-brand ${classes['custom-navbar-brand']}`} to='/' end>
               <img src={logo} alt="Logo" width="50" height="50" />
               Finance Manager
            </NavLink>
            <OffCanvas />
            <div className='d-flex align-items-center justify-content-center'>
               {!isAuthenticated && <NavigationButton
                  primary
                  onClick={() => navigate('/login')}
               >Login</NavigationButton>}
               {!isAuthenticated && <NavigationButton
                  style={{ marginLeft: '8px' }}
                  onClick={() => navigate('/register')}
               >Sign Up</NavigationButton>}
               {isAuthenticated && <NavigationButton
                  onClick={handleLogout}
               >Logout</NavigationButton>}
               {isAuthenticated && <button className={`navbar-toggler ${classes['custom-toggler']} pe-0`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>}
            </div>
         </div>
      </nav >);
}

export default MainNavigation;