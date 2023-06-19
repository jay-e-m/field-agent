const API_URL = 'http://localhost:8080/api/agent';

export async function findAllAgents() {
  const response = await fetch(API_URL);
  if (response.status === 200) {
    return response.json();
  }
}

export async function findAgentById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (response.status === 200) {
    return response.json();
  } else {
    return Promise.reject(`Agent: ${id} was not found.`);
  }
}

export async function createAgent(agent) {
  const init = makeAgentInit('POST', agent);
  const response = await fetch(API_URL, init);

  if (response.status === 201) {
    return response.json();
  } else {
    const errors = await response.json();
    return Promise.reject(errors);
  }
}

export async function updateAgent(agent) {
  const init = makeAgentInit('PUT', agent);
  const response = await fetch(`${API_URL}/${agent.agentId}`, init);

  if (response.status === 404) {
    return Promise.reject(`Agent: ${agent.agentId} was not found.`);
  } else if (response.status === 400) {
    const errors = await response.json();
    return Promise.reject(errors);
  }
}

function makeAgentInit(method, agent) {
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(agent)
  };

  return init;
}

export async function deleteAgentById(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  if (response.status === 404) {
    return Promise.reject(`Agent: ${id} was not found.`);
  }
}
