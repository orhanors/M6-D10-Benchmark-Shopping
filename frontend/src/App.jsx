import "./App.css";
import React, { useState, useEffect } from "react";
import { getSingleUser, removeProductFromCart } from "./api/user";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BackOffice from "./components/BackOffice";
import UserCart from "./components/UserCart";
import Signin from "./components/Authorization/Signin";
import Signup from "./components/Authorization/Signup";
import { getLocalStorage } from "./helpers/localStorage";
function App() {
	const [cart, setCart] = useState([]);

	const [deletedSize, setDeletedSize] = useState(0);

	useEffect(() => {
		const handleAsync = async () => {
			getUserCart();
		};
		handleAsync();
	}, [deletedSize]);

	const getUserCart = async () => {
		const userId = getLocalStorage("user")._id;
		const result = await getSingleUser(userId);
		setCart(result.data.cart);
		console.log("user data result is", result.data);
	};
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
				<Route
					path='/shoppingCart'
					render={(props) => (
						<UserCart
							{...props}
							cart={cart}
							//handleDelete={deleteProduct}
						/>
					)}
				/>
				<Route path='/' exact component={Home} />
				<Route path='/products' component={BackOffice} />
				<Route path='/auth/login' component={Signin} />
				<Route path='/auth/signup' component={Signup} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
