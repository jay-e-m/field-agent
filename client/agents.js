const API_URL = 'http://localhost:8080/api/agent';

let agents = [];
let currentAgentId = null;

const init = () => {
  refreshList();
};

const showForm = () => {
  document.getElementById('listView').style.display = 'none';
  document.getElementById('formView').style.display = 'block';
  document.getElementById('addAgentButton').style.display = 'none';
};

const hideForm = () => {
  document.getElementById('listView').style.display = 'block';
  document.getElementById('formView').style.display = 'none';
  document.getElementById('addAgentButton').style.display = 'block';
};

const handleAdd = () => {
  currentAgentId = null;
  clearForm();
  showForm();
};

const refreshList = () => {
  fetchAgents()
    .then(data => {
      agents = data;
      renderList();
    })
    .catch(err => {
      console.error('Could not fetch agents', err);
    });
};

const renderList = () => {
  let htmlString = '<div class="row">';

  for (let agent of agents) {
    const agentHtml = `
    <div class="col-sm-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${agent.firstName} ${agent.lastName}</h5>
          <p class="card-text">Height: ${agent.heightInInches} inches</p>
          <button class="btn btn-primary" onclick="handleEdit(${agent.agentId})">Edit</button>
          <button class="btn btn-danger" onclick="handleDelete(${agent.agentId})">Delete</button>
        </div>
      </div>
    </div>`;

    htmlString += agentHtml;
  }

  htmlString += '</div>';
  document.getElementById('listView').innerHTML = htmlString;
};

const handleEdit = (id) => {
  const agent = agents.find(agent => agent.agentId === id);
  currentAgentId = id;

  document.getElementById('firstName').value = agent.firstName;
  document.getElementById('middleName').value = agent.middleName;
  document.getElementById('lastName').value = agent.lastName;
  document.getElementById('dob').value = agent.dob;
  document.getElementById('heightInInches').value = agent.heightInInches;
  
  showForm();
};


const fetchAgents = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const errorMessage = await response.json();
      throw new Error(`Failed to fetch agents: ${errorMessage}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch agents: ${error.message}`);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const agent = {
    firstName: document.getElementById('firstName').value,
    middleName: document.getElementById('middleName').value,
    lastName: document.getElementById('lastName').value,
    dob: document.getElementById('dob').value,
    heightInInches: document.getElementById('heightInInches').value,
  };

  if (currentAgentId) {
    agent.agentId = currentAgentId;
    await updateAgent(agent);
  } else {
    await addAgent(agent);
  }

  hideForm();
  refreshList();
};

const addAgent = async (agent) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agent),
    });
    if (!response.ok) {
      throw new Error('Failed to add agent');
    }
  } catch (error) {
    console.error('Failed to add agent', error);
  }
};

const updateAgent = async (agent) => {
  try {
    const response = await fetch(`${API_URL}/${agent.agentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agent),
    });
    if (!response.ok) {
      throw new Error('Failed to update agent');
    }
  } catch (error) {
    console.error('Failed to update agent', error);
  }
};

const handleDelete = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete agent');
    }

    agents = agents.filter(agent => agent.agentId !== id);

    renderList();
  } catch (error) {
    console.error('Failed to delete agent', error);
  }
};

const clearForm = () => {
  document.getElementById('firstName').value = '';
  document.getElementById('middleName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('heightInInches').value = '';
};

const handleCancel = () => {
  hideForm();
};


init();
