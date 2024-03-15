import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAdmin from '../SuperAdmin/CreateAdmin/CreateAdmin.js'
import SearchAdmin from '../SuperAdmin/SearchAdmin/SearchAdmin.js'
import AdminEdit from '../SuperAdmin/EditAdmin/AdminEdit.js';

import AdminDetailsView from '../SuperAdmin/SearchAdmin/AdminDetailsView.js';
import EditTimesheet from '../Supervisor/Approval/ModifyEmployeeTimesheet.js';
import ApprovelBody from '../Supervisor/Approval/ApprovalPage.js';
import SupervisorHome from '../Supervisor/Home/SupervisorHome.js';
import EmployeeEditTimesheet from '../Employee/Edit/EmployeeEditTimesheet.js';
import SupervisorEditTimesheet from '../Supervisor/EditTimesheet/SupervisorEditTimesheet.js';
import EmployeeHome from '../Employee/Home/EmployeeHome.js';
import RejectTimesheet from '../Employee/RejectTimesheet/RejectTimesheet.js';
import CreateEmployee from '../Admin/Employee/CreateEmployee.js';
import UploadEmployees from '../Admin/Employee/UploadEmployees.js';
import SearchEmployee from '../Admin/Employee/SearchEmployee.js';

import EmployeeProfile from '../Admin/Employee/EmployeeProfile.js';
import EditEmployee from '../Admin/Employee/EditEmployee.js';
import EmployeeDetails from '../Admin/Employee/EmployeeDetails.js';

import AddTimesheet from '../Employee/AddTimesheet/AddTimesheet.js';
import CreateProject from '../Admin/Employee/CreateProject.js';
import UpdateProjectDetails from '../Admin/Employee/UpdateProjectDetails.js';
import TimesheetLogin from '../Login/TimesheetLogin.js';
import Layout from './Layout.js';
import SupAddTimesheet from '../Supervisor/AddTimesheet/AddTimesheet.js';
import SupRejectTimesheet from '../Supervisor/RejectTimesheet/RejectTimesheet.js';
import { useSelector } from 'react-redux';


function RouterSetup() {
       const {isAuthenticated}=useSelector(state=>state.adminDetails.value);

       
       

  return (
    <>
      <Router>
             
        <Routes>
          <Route path='/' element={<TimesheetLogin/>} />
          <Route path='/superadmin/createadmin' element={ isAuthenticated ?<Layout><CreateAdmin/></Layout> :<TimesheetLogin/>} />
          <Route path='/superadmin/searchadmin/admindetailsview/editadmin/:id' element={isAuthenticated ?<Layout><AdminEdit/></Layout>:<TimesheetLogin/>} />
          <Route path='/superadmin/searchadmin' element={isAuthenticated ? <Layout><SearchAdmin /></Layout>:<TimesheetLogin/>} />
          <Route path='/superadmin/searchadmin/admindetailsview/:id' element={isAuthenticated ? <Layout><AdminDetailsView /></Layout>:<TimesheetLogin/>} />
          
          <Route path='/supervisor' element={isAuthenticated ? <Layout><SupervisorHome /></Layout>:<TimesheetLogin/>} />
          <Route path='/supervisor/addtimesheet' element={isAuthenticated ? <Layout><SupAddTimesheet /></Layout>:<TimesheetLogin/>} />
          <Route path='/supervisor/approvelList' element={isAuthenticated ? <Layout><ApprovelBody /></Layout>:<TimesheetLogin/>} />
          <Route path='/supervisor/editTimesheet' element={isAuthenticated ? <Layout><SupervisorEditTimesheet /></Layout>:<TimesheetLogin/>} />
          <Route path='/supervisor/modifyEmployeeTimesheet/:id' element={isAuthenticated ? <Layout><EditTimesheet /></Layout>:<TimesheetLogin/>} />
          <Route path='/supervisor/rejecttimesheet' element={isAuthenticated ? <Layout><SupRejectTimesheet /></Layout>:<TimesheetLogin/>} />
          
         
          {/* employee */}
          <Route path='/employee' element={isAuthenticated ? <Layout><EmployeeHome /></Layout>:<TimesheetLogin/>} />
          <Route path='/employee/edittimesheet' element={isAuthenticated ? <Layout><EmployeeEditTimesheet /></Layout>:<TimesheetLogin/>} />
          <Route path='/employee/rejecttimesheet' element={isAuthenticated ? <Layout><RejectTimesheet /></Layout>:<TimesheetLogin/>} />
          
          <Route path='/employee/addtimesheet' element={isAuthenticated ? <Layout><AddTimesheet /></Layout>:<TimesheetLogin/>} />
          {/* admin */}
          <Route path='/admin/createemployee' element={ isAuthenticated ? <Layout><CreateEmployee /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/uploademployees' element={isAuthenticated ? <Layout><UploadEmployees /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/searchemployee' element={isAuthenticated ? <Layout><SearchEmployee /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/employeeprofile' element={isAuthenticated ? <Layout><EmployeeProfile /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/editemployee/:id' element={isAuthenticated ? <Layout><EditEmployee /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/employeedetails' element={isAuthenticated ? <Layout><EmployeeDetails /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/employeedetails/:id' element={isAuthenticated ? <Layout><EmployeeDetails /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/createproject' element={isAuthenticated ? <Layout><CreateProject /></Layout>:<TimesheetLogin/>} />
          <Route path='/admin/updateprojectdetails' element={isAuthenticated ? <Layout><UpdateProjectDetails /></Layout>:<TimesheetLogin/>} />

          

        </Routes>

      </Router>

    </>
  )
}


export default RouterSetup;