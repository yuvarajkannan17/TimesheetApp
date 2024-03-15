import React, {useState} from 'react'
import XLSX from 'xlsx';
import '../../css/style.css'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import NavPages from '../NavPages';
import successCheck from '../../Image/checked.png'


export default function UploadEmployees() {

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);  
  const [SuccessConfirmation, setSuccessConfirmation] = useState(false);


  // submit state
  const [excelData, setExcelData] = useState(null);  

  // onchange event
  const handleFile=(e)=>{
    const file = e.target.files[0];
    const maxSize = 20 * 1024; // 20KB in bytes
    
    setTypeError(null)
    // Validate file type (Excel only)
    const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!allowedFileTypes.includes(file.type)) {
      setTypeError('Invalid file type. Please upload an Excel file.');
      return;
    }
    
    if (file.size > maxSize) {
      setTypeError('File size exceeds the limit (20KB)');
       return;
    }
    
    setExcelData(file) 
  }
  const handleUpload = () => {
    if(typeError){
      setTypeError(typeError)
      return
    }
    setSuccessModalOpen(true)
  }
  

  const handleClose = () => {setSuccessModalOpen(false); }
  const handleSuccessClick = () => {
    setSuccessModalOpen(false)
    setSuccessConfirmation(true)
  }
  const handleConfirmClose = () => {
    setSuccessConfirmation(false);
     setExcelFile(null)}

  
  const navigate = useNavigate()
  const ConfirmClose = () => {
    // setSuccessConfirmation(false)
    // window.location.reload()
    setExcelData(null)
    navigate('/admin/uploademployees')
  }

  
    // setSuccessConfirmation(false); 
   
    
    // Swal.fire({icon: 'success',
    // title: 'Success!',
    // text: 'File Uploaded Successfully', showConfirmButton: true}).then(()=> {window.location.reload()})  
 


  return (
   <div className='background-clr'>
    <NavPages/>
    <div className="container employee-form">
      <h3>Upload & View Employee files</h3>
         <div className='row'>
<form onSubmit={handleUpload}>
    <div className="col-md-8 form-group" >
    <input type="file" name='fileupload' className="form-control" required onChange={handleFile} />  
    </div>

   <div className='col-md-4'>
   <button type="submit" className="btn btn-success btn-md" >UPLOAD</button>
   </div>
   </form>
   </div>
      {typeError&&(
    <p className="text-danger"> {typeError} </p>        
    )}  

    


      <Modal show={isSuccessModalOpen} onHide={handleClose}>        
        <Modal.Body>Do you want to Upload</Modal.Body>
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
            <p className="mb-4 text-center">Employee Profile Uploaded Successfully</p>
            <button className="btn  w-100 text-white" onClick =  {ConfirmClose} style={{ backgroundColor: '#5EAC24' }}>Close</button>
          </div>
        </Modal.Body>
      </Modal>    

   
    </div>
  
</div>
    
  )
}
