import './supervisor.css'
import { useNavigate } from 'react-router-dom';
function SupervisorHome() {
 
    const navigate=useNavigate();

    function goToAddTimesheetPage(){
        navigate('/supervisor/addtimesheet');
    }

    function goToEditPage(){
        navigate('/supervisor/editTimesheet');
        
    }

    function goToApprovePage(){
        navigate('/supervisor/approvelList');

    }

    function goToRejectPage(){
        navigate('/supervisor/rejecttimesheet')
    }

  

    return (
        <>
            <div className="ti-background-clr">

                <div className='ti-home-container'>

{/* notification about timesheet */}
                    <div className="row text-center ti-home-notification">

                        <div className="col   mx-5 my-2 p-2 ">Timesheet to be approved</div>
                        <div className="col  mx-5  my-2 p-2  ">Rejected Timesheets</div>

                    </div>

{/* timesheet content */}
                    <div className="row text-center ti-home-content mt-2">
                        {/* timesheet status */}
                        <div className="col mx-5 my-2 p-2 ">
                            <p className='p-2 title'>Your Submitted Timesheet</p>
                            <div className='body   p-2 text-start'>
                                <div className='m-4 ti-home-ti-status p-4'>
                                    <p className=''>Timesheet Period :</p>
                                    <p  className=''>Created On :</p>
                                    <div className='d-flex justify-content-around flex-wrap '>
                                        <button className='status-btn p-2 m-2'>Status</button>
                                        <button className='view-btn p-2 m-2'>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* navigation pages */}
                        <div className="col mx-5 my-2 p-2 ">
                            <p className='p-2 title'>Select Option</p>
                            <div className='p-3 body'>
                                <div className='my-4 '>
                                    <button type='button' className='btn p-2 select-btn ' onClick={goToAddTimesheetPage}>Add Timesheet</button>
                                </div>
                                <div className='my-4'>
                                    <button type='button' className='btn p-2 select-btn' onClick={goToEditPage}>Edit Timesheet</button>
                                </div>

                                <div className='my-4'>
                                    <button type='button' className='btn p-2 select-btn' onClick={goToRejectPage}>Reject Timesheet</button>
                                </div>
                               
                                <div className='my-4'>
                                    <button type='button' className='btn p-2 select-btn' onClick={goToApprovePage}>Approve Timesheet</button>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>


            </div>

        </>
    )

}

export default SupervisorHome;