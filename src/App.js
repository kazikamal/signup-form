import React from 'react';
import SignupForm from './components/SignupForm';
import Login from './pages/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './pages/Navbar';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/SignupForm' element={<SignupForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;