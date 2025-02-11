import logo from '../assets/logo.png';
import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/authentication-context';
export default function OffCanvas() {
   const { isAuthenticated } = useContext(AuthContext)

   return (
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
         <div className="offcanvas-header">
            <h5 className="offcanvas-title d-flex align-items-center" id="offcanvasNavbarLabel">
               <img src={logo} alt="Logo" width="40" height="40" />
               Finance Manager
            </h5>
            <button type="button" className={`btn-close ${classes['custom-btn-close']}`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
         <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1">
               <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink className={({ isActive }) => `nav-link mx-lg-2 ${classes['custom-nav-link']} ${isActive ? classes['active'] : ''}`} to='/' end>Home</NavLink>
               </li>
               {isAuthenticated && <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink className={({ isActive }) => `nav-link mx-lg-2 ${classes['custom-nav-link']} ${isActive ? classes['active'] : ''}`} to='/incomes'>Incomes</NavLink>
               </li>}
               {isAuthenticated && <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink className={({ isActive }) => `nav-link mx-lg-2 ${classes['custom-nav-link']} ${isActive ? classes['active'] : ''}`} to='/expenses'>Expenses</NavLink>
               </li>}
               {isAuthenticated && <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink className={({ isActive }) => `nav-link mx-lg-2 ${classes['custom-nav-link']} ${isActive ? classes['active'] : ''}`} to='/statistics'>Statistics</NavLink>
               </li>}
            </ul>
         </div>
      </div>
   );
}