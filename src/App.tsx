import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Faculty } from "./pages/faculty/Faculty";
import { UserPanel } from "./pages/user-panel/UserPanel";

// other css files are required only if
// you are using components from the corresponding package
import "@mantine/dates/styles.css";
import { Department } from "./pages/ department/ Department";
import { Division } from "./pages/devision/Devision";
import ListOFEmployees from "./pages/list-of-employees/ListOfEmployees";
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const App = () => {
  return (
    <div className="App">
      <Sidebar>
        <Routes>
          {/* <Route path='/' element={<h2>My Website</h2>} /> */}
          <Route path="/fakultet" element={<Faculty />} />
          <Route path="/xodimlar-bazasi" element={<UserPanel />} />
          <Route path="/kafedra" element={<Department />} />
          <Route path="/xodimlar-royxati" element={<ListOFEmployees />} />
          <Route path="/bolim" element={<Division />} />
          <Route path="/bolim" element={<Division />} />
        </Routes>
      </Sidebar>
    </div>
  );
};
export default App;
