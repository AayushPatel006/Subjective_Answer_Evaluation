import httpRequest from "./httpRequest";

const verifyToken = async () => {
	const token = localStorage.getItem("token");

	if (!token) return false;

	const { data, error } = await httpRequest(
		"/verify",
		"get",
		{
			params: {
				token: token,
			},
		},
		false
	);

	if (!error) {
		return data;
	}

	return false;
};

export default verifyToken;
