import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentCard from './AgentCard';
import { findAllAgents } from '../services/api'; 

function AgentList() {
  
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    findAllAgents()
      .then(data => setAgents(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {agents.length > 0 
          ? agents.map(agent => (
            <div className="col-sm-6 col-lg-4" key={agent.agentId}>
              <AgentCard agent={agent} />
            </div>
          ))
          : <div className="col-sm-6 col-lg-4">No Agents Found</div>
        }
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Link to="/add" className="btn btn-success">Add New Agent</Link>
      </div>
    </div>
  );
}

export default AgentList;
