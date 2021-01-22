import React, { useEffect, useState } from "react";

import { ListGroup, Container } from "react-bootstrap";
import { getLocalStorage } from "../helpers/localStorage";
import { getCart } from "../api/cart";
function UserCart(props) {
	const [cart, setCart] = useState({});

	useEffect(() => {
		getUserCart();
	}, []);

	const getUserCart = async () => {
		const userId = getLocalStorage("user").id;
		console.log(userId);
		const result = await getCart(userId);
		console.log("cart result", result);
		setCart(result.data);
	};
	const showProductList = () => {
		return (
			<ListGroup>
				{cart?.products?.map((product) => {
					return (
						<ListGroup.Item>
							<div className='d-flex justify-content-between'>
								<img
									style={{ width: 40, height: 40 }}
									alt='prdct'
									src={product.product.imageUrl}
								/>

								<p className='mt-2 ml-2'>
									{product.product.name.substring(0, 13) +
										"..."}
								</p>

								<p className='mt-2 ml-2'>
									qty: <strong>{product.unitary_qty}</strong>
								</p>

								<p className='mt-2 ml-2'>
									{" "}
									<strong>$</strong>
									{product.total}{" "}
								</p>
							</div>
						</ListGroup.Item>
					);
				})}

				<ListGroup.Item>
					<div className='float-right'>
						<p>
							Total:
							<strong> $</strong>
							{cart.total}
						</p>
					</div>
				</ListGroup.Item>
			</ListGroup>
		);
	};
	return (
		<Container>
			<div>
				<p className='welcome text-center mt-5'>
					{" "}
					Continue shopping{" "}
					<strong>{getLocalStorage("user").name}</strong>
				</p>
				{cart?.products?.length > 0 ? (
					showProductList()
				) : (
					<h3 className='text-center mt-5'>No items found</h3>
				)}
			</div>
		</Container>
	);
}

export default UserCart;
