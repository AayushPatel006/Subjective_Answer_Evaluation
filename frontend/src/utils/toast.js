import { toast } from "react-toastify";

export default function notify(content, type) {
	toast(content, {
		autoClose: 5000,
		pauseOnHover: true,
		theme: "light",
		position: "top-right",
		type: type,
	});
}
