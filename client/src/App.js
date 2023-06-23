import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/create" element={<Create/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
