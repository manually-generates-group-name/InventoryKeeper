import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AlexAPI from './pages/AlexAPI';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>

    <div>
      <BrowserRouter>
         <div className='pages'>
           <Routes>
             <Route
               path = "/"
               element={<Home />}
             />
           <Route
               path = "/angel"
               element={<AngelAPI />}
             />
           </Routes>
         </div>
       </BrowserRouter>
     </div>

  );
}

export default App;
