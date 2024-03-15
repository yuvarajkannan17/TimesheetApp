import './searchadmin.css'
import url from '../../Api/data'
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { successModal} from '../../features/modal';
import { Modal,Button } from 'react-bootstrap';
import successCheck from '../../Image/checked.png'
import SuperAdminNav from '../Navbar/SuperAdminNav';
function SearchAdmin() {
    // admin List
    const [adminList, setAdminList] = useState([]);
    // for search adminlist
    const [searchQuery, setSearchQuery] = useState("");

    // active row
    const [activeRow, setActiveRow] = useState(null);
    const navigate = useNavigate();
    const dispatch=useDispatch();

     // create admin success modal
     const modal = useSelector(state => state.modal.value)
     const showModal = modal.showSuccessModal;



    //   fetch the data from api
    async function getDataFromApi() {
        try {
            let response = await axios.get(url)
            const array = response.data;
            setAdminList(array);

        } catch (error) {

            console.log(error.message)
        }

    }

    useEffect(() => {

        // Otherwise, fetch and display the details of the last admin added by default
        getDataFromApi();

    }, []);

    function handleAdminClick(admin) {
        setActiveRow(admin.id);
        navigate('/superadmin/searchadmin/admindetailsview/' + admin.id)
    }


    //  search the admin details from admin list
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // searching admin based on name and id
    const filteredAdminList = adminList.filter((admin) =>
        admin.fName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.id.toString().includes(searchQuery)

    );


    return (
        <>
         <SuperAdminNav/>
            <div className='ti-background-clr'>
                <div className='ti-data-field-container row py-4'>
                    {/* admin list view and search */}
                    <div className='col '>
                        <div className=' d-flex justify-content-between  flex-wrap p-2' style={{ backgroundColor: "white" }}>
                            <p className='me-2 '>ADMIN USERS</p>
                            <div>
                                <form className='no-focus-outline'>
                                    <input className='w-75 border-0' type='search' placeholder='search admin' value={searchQuery} onChange={handleSearchChange}></input>
                                    <button className='border-0 bg-white' type='button'><i className="bi bi-search"></i></button>
                                </form>

                            </div>
                        </div>
                        <div className='sprAdmin-admin-list table-responsive'>
                            <table className='table custom-table  table-hover mt-0 '>
                                <thead className='sprAdmin-searchAdmin-table-header'>
                                    <tr className='text-center text-white'>
                                        <th scope="col">Admin Id</th>
                                        <th scope="col"> Name</th>
                                        <th scope='col'>Email</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {filteredAdminList.map((d) => (
                                        <tr key={d.id} className={`text-center adminList-column ${activeRow === d.id ? 'table-active' : ''} `} onClick={() => handleAdminClick(d)}>
                                            <td>CTPLAD00{d.id}</td>
                                            <td>{d.fName}</td>
                                            <td>{d.email}</td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>



            </div>
            <div>
                <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={showModal}  >
                    <div className="d-flex flex-column modal-success p-4 align-items-center ">
                        <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />
                        <p className="mb-4 text-center">Admin User Profile Created Successfully</p>
                        <button className="btn  w-100 text-white" onClick={() => { dispatch(successModal(false)) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
                    </div>
                </Modal>
            </div>


        </>
    )
}

export default SearchAdmin;