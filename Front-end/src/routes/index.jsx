import { Routes, Route } from 'react-router-dom'

//Autenticação
import SignIn from '../pages/Autenticação/SignIn/index';
import Register from '../pages/Autenticação/Register';
import Private from './private';

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
      <Route path='/dashboard' element={<Private><Dashboard /></Private>} />

      {/* Produto */}
      <Route path='/dashboard/products' element={<Private><Products /></Private>} />
      <Route path='/dashboard/products/:id' element={<Private><ProductsById /></Private>} />

      {/* Pedidos de compra */}
      <Route path='/dashboard/requests' element={<Private><Requests /></Private>} />
      <Route path='/dashboard/requests/:id' element={<Private><RequestsById /></Private>} />
    </Routes>
  )
}

export default RoutesApp;
