const getHighscore = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/highscore`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return { error: "Failed to fetch highscore" };
	}
};

export default getHighscore;
