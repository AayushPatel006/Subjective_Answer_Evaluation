import axiosInstance from "./axiosInstance";
import notify from "./toast";

const httpRequest = async (url, type, body, showToast) => {
	try {
		switch (type) {
			case "get":
				return await handleGet(url, body);
			case "post":
				return await handlePost(url, body);

			default:
				console.log("Unknown request type!");
				break;
		}
	} catch (err) {
		console.log(err);
		const { detail } = err.response.data || err.message;
		if (showToast) notify(detail, "error");
		return { data: false, error: err };
	}
};

const handleGet = async (url, body) => {
	return await axiosInstance.get(url, body);
};
const handlePost = async (url, body) => {
	return await axiosInstance.post(url, body);
};

export default httpRequest;
