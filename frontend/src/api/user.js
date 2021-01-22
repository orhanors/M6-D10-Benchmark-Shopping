const { REACT_APP_BE_URL } = process.env;
export async function getSingleUser(id) {
	try {
		const response = await fetch(`${REACT_APP_BE_URL}/users/${id}`, {
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
		return error;
	}
}
