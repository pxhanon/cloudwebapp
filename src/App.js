import './App.css';
import Login from './Login';
import Main from './Main';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="login" element={<Login/>} />
      <Route path="main" element={<Main/>} />
      {/* <Route path="register" element={<Register/>}/> */}
    </Routes>
  );
}

export default App;
