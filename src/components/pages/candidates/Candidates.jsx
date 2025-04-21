import React, { useState, useEffect } from "react";
import "./Candidates.css"; 
import CommonHeader from "../../common/CommonHeader";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidateData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/candidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCandidates(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
  
  useEffect(() => {
    fetchCandidateData();
  }, []);

  const [statusOpen, setStatusOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    agree: false
  });

  const toggleStatus = () => {
    setStatusOpen(!statusOpen);
    if (positionOpen) setPositionOpen(false);
  };

  const togglePosition = () => {
    setPositionOpen(!positionOpen);
    if (statusOpen) setStatusOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCandidate(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setNewCandidate(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const candidate = {
      id: candidates.length + 1,
      name: newCandidate.fullName,
      email: newCandidate.email,
      phone: newCandidate.phone,
      position: newCandidate.position,
      status: "New",
      experience: newCandidate.experience
    };
    

    setCandidates([...candidates, candidate]);

    
    setNewCandidate({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      agree: false
    });
    setShowModal(false);
  };


  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  
  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };


  const ChevronDown = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="chevron-icon"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );


  const SearchIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="search-icon"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );


  const UploadIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="upload-icon"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );


  const CloseIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="close-icon"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );


  const MoreIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="more-icon"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );

  return (
    <div className="container">
      <main className="main">
        <CommonHeader screenName={"Candidates"} />
        
    
        <div className="candidate-filter">
      
          <div className="elements_flex">
            <div className="filter-dropdown">
              <button onClick={toggleStatus} className="filter-button">
                <span>Status</span>
                <ChevronDown />
              </button>
              {statusOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>All Status</li>
                    <li>New</li>
                    <li>Selected</li>
                    <li>Rejected</li>
                  </ul>
                </div>
              )}
            </div>

          
            <div className="filter-dropdown">
              <button onClick={togglePosition} className="filter-button">
                <span>Position</span>
                <ChevronDown />
              </button>
              {positionOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>All Positions</li>
                    <li>Designer</li>
                    <li>Developer</li>
                    <li>Human Resource</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="elements_flex">
            <div className="search-box-candidates">
              <FiSearch />
              <input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            
            <button className="add-button" onClick={() => setShowModal(true)}>
              Add Candidate
            </button>
          </div>
        </div>


    
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={c.id}>
                  <td>{String(i + 1).padStart(2, "0")}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td>
                    <div className={`status-pill ${c?.status?.toLowerCase()}`}>
                      <select defaultValue={c.status}>
                        <option value="New">New</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </td>
                  <td>{c.experience}</td>
                  <td className="action-cell">
                    <div className="action-menu-container">
                      <button 
                        className="action-button"
                        onClick={() => toggleActionMenu(c.id)}
                      >
                        <MoreIcon />
                      </button>
                      {actionMenuOpen === c.id && (
                        <div className="action-menu">
                          <ul>
                            <li><a href={c.resume} target="_blank" download={true}>Download Resume</a></li>
                            <li>Delete Candidate</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Candidate</h2>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={newCandidate.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newCandidate.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={newCandidate.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position">Position*</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={newCandidate.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">Experience*</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={newCandidate.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="resume">Resume*</label>
                    <div className="file-input">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        className="hidden-file-input"
                      />
                      <div className="file-input-label">
                        <span>{newCandidate.resume ? newCandidate.resume.name : "Upload Resume"}</span>
                        <UploadIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={newCandidate.agree}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="agree">I hereby declare that the above information is true to the best of my knowledge and belief</label>
                </div>
                <div className="form-actions">
                <button 
                  type="submit" 
                  className={newCandidate.agree ? "save-button active" : "save-button disabled"}
                  disabled={!newCandidate.agree}
                  style={{
                    backgroundColor: newCandidate.agree ? "#3f0071" : "#ccc",
                    cursor: newCandidate.agree ? "pointer" : "not-allowed",
                    color: "white", 
                    padding: "10px 20px",
                    border: "none" 
                  }}
                >
                  Save
                </button>

                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Candidates;