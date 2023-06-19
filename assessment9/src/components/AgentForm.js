import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createAgent, updateAgent, findAgentById } from "../services/api";
import Errors from "./Errors";

const EMPTY_AGENT = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  heightInInches: "",
};

function AgentForm() {
  const [agent, setAgent] = useState(EMPTY_AGENT);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      findAgentById(id)
        .then(data => setAgent(data))
        .catch(err => {
          navigate("/error", {
            state: { msg: err }
          });
        });
    } else {
      setAgent(EMPTY_AGENT);
    }
  }, [id, navigate]);

  const handleChange = (event) => {
    const nextAgent = { ...agent };
    let nextValue = event.target.value;
    
    if (event.target.type === 'number') {
      nextValue = parseFloat(nextValue, 10);
      if (isNaN(nextValue)) {
        nextValue = event.target.value;
      }
    }
    
    nextAgent[event.target.name] = nextValue;
    setAgent(nextAgent);
  }

  const handleSaveAgent = (event) => {
    event.preventDefault();

    if (id) {
      updateAgent(agent)
        .then(() => {
          navigate("/", {
            state: {
              msgType: 'success',
              msg: `${agent.firstName} was updated!`
            }
          });
        })
        .catch(err => setErrors(err));
    } else {
      createAgent(agent)
        .then(() => {
          navigate("/", {
            state: { msg: `${agent.firstName} was added!` }
          });
        })
        .catch(err => setErrors(err));
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={handleSaveAgent}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={agent.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="middleName" className="form-label">Middle Name</label>
          <input type="text" className="form-control" id="middleName" name="middleName" value={agent.middleName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={agent.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input type="date" className="form-control" id="dob" name="dob" value={agent.dob} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="heightInInches" className="form-label">Height (in inches)</label>
          <input type="number" className="form-control" id="heightInInches" name="heightInInches" value={agent.heightInInches} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Save</button>
          <Link to="/" type="button" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
      <Errors errors={errors} />
    </div>
  );

}

export default AgentForm;
