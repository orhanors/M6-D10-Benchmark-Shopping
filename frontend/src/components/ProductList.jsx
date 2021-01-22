import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { getProducts } from "../api/productsApi";
import { addProductToCart, getSingleUser } from "../api/user";
import Reviews from "./Reviews";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { getLocalStorage } from "../helpers/localStorage";
const ProductList = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productId, setProductId] = useState("");
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const callMeNow = async () => {
			await fetchProducts();
		};

		callMeNow();
	}, []);

	const fetchProducts = async () => {
		setLoading(true);
		const allProducts = await getProducts();
		console.log("allproducts", allProducts);
		setProducts(allProducts.data.reverse());
		setLoading(false);
	};

	const addProduct = async (e) => {
		const userId = getLocalStorage("user")._id;
		const productId = e.target.id;
		const data = await getSingleUser(userId, productId);
		console.log("single user data ", data.data);
	};
	return (
		<div className='product-list mt-4'>
			<Reviews
				productId={productId}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			<Container>
				<Row>
					{products.map((product) => {
						return (
							<Col md={3} key={product._id} className='mb-5'>
								<Card style={{ width: "12rem" }}>
									<Card.Img
										style={{
											width: "100%",
											height: "10rem",
										}}
										variant='top'
										src={product?.imageUrl}
									/>
									<Card.Body>
										<Card.Title>{product.name}</Card.Title>
										<Card.Text>
											{product.description} <br />
											<strong>${product.price}</strong>
										</Card.Text>
										<div className='d-flex justify-content-between'>
											<Button
												onClick={() => {
													setProductId(product._id);
													setModalShow(true);
												}}
												variant='primary'>
												Reviews
											</Button>

											<AddShoppingCartIcon
												className='add-to-cart-icon'
												id={product._id}
												onClick={(e) => addProduct(e)}
											/>
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};

export default ProductList;
