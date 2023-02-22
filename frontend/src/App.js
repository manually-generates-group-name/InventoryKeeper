import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AlexAPI from './pages/AlexAPI';
import AngelAPI from './pages/AngelAPI';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
