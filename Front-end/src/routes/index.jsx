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
import Sales from '../pages/Sales';
import SalesById from '../pages/Sales/[SalesById]';
import Clients from './../pages/Clients/index';
import ClientsById from './../pages/Clients/[ClientsById]/index';
import Admin from './../pages/admin/index';



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

      {/* Vendas */}
      <Route path='/dashboard/sales' element={<Private><Sales /></Private>} />
      <Route path='/dashboard/sales/:id' element={<Private><SalesById /></Private>} />

      {/* Clientes */}
      <Route path='/dashboard/clients' element={<Private><Clients /></Private>} />
      <Route path='/dashboard/clients/:id' element={<Private><ClientsById /></Private>} />

      {/* admin */}
      <Route path='/dashboard/admin' element={<Private><Admin /></Private>} />
    </Routes>
  )
}

export default RoutesApp;
