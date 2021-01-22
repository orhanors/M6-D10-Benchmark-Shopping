import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { showErrorMessage, showSuccessMessage } from "../helpers/messages";
//
const AddProductForm = (props) => {
	return (
		<div className='product-form'>
			<Container>
				<Form onSubmit={props.onHandleSubmit}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							id='name'
							type='text'
							placeholder='Name'
							value={props.product.name}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							id='description'
							as='textarea'
							rows={2}
							value={props.product.description}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							id='brand'
							type='text'
							placeholder='Brand Name'
							value={props.product.brand}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control
							id='price'
							type='number'
							value={props.product.price}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Quantity</Form.Label>
						<Form.Control
							id='quantity'
							type='number'
							value={props.product.quantity}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control
							id='category'
							as='select'
							value={props.product.category}
							onChange={props.fillForm}>
							<option>Tech</option>
							<option>Home </option>
							<option>Food</option>
							<option>Drink</option>
							<option>Other</option>
						</Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Img Url</Form.Label>
						<Form.Control
							id='imageUrl'
							type='url'
							value={props.product.imageUrl}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.File
							id='imageUrl'
							label='Example file input'
							onChange={props.imageForm}
						/>
					</Form.Group>
					{props.modified ? (
						<Button variant='primary' type='submit'>
							Update
						</Button>
					) : (
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					)}
				</Form>
				<div className='my-3'>
					{props.errorMsg && showErrorMessage(props.errorMsg)}
				</div>

				<div className='my-3'>
					{props.successMsg && showSuccessMessage(props.successMsg)}
				</div>
			</Container>
		</div>
	);
};

export default AddProductForm;
