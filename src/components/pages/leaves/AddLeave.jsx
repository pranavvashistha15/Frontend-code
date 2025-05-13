
import { useState } from 'react';
import './leaves.css';

const AddLeaveModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    designation: '',
    leaveDate: '',
    reason: '',
    documents: null
  });

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


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'documents') {
      setFormData({
        ...formData,
        [name]: files[0] || null
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    
    onSave(formData);
    setFormData({
      employeeName: '',
      designation: '',
      leaveDate: '',
      reason: '',
      documents: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Leave</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="employeeName"
                placeholder="Employee Name*"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="designation"
                placeholder="Designation*"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
                <input
                    type="date"
                    name="leaveDate"
                    placeholder="Leave Date*"
                    value={formData.leaveDate}
                    onChange={handleChange}
                    required
                />  
            </div>

            <div className="form-group">
              <div className="file-input">
                <input
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  required
                  className="hidden-file-input"
                />
                <div className="file-input-label">
                  <span>{formData.documents ? formData.documents.name : "Insert documents"}</span>
                  <UploadIcon />
                </div>
                </div>
              </div>
            </div>

          <div className="form-row">
            <div className="form-group full-width">
              <input
                type="text"
                name="reason"
                placeholder="Reason*"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveModal;