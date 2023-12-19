import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Layout/Home';
import FooterDev from './Components/Layout/FooterDev';
import ProductDetails from './Components/Product/ProductDetails';
import AllProductDetails from './Components/Product/AllProductDetails';
import Search from './Components/Product/Search';
import LoginSignup from './Components/User/LoginSignup';
import store from './store'
import { loaduser } from './actions/userAction';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import axios from 'axios'
import Payment from './Components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './Components/Cart/OrderSuccess';
import MyOrders from './Components/Order/MyOrders';
import OrderDetails from './Components/Order/OrderDetails';
import DashBoard from './Components/Admin/DashBoard';
import ErrorPage from './Components/Route/ErrorPage';
import ProductList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderList from './Components/Admin/OrderList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UsersList from './Components/Admin/UserList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';



function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    store.dispatch(loaduser());

    getStripeApiKey();

  }, []);


  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" Component={AllProductDetails} />
        <Route path="/products/:keyword" Component={AllProductDetails} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSignup} />
        {isAuthenticated && <Route exact path="/profile"  Component={Profile}/>}
        {isAuthenticated && <Route exact path="/me/update"  Component={UpdateProfile}/>}
        {isAuthenticated && <Route exact path="/password/update"  Component={UpdatePassword}/>}
        <Route  exact path='/password/forgot' Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/cart" Component={Cart} />
        {isAuthenticated && <Route exact path="/login/shipping"  Component={Shipping}/>}
        {isAuthenticated && <Route exact path="/order/confirm" Component={ConfirmOrder} />}

        {
          stripeApiKey && isAuthenticated && (
            <Route exact path="/process/payment"  element={(
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )} />
          )
        }

        {isAuthenticated && <Route exact path ='/success' Component={OrderSuccess}/>}

      {isAuthenticated && <Route exact path="/orders" Component={MyOrders} />}
      {isAuthenticated && <Route exact path="/order/:id" Component={OrderDetails} />}



       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/dashboard" Component={DashBoard}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/products" Component={ProductList}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/product" Component={NewProduct}/>}
       
       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/product/:id" Component={UpdateProduct}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/orders" Component={OrderList}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/order/:id" Component={ProcessOrder}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/users" Component={UsersList}/>}

       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/user/:id" Component={UpdateUser}/>}
       {isAuthenticated && user.role=="admin" && <Route exact path="/admin/reviews" Component={ProductReviews}/>}

       
      
       <Route path="/*" element={<ErrorPage />} />


      </Routes>
      <FooterDev />
    </Router>
  );
}

export default App;
