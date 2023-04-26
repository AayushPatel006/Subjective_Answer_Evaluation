import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import Nav from "./Nav";
import useAuth from "../hooks/useAuth";
import httpRequest from "../utils/httpRequest";
import { Link } from "react-router-dom";
import notify from "../utils/toast";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const StudHome = () => {
	const [exams, updateExams] = useState(null);
	const [register, updateRegisterStatus] = useState(false);
	const [registeredExam, updateRegisteredExam] = useState(null);
	const [examScore, updateExamScore] = useState(false);

	const handleRegister = async (id) => {
		const result = await httpRequest(
			"/student/register",
			"post",
			false,
			{
				exam_id: id,
				token: localStorage.getItem("token"),
			},
			true
		);

		if (result.data.msg) {
			notify(result.data.msg, "success");
			updateRegisterStatus(!register);
		}
	};
	// const listItems = examScore.exam.map((exam, index) => (
	// 	<li className="flex justify-between">
	// 		<h1 className="mt-0.5 ml-2 text-white font-semibold">{exam["title"]}</h1>
	// 		<div
	// 			className="justify-center [word-wrap: break-word] mr-2 mb-1 flex h-[32px] cursor-pointer
	// 			  items-center rounded-[16px] border border-white border-dashed w-[50px]
	// 			  bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-sm"
	// 		>
	// 			{}
	// 		</div>
	// 	</li>
	// ));

	const { user } = useAuth();

	useEffect(() => {
		const getExam = async () => {
			const result = await httpRequest(
				"/student/all_exams",
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);
			// console.log(result.data);
			updateExams(result.data);
		};

		const getRegisteredExam = async () => {
			const result = await httpRequest(
				"/student/get_registered_exam",
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);

			// console.log(result.data);
			updateRegisteredExam(result.data);
		};
		const getExamScore = async () => {
			const result = await httpRequest(
				"/student/score",
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);
			if (result.data) {
				console.log(result.data);
				updateExamScore(result.data);
			} else {
				notify("No exams appered yet", "success");
			}
		};
		getExamScore();
		getExam();
		getRegisteredExam();
	}, [register]);

	const RenderExams = (props) => {
		return (
			<>
				{props.exams &&
					props.exams.map((value, index) => {
						return (
							<div className="flex justify-between mb-1" key={index}>
								<Menu.Item key={value["_id"]}>
									{({ active }) => {
										return (
											<>
												<div className={classNames("block px-4 py-2 text-sm")}>
													{value["title"]}
												</div>
												<button
													className="border rounded-xl p-1 border-white border-dashed"
													onClick={() => {
														handleRegister(value["_id"]);
													}}
												>
													Register
												</button>
											</>
										);
									}}
								</Menu.Item>
							</div>
						);
					})}
			</>
		);
	};

	const RegisteredExams = (props) => {
		return (
			<>
				{props.registeredExam &&
					props.registeredExam.map((value, index) => {
						return (
							<Menu.Item key={value["_id"]}>
								{({ active }) => {
									return (
										<>
											<Link
												to={
													"/examSolving?examName=" +
													value["title"] +
													"&examId=" +
													value["_id"]
												}
												className={classNames("block px-4 py-2 text-sm")}
											>
												{value["title"]}
											</Link>
										</>
									);
								}}
							</Menu.Item>
						);
					})}
			</>
		);
	};

	return (
		<div className="w-full h-screen flex items-center bg-[#0F1F38]">
			<Nav />

			<div className="h-2/3 w-3/4 shadow-md shadow-black mt-2 ml-10 bg-[#1B4B5A]">
				<Menu as="div" className="relative w-full inline-block text-left">
					<div className="">
						<Menu.Button className="mt-0.5 justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-[#8E7970] border border-[#8E7970] shadow-lg">
							Registered Exams
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 ml-2  mt-0.5"
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
						<Menu.Items className="flex text-white text-md font-semibold w-full mt-2 origin-top-right bg-[#8E7970] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<RegisteredExams registeredExam={registeredExam} />
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<Menu as="div" className="mt-2 w-full inline-block text-left">
					<div>
						<Menu.Button className="justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-[#8E7970] border border-[#8E7970] shadow-lg">
							All Exams
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 ml-2 mt-0.5"
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
						<Menu.Items className="flex text-white text-md font-semibold w-full mt-2 origin-top-right bg-[#8E7970] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<RenderExams exams={exams} />
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			<div className="flex flex-col w-1/3 h-2/3 shadow-md shadow-black bg-[#1B4B5A] mt-2 ml-10 mr-10 overflow-hidden">
				<div className="w-full">
					<div className="flex justify-center">
						<div className="mt-0.5 mb-1 xl:w-96">
							<div className="relative mb-1 flex w-full flex-wrap items-stretch">
								<input
									type="search"
									className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
									placeholder="Search"
									aria-label="Search"
									aria-describedby="button-addon1"
								/>
								<button
									className="relative z-[2] flex items-center bg-[#8E7970] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-sm shadow-gray-600 transition duration-150 ease-in-out hover:bg-zinc-900 hover:shadow-lg"
									type="button"
									id="button-addon1"
									data-te-ripple-init
									data-te-ripple-color="light"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className=" flex flex-col justify-center"
					style={{
						height: "100%",
					}}
				>
					<div className="mb-2 rounded-sm w-full bg-transparent mt-1 p-1 items-center shadow-md">
						<h1 className="ml-2 text-lg text-white font-semibold">
							Previous Exams:
						</h1>
					</div>
					<div
						style={{
							height: "100%",
						}}
					>
						<ul
							className="bg-transparent shadow-sm text-semibold text-md p-1 text-white"
							style={{ overflowY: "auto", height: "calc(100% - 50px)" }}
						>
							{examScore &&
								examScore.map((exam, index) => (
									<li className="flex justify-between" key={index}>
										<a href={"/examAttempted?exam_ref=" + exam["exam"]["_id"]}>
											<h1 className="mt-0.5 ml-2 text-white font-semibold">
												{exam["exam"]["title"]}
											</h1>
										</a>
										<div
											className="justify-center [word-wrap: break-word] mr-2 mb-1 flex h-[32px] cursor-pointer 
				  items-center rounded-[16px] border border-white border-dashed w-[90px]
				  bg-[transparent] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-sm"
										>
											{exam["marks_obtained"]} / {exam["max_marks"]}
										</div>
									</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudHome;
