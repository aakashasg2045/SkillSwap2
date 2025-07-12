import React, { useState } from "react";
import "../swap.css";
import Header from "./Header";

function Listing() {
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for swap requests
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 1,
      name: "Marc Demo",
      profilePhoto:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 3.4,
      skillsOffered: ["Java Script"],
      skillsWanted: ["Database"],
      status: "Pending",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      profilePhoto:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 4.2,
      skillsOffered: ["React", "Node.js"],
      skillsWanted: ["Python", "Machine Learning"],
      status: "Rejected",
    },
    {
      id: 3,
      name: "Alex Thompson",
      profilePhoto:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      rating: 4.8,
      skillsOffered: ["UI/UX Design"],
      skillsWanted: ["Frontend Development"],
      status: "Pending",
    },
  ]);

  const handleAccept = (id) => {
    setSwapRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "Accepted" } : request
      )
    );
  };

  const handleReject = (id) => {
    setSwapRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  const filteredRequests = swapRequests.filter((request) => {
    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      request.skillsWanted.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="app">
      <Header />

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="filter-dropdown">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Swap Requests */}
      <div className="requests-container">
        {filteredRequests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="profile-section">
              <img
                src={request.profilePhoto}
                alt={`${request.name} Profile`}
                className="profile-photo"
              />
              <div className="profile-info">
                <div className="rating">
                  <span className="rating-text">rating</span>
                  <span className="rating-value">{request.rating}/5</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3 className="user-name">{request.name}</h3>

              <div className="skills-row">
                <span className="skills-label">Skills Offered =&gt;</span>
                <div className="skills-tags">
                  {request.skillsOffered.map((skill, index) => (
                    <span key={index} className="skill-tag skill-offered">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skills-row">
                <span className="skills-label">Skill wanted =&gt;</span>
                <div className="skills-tags">
                  {request.skillsWanted.map((skill, index) => (
                    <span key={index} className="skill-tag skill-wanted">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="status-section">
              <div className="status-header">
                <span className="status-label">Status</span>
                <span
                  className={`status-badge ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>
              </div>

              {request.status === "Pending" && (
                <div className="action-buttons">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="action-button accept"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="action-button reject"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;
