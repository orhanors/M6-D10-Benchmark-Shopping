import React, { useEffect, useState } from "react";
import {
	getAllReviews,
	deleteReview,
	getSingleProduct,
} from "../api/productsApi";

import { ListGroup, Button } from "react-bootstrap";
const ShowReviews = (props) => {
	const [reviews, setReviews] = useState([]);
	const [product, setProduct] = useState([]);
	const [deletedSize, setDeletedSize] = useState(0);

	const getReviews = async () => {
		const result = await getAllReviews(props.productId);
		console.log("reviews: ", result);
		setProduct(result.data); //whole product
		setReviews(result.data.reverse());
	};
	const handleDelete = async (e) => {
		let id = e.currentTarget.id;
		console.log(e.currentTarget);
		const result = await deleteReview(id);
		alert(result);
		setDeletedSize(deletedSize + 1);
	};
	useEffect(() => {
		const handler = async () => {
			await getReviews();
		};
		handler();
	}, [props.submittedSize, deletedSize]);
	return (
		<div>
			{reviews && reviews.length > 0 && (
				<h1 className='text-center mt-3'>Reviews</h1>
			)}
			<ListGroup>
				{reviews &&
					reviews.map((rev) => {
						return (
							<div>
								<ListGroup.Item>
									<strong>user: </strong> {rev.user.username}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>comment: </strong> {rev.comment}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>rate: </strong> {rev.rate}
								</ListGroup.Item>

								<ListGroup.Item>
									<Button
										id={rev.id}
										onClick={(e) => handleDelete(e)}
										variant='danger'>
										Delete
									</Button>
								</ListGroup.Item>
							</div>
						);
					})}
			</ListGroup>
		</div>
	);
};

export default ShowReviews;
