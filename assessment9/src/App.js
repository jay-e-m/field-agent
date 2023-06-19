import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AgentForm from "./components/AgentForm";
import AgentList from "./components/AgentList";
import ConfirmDeleteAgent from "./components/ConfirmDeleteAgent";
import NotFound from "./components/NotFound";

function App() {
  return (<>
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<AgentList />} />
        <Route
          path="/delete/:id"
          element={<ConfirmDeleteAgent />} />
        <Route
          path="/add"
          element={<AgentForm />} />
        <Route
          path="/edit/:id"
          element={<AgentForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </>);
}

export default App;
