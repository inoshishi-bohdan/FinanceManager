import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import logo from '../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../store/authentication-context';
import OffCanvas from './OffCanvas';

function MainNavigation() {
   const {isAuthenticated, changeIsAuthenticated} = useContext(AuthContext)

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
               {!isAuthenticated && <NavLink className={classes['login-button']} to='/login'>Login</NavLink>}
               {!isAuthenticated && <NavLink className={classes['register-button']} to='/register'>Sign Up</NavLink>}
               {isAuthenticated && <button onClick={handleLogout} type='button' className={classes['logout-button']}>Logout</button>}
               {isAuthenticated && <button className={`navbar-toggler ${classes['custom-toggler']} pe-0`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>}
            </div>
         </div>
      </nav >);
}

export default MainNavigation;