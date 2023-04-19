import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createList" element={<ListPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
