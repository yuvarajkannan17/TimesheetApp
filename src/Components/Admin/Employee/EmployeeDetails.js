import React, { useState, useEffect } from 'react'
import  { getEmployeeData, addEmployeeData, deleteEmployeeData } from './mockempdetails';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/style.css'
import successCheck from '../../Image/checked.png'




export default function EmployeeDetails() {

  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [SuccessConfirmation, setSuccessConfirmation] = useState(false);


  const { id } = useParams(); // Get the employee id from the route parameters
 
  const navigate = useNavigate();
  const employeeData = getEmployeeData()  
  const [empData, setEmpData] = useState() 
const userData = employeeData.find((employee) => employee.id === parseInt(id, 10));
const [editedEmployee, setEditedEmployee] = useState(userData || {});
const DeleteEmployee = employeeData[employeeData.length - 1];


  const handleEdit = () => {
    addEmployeeData(editedEmployee);
    navigate("/admin/searchemployee");
  };

  const handleChange = (e) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleEditConfirm = () => {setSuccessModalOpen(true)}
  const handleClose = () => {setSuccessModalOpen(false); window.location.reload()}
  const handleConfirmClose = () => {setSuccessConfirmation(false); window.location.reload()}

  const handleSuccess = ()=> {
    navigate(`/admin/editemployee/${id}`);
}
const ConfirmClose = () => {
  setSuccessConfirmation(false)
  navigate('/admin/searchemployee')

}
           
    
    const handleSuccessClick = () => {
    navigate('/admin/searchemployee')
    }

    const handleDeleteConfirm = () => {setDeleteModalOpen(true)}
    const handleDeleteClose = () =>
     {setDeleteModalOpen(false);
    }
    const handleDeleteSuccess = () =>
     {setDeleteModalOpen(false);
      //  const updatedEmployeeData = deleteEmployeeData(userData.id);
      deleteEmployeeData(userData.id);
        // console.log("Updated Session Storage Data:", sessionStorage.getItem('employeedatas'));
        const updatedEmployeeData = employeeData.filter((employee) => employee.id !== userData.id);
        console.log("Updated Employee Data:", updatedEmployeeData);
        const newEmployeeData = getEmployeeData();

        // updatedEmployeeData(newEmployeeData);
        setEmpData(updatedEmployeeData);
        setSuccessConfirmation(true)


    //     Swal.fire({icon: 'success',
    // title: 'Success!',
    // text: 'File deleted Successfully', showConfirmButton: true}).then(()=> {window.location.reload()})  
   
    

    // navigate('/admin/searchemployee'); 
    }

  
  return (
    <div className='background-clr'>
        <h3> Employee Details </h3>
        {userData ? (
        <div className="container employee-form">
          
          {/* <div className="row"> */}
          <div className="col-md-6 form-group">
              <label className="label col-md-4"> id  : </label>
              <label className="label col-md-8"> {userData.id} </label>
            </div>
            
            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Firstname  : </label>
              <label className="label col-md-8"> {userData.firstname} </label>
            </div>

            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Lastname  : </label>
              <label className="label col-md-8"> {userData.lastname} </label>              
            </div>

          
            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Address  : </label>
              <label className="label col-md-8"> {userData.address} </label>
            </div>

            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Mobile Number  : </label>
              <label className="label col-md-8"> {userData.mobilenumber} </label>
            </div>
          
            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Email Id   : </label>
              <label className="label col-md-8"> {userData.emailid} </label>
            </div>

            <div className="col-md-6 form-group">
              <label className="label col-md-4"> Employee Id  : </label>
              <label className="label col-md-8"> {userData.employeeid} </label>
            </div>
            
            {/* <div className="row"> */}
              <div className="col-md-6 form-group">
                <label className="label col-md-4"> Project Id  : </label>
                <label className="label col-md-8"> {userData.projectid} </label>
              </div>

            <div className="col-md-6 form-group">
                <label className="label col-md-4"> Aadhar Card  : </label>
                <label className="label col-md-8"> {userData.aadharnumber} </label>
            </div>
            
            <div className="col-md-6 form-group">
                <label className="label col-md-4"> Pan Card  :</label>
                <label className="label col-md-8"> {userData.pannumber} </label>
            </div>            
         </div>
         ) : (
          // Render loading indicator or error message when userData is undefined
      <div>Loading...</div>
      )}
          <div className="buttons">
            
            <button type="submit" className="btn-edit btn-sm" onClick={handleEditConfirm}>              
              Edit
            </button>
            <button type="button" className="btn-delete btn-sm" onClick={handleDeleteConfirm}>              
              Delete
            </button>
            <button type="button" className="btn-cancel btn-sm" onClick={handleSuccessClick}>              
              cancel
            </button>
          </div>

      <Modal show={isSuccessModalOpen} onHide={handleClose}>        
        <Modal.Body>Do you want to Edit</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSuccess}>
            Yes 
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isDeleteModalOpen} onHide={handleDeleteClose}>        
        <Modal.Body>Do you want to Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteSuccess}>
            Delete 
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered size='sm' show={SuccessConfirmation} onHide={handleConfirmClose}>          
          <Modal.Body>
          <div className="d-flex flex-column modal-success p-4 align-items-center ">
            <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />                        
            <p className="mb-4 text-center">Employee Profile Deleted Successfully</p>
            <button className="btn  w-100 text-white" onClick =  {ConfirmClose} style={{ backgroundColor: '#5EAC24' }}>Close</button>
          </div>
      </Modal.Body>
        </Modal> 

        

      
        
    
     </div>
     
  )
}
