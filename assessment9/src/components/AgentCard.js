import React from 'react';
import { Link } from 'react-router-dom';

function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <h5>{agent.firstName} {agent.lastName}</h5>
      <p>Height: {agent.heightInInches} inches</p>
      <Link to={`/edit/${agent.agentId}`} className="btn btn-primary">Edit</Link>
      <Link to={`/delete/${agent.agentId}`} className="btn btn-danger">Delete</Link>
    </div>
  );
}

export default AgentCard;
