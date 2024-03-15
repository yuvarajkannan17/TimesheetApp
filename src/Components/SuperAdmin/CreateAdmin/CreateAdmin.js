
import { useFormik } from "formik";
import './CreateAdmin.css'
import { basicSchema } from './ValidationSchema'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import url from '../../Api/data'
import { useSelector } from 'react-redux';
import { successModal, failureModal, deleteSuccessModal } from '../../features/modal';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import failedCheck from '../../Image/failed.png'
import successCheck from '../../Image/checked.png'
import SuperAdminNav from "../Navbar/SuperAdminNav";
function CreateAdmin() {

    // for navigation 
    let navigate = useNavigate();
    const [adminDatas, setAdminDatas] = useState(null);
    const [userAlreadyExit, setUserAlreadyExit] = useState('');
    const [createAdminError, setCreateAdminError] = useState('');
    // redux state 
    const modal = useSelector(state => state.modal.value)
    const showFailureModal = modal.failureModal;
    const deleteSuccessModalValue = modal.deleteSuccessModalValue;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await axios.get(url);
                // Handle the response here if needed
                setAdminDatas(response.data);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromApi();
    }, []);
    // formik for form value

    const { values, isSubmitting, handleChange, handleBlur, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: {
            fName: "",
            lName: "",
            address: "",
            phone: "",
            email: "",
            aadhar: "",
            pan: "",
            employeeAccess: {
                create: false,
                edit: false,
                delete: false
            },

            projectAccess: {
                create: false,
                edit: false,
                delete: false
            }

        },
        validationSchema: basicSchema,
        onSubmit
    })

    // function for api call after form submission

    async function onSubmit(values, actions) {

        try {
            // checking the email is already exit
            const exitingAdmin = adminDatas.find((data) => data.email === values.email);

            if (exitingAdmin) {
                setUserAlreadyExit('This user email already exit');
            } else {

                // Make the API call and wait for the response
                await axios.post(url, values);
                // If the API call is successful, proceed with the following actions
                dispatch(successModal(true));
                actions.resetForm();
                navigate('/superadmin/searchadmin');
            }



        } catch (error) {

            // Handle errors here
            setCreateAdminError(error.message);
            dispatch(failureModal(true));


        }
    }

    //    reset function for form field
    const handleCancel = () => {
        resetForm();
    };



    return (
        <>
         <SuperAdminNav/>
            <div className="ti-background-clr">
                <div className="sprAdmin-createAdmin">
                    <p className="sprAdmin-createAdmin-title ">Create Profile</p>
                    <form onSubmit={handleSubmit}>
                        <div className="sprAdmin-createAdmin-body border border-1 border-dark rounded p-4">
                            {/* create admin user form */}
                            <div className="row sprAdmin-createAdmin-form" >
                                {/* col-5 under the row */}
                                <div className="col-md-5" >

                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name<span style={{color:'red'}}>*</span> </label>
                                        <input type="text" maxLength={50} className={`form-control  ${errors.fName && touched.fName ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="fName" id="firstName" onChange={handleChange} onBlur={handleBlur} value={values.fName} ></input>
                                        {errors.fName && touched.fName && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.fName}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name<span style={{color:'red'}}>*</span> </label>
                                        <input type="text" maxLength={50} className={`form-control  ${errors.lName && touched.lName ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="lName" id="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lName} ></input>
                                        {errors.lName && touched.lName && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.lName}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address<span style={{color:'red'}}>*</span>  </label>
                                        <textarea maxLength={100} className={`form-control sprAdmin-createAdmin-address  ${errors.address && touched.address ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="address" id="address" onChange={handleChange} onBlur={handleBlur} value={values.address}></textarea>
                                        {errors.address && touched.address && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.address}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Id<span style={{color:'red'}}>*</span>  </label>
                                        <input type="email" maxLength={100} className={`form-control  ${errors.email && touched.email ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="email" id="email" onChange={handleChange} onBlur={handleBlur} value={values.email} ></input>
                                        {errors.email && touched.email && <p className="error-message small mt-1">{errors.email}</p>}
                                        {userAlreadyExit && <p className="sprAdmin-createAdmin-error-message small mt-1">{userAlreadyExit}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone Number<span style={{color:'red'}}>*</span> </label>
                                        <input type="text" maxLength={10} className={`form-control  ${errors.phone && touched.phone ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="phone" id="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone} ></input>
                                        {errors.phone && touched.phone && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                                {/* Skip the next 1 columns */}
                                <div className="col-1 offset-1">
                                    {/* This column is offset by 1 columns  */}
                                </div>
                                {/* col-5 under the row */}
                                <div className="col-md-5" >
                                    <div className="mb-3">
                                        <label htmlFor="aadharNumber" className="form-label">Aadhar Number<span style={{color:'red'}}>*</span> </label>
                                        <input type="text" maxLength={12} className={`form-control  ${errors.aadhar && touched.aadhar ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="aadhar" id="aadharNumber" onChange={handleChange} onBlur={handleBlur} value={values.aadhar} ></input>
                                        {errors.aadhar && touched.aadhar && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.aadhar}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="panNumber" className="form-label">Pan Number<span style={{color:'red'}}>*</span> </label>
                                        <input type="text" maxLength={10} className={`form-control  ${errors.pan && touched.pan ? "sprAdmin-createAdmin-input-br-error" : ""}`} name="pan" id="panNumber" onChange={handleChange} onBlur={handleBlur} value={values.pan} ></input>
                                        {errors.pan && touched.pan && <p className="sprAdmin-createAdmin-error-message small mt-1">{errors.pan}</p>}
                                    </div>
                                    {/* checkboxes */}
                                    <div className="form-group">
                                        {/* checkbox for employee access */}
                                        <div>

                                            <label htmlFor="checkBoxGroupTitle d-block" >Access Permission for Employee details </label>
                                            <div className="form-check ">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-create" name="employeeAccess.create" type="checkbox" id="empcreate" checked={values.employeeAccess.create} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="empcreate">Create</label>

                                            </div>
                                            <div className="form-check ">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-edit" name="employeeAccess.edit" type="checkbox" id="empedit" checked={values.employeeAccess.edit} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="empedit">Edit</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-delete" name="employeeAccess.delete" type="checkbox" id="empdelete" checked={values.employeeAccess.delete} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="empdelete">Delete</label>
                                            </div>

                                        </div>
                                        {/* checkbox for project access */}
                                        <div className="mt-4">

                                            <label htmlFor="checkBoxGroupTitle d-block">Access Permission for Project details </label>
                                            <div className="form-check ">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-create" name="projectAccess.create" type="checkbox" id="pjcreate" checked={values.projectAccess.create} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="pjcreate">Create</label>
                                            </div>
                                            <div className="form-check ">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-edit" name="projectAccess.edit" type="checkbox" id="pjedit" checked={values.projectAccess.edit} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="pjedit">Edit</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input sprAdmin-createAdmin-checkbox-delete" name="projectAccess.delete" type="checkbox" id="pjdelete" checked={values.projectAccess.delete} onBlur={handleBlur} onChange={handleChange}></input>
                                                <label className="form-check-label" htmlFor="pjdelete">Delete</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* buttons for save & reset form */}
                        <div className="ti-common-buttons d-flex flex-wrap justify-content-end my-3 mx-5">
                            <button type="submit" disabled={isSubmitting} className="btn btn-success ">Save</button>
                            <button type="button" className="btn btn-info" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>

                </div>
                {/* modal for form submission failed */}
                <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={showFailureModal}  >
                    <div className="d-flex flex-column modal-success p-4 align-items-center ">
                        <img src={failedCheck} className="img-fluid mb-4" alt="failedCheck" />
                        <p className="mb-4 text-center">{createAdminError}</p>
                        <button className="btn  w-100 text-white" onClick={() => { dispatch(failureModal(false)) }} style={{ backgroundColor: '#F44336' }}>Close</button>
                    </div>
                </Modal>

                {/* admin delete success modal */}
                <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={deleteSuccessModalValue}  >
                    <div className="d-flex flex-column modal-success p-4 align-items-center ">
                        <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />                         <p className="mb-4 text-center">Admin User Profile Deleted Successfully</p>
                        <button className="btn  w-100 text-white" onClick={() => { dispatch(deleteSuccessModal(false)) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
                    </div>
                </Modal>
            </div>


        </>
    )
}


export default CreateAdmin;