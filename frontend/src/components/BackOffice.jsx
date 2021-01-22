import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Image, Spinner, Table } from "react-bootstrap";
import { getProducts, postProductImage } from "../api/productsApi";
import AddProductForm from "./AddProductForm";
import { postProduct, removeProduct } from "../api/productsApi";
import { showErrorMessage } from "../helpers/messages";
const BackOffice = (props) => {
	const [products, setProducts] = useState([]);
	const [successMsg, setSuccesMsg] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		price: 1,
		quantity: 10,
		imageUrl: "",
		categoryId: "Tech",
	});
	const [image, setImage] = useState(null);

	const [submittedSize, setSubmittedSize] = useState(0);

	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(null);

	useEffect(() => {
		const mileStone = async () => {
			await fetchProducts();
		};

		mileStone();
	}, [submittedSize]);

	const fetchProducts = async () => {
		setLoading(true);
		const products = await getProducts();
		setProducts(products.data);
		setLoading(false);
	};
	const convertCategoryToId = (obj) => {
		const categoryArray = [
			"Tech",
			"Home",
			"Food",
			"Clothes",
			"Shoes",
			"Other",
		];

		obj.categoryId = categoryArray.indexOf(obj.categoryId) + 1;
	};
	const addProduct = async (e) => {
		e.preventDefault();
		if (update !== null) {
			let updateResult = await updateProduct(update._id, update);
			await postProductImage(update._id, image);
			alert("SUCCESS");
			setSubmittedSize(submittedSize + 1);
			console.log(updateResult);
		} else {
			convertCategoryToId(product);
			let result = await postProduct(product);
			console.log(result);
			if (!result.data) {
				setErrorMsg(result.errors);
				//const postImg = await postProductImage(result.data._id, image);
			} else {
				setSuccesMsg("Successfuly created");
				setProduct({
					name: "",
					description: "",
					brand: "",
					price: 1,
					categoryId: "Tech",
				});
			}

			setSubmittedSize(submittedSize + 1);
		}
	};

	const fillForm = (e) => {
		let currentId = e.currentTarget.id;
		let newProduct = { ...product };

		newProduct[currentId] = e.currentTarget.value;
		setProduct(newProduct);
		setErrorMsg(null);
		setSuccesMsg(null);
	};

	const fillImageForm = (e) => {
		console.log(e.target.files);
		setImage(e.target.files[0]);
	};

	const deleteProduct = async (e) => {
		let id = e.target.id;
		console.log(e.currentTarget);
		await removeProduct(id);
		setSubmittedSize(submittedSize + 1);
	};

	const showProductTable = () => {
		return (
			<div className='product-table mt-3'>
				<Container>
					<Table striped bordered hover variant='light'>
						<thead>
							<tr>
								<th>No</th>
								<th>Image</th>
								<th>Name</th>
								<th>Description</th>
								<th>Brand</th>
								<th>Price</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							) : (
								<>
									{products &&
										products.map((product, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														<Image
															style={{
																width: "50px",
																height: "50px",
															}}
															src={
																product.imageUrl
															}
														/>
													</td>
													<td>{product.name}</td>
													<td>
														{product.description}
													</td>
													<td>{product.brand}</td>
													<td>{product.price}</td>
													<td>{product.category}</td>
													<td>
														<div className='d-flex'>
															<button
																className='btn-update mr-2'
																onClick={(e) =>
																	updateProduct(
																		e,
																		product
																	)
																}>
																Update
															</button>
															<button
																id={product._id}
																onClick={(e) =>
																	deleteProduct(
																		e
																	)
																}
																className='btn-remove'>
																Remove
															</button>
														</div>
													</td>
												</tr>
											);
										})}
								</>
							)}
						</tbody>
					</Table>
				</Container>
			</div>
		);
	};
	const updateProduct = async (e, product) => {
		setProduct(product);
		setUpdate(product);
	};
	return (
		<div className='back-office'>
			<h1 className='back-office-title text-center my-3'>HOMEROS SHOP</h1>
			<h3 className='back-office-subtitle text-center mb-2'>
				Back Office
			</h3>

			<AddProductForm
				successMsg={successMsg}
				errorMsg={errorMsg}
				imageForm={fillImageForm}
				product={product}
				fillForm={fillForm}
				onHandleSubmit={addProduct}
				modified={update}
			/>

			<div>{showProductTable()}</div>
		</div>
	);
};

export default BackOffice;
