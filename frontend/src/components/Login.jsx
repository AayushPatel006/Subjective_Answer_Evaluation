import React from "react";
import LoginImg from "../assets/loginImg2.jpeg";
import { NavLink } from "react-router-dom";

export default function Login() {
	return (
		<div className="relative h-screen w-full bg-zinc-600">
			<img
				src={LoginImg}
				alt=""
				className="absolute h-full w-full object-cover mix-blend-overlay"
			/>
			<div className="flex flex-col justify-center items-center h-full">
				<div
					action=""
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
							name=""
							id=""
						/>
					</div>

					<div className="flex flex-col ">
						<label className="text-base font-bold">Password</label>
						<input
							className="border relative rounded bg-transparent p-1.5"
							type="password"
							placeholder="Enter password"
						/>
					</div>
					<button className="w-full py-3 my-4 rounded bg-blue-500 hover:bg-blue-400 relative text-white">
						Sign In
					</button>
					<h5 className="text-center font-bold cursor-pointer">
						<NavLink to="/signup">Not a member? Sign-up Now</NavLink>
					</h5>
				</div>
			</div>
		</div>
	);
}
