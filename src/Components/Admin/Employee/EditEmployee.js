import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getEmployeeData, addEmployeeData  } from "./mockempdetails";
import { useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import '../../css/style.css'
import successCheck from '../../Image/checked.png'


export default function EditEmployee() {
  // const [formValues, setFormValues] = useState({
  //   firstname: "",
  //   lastname: "",
  //   address: "",
  //   mobilenumber: "",
  //   emailid: "",
  //   projectid: "",
  //   aadharnumber: "",
  //   pannumber: "",
  // });

  const { id } = useParams(); // Get the employee id from the route parameters
 
  const navigate = useNavigate();
  const employeeData = getEmployeeData()   
const userData = employeeData.find((employee) => employee.id === parseInt(id, 10));
const [formValues, setFormValues] = useState(userData || {});

  const [formErrors, setFormErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [SuccessConfirmation, setSuccessConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate(formValues);
    if (Object.keys(validationError).length > 0) {
      setFormErrors(validationError);
      return;
    }
    else  {
      // Handle update logic
      // You can update the employee data in the mock data or any other data store
      // For now, let's just log the updated values
      addEmployeeData(formValues);
      setSuccessModalOpen(true)
      console.log("Updated employee data:", formValues);
    }
    
    
  };

  const validate = (values) => {

    const errors = {};
   
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    } else if (values.firstname > 50) {
      errors.firstname = "Firstname cannot exceed more than 50 characters";
    }

    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    } else if (values.lastname > 50) {
      errors.lastname = "Lastname cannot exceed more than 50 characters";
    }

    if (!values.address) {
      errors.address = "Address is required!";
    } else if (values.address > 100) {
      errors.address = "Address cannot exceed more than 100 characters";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "Mobile Number is required!";
    } else if (values.mobilenumber < 10) {
      errors.mobilenumber = "Mobile Number should be 10 characters";
    }

    if (!values.emailid) {
      errors.emailid = "Email Id is required!";
    } else if (!isValidEmail(values.emailid)) {
      errors.emailid = "This is not a valid email format";
    }

    if (!values.projectid) {
      errors.projectid = "Project Id is required!";
    } else if (!isValidProject(values.projectid)) {
      errors.projectid = "This is not a valid Project Id";
    }

    if (!values.aadharnumber) {
      errors.aadharnumber = "Aadhar Number is required!";
    } else if (values.aadharnumber < 12) {
      errors.aadharnumber =
        "Aadhar Number should be  12 characters";
    }

    if (!values.pannumber) {
      errors.pannumber = "Pan Number is required!";
    } else if (!isValidPan(values.pannumber)) {
      errors.pannumber = "This is not a valid Pan Number";
    }


    return errors;
    
  };
  const isValidEmail = (email) => {
    // Basic email validation (you may want to use a library or a more complex regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPan = (pan) => {
    // Basic email validation (you may want to use a library or a more complex regex)
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    return panRegex.test(pan);
  };
  const isValidProject = (project) => {
    // Basic email validation (you may want to use a library or a more complex regex)
    const projectRegex = /^CTPL\d{5}$/;
    return projectRegex.test(project);
  };

  
  // const handleModel = () => setSuccessModalOpen(true);
  // const navigate = useNavigate()
  const handleClose = () => {setSuccessModalOpen(false); window.location.reload()}
  const handleConfirmClose = () => {setCancelModalOpen(true); }
  const handleCancelSuccess = () => {setCancelModalOpen(false); 
    navigate('admin/searchemployees')}
     
    const handleSubmitClick = () => {
      setSuccessConfirmation(true)
      // navigate('/admin/searchemployee')
    }

    const ConfirmClose = () => {
      setSuccessConfirmation(false)
      navigate('/admin/searchemployee')

    }
    const handleSuccess=()=>{
      // Swal.fire('Success!', 'Employee Details Updated Successfully,', 'success')
      navigate('/admin/searchemployee')
    }
    



  return (
    <div className="background-clr">
      <form onSubmit={handleSubmit}>
      <div>
        <h3> Edit Employee Details </h3>

        <div className="container employee-form">
          
            <div className="row">
              
              
              <div className="col-md-6 form-group">
                <label className="label"> Firstname: </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  value={formValues.firstname}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.firstname} </p>
              </div>
              <div className="col-md-6 form-group">
                <label className="label"> Lastname: </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  value={formValues.lastname}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.lastname} </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="label"> Address: </label>
                <textarea                 
                  name="address"
                  className="form-control"
                  value={formValues.address}
                  onChange={handleChange}
               ></textarea>
                <p className="text-danger"> {formErrors.address} </p>
              </div>
              <div className="col-md-6 form-group">
                <label className="label"> Mobile Number: </label>
                <input
                  type="text"
                  name="mobilenumber"
                  className="form-control"
                  minLength={10}
                  maxLength={10}
                  value={formValues.mobilenumber}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.mobilenumber} </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="label"> Email Id: </label>
                <input
                  type="text"
                  name="emailid"
                  className="form-control"
                  value={formValues.emailid}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.emailid} </p>
              </div>
              <div className="col-md-6 form-group">
                <label className="label"> Employee Id: </label>
                <input
                  disabled="disabled"
                  type="text"
                  name="employeeid"
                  className="form-control"
                  value={formValues.employeeid}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.employeeid} </p>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="label"> Project Id: </label>
                  <input
                    type="text"
                    name="projectid"
                    className="form-control"
                    value={formValues.projectid}
                    onChange={handleChange}
                  />
                  <p className="text-danger"> {formErrors.projectid} </p>
                </div>
                <div className="col-md-6 form-group">
                  Aadhar Number:
                  <input
                    type="text"
                    name="aadharnumber"
                    className="form-control"
                    minLength={12}
                    maxLength={12}
                    value={formValues.aadharnumber}
                    onChange={handleChange}
                  />
                  <p className="text-danger"> {formErrors.aadharnumber} </p>
                  <div className="form-group">
                    <label className="label"> Aadhar Card  </label>
                    <input type="file" name="aadharcard" className="form-control-file1" />
                  </div>
                  Pan Number:
                  <input
                    type="text"
                    name="pannumber"
                    className="form-control"
                    maxLength={10}
                    value={formValues.pannumber}
                    onChange={handleChange}
                  />
                  <p className="text-danger"> {formErrors.pannumber} </p>
                  <div className="form-group">
                    <label className="label"> Pan Card  </label>
                    <input type="file" name="pancard" className="form-control-file2" />
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            <div className="buttons">              
              <button type="submit" className="btn-submit btn-sm" onClick={handleSubmitClick}>                
                Submit
              </button>
              <button type="button" className="btn-cancel btn-sm" onClick={handleConfirmClose}>                
                Cancel
              </button>
            </div>
          
      
      </div>
      </form>

      {/* <Modal show={isSuccessModalOpen} onHide={handleClose}>        
        <Modal.Body>Do you want to Submit</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSuccess}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={isCancelModalOpen} onHide={handleConfirmClose}>        
        <Modal.Body>Would you like to discard the changes</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCancelSuccess}>
            Yes 
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered size='sm' show={SuccessConfirmation} onHide={handleConfirmClose}>          
        <Modal.Body>
          <div className="d-flex flex-column modal-success p-4 align-items-center ">
            <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />                        
            <p className="mb-4 text-center">Employee Profile Updated Successfully</p>
            <button className="btn  w-100 text-white" onClick =  {ConfirmClose} style={{ backgroundColor: '#5EAC24' }}>Close</button>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}
