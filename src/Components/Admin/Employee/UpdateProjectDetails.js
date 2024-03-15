import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProjectDetails.css';
import axios from 'axios';

const UpdateProjectDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({
    projectID: '',
    projectTitle: '',
    projectDescription: '',
    teamMembers: [],
    supervisorEmployees: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://65c0706125a83926ab964c6f.mockapi.io/api/projectdetails/projectDetails`)
        .then((response) => {
          const foundProject = response.data.find(
            (project) => project.projectID === searchTerm || project.projectTitle === searchTerm
          );

          if (foundProject) {
            setSearchResult(foundProject);
            setUpdatedProject({ ...foundProject, projectID: foundProject.id });
          } else {
            setSearchResult(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching project details:', error.message);
          setSearchResult(null);
        });
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    console.log('Search Result:', searchResult);
  };

  const handleCreateNewProject = () => {
    navigate('/admin/createproject');
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...updatedProject.teamMembers];
    updatedTeamMembers[index][field] = value;
    setUpdatedProject({ ...updatedProject, teamMembers: updatedTeamMembers });
  };

  const handleSupervisorChange = (index, field, value) => {
    const updatedSupervisorEmployees = [...updatedProject.supervisorEmployees];
    updatedSupervisorEmployees[index][field] = value;
    setUpdatedProject({ ...updatedProject, supervisorEmployees: updatedSupervisorEmployees });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    fetch(`https://65c0706125a83926ab964c6f.mockapi.io/api/projectdetails/projectDetails/${updatedProject.projectID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated Project Details:', data);
        setEditing(false);
        alert('Project details updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating project details:', error.message);
        alert('Error updating project details. Please try again.');
      });
  };

  const handleAddTeamMember = () => {
    setUpdatedProject({
      ...updatedProject,
      teamMembers: [...updatedProject.teamMembers, { employeeID: '', employeeName: '' }],
    });
  };

  const handleRemoveTeamMember = (index) => {
    const updatedTeamMembers = [...updatedProject.teamMembers];
    updatedTeamMembers.splice(index, 1);
    setUpdatedProject({ ...updatedProject, teamMembers: updatedTeamMembers });
  };

  const handleAddSupervisor = () => {
    setUpdatedProject({
      ...updatedProject,
      supervisorEmployees: [...updatedProject.supervisorEmployees, { employeeID: '', employeeName: '' }],
    });
  };

  const handleRemoveSupervisor = (index) => {
    const updatedSupervisorEmployees = [...updatedProject.supervisorEmployees];
    updatedSupervisorEmployees.splice(index, 1);
    setUpdatedProject({ ...updatedProject, supervisorEmployees: updatedSupervisorEmployees });
  };

  const handleArchive = () => {
    const projectIdToDelete = searchResult.projectID;

    axios.delete(`http://localhost:3001/projects/${projectIdToDelete}`)
      .then((response) => {
        console.log('Project archived successfully:', response.data);
        alert('Project archived successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error archiving project:', error.message);
        alert('Error archiving project. Please try again.');
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col d-flex search-form-container">
            <form onSubmit={handleSearch} className="w-100">
              <br />
              <h2>Search Project</h2>
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2">Enter Project ID or Title:</label>
                <input
                  type="text"
                  className="form-control me-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col project-details-form-container">
            {searchResult && (
              <form>
                <div className="project-details-container">
                  <div className="project-details-header">
                    <h3>Project Details</h3>
                    <div className='button'>
                      {!editing && <button onClick={handleEdit} className="btn btn-secondary">Edit</button>}
                    </div>
                  </div>
                  <p className="project-id">
                    <strong>Project ID:</strong> {searchResult.projectID}
                  </p>
                  <p>
                    <strong>Project Title:</strong>{' '}
                    {editing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={updatedProject.projectTitle}
                        onChange={(e) =>
                          setUpdatedProject({
                            ...updatedProject,
                            projectTitle: e.target.value,
                          })
                        }
                      />
                    ) : (
                      searchResult.projectTitle
                    )}
                  </p>
                  <p>
                    <strong>Project Description:</strong>{' '}
                    {editing ? (
                      <textarea
                        className="form-control"
                        value={updatedProject.projectDescription}
                        onChange={(e) =>
                          setUpdatedProject({
                            ...updatedProject,
                            projectDescription: e.target.value,
                          })
                        }
                      />
                    ) : (
                      searchResult.projectDescription
                    )}
                  </p>

                      {/* Display Team Members and Supervisor Employees */}
      {editing ? (
        <>
          {/* Team Members */}
          <div>
            <strong>Team Members</strong>
            {updatedProject.teamMembers.map((member, index) => (
              <div key={index} className="mb-3">
                <input
                  type="text"
                  placeholder="Employee ID"
                  className="form-control"
                  value={member.employeeID}
                  onChange={(e) => handleTeamMemberChange(index, 'employeeID', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Employee Name"
                  className="form-control"
                  value={member.employeeName}
                  onChange={(e) => handleTeamMemberChange(index, 'employeeName', e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveTeamMember(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={handleAddTeamMember}>
              Add Team Member
            </button>
          </div>
          <br />

          {/* Supervisor Employees */}
          <div>
            <strong>Supervisor Employees</strong>
            {updatedProject.supervisorEmployees.map((supervisor, index) => (
              <div key={index} className="mb-3">
                <input
                  type="text"
                  placeholder="Supervisor ID"
                  className="form-control"
                  value={supervisor.employeeID}
                  onChange={(e) => handleSupervisorChange(index, 'employeeID', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Supervisor Name"
                  className="form-control"
                  value={supervisor.employeeName}
                  onChange={(e) => handleSupervisorChange(index, 'employeeName', e.target.value)}
                />
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveSupervisor(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={handleAddSupervisor}>
              Add Supervisor
            </button>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Display search results when not editing */}
          {/* Team Members */}
          {searchResult.teamMembers && (
            <div>
              <strong>Team Members</strong>
              {searchResult.teamMembers.map((member, index) => (
                <div key={index} className="mb-3">
                  <strong>Employee ID:</strong> {member.employeeID}
                  <br />
                  <strong>Employee Name:</strong> {member.employeeName}
                </div>
              ))}
            </div>
          )}
          <br />

          {/* Supervisor Employees */}
          {searchResult.supervisorEmployees && (
            <div>
              <strong>Supervisor Employees</strong>
              {searchResult.supervisorEmployees.map((supervisor, index) => (
                <div key={index} className="mb-3">
                  <strong>Supervisor ID:</strong> {supervisor.employeeID}
                  <br />
                  <strong>Supervisor Name:</strong> {supervisor.employeeName}
                </div>
              ))}
            </div>
          )}
          <br />
        </>
      )}

                  {editing && (
                    <div className="mb-3">
                      <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                      <button type="button" className="btn btn-warning" onClick={handleArchive}>Delete</button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            {!editing && (
              <button type="button" className="btn btn-primary" onClick={handleCreateNewProject}>Create New Project</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProjectDetails;








