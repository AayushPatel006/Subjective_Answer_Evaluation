import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
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

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const createExam = () => {
	let query = useQuery();
	const [index, updateIndex] = useState(1);
	const question = useRef("");
	const modelAnswer = useRef("");

	const addQuestion = async (event) => {
		event.preventDefault();
		console.log(question.current.value);
		console.log(modelAnswer.current.value);
		const result = await httpRequest(
			"/faculty/add_questions/" + index,
			"post",
			{
				exam_ref: query.get("examRef"),
				question: question.current.value,
				model_answer: modelAnswer.current.value,
				max_marks: 0,
			},
			{
				index: index,
				token: localStorage.getItem("token"),
			},
			true
		);
		console.log(result);
		if (result.data.msg) {
			notify(result.data.msg, "success");
			updateIndex(index + 1);
			question.current.value = "";
			modelAnswer.current.value = "";
		}
	};

	const getCurrentQuestion = async () => {
		let requestUrl = "/faculty/get_question/" + index;
		console.log(requestUrl);
		const result = await httpRequest(
			requestUrl,
			"get",
			{
				exam_id: query.get("examRef"),
				token: localStorage.getItem("token"),
			},
			false,
			true
		);
		console.log(result, "result");
	};

	getCurrentQuestion();

	return (
		<div className="w-full h-screen flex items-center bg-[#0F1F38] justify-center">
			<Nav />
			<div className="flex flex-col w-[700px] h-[500px] shadow-md shadow-black bg-[#1B4B5A] mt-16 ml-10 mr-10">
				<h1 className="text-2xl p-1 mt-16 font-semibold text-white text-center">
					{query.get("examName")}
				</h1>
				<div className="flex flex-col  mt-8 w-full">
					<label htmlFor="exam-date" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 justify-between text-md font-semibold text-white">
							Enter Question {index} :
						</span>
						<textarea
							type="textarea"
							id="Question"
							name="Question"
							ref={question}
							className="p-1.5 rounded-md w-full mr-1 shadow-md"
						/>
					</label>
					<label htmlFor="exam-date" className="flex items-center mt-4">
						<span className="ml-1 w-48 mr-1 text-md font-semibold text-white">
							Enter Solution {index} :
						</span>
						<textarea
							type="textarea"
							id="exam-date"
							name="exam-date"
							className="p-1.5 rounded-md w-full mr-1 shadow-md"
							ref={modelAnswer}
						/>
					</label>
					<a
						onClick={() => {
							index >= 0 ?? updateIndex(index - 1);
						}}
					>
						<div
							className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970]  
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="3"
								stroke="currentColor"
								className="w-3 h-3"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
								/>
							</svg>
						</div>
					</a>
					<div className="flex justify-end mt-3 mr-3">
						<a onClick={addQuestion}>
							<div
								className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970]  
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3"
									stroke="currentColor"
									className="w-3 h-3"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							</div>
						</a>
						<a
							onClick={() => {
								updateIndex(index + 1);
							}}
						>
							<div
								className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970]  
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3"
									stroke="currentColor"
									className="w-3 h-3"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
									/>
								</svg>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default createExam;
