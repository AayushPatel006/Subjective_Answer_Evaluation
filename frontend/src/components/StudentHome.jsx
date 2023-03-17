import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useLayoutEffect, useState } from "react";
import verifyToken from "../utils/verifyToken";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Home = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	useLayoutEffect(() => {
		const get = async () => {
			const data = await verifyToken();
			if (!data) navigate("/login");
		};

		get();
	}, []);

	return (
		<div className="w-full h-screen flex items-center bg-gradient-to-r from-white to-slate-300">
			<Nav />
			<div className="w-2/5 h-2/3 shadow-md shadow-gray-700 mt-2 ml-10 bg-gray-400">
				<Menu
					as="div"
					className="relative inline-block text-left"
				>
					<div>
						<Menu.Button className="inline-flex w-[547px] px-4 py-2 text-md font-semibold text-white bg-gray-400 border border-gray-400 shadow-lg">
							Available Exams
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 ml-2 mr-1 mt-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="flex text-white w-[547px] mt-2 origin-top-right bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 1
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 2
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<Menu
					as="div"
					className="mt-2 inline-block text-left"
				>
					<div>
						<Menu.Button className="inline-flex w-[547px] px-4 py-2 text-md font-medium text-white bg-gray-400 border border-gray-400 shadow-lg">
							Previous Exams
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 ml-2 -mr-1 mt-0.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="flex text-white w-[547px] mt-2 origin-top-right bg-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 1
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 2
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	);
};

export default Home;
