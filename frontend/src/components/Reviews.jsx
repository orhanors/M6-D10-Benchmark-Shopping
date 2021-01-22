import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddReviews from "./AddReviews";
import { getLocalStorage } from "../helpers/localStorage";
import { postReview } from "../api/productsApi";
import { isAuthenticated } from "../helpers/auth";
import ShowReviews from "./ShowReviews";
import { withRouter } from "react-router-dom";
const Reviews = (props) => {
	//productId

	const [review, setReview] = useState({
		comment: "",
		rate: 1,
	});
	const [submittedSize, setSubmittedSize] = useState(0);
	const [reviews, setReviews] = useState([]);
	//const [productId, setProductId] = useState(props.productId);

	useEffect(() => {
		let newReview = { ...review };
		newReview.elementId = props.productId;
		setReview(newReview);
	}, [props.productId]);

	const addReview = async (e) => {
		if (!isAuthenticated()) {
			props.history.push("/auth/login");
		} else {
			e.preventDefault();
			const userId = getLocalStorage("user").id;
			if (props.productId) {
				const postedRev = await postReview(
					props.productId,
					userId,
					review
				);
				if (postedRev.data) {
					setSubmittedSize(submittedSize + 1);
					setReview({
						comment: "",
						rate: 1,
					});
				}
			}
		}
	};

	const fillForm = (e) => {
		let currentId = e.currentTarget.id;
		let newReview = { ...review };
		let result = currentId.localeCompare("rate");
		if (result === 0) {
			newReview[currentId] = Number(e.currentTarget.value);
		} else {
			newReview[currentId] = e.currentTarget.value;
		}

		setReview(newReview);
	};
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<h3 className='text-center'>Add New Review</h3>
			</Modal.Header>
			<Modal.Body>
				<AddReviews
					fillForm={fillForm}
					onHandleSubmit={addReview}
					review={review}
				/>
				<ShowReviews
					submittedSize={submittedSize}
					productId={props.productId}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default withRouter(Reviews);
