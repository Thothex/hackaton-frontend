export const register = async ({ email, password, username }) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, username }),
		});
		if (res.status === 201) {
			const data = await res.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};
