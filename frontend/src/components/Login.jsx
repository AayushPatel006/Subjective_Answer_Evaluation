import React, { useRef } from "react";
import LoginImg from "../assets/loginImg2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import notify from "../utils/toast";
import httpRequest from "../utils/httpRequest";

export default function Login() {
	const email_ref = useRef(null);
	const password_ref = useRef(null);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const email = email_ref.current.value;
		const password = password_ref.current.value;

		const { data, error } = await httpRequest("/login", "post", {
			email: email,
			password: password,
		});

		if (!error) {
			localStorage.setItem("token", data);
			return navigate("/");
		}
	};

	return (
		<div
			className={`relative h-screen w-full bg-zinc-600`}
			style={{
				backgroundImage: `url(${LoginImg})`,
			}}
		>
			<div className="flex flex-col justify-center items-center h-full">
				<form
					onSubmit={handleSubmit}
					className="max-w-[480px] rounded-xl shadow-lg shadow-black p-8 w-full mx-auto bg-white"
				>
					<h2 className="font-bold text-4xl mb-8 text-center py-4">
						Welcome Back!
					</h2>
					<div className="flex flex-col mb-4">
						<label className="text-base  font-bold">Email</label>
						<input
							className="border rounded relative p-1.5"
							type="email"
							placeholder="Enter email"
							name="email"
							id="email"
							ref={email_ref}
						/>

						<div className="flex flex-col ">
							<label className="text-base font-bold">Password</label>
							<input
								className="border relative rounded bg-transparent p-1.5"
								type="password"
								placeholder="Enter password"
								minLength={5}
								id="name"
								name="name"
								ref={password_ref}
								required
							/>
						</div>
						<button className="w-full py-3 my-4 rounded bg-blue-500 hover:bg-blue-400 relative text-white">
							Sign In
						</button>
						<h5 className="text-center font-bold ">
							Not a member? <Link to="/register">Sign-up Now</Link>
						</h5>
					</div>
				</form>
			</div>
		</div>
	);
}
