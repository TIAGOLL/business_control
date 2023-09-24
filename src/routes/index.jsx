import { Routes, Route } from 'react-router-dom'
import '../globals.css'

//Autenticação
import SignIn from '../pages/Autenticação/SignIn/index';
import Register from '../pages/Autenticação/Register';
// import Private from './private';

//Dashboard
import Dashboard from '../pages/Dashboard';

//Produto
import Product from '../pages/Product';
import ProductById from '../pages/Product/[ProductById]';
import CreateProduct from '../pages/Product/CreateProduct';




function RoutesApp() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<Register />} />

      {/* Dashboard */}
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Produto */}
      <Route path='/dashboard/product' element={<Product />} />
      <Route path='/dashboard/product/:id' element={<ProductById />} />
      <Route path='/dashboard/product/create' element={<CreateProduct />} />

    </Routes>
  )
}

export default RoutesApp;