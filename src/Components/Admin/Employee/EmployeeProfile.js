import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  { getLastEnteredEmployee } from './mockempdetails';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../css/style.css'
import successCheck from '../../Image/checked.png'


export default function EmployeeProfile() {
  const userData = getLastEnteredEmployee();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [SuccessConfirmation, setSuccessConfirmation] = useState(false);

  
  const handleEditConfirm = () => {setSuccessModalOpen(true)}
  const handleClose = () => {setSuccessModalOpen(false); window.location.reload()}
  const handleConfirmClose = () => {setSuccessConfirmation(false); window.location.reload()}

  const navigate = useNavigate()

    const handleSubmitClick = () => {
      setSuccessConfirmation(true)
      
    }
    const ConfirmClose = () => {
      setSuccessConfirmation(false)
      navigate('/admin/createemployee')

    }
    const handleSuccessClick = () => {
      const LastEnteredEmployee = getLastEnteredEmployee();
      if(LastEnteredEmployee){
        navigate('/admin/createemployee?editMode=true') 
      }
     
    }
  
  return (
    <div className='background-clr'>
        <h3> Employee Profile </h3>
        {userData ? (
        <div className="container employee-form">
          
          {/* <div className="row"> */}
            
            
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
        ) : (<></>)}
          <div className="buttons">
            
            <button type="submit" className="btn-edit btn-sm" onClick={handleEditConfirm}>              
              Back
            </button>
            <button type="button" className="btn-submit btn-sm" onClick={handleSubmitClick}>              
              Submit
            </button>
          </div>

          <Modal show={isSuccessModalOpen} onHide={handleClose}>
        
        <Modal.Body>Do you want to go back</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSuccessClick}>
            Yes 
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered size='sm' show={SuccessConfirmation} onHide={handleConfirmClose}>          
        <Modal.Body>
          <div className="d-flex flex-column modal-success p-4 align-items-center ">
            <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />                        
            <p className="mb-4 text-center">Employee Profile Created Successfully</p>
            <button className="btn  w-100 text-white" onClick =  {ConfirmClose} style={{ backgroundColor: '#5EAC24' }}>Close</button>
          </div>
        </Modal.Body>
      </Modal>    
        
    
     </div>
     
  )
}
