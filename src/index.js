import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import SignIn from './page/backoffice/SignIn';
import Home from './page/backoffice/Home';
import Product from './page/backoffice/Product';
import Order from './page/backoffice/Order';



const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/product",
    element: <Product/>
  },
  {
    path: "/order",
    element: <Order/>
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
