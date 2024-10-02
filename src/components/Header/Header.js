import React, { useState } from "react";
import "./Header.css"; 

const Header = ({ groupBy, setGroupBy, sortOrder, setSortOrder }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      <div className="display-dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <span>Display</span>
          <i className="arrow-down"></i>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="dropdown-option">
              <label>Grouping:</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-option">
              <label>Ordering:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
