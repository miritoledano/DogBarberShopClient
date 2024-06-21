import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from './features/users/Login';
import { Logout } from './features/users/logOut';
import { Home } from './home';
import { AddQueueToList } from './features/queue/AddOueueToList';
import { UpdateQueue } from './features/queue/UpdateQueueById';
import { SineUp } from './features/user/SineUp';
import { GetAllQueue } from './features/queue/GetAllQueue';
import { DeleteQueue } from './features/queue/DeleteQueue'; // Import DeleteQueue

function App() {
  return (
    <>
      <Routes>
        <Route path='/addOuue' element={<AddQueueToList />} />
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SineUp />} />
     
        <Route path='/getAllQueue' element={<GetAllQueue />} />
        <Route path='/UpdateQueue/:id' element={<UpdateQueue />} />
        <Route path='/deleteQ/:id' element={<DeleteQueue />} /> {/* Correct element prop */}
      </Routes>
      <Home />
      {/* <Logout /> */}
    </>
  );
}

export default App;
