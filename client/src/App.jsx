import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Recharge from './components/Recharge/Recharge';
import Fuliza from './components/Fuliza/Fuliza';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/Recharge' element={<Recharge/>} />
      <Route path='/Fuliza' element={<Fuliza/>} />
      <Route path='/home' element={<Home/>} />      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
