import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  // Retrieve the initial state from localStorage or fallback to default
  const [groupBy, setGroupBy] = useState(
    () => localStorage.getItem("groupBy") || "priority"
  );
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem("sortOrder") || "priority"
  );
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  // Save the user's view state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  return (
    <div className="App">
      <Header
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Board
        tickets={tickets}
        users={users}
        groupBy={groupBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default App;
