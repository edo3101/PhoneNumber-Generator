import GenerateNumberPage from "./GenerateNumberPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Home";
import PhoneDetail from "./PhoneDetail";
import "./index.css";
import UserLogin from "./login";
import FormRegister from "./Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/create" element={<Home />} />
          <Route path="/auto" element={<GenerateNumberPage />} />
          <Route path="/phone/:phoneID" element={<PhoneDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
