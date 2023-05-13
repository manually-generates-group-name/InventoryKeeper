import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import UserListPage from "./pages/UserListPage";
import SharedListPage from "./pages/SharedListPage";

/**
 * This function handles the different routes of the website.
 * Current routes: / - leads to Home, /createList - leads to ListPage,
 * /signUp - leads to SignUpPage, /login - leads to LoginPage,
 * /viewLists - leads to UserListPage
 * /viewLists/:userId/:listId - leads to SharedListPage
 */
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
            <Route path="/viewLists" element={<UserListPage />} />
            <Route
              path="/viewList/:userId/:listId"
              element={<SharedListPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
