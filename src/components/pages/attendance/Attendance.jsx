import  { useState, useRef, useEffect } from "react";
import "./Attendance.css";
import { FiMoreVertical, FiChevronDown, FiSearch, FiCalendar, FiX } from "react-icons/fi";
import CommonHeader from "../../common/CommonHeader";
import axios from "axios";


const positionOptions = ["All Positions", "Intern", "Junior", "Full Time", "Senior", "Team Lead"];

const Employees = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("Position");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMenuIndex, setActionMenuIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    dateOfJoining: "",
  });
  
  const dropdownRef = useRef(null);
  const actionMenuRef = useRef(null);
  const calendarRef = useRef(null);

  const fetchEmployeeData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
  
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  
 
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuIndex(null);
      }
      
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setIsDropdownOpen(false);
  };
  
  const toggleActionMenu = (index) => {
    setActionMenuIndex(actionMenuIndex === index ? null : index);
  };
  
  const handleEdit = (employee) => {
    setFormData({
      fullName: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      dateOfJoining: employee.doj,
    });
    setIsEditModalOpen(true);
    setActionMenuIndex(null);
  };
  
  const handleDelete = () => {
    // Handle delete functionality
    setActionMenuIndex(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsEditModalOpen(false);
  };
  
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(2)}`;
    setFormData({
      ...formData,
      dateOfJoining: formattedDate,
    });
    setIsCalendarOpen(false);
  };
  
  const renderCalendar = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
  
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const weeks = [];
    let days = [];
    let day = new Date(startDate);
    
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        days.push({
          date: cloneDay,
          currentMonth: day.getMonth() === currentDate.getMonth(),
          isToday: day.toDateString() === new Date().toDateString(),
          isSelected: selectedDate && day.toDateString() === selectedDate.toDateString(),
        });
        day.setDate(day.getDate() + 1);
      }
      weeks.push(days);
      days = [];
    }
    
    return (
      <div className="calendar-container" ref={calendarRef}>
        {console.log(employees)}
        <div className="calendar-header">
          <span className="calendar-title">
            {`${currentDate.toLocaleString('default', { month: 'long' })}, ${currentDate.getFullYear()}`}
          </span>
          <div className="calendar-nav">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
              &lt;
            </button>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
              &gt;
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          {weekdays.map((day) => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
          {weeks.flat().map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'current' : ''} ${day.isSelected ? 'selected' : ''}`}
              onClick={() => day.currentMonth && handleDateSelect(day.date)}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="employees-container">
      <CommonHeader screenName={"Employees"} />
      
      {/* Filter Section */}
      <div className="filters-container">
        {/* Position Dropdown */}
        <div className="position-dropdown" ref={dropdownRef}>
          <button className="position-button" onClick={toggleDropdown}>
            <span>{selectedPosition}</span>
            <FiChevronDown className="dropdown-icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {positionOptions.map((position, index) => (
                <div 
                  key={index} 
                  className="dropdown-item"
                  onClick={() => handlePositionSelect(position)}
                >
                  {position}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-box-candidates">
          <FiSearch />
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>
                  <img src={emp.image} alt={emp.name} className="avatar" />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.joiningDate}</td>
                <td className="action-cell">
                  <FiMoreVertical 
                    className="action-icon" 
                    onClick={() => toggleActionMenu(index)}
                  />
                  {actionMenuIndex === index && (
                    <div className="action-menu" ref={actionMenuRef}>
                      <div className="action-item" onClick={() => handleEdit(emp)}>Edit</div>
                      <div className="action-item" onClick={handleDelete}>Delete</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">Edit Employee Details</h3>
              <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <select
                      name="position"
                      className="form-select"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Position</option>
                      {positionOptions.slice(1).map((position, index) => (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Joining</label>
                    <div className="date-input">
                      <input
                        type="text"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleInputChange}
                        onClick={toggleCalendar}
                        readOnly
                        required
                      />
                      <FiCalendar className="calendar-icon" />
                      {isCalendarOpen && renderCalendar()}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn-save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;






