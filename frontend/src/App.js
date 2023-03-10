import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AlexAPI from './pages/AlexAPI';
import AngelAPI from './pages/AngelAPI';
import DrakeAPI from './pages/DrakeAPI';
import Users from './pages/Users';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
