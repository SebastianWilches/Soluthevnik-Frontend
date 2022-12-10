import './App.css';
import OrderRawMaterial from "./vistas/orderRawMaterial/OrderRawMaterial";
import Login from "./vistas/Login/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createOrder' element={<OrderRawMaterial/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
