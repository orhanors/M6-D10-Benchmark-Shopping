import "./App.css";
import React, { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BackOffice from "./components/BackOffice";

import Signin from "./components/Authorization/Signin";
import Signup from "./components/Authorization/Signup";
import { getLocalStorage } from "./helpers/localStorage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import UserCart from "./components/UserCart";
function App() {
	const [cart, setCart] = useState([]);

	const [deletedSize, setDeletedSize] = useState(0);

	// const deleteProduct = async (e) => {
	// 	const cartId = "5f6b1991df85440017160811";
	// 	const productId = e.target.id;

	// 	const result = await removeProductFromCart(cartId, productId);
	// 	setDeletedSize(deletedSize + 1);
	// 	alert(result);
	// };

	return (
		<div className='App'>
			<Router>
				<NavBar />

				<Route path='/' exact component={Home} />
				<ProtectedRoute path='/products' exact component={BackOffice} />
				<Route path='/auth/login' exact component={Signin} />
				<Route path='/auth/signup' exact component={Signup} />
				<ProtectedRoute path='/cart' exact component={UserCart} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
