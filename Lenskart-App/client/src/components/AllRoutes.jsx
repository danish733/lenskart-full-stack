import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import Admin from '../pages/Admin'
import Products from './Products'
import ProductDetail from './ProductDetail'
import AdminLogin from '../pages/AdminLogin'
import AdminAddProduct from './AdminAddProduct'
import AdminUserDetail from './AdminUserDetail'
import AdminDetail from './AdminDetail'
import AdminEditProduct from './AdminEditProduct'
import Myorder from '../pages/Myorder'
import MProduct from '../Mobile/MProduct'
import MProductView from '../Mobile/MProductView'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/admin/' element={<Admin/>}/>
            <Route path='/admin/addproduct' element={<AdminAddProduct/>}/>
            <Route path='/admin/editproduct/:id' element={<AdminEditProduct/>}/>
            <Route path='/admin/userDetail' element={<AdminUserDetail/>}/>
            <Route path='/admin/adminDetail' element={<AdminDetail/>}/>
            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route path='/product' element={<Products/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/myorder' element={<Myorder/>}/>
            <Route path='/glasses' element={<MProduct/>}/>
            <Route path='/glasses/:id' element={<MProductView/>}/>

        </Routes>
    </div>
  )
}

export default AllRoutes