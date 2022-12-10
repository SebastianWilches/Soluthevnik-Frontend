import './App.css';
import OrderRawMaterial from "./vistas/orderRawMaterial/OrderRawMaterial";
import Login from "./vistas/Login/Login";
import ShowOrder from './vistas/ShowOrder/ShowOrder'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/createOrder' element={<OrderRawMaterial/>}/>
          <Route path='/ListOrders' element={<ShowOrder/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
