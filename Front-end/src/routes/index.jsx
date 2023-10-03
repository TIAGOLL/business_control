import { Routes, Route } from 'react-router-dom'

//Autenticação
import SignIn from '../pages/Autenticação/SignIn/index';
import Register from '../pages/Autenticação/Register';
// import Private from './private';

//Dashboard
import Dashboard from '../pages/Dashboard';

//Produto
import Products from '../pages/Products';
import ProductsById from '../pages/Products/[ProductsById]';

//Requests
import Requests from '../pages/Requests';
import RequestsById from '../pages/Requests/[RequestsById]';



function RoutesApp() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<Register />} />

      {/* Dashboard */}
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Produto */}
      <Route path='/dashboard/products' element={<Products />} />
      <Route path='/dashboard/products/:id' element={<ProductsById />} />

      {/* Pedidos de compra */}
      <Route path='/dashboard/requests' element={<Requests />} />
      <Route path='/dashboard/requests/:id' element={<RequestsById />} />
    </Routes>
  )
}

export default RoutesApp;
