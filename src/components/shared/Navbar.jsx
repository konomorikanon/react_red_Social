import  react from 'react';

import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import ProfileMenu from './profileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { historyTrueAction } from '../../actions/publicaciones';
import { resetValuesNotify } from '../../actions/notification';

const Navbar = () => {
  const {cargarPrimeraVezHistory} = useSelector(state => state.publicaciones)
  const {countNotificationNews} = useSelector(state => state.notification)

    const dispatch = useDispatch();

    const handleClickProfile = () => {
        if(!cargarPrimeraVezHistory){
            dispatch(historyTrueAction())

        }
       

    }
    const handleClickNofity = () => {
        dispatch(resetValuesNotify()) 

    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <div className="d-flex navbar_menu align-items-center">
                        <Link className="navbar-brand" to="">RedApp</Link>
                    
                        <div className="navbar_icons-menu ">
                            <Link 
                                className="navbar-link " 
                                to="/profile"
                                onClick={handleClickProfile}    
                            >
                                <i className="fa-solid fa-user text-dark"></i>
                            </Link>
                            <Link className="navbar-link " to="/friends">
                                <i className="fa-solid fa-users text-dark"></i>
                            </Link>
                            <Link className="navbar-link navbar_notificaciones" 
                                to="/notificaciones"
                                onClick={handleClickNofity}
                                >
                                <i className="fa-solid fa-bell text-dark"></i>

                                {(countNotificationNews > 0) && <p id="navbar_number_notificacion">{countNotificationNews}</p>

                                 }

                            </Link>
                            
                        </div>
                        <div className="navbar_imgNav">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    <img src="assets/user.png" alt="" />
                                    
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <ProfileMenu/>
                               </Dropdown.Menu>
                               
                            </Dropdown>

                        </div>

                    </div>
                
            

                </div>
                
            </nav>
        
        </>

    )
}

export default Navbar;
