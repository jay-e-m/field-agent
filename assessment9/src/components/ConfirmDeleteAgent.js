import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findAgentById, deleteAgentById } from "../services/api";

function ConfirmDeleteAgent() {
  
  const [agent, setAgent] = useState({ firstName: '', lastName: '' });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    findAgentById(id)
      .then(data => setAgent(data))
      .catch(() => {
        navigate("/not-found", {
          state: { msg: `Agent: ${id} was not found.` }
        });
      });
  }, [id, navigate]);

  const handleDelete = () => {
    deleteAgentById(id)
      .then(res => {
        navigate("/", {
          state: { msg: `${agent.firstName} ${agent.lastName} was deleted.` }
        });
      })
      .catch(() => {
        navigate("/not-found", {
          state: { msg: `Agent: ${id} was not found.` }
        });
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>{agent.firstName} {agent.lastName}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className=" alert alert-danger">
            Are you sure you want to permanently delete this agent?
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Forever</button>
          <Link to="/" type="button" className="btn btn-secondary">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteAgent;
