import './App.css';
import Login from './componants/login/login.js';
import Todo from './componants/todo/todo';
import Register from './componants/register/register';
import User from './componants/user/user';
import UserId from './componants/user/user_id';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
            <Route path='home' element={<Todo/>}></Route>
            <Route path='user' element={<User/>}></Route>
            <Route path='/users/:idd' element={<UserId/>} exact={false} ></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
