import React from "react";
import FeatureRequestIcon from "../../assets/icons/SVG - Urgent Priority grey.svg";

const Card = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <div className="card-header">
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="card-body">
        <div className="card-tags">
          <div className="priority-icon">
            <img
              src={FeatureRequestIcon}
              alt="Feature Request"
              className="card-icon"
            />
          </div>
          <div className="tag">
            <p>{ticket.tag[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
