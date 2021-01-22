import { Alert } from "react-bootstrap";

export const showErrorMessage = (msg) => {
	return <Alert variant='danger'>{msg}</Alert>;
};

export const showSuccessMessage = (msg) => {
	return <Alert variant='success'>{msg}</Alert>;
};
