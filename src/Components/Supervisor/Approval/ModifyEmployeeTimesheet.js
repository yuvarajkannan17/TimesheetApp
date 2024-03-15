import axios from "axios";
import employeeSheetUrl from "../../Api/employeeEdit";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../Approval/approvalPage.css'
import { editTimesheetSuccessModal, editTimesheetRejectModal } from '../../features/modal';
function EmployeeEditTimesheet() {
    const [timesheetData, setTimesheetData] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [editApproveConfirmationModal, setEditApproveConfirmationModal] = useState(false);
    const [editRejectConfirmationModal, setEditRejectConfirmationModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('Please reach out supervisor regarding your timesheet.');



    function editTimesheetApproveConfirmation() {
        setEditApproveConfirmationModal(true);
    }

    function editTimesheetApproveCancel() {
        setEditApproveConfirmationModal(false);
    }

    async function editTimesheetApproveSave() {
        setEditApproveConfirmationModal(false);

        try {
            await axios.put(`${employeeSheetUrl}/${id}`, timesheetData);
            setTimesheetData({ ...timesheetData, status: "Your timesheet has been approved" })
            dispatch(editTimesheetSuccessModal(true));
            navigate('/supervisor/approvelList');
        } catch (error) {
            console.log(error)
        }
    }

    function editTimesheetRejectConfirmation() {
        setEditRejectConfirmationModal(true);
    }

    function editTimesheetRejectCancel() {
        setEditRejectConfirmationModal(false);

    }

    async function editTimesheetRejectSave() {
        setEditRejectConfirmationModal(false);

        try {

            await axios.put(`${employeeSheetUrl}/${id}`, timesheetData);
            setTimesheetData({ ...timesheetData, status: "Your timesheet has been rejected" })
            dispatch(editTimesheetRejectModal(true));
            navigate('/supervisor')
        } catch (error) {
            console.log(error)
        }

    }



    async function getEditTimesheet() {
        const response = await axios.get(`${employeeSheetUrl}/${id}`);
        const datas = response.data;
        setTimesheetData(datas);

    }

    useEffect(() => {
        getEditTimesheet();
    }, []);



    const handleChange = (selectedOptions) => {
        setTimesheetData((preValue) => ({
            ...preValue, workingProject: selectedOptions
        }));

    };
    const handleWorkHoursChange = (index, value) => {
        if(!isNaN(value)){
            if (value < 0 || value > 12) {
                // If the value is less than 0 or greater than 12, we don't need to do anything
                
              }else{
                const newWorkHour = [...timesheetData.timesheetData];
                newWorkHour[index].hoursWorked = Number(value); // Update the hoursWorked property at the specified index
                setTimesheetData(prevState => ({
                    ...prevState,
                    timesheetData: newWorkHour // Update the timesheetData state with the modified array
    
                }));
              }
        }

    };
    function calculateTotalWorkHours() {
        if (timesheetData.timesheetData) {
            const totalWorkHours = timesheetData.timesheetData.reduce((acc, cur) => acc + parseInt(cur.hoursWorked), 0);

            setTimesheetData(prevState => ({
                ...prevState,
                noOfHoursWorked: totalWorkHours
            }));
        }
        return 0; // Return 0 if timesheetData.timesheetData is not available
    }


    useEffect(() => {
        calculateTotalWorkHours();
    }, [timesheetData.timesheetData])


    function goToHomePage() {
        navigate('/supervisor')
    }




    return (
        <>
            {timesheetData && (<div className="ti-background-clr">
                <div className="ti-data-field-container pt-4">
                    <div>
                        <p className='fs-4 '>Edit Timesheet</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="m-1">
                            <label htmlFor="fromDate"> Date :  </label>
                            <input type="date" id="fromDate" className="mx-1" value={timesheetData.StartDate} readOnly></input>
                        </div>

                    </div>


                    <div className=" border border-1 rounded p-4 border-black my-4" style={{ position: 'relative', zIndex: 1 }}>
                        <table className="table table-bordered border-dark text-center">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#c8e184' }} >Date</th>
                                    {timesheetData && timesheetData.timesheetData.map((date) => (
                                        <th style={{ backgroundColor: '#c8e184' }} key={date.date}>{date.date}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th style={{ backgroundColor: '#c8e184' }} >Day</th>
                                    {timesheetData && timesheetData.timesheetData.map((date) => (
                                        <td key={date.date} style={{ backgroundColor: date.day.toLowerCase() === 'sunday' ? 'yellow' : ' #c8e184' }}>{date.day}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th style={{ backgroundColor: '#e8fcaf' }}  >

                                        <div>
                                            <Select
                                                options={timesheetData.projectOptions}

                                                value={timesheetData.workingProject}
                                                onChange={handleChange}
                                                placeholder="choose the project"
                                                className="my-2"
                                            />
                                        </div>
                                    </th>
                                    {timesheetData && timesheetData.timesheetData.map((date, index) => (
                                        <td key={date.date} style={{ backgroundColor: '#e8fcaf' }}  ><input type="text" inputMode="numeric" min={0} max={12} className="ti-workInput-edit border border-none text-center mt-3" value={date.hoursWorked} onChange={(e) => handleWorkHoursChange(index, e.target.value)}></input></td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <span className='fw-bold'>Total Hours Worked : </span> <span className='fw-bold'>{timesheetData.noOfHoursWorked}</span>
                    </div>
                    <div className="d-flex justify-content-center" >

                        <button type="button" onClick={editTimesheetApproveConfirmation} className="btn btn-success m-3 " style={{ width: '100px' }}>Approve</button>
                        <button type="button" onClick={editTimesheetRejectConfirmation} className="btn btn-danger m-3 " style={{ width: '100px' }}>Reject</button>
                        <button type="button" onClick={goToHomePage} className="btn btn-secondary m-3 " style={{ width: '100px' }}>Cancel</button>
                    </div>

                </div>
                <div>
                    {/* modals for confirmation */}

                    <Modal show={editApproveConfirmationModal}>

                        <Modal.Body >Do you want to approve this timesheet?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={editTimesheetApproveCancel}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={editTimesheetApproveSave}>
                                Approve
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={editRejectConfirmationModal}>

                        <Modal.Body >Do you want to reject this timesheet?
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
                            <Button variant="secondary" onClick={editTimesheetRejectCancel}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={editTimesheetRejectSave}>
                                Reject
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>)}
        </>
    );
}

export default EmployeeEditTimesheet;
