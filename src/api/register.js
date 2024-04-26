export const register = async ({ email, password, username }) => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, username }),
		});
			const data = await res.json();
			return {data: data, status: res.status};

	} catch (error) {
		console.error(error);
	}
};
