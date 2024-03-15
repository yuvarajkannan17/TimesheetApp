import { useEffect, useState } from "react";
import axios from 'axios';
import { Container } from "react-bootstrap";
import { Modal, Button } from 'react-bootstrap';
import successCheck from '../../Image/checked.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTimesheetSuccessModal, editTimesheetRejectModal } from '../../features/modal';
import employeeSheetUrl from "../../Api/employeeEdit";
function ApprovelPage() {
  const [timesheetDatas, setTimesheetDatas] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [rejectReason, setRejectReason] = useState('Your timesheet has been rejected. Please reach out supervisor regarding your timesheet.');
  const [askConfitrmationForApprove, setAskConfirmationForApprove] = useState(false)
  const [askConfitrmationForReject, setAskConfirmationForReject] = useState(false)
  const [successModalForApprove, setSuccessModalForApprove] = useState(false)
  const [successModalForReject, setSuccessModalForReject] = useState(false)
  const [atLeastOneChecked, setAtLeastOneChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const editTimesheetSuccessModalValue = useSelector(state => state.modal.value.editTimesheetSuccessModalValue);
  const editTimesheetRejectModalValue = useSelector(state => state.modal.value.editTimesheetRejectModalValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(timesheetDatas)
  useEffect(() => {

    async function getTimesheet() {
      const timesheets = await axios.get(employeeSheetUrl);
      const datasOfTimesheet = timesheets.data;
      setTimesheetDatas(datasOfTimesheet.map((sheetData) => ({
        ...sheetData,
        checked: false,

      })));
    }


    getTimesheet();
  }, [])

  useEffect(() => {
    // Check if at least one checkbox is checked
    const isChecked = timesheetDatas.some((sheet) => sheet.checked);
    setSelectAllChecked(isChecked)
    setAtLeastOneChecked(isChecked);
    if (isChecked) {
      setErrorMessage('');
    }
  }, [timesheetDatas]);


  // ask confirmation or trigger alert
  function approvesheetFun() {

    if (atLeastOneChecked) {
      setAskConfirmationForApprove(true);
    } else {
      setErrorMessage("Please select at least one Timesheet!!")
    }



  }
  // ask confirmation or trigger alert
  function rejectsheetFun() {
    if (atLeastOneChecked) {
      setAskConfirmationForReject(true);
    } else {
      setErrorMessage("Please select at least one Timesheet!!")
    }



  }

  // reset the timesheet
  function cancelsheetFun() {
    navigate('/supervisor')
  }


  // update the timesheetCheckBox
  function handleCheckboxChange(id) {

    setTimesheetDatas((prevData) =>
      prevData.map((sheet) =>
        sheet.id === id ? { ...sheet, checked: !sheet.checked } : sheet
      )
    );
  }


  // timesheet approvel
  async function approveSaveConfirmation() {
    setAskConfirmationForApprove(false);
    const approvedSheets = timesheetDatas.filter((sheet) => sheet.checked === true);



    try {
      // Update the status of approved sheets and track their IDs
      const updates = approvedSheets.map(async (sheet) => {
        // Update the status of the sheet locally
        const updatedSheet = { ...sheet, status: "Your timesheet has been approved" };


        // Make a PUT request to update the status of the sheet in the API
        const response = await axios.put(`${employeeSheetUrl}/${updatedSheet.id}`, updatedSheet);
        const responseData = response.data;

        console.log("Updated approve sheet:", responseData);

        return updatedSheet;
      });



      // Wait for all updates to finish
      const updatedSheets = await Promise.all(updates);
    
      // Update the state with the updated data
      setTimesheetDatas(updatedSheets);

      // Reset checkbox selection
      // cancelsheetFun();

      // Show success modal
      setSuccessModalForApprove(true);
    } catch (error) {
      console.log('API error', error);
    }
  }

  // cancel the approvel
  function approveCancelConfirmation() {
    setAskConfirmationForApprove(false);

  }

  // reject the timesheet
  async function rejectSaveConfirmation() {
    setAskConfirmationForReject(false);
    const rejectSheets = timesheetDatas.filter((sheet) => sheet.checked === true);



    try {
      // Update the status of approved sheets and track their IDs
      const updates = rejectSheets.map(async (sheet) => {
        // Update the status of the sheet locally
        const updatedSheet = { ...sheet, status: "Your timesheet has been rejected" };

        // Make a PUT request to update the status of the sheet in the API
        const response = await axios.put(`${employeeSheetUrl}/${updatedSheet.id}`, updatedSheet);
        // console.log("Updated reject sheet:", response.data);

        return updatedSheet;
      });

      // Wait for all updates to finish
      const updatedSheets = await Promise.all(updates);

      // Update the state with the updated data
      setTimesheetDatas(updatedSheets);

      // Reset checkbox selection
      // cancelsheetFun();

      // Show success modal
      setSuccessModalForReject(true);
    } catch (error) {
      console.log('API error', error);
    }

  }

  // reject cancel
  function rejectCancelConfirmation() {
    setAskConfirmationForReject(false);

  }

  function goEditPage(id, check) {

    if (check) {
      console.log(id)
      navigate('/supervisor/modifyEmployeeTimesheet/' + id)
    } else {
      setErrorMessage("Please select the timesheet you wish to edit!!!")
    }


  }

  function selectAllCheckbox(event) {
    const check = event.target.checked;
    setSelectAllChecked(check);
    setTimesheetDatas(prevData =>
      prevData.map(data => ({
        ...data,
        checked: check
      }))
    );

  }


  return (
    <>

      <div className="ti-background-clr">
        <Container>
          <div className="py-3 ">
            <p className=" text-center spr-approval-title ">Timesheet List</p>
          </div>
          {/* without select timesheet error  */}
          {errorMessage && <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>}
          {/* table head */}
          <div className="table-responsive">
            <table className="table table-bordered   table-hover border border-1 border-black">
              <thead className="" >
                <tr className="text-center spr-approval-header" >
                  <th> <input className="me-1" type="checkbox" checked={selectAllChecked} onChange={selectAllCheckbox} />Select </th>
                  <th>Emp Id</th>
                  <th>Emp Name</th>
                  <th>Timesheet Period</th>
                  <th>No hrs Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody >
                {/* table body */}
                {timesheetDatas ? timesheetDatas.map((sheet) => (
                  <tr key={sheet.id} className="text-center">
                    <td>
                      <input
                        type="checkbox"
                        name="approvalchkTimesheet"
                        checked={sheet.checked}
                        onChange={() => handleCheckboxChange(sheet.id)}
                      ></input>
                    </td>
                    <td>{sheet.empId}</td>
                    <td>{sheet.empName}</td>
                    <td>{sheet.StartDate}</td>
                    <td>{sheet.noOfHoursWorked}</td>
                    <td><button className="btn btn-primary" onClick={() => { goEditPage(sheet.id, sheet.checked) }}>Edit</button></td>

                  </tr>
                )) : ""}


              </tbody>
            </table>
          </div>
          {/* buttons for approvel page */}
          <div className="d-flex justify-content-around flex-wrap">
            <button className="btn btn-success m-2" onClick={approvesheetFun}>Approve</button>
            <button className="btn btn-danger m-2" onClick={rejectsheetFun}>Reject</button>
            <button className="btn btn-secondary m-2" onClick={cancelsheetFun} >Cancel</button>
          </div>
        </Container>


        {/* confirmation modal for approvel */}
        <div className="approveModal">
          <Modal show={askConfitrmationForApprove}>

            <Modal.Body >Do you want to approve this sheets?</Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={approveCancelConfirmation}>
                Cancel
              </Button>
              <Button variant="primary" onClick={approveSaveConfirmation}>
                Approve
              </Button>
            </Modal.Footer>
          </Modal>
          {/* modal for success approvel */}
          <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={successModalForApprove}  >
            <div className="d-flex flex-column modal-success p-4 align-items-center ">
              <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />
              <p className="mb-4 text-center">Timesheets have been approved.</p>
              <button className="btn  w-100 text-white" onClick={() => { setSuccessModalForApprove(false) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
            </div>
          </Modal>

          {/* confirmation modal for rejects */}

          <Modal show={askConfitrmationForReject}>
            <Modal.Body>
              Are you sure you want to reject this sheets?
              <div className="textarea-container">
                <textarea
                  rows="4"
                  cols="40"
                  placeholder="Enter reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="mt-2 fixed-size-textarea"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={rejectCancelConfirmation}>
                Cancel
              </Button>
              <Button variant="danger" onClick={rejectSaveConfirmation}>
                Reject
              </Button>
            </Modal.Footer>
          </Modal>


          {/* modal for editTimesheetsuccess approvel */}
          <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={editTimesheetSuccessModalValue}  >
            <div className="d-flex flex-column modal-success p-4 align-items-center ">
              <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />
              <p className="mb-4 text-center">Timesheet have been approved.</p>
              <button className="btn  w-100 text-white" onClick={() => { dispatch(editTimesheetSuccessModal(false)) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
            </div>
          </Modal>

          {/* modal for editTimesheet reject */}
          <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={editTimesheetRejectModalValue}  >
            <div className="d-flex flex-column modal-success p-4 align-items-center ">
              <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />
              <p className="mb-4 text-center">Timesheet have been rejected.</p>
              <button className="btn  w-100 text-white" onClick={() => { dispatch(editTimesheetRejectModal(false)) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
            </div>
          </Modal>

        </div>
      </div>

    </>
  )
}

export default ApprovelPage;