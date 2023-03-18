import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AlexAPI from './pages/AlexAPI';
import AngelAPI from './pages/AngelAPI';
import DrakeAPI from './pages/DrakeAPI';
import Users from './pages/Users';
import Demo from './pages/Demo';
import CreateList from './pages/CreateList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path = "/"
              element={<Home />}
            />
          <Route 
              path = "/alex"
              element={<AlexAPI />}
            />
          <Route
              path = "/angel"
              element={<AngelAPI />}
            />
          <Route
              path = "/drake"
              element={<DrakeAPI />}
            />
          <Route 
              path = "/users"
              element={<Users />}
            />
          <Route
              path = "/demo"
              element={<Demo />}
          />
          <Route
              path = "/createList"
              element={<CreateList />}
          />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
