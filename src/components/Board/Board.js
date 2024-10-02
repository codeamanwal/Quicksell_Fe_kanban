import React from "react";
import HighPriorityIcon from "../../assets/icons/Img - High Priority.svg";
import MediumPriorityIcon from "../../assets/icons/Img - Medium Priority.svg";
import LowPriorityIcon from "../../assets/icons/Img - Low Priority.svg";
import UrgentPriorityIcon from "../../assets/icons/SVG - Urgent Priority colour.svg";
import NoPriorityIcon from "../../assets/icons/No-priority.svg";
import Card from "../Card/Card";

const Board = ({ tickets, users, groupBy, sortOrder }) => {
  const getUserById = (id) =>
    users.find((user) => user.id === id)?.name || "Unknown User";

  // Group tickets by priority
  const groupTicketsByPriority = () => {
    const priorityGroups = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };

    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      priorityGroups[priority].push(ticket);
    });

    return priorityGroups;
  };

  // Group tickets by user
  const groupTicketsByUser = () => {
    const userGroups = {};

    tickets.forEach((ticket) => {
      const user = getUserById(ticket.userId);
      if (!userGroups[user]) {
        userGroups[user] = [];
      }
      userGroups[user].push(ticket);
    });

    return userGroups;
  };

  const sortedTickets = (group) => {
    if (sortOrder === "priority") {
      return group.sort((a, b) => b.priority - a.priority);
    } else {
      return group.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const priorityIcons = {
    0: NoPriorityIcon,
    1: LowPriorityIcon,
    2: MediumPriorityIcon,
    3: HighPriorityIcon,
    4: UrgentPriorityIcon,
  };

  // Determine grouping
  let groupedTickets = {};
  let labelKeys = [];

  if (groupBy === "priority") {
    groupedTickets = groupTicketsByPriority();
    labelKeys = ["No priority", "Low", "Medium", "High", "Urgent"]; // Labels for priority groups
  } else if (groupBy === "user") {
    groupedTickets = groupTicketsByUser();
    labelKeys = Object.keys(groupedTickets); // User names
  }

  return (
    <div className="board">
      {labelKeys.map((label, index) => (
        <div key={label} className="column">
          <h2>
            {groupBy === "priority" ? (
              <>
                <img
                  src={priorityIcons[index]}
                  alt="Priority Icon"
                  className="priority-icon-header"
                />
                {label}
              </>
            ) : (
              label
            )}
          </h2>
          <div className="cards">
            {sortedTickets(groupedTickets[label] || groupedTickets[index]).map(
              (ticket) => (
                <Card
                  key={ticket.id}
                  ticket={ticket}
                  user={getUserById(ticket.userId)}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
