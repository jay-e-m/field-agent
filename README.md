# Field Agent Front-End Development

## Setup
- [ ] Initialize HTML, CSS, JavaScript files.
- [ ] Import Bootstrap CSS for interface styling.
- [ ] Reference JavaScript file in HTML.

## Navigation
- [ ] Display a list of all active agents and include an option to add an agent.
- [ ] If time allows, edit navigation to future-proof it a bit (Maybe start with select agency?).

## Agent Display
- [ ] Write `fetchAgents()` to send GET request to `/api/agents`.
  - [ ] Transform response data into usable format.
- [ ] Use `displayAgents()` to show fetched agents.
  - [ ] Structure HTML string to show agent data in a summary format (not all properties).
  - [ ] Append string to HTML elements.
  - [ ] Embed "Edit" and "Delete" buttons in each row, triggering `handleEdit(id)` and `handleDelete(id)` respectively.

## Agent Addition
- [ ] Set up "Add An Agent" button in the Display All Agents view.
- [ ] Set up form for new agent input when "Add An Agent" is clicked.
  - [ ] Implement input fields for agent properties.
  - [ ] Include "Submit" button.
- [ ] Write `addAgent()` to send POST request to `/api/agents`.
  - [ ] Gather form data into agent object.
  - [ ] Send POST request with agent object.
  - [ ] Update displayed agents list.

## Agent Update
- [ ] Construct form for agent editing when "Edit" button is clicked.
  - [ ] Utilize same input fields structure as new agent form.
  - [ ] Embed "Update" button to confirm changes.
- [ ] Write `updateAgent()` to send PUT request to `/api/agents/{id}`.
  - [ ] Gather edited form data into agent object.
  - [ ] Send PUT request with edited agent object.
  - [ ] Refresh displayed agents list.

## Agent Deletion
- [ ] Write `deleteAgent()` to send DELETE request to `/api/agents/{id}`.
  - [ ] Attach function to "Delete" button within each agent row.
  - [ ] Send DELETE request on button click.
  - [ ] Refresh displayed agents list.

## List
- [ ] Generate HTML string to represent agent rows in `renderList()`.
  - [ ] Loop through agents list, converting each into row HTML.
  - [ ] Include agent data within row.
  - [ ] Embed "Edit" button in each row, triggering `handleEdit(id)`.
