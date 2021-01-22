const { REACT_APP_BE_URL } = process.env;

export const addToCart = async (userId, productId) => {
	try {
		const response = await fetch(
			`${REACT_APP_BE_URL}/api/cart/${userId}/add/${productId}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);

		if (response.ok) {
			let result = response.json();
			return result;
		} else {
			let error = response.json();
			return error;
		}
	} catch (error) {
		console.log("Add to cart error: ", error);
		return error;
	}
};

export const getCart = async (userId) => {
	try {
		const response = await fetch(`${REACT_APP_BE_URL}/api/cart/${userId}`, {
			method: "GET",
		});
		if (response.ok) {
			let data = response.json();
			return data;
		} else {
			let error = response.json();
			return error;
		}
	} catch (error) {
		console.log("GET cart error: ", error);
		return error;
	}
};
