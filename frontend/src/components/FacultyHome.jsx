import { Menu, Transition } from "@headlessui/react";
import React, {
	Fragment,
	useLayoutEffect,
	useState,
	useRef,
	useEffect,
} from "react";
import verifyToken from "../utils/verifyToken";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import httpRequest from "../utils/httpRequest";
import notify from "../utils/toast";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const FacultyHome = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [exams, updateExams] = useState(null);
	const [examUpdateStatus, updateExamStatus] = useState(false);
	const exam_name = useRef(null);
	const exam_start = useRef(null);
	const exam_end = useRef(null);

	useEffect(() => {
		const getExam = async () => {
			const result = await httpRequest(
				"/faculty/exams",
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);
			console.log(result.data);
			updateExams(result.data);
		};
		getExam();
	}, [examUpdateStatus]);

	const RenderExams = (props) => {
		return (
			<>
				{props.exams &&
					props.exams.map((value, index) => {
						return (
							<Menu.Item key={value["_id"]}>
								{({ active }) => {
									return (
										<Link
											to={
												"/createQuest?examName=" +
												value["title"] +
												"&examRef=" +
												value["_id"]
											}
											className={classNames("block px-4 py-2 text-sm")}
										>
											{value["title"]}
										</Link>
									);
								}}
							</Menu.Item>
						);
					})}
			</>
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const title = exam_name.current.value;
		const start_time = new Date(exam_start.current.value).valueOf();
		const end_time = new Date(exam_end.current.value).valueOf();

		const result = await httpRequest(
			"/faculty/create_exam",
			"post",
			{
				title: title,
				start_time: start_time,
				end_time: end_time,
				total_marks: 0,
				status: "creating",
			},
			{
				token: localStorage.getItem("token"),
			},
			true
		);

		if (result.data.msg) {
			notify(result.data.msg, "success");
			updateExamStatus(!examUpdateStatus);
		}
	};

	return (
		<div className="w-full h-screen flex items-center bg-[#0F1F38]">
			<Nav />

			<div className="h-2/3 w-3/4 shadow-md shadow-black mt-2 ml-10 bg-[#1B4B5A]">
				<Menu as="div" className="relative w-full inline-block text-left">
					<div className="">
						<Menu.Button className="mt-0.5 justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-[#8E7970] border border-[#8E7970] shadow-lg">
							My Exams
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
								<RenderExams exams={exams} />
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<Menu as="div" className="mt-2 w-full inline-block text-left">
					<div>
						<Menu.Button className="justify-between inline-flex w-full px-4 py-2 text-md font-semibold text-white bg-[#8E7970] border border-[#8E7970] shadow-lg">
							Previous Exams
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
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 4
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames("block px-4 py-2 text-sm")}
										>
											Exam 5
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			<div className="flex flex-col w-1/3 h-2/3 shadow-md shadow-black bg-[#1B4B5A] mt-2 ml-10 mr-10">
				<h1 className="text-xl p-1 mt-16 font-semibold text-white text-center">
					Create Exam
				</h1>
				<div className="flex flex-col mt-8 w-full">
					<label htmlFor="exam-name" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
							Exam Name:
						</span>
						<input
							type="text"
							id="exam-name"
							name="exam-name"
							className="p-1.5 mr-1 w-48"
							ref={exam_name}
							required
						/>
					</label>
					<label htmlFor="exam-start" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
							Exam start time:
						</span>
						<input
							type="datetime-local"
							id="exam-start"
							name="exam-start"
							className="p-1.5 mr-1 w-48"
							ref={exam_start}
							required
						/>
					</label>
					<label htmlFor="exam-end" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
							Exam end time:
						</span>
						<input
							type="datetime-local"
							id="exam-end"
							name="exam-end"
							className="p-1.5 mr-1 w-48"
							ref={exam_end}
							required
						/>
					</label>
					{/* <label htmlFor="exam-marks" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
							Total Marks:
						</span>
						<input
							type="number"
							id="exam-marks"
							name="exam-marks"
							className="p-1.5 mr-1 w-48"
							min="1"
							ref={total_mark}
						/>
					</label> */}
					<div className="flex justify-end mt-3 mr-3">
						<div
							className="justify-end [word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer 
                    items-center rounded-[16px] border border-[#8E7970] 
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-sm"
						>
							<a onClick={handleSubmit}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="3"
									stroke="currentColor"
									className="w-3 h-3"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FacultyHome;
