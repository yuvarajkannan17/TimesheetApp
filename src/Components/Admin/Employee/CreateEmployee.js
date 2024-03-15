import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { addNewItem } from "./mockempdetails";
import { getEmployeeData, addEmployeeData, getLastEnteredEmployee } from "../Employee/mockempdetails";
import { useLocation } from "react-router-dom"
import NavPages from "../NavPages";
import '../../css/style.css'


export default function CreateEmployee() {

  // const url = "https://65c672e8e5b94dfca2e18c98.mockapi.io/CTPL/EmployeeList"
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    address: "",
    mobilenumber: "",
    emailid: "",
    projectid: "",
    aadharnumber: "",
    pannumber: "",
  });




  function Submit(e) {
    e.preventDefault();
    // axios.post(formValues)
    // .then(res=>{
    //   console.log(res.formValues)
    // })
  }

  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const location = useLocation()

  useEffect(() => {
    const lastEnteredEmployee = getLastEnteredEmployee();

    if (lastEnteredEmployee && location.search.includes("editMode=true")) {
      // If there is a last entered employee, set the form values for editing
      setFormValues({
        firstname: lastEnteredEmployee.firstname,
        lastname: lastEnteredEmployee.lastname,
        address: lastEnteredEmployee.address,
        mobilenumber: lastEnteredEmployee.mobilenumber,
        emailid: lastEnteredEmployee.emailid,
        projectid: lastEnteredEmployee.projectid,
        aadharnumber: lastEnteredEmployee.aadharnumber,
        pannumber: lastEnteredEmployee.pannumber,


        // Add other fields as needed
      });

      // Set edit mode to true
      setIsEditMode(true);
    }
    else {
      setFormValues({
        firstname: '',
        lastname: '',
        address: '',
        mobilenumber: '',
        emailid: '',
        projectid: '',
        aadharnumber: '',
        pannumber: '',
      });
      setIsEditMode(false)
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setNewItem({ ...newItem, [name]: value });
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

    // else{
    // alert("Form submitted successfully")
    addEmployeeData(formValues)
    setFormValues({
      firstname: '',
      lastname: '',
      address: '',
      mobilenumber: '',
      emailid: '',
      projectid: '',
      aadharnumber: '',
      pannumber: '',
    });
    setSuccessModalOpen(true)

    console.log(formValues);
  }
  // employeeData.push({ id: employeeData.length + 1, ...formValues });
  // setNewItem({ name: '', description: '' });
  // addNewItem(formValues);     
  // };



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
  const handleClose = () => { setSuccessModalOpen(false); window.location.reload() }
  const navigate = useNavigate()
  const handleSuccess = () => {
    navigate('/admin/employeeprofile')
  }

  return (
    <div className="background-clr">

      <NavPages />
      <div >
        <form onSubmit={handleSubmit}>
          <div>
            <h3> Create Profile </h3>

            <div className="container  employee-form">

              <div className="row">


                <div className="col-md-6 form-group ">
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
                  <label className="address"> Address: </label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="5"
                    cols="50"
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
              <button type="submit" className="btn-submit btn-sm" >
                Save
              </button>
              <button type="button" className="btn-cancel btn-sm" onClick={handleClose} >
                Cancel
              </button>
            </div>


          </div>
        </form>
        
        <Modal show={isSuccessModalOpen} onHide={handleClose}>
          
          <Modal.Body>Do you want to Save</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSuccess}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        


      </div>

    </div>
  );
}
