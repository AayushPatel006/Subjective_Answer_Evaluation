import axiosInstance from "./axiosInstance";
import notify from "./toast";

const httpRequest = async (url, type, body) => {
	try {
		switch (type) {
			case "get":
				return await handleGet(url);
			case "post":
				return await handlePost(url, body);

			default:
				console.log("Unknown request type!");
				break;
		}
	} catch (err) {
		const { detail } = err.response.data;
		notify(detail, "error");
		return { data: false, error: err };
	}
};

const handleGet = async (url) => {
	return await axiosInstance.get(url);
};
const handlePost = async (url, body) => {
	return await axiosInstance.post(url, body);
};

export default httpRequest;
