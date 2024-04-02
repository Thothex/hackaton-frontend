const getHighscore = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/highscore`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.status === 401) {
			return { status: 403, error: "Failed to fetch highscore" };
		}
		const data = await response.json();
		return data;
	} catch (error) {
		return { error: "Failed to fetch highscore" };
	}
};

export default getHighscore;
