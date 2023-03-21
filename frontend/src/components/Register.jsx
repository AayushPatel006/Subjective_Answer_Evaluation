import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/loginImg2.jpeg";
import notify from "../utils/toast";
import httpRequest from "../utils/httpRequest";
import useAuth from "../hooks/useAuth";

export default function Register() {
	const full_name_ref = useRef(null);
	const email_ref = useRef(null);
	const password_ref = useRef(null);
	const confirm_password_ref = useRef(null);
	const { user, register } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const full_name = full_name_ref.current.value;
		const email = email_ref.current.value;
		const password = password_ref.current.value;
		const confirm_password = confirm_password_ref.current.value;

		const result = await register(full_name, email, password, confirm_password);

		if (result) {
			notify(result.msg, "success");

			navigate("/login");
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
					<h2 className="font-bold text-4xl mb-4 text-center py-4">Welcome</h2>
					<div className="flex flex-col mb-4">
						<label className="text-base  font-bold">Name</label>
						<input
							className="border rounded relative p-1.5"
							type="text"
							placeholder="Enter Full Name"
							name="name"
							id="name"
							ref={full_name_ref}
							required
						/>
					</div>

					<div className="flex flex-col ">
						<label className="text-base font-bold">Email</label>
						<input
							className="border relative rounded bg-transparent p-1.5"
							type="email"
							placeholder="Enter Email"
							name="email"
							id="email"
							ref={email_ref}
							required
						/>
					</div>
					<div className="flex flex-col ">
						<label className="text-base font-bold">Password</label>
						<input
							className="border relative rounded bg-transparent p-1.5"
							type="password"
							placeholder="Enter password"
							name="password"
							id="password"
							minLength={5}
							ref={password_ref}
							required
						/>
					</div>
					<div className="flex flex-col ">
						<label className="text-base font-bold">Confirm Password</label>
						<input
							className="border relative rounded bg-transparent p-1.5"
							type="password"
							placeholder="Verify password"
							name="confirm_password"
							id="confirm_password"
							ref={confirm_password_ref}
							minLength={5}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-3 my-4 rounded bg-blue-500 hover:bg-blue-400 relative text-white"
					>
						Sign Up
					</button>
					<h5 className="text-center font-bold ">
						Already Registered? <Link to="/login">Sign-In</Link>
					</h5>
				</form>
			</div>
		</div>
	);
}
