
import  { useState } from 'react';
import Calendar from 'react-calendar';
import AddLeaveModal from './AddLeave';
import './leaves.css';
import 'react-calendar/dist/Calendar.css';
import CommonHeader from '../../common/CommonHeader';

const LeaveManager = () => {
  const [date, setDate] = useState(new Date(2024, 8, 8)); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Status");
  
  
  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      name: "John Smith",
      date: "2024-09-08 to 2024-09-10",
      reason: "Vacation",
      status: "Pending",
      docs: "Yes"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "2024-09-13",
      reason: "Medical Appointment",
      status: "Approved",
      docs: "Yes"
    },
    {
      id: 3,
      name: "Michael Brown",
      date: "2024-09-15",
      reason: "Personal Leave",
      status: "Pending",
      docs: "No"
    }
  ]);
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const leaveEvents = [
    { date: '2025-04-19', type: 'approved' },
    { date: '2025-04-30', type: 'pending' },
  ];
  

  const handleSaveLeave = (formData) => {
    const newLeave = {
      id: leaveData.length + 1,
      name: formData.employeeName,
      date: formData.leaveDate,
      reason: formData.reason,
      status: "Pending",
      docs: formData.documents ? "Yes" : "No"
    };
    
    setLeaveData([...leaveData, newLeave]);
  };


  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formatted = date.toISOString().split('T')[0]; 
      const event = leaveEvents.find(e => e.date === formatted);
  
      if (event) {
        return `leave-${event.type}`; 
      }
    }
    return null;
  };
  

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formatted = date.toISOString().split('T')[0];
      const event = leaveEvents.find(e => e.date === formatted);
  
      if (event) {
        return (
          <div style={{ fontSize: '10px', color: '#555' }}>
            {event.type === 'approved' ? '✓' : '⏳'}
          </div>
        );
      }
    }
    return null;
  };
  



  const handleStatusChange = (id, newStatus) => {
    setLeaveData(prev =>
      prev.map(leave =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );
  };
  


  return (
    <div className="leave-management-container">
      <CommonHeader screenName={"Leaves"} />

      <div className="controls">
        <div className="attendance-status">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="Status">Status</option>
            <option value="Present">Approved</option>
            <option value="Absent">Pending</option>
          </select>
        </div>
        
        <div className='elements_flex'>
          <div className="search-box-candidates">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        <button className="add-button" onClick={openModal}>Add Leave</button>
        </div>
      </div>

      <div className="main-content">
        <div className="leaves-panel">
          <div className="panel-header applied">
            Applied Leaves
          </div>
          <div className="panel-content">
            <table className="leaves-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map(leave => (
                  <tr key={leave.id}>
                    <td className="profile-cell">
                      <div className="profile-icon">{leave.name.charAt(0)}</div>
                    </td>
                    <td>{leave.name}</td>
                    <td>{leave.date}</td>
                    <td>{leave.reason}</td>
                    <td>
                        <select
                            className={`status-dropdown ${leave.status.toLowerCase()}`}
                            value={leave.status}
                            onChange={(e) => handleStatusChange(leave.id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approve</option>
                            <option value="Rejected">Reject</option>
                        </select>
                    </td>
                    <td>{leave.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="calendar-panel">
          <div className="panel-header">
            Leave Calendar
          </div>
          <div className="calendar-wrapper">
          <Calendar
                value={date}
                onChange={handleDateChange}
                tileClassName={tileClassName}
                tileContent={tileContent}
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                showFixedNumberOfWeeks={true}
                showNeighboringMonth={false}
                minDetail="month"
            />

          </div>
          <div className="approved-leaves">
            Approved Leaves
            {/* <div className="approved-list">
              <div className="approved-item">
                <div className="approved-user">Sarah Johnson</div>
                <div className="approved-date">September 13, 2024</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      <AddLeaveModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveLeave}
      />
    </div>
  );
};

export default LeaveManager;