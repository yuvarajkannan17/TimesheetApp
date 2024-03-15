
import axios from "axios";
import employeeSheetUrl from "../../Api/employeeEdit";
import Select from 'react-select';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import successCheck from '../../Image/checked.png'
function RejectTimesheet() {
    const [timesheetData, setTimesheetData] = useState('');
    const [editId, setEditId] = useState('');
    const objectPositionRef = useRef(1);
    const [editDataSaveConfirmation, setEditDataSaveConfirmation] = useState(false);
    const [successModalForEmployeeRejectEdit, setSuccessModalForEmployeeRejectEdit] = useState(false);
    const navigate = useNavigate();






    async function getEditTimesheet() {
        const response = await axios.get(employeeSheetUrl);
        const datas = response.data;
        const length = datas.length;
        const sheetData = datas[length - objectPositionRef.current];
        setEditId(sheetData.id)
        setTimesheetData(sheetData);

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
        if (!isNaN(value)) {
            if (value < 0 || value > 12) {
                // If the value is less than 0 or greater than 12, we don't need to do anything
                // value = Math.min(Math.max(value, 0), 12);
              }else{
                const newWorkHour = [...timesheetData.timesheetData];
                newWorkHour[index].hoursWorked = Number(value); // Update the hoursWorked property at the specified index
                setTimesheetData(prevState => ({
                    ...prevState,
                    timesheetData: newWorkHour // Update the timesheetData state with the modified array
    
                }));
              }
        } else{
            value=0;
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



    async function editDataSaveConfirmationFun() {
        setEditDataSaveConfirmation(true);
    }

    function goToEmployeeHome() {
        navigate('/employee')
    }



    function editDataCancelFun() {
        setEditDataSaveConfirmation(false)
    }

    async function editDataSaveFun() {
        setEditDataSaveConfirmation(false);
        try {
            await axios.put(`${employeeSheetUrl}/${editId}`, timesheetData);
            setSuccessModalForEmployeeRejectEdit(true);
        } catch (error) {
            console.log(error)
        }


    }



    return (
        <>
            {timesheetData && (<div className="ti-background-clr">
                <div className="ti-data-field-container pt-4">
                    <div>
                        <p className='fs-4 text-danger '>Reject Timesheet</p>
                    </div>


                    <div className="m-1">
                        <label htmlFor="fromDate"> Date :  </label>
                        <input type="date" id="fromDate" className="mx-1" value={timesheetData.StartDate} readOnly></input>
                    </div>




                    <div className=" border table-responsive border-1 rounded p-4 border-black my-4" style={{ position: 'relative', zIndex: 1 }}>
                        <table className="table table-bordered border-dark text-center">
                            <thead>
                                <tr >
                                    <th style={{ backgroundColor: '#c8e184' }}  >Date</th>
                                    {timesheetData && timesheetData.timesheetData.map((date) => (
                                        <th style={{ backgroundColor: '#c8e184' }} key={date.date}>{date.date}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th style={{ backgroundColor: '#c8e184' }} >Day</th>
                                    {timesheetData && timesheetData.timesheetData.map((date) => (
                                        <td key={date.date} style={{ backgroundColor: date.day.toLowerCase() === 'sunday' ? 'yellow' : '#c8e184' }}>{date.day}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <th style={{ backgroundColor: '#e8fcaf' }}   >

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
                                        <td key={date.date} style={{ backgroundColor: '#e8fcaf' }}   ><input type="text" inputmode="numeric" min={0} max={12} className="ti-workInput-edit border border-none text-center mt-3" value={date.hoursWorked} onChange={(e) => handleWorkHoursChange(index, e.target.value)}></input></td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <span className='fw-bold'>Total Hours Worked : </span> <span className='fw-bold'>{timesheetData.noOfHoursWorked}</span>
                    </div>
                    <div className="d-flex justify-content-center" >
                        <button className="btn btn-primary m-3 w-5" style={{ width: '100px' }}>Save</button>
                        <button className="btn btn-success m-3 w-5" onClick={editDataSaveConfirmationFun} style={{ width: '100px' }}>Submit</button>
                        <button className="btn btn-secondary m-3 w-5" onClick={goToEmployeeHome} style={{ width: '100px' }}>Cancel</button>
                    </div>

                </div>
                {/* confirmation modal */}
                <Modal show={editDataSaveConfirmation}>

                    <Modal.Body >Do you want to Submit this sheet?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={editDataCancelFun}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={editDataSaveFun}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* modal for success edit */}
                <Modal className="custom-modal" style={{ left: '50%', transform: 'translateX(-50%)' }} dialogClassName="modal-dialog-centered" show={successModalForEmployeeRejectEdit}  >
                    <div className="d-flex flex-column modal-success p-4 align-items-center ">
                        <img src={successCheck} className="img-fluid mb-4" alt="successCheck" />
                        <p className="mb-4 text-center"> Your Timesheet has been Submitted For The Approval.</p>
                        <button className="btn  w-100 text-white" onClick={() => { setSuccessModalForEmployeeRejectEdit(false) }} style={{ backgroundColor: '#5EAC24' }}>Close</button>
                    </div>
                </Modal>
            </div>)}
        </>
    );
}

export default RejectTimesheet;
