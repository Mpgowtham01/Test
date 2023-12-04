import { Route, Routes } from "react-router-dom";
import Form_LR from "./Pages/Signin/Form_LR";
import TableComponent from "./Pages/Managers/TableComponent";
import Employee from "./Pages/Managers/Employee";
import Employees from "./Pages/Employee";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form_LR />} />
        <Route path="/manager" element={<TableComponent />} />
        <Route path="/manager/employee" element={<Employee />} />
        <Route path="/employee" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;
