import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
function SuperAdminNav() {

    return (
        <>

            {/*  superadmin navigation to create admin and search admin */}
            <div className="superadmin-navigation">
                <Container >
                    <div>
                        <ul className='nav d-flex justify-content-end'>
                            <li className='nav-item'>
                                <NavLink to={'/superadmin/createadmin'} className='nav-link superadmin-navigation-link' activeclassname='active'>Create Admin User</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to={'/superadmin/searchadmin'} className='nav-link superadmin-navigation-link' activeclassname='active'>Search Admin User</NavLink>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>

        </>
    )

}

export default SuperAdminNav;