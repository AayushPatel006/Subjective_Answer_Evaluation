import { Menu, Transition } from "@headlessui/react";
import React, {
	Fragment,
	useLayoutEffect,
	useState,
	useEffect,
	useRef,
} from "react";
import verifyToken from "../utils/verifyToken";
import Nav from "./Nav";
import { useNavigate, useLocation } from "react-router-dom";
import httpRequest from "../utils/httpRequest";
import notify from "../utils/toast";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Timer({ timeInSeconds }) {
	const [remainingTime, setRemainingTime] = useState(timeInSeconds);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 0) {
					clearInterval(intervalId);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<div className="text-white text-md font-semibold ml-4">
			Time Remaining: {formatTime(remainingTime)}
		</div>
	);
}

const examSolving = () => {
	let query = useQuery();
	const [index, updateIndex] = useState(1);
	const [length, updateLength] = useState(0);
	const [questions, updateQuestion] = useState([]);
	const [questionFetched, updateQuestionFetch] = useState(false);
	const answer = useRef("");

	useEffect(() => {
		const getExamQuestions = async () => {
			const result = await httpRequest(
				"/student/get_questions/" + query.get("examId"),
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);
			console.log(result, "result");
			updateQuestion(result.data.questions);
			updateLength(result.data.questions.length);
			console.log(questions.current, "1");
			updateQuestionFetch(true);
		};
		getExamQuestions();
	}, []);

	const numbers = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];

	const listItems = numbers.map((number) => (
		<li
			className="w-12 justify-center [word-wrap: break-word] ml-3 flex h-[32px] items-center rounded-[16px] border border-[#8E7970] hover:bg-[#8E7976] hover:border-[#8E7976]
  bg-[#8E7970] py-0 px-[12px] text-md mb-2 mr-3 normal-case leading-loose text-white shadow-md"
		>
			{number}
		</li>
	));

	const Question = (props) => {
		console.log(props.questions);
		console.log("1");
		const [q] = props.questions.filter((question) => {
			return question.index === index;
		});
		console.log(q, "q");
		if (q !== undefined) {
			return q["question"];
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await httpRequest(
			"/student/attempt_exam/" + query.get("examId"),
			"post",
			{
				index: index,
				answer: answer.current.value,
			},
			{
				token: localStorage.getItem("token"),
			},
			true
		);
		console.log(result);
		if (result.data.msg) {
			updateIndex(index + 1);
			answer.current.value = "";
			notify("Answer Submitterd", "success");
		}
	};

	const getmarks = () =>  {
		const [q] = props.questions.filter((question) => {
			return question.index === index;
		});
		return q['max_marks'];
	}

	return (
		<div className="w-full h-screen flex items-center bg-[#0F1F38] ">
			<Nav />
			<div className="flex">
				<div className="overflow-auto flex flex-col w-[325px] h-[325px] justify-center shadow-md shadow-black bg-[#1B4B5A] mt-16 ml-8 mr-8">
					<div className="mt-2">
						<Timer timeInSeconds={5} />
					</div>
					<ul className=" justify-center mt-3 [word-wrap: break-word] flex flex-wrap w-full cursor-pointer items-center">
						{listItems}
					</ul>
					<div className="flex justify-center mt-3 mb-2">
						<button className="text-white font-semibold p-2 bg-[#8E7970] w-1/2 rounded-lg shadow-md hover:[#8E7976] hover:border-[#8E7976]">
							End Exam
						</button>
					</div>
				</div>
				<div className="flex flex-col w-[700px] h-[500px] shadow-md shadow-black bg-[#1B4B5A] mt-16 ml-10 mr-10">
					<h1 className="text-2xl p-1 mt-16 font-semibold text-white text-center">
						{query.get("examName")}
					</h1>
					<div className="flex flex-col mt-8 w-full">
						<div className="flex justify-between">
						<label htmlFor="exam-date" className="items-center">
							<span className="ml-1 w-48 mr-1 justify-between text-md font-semibold text-white">
								Question {index} :
							</span>
							<p
								type="textarea"
								id="exam-date"
								name="exam-date"
								className="w-full mr-1 shadow-md text-white ml-1 mr-1 mt-1"
								>
								<Question questions={questions} />
							</p>
						</label>
						<label htmlFor="exam-date" className="items-center">
							<span className="ml-1 w-48 mr-2 justify-between text-md font-semibold text-white">
								{/* {getmarks} */}
							</span>
						</label>
						</div>
						<label htmlFor="exam-date" className="flex items-center mt-4">
							<span className="ml-1 w-20 mr-1 text-md font-semibold text-white">
								Answer:
							</span>
							<textarea
								type="textarea"
								id="exam-date"
								name="exam-date"
								rows="6"
								className="p-1 rounded-md w-full mr-1 shadow-md"
								ref={answer}
							/>
						</label>
						<div className="flex justify-end mt-3 mr-3">
							<div
								className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970]  
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
							>
								<a
									onClick={() => {
										index > 1 && updateIndex(index - 1);
									}}
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
											d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
										/>
									</svg>
								</a>
							</div>
							<div
								className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970]  
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
							>
								<a onClick={handleSubmit}>
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
								</a>
							</div>
							<div
								className="[word-wrap: break-word] ml-2 flex h-[32px] cursor-pointer hover:bg-stone-600 hover:border-stone-600
                    items-center rounded-[16px] border border-[#8E7970] 
                    bg-[#8E7970] py-0 px-[12px] text-md font-semibold normal-case leading-loose text-white shadow-md"
							>
								<a
									onClick={() => {
										index + 1 <= length && updateIndex(index + 1);
									}}
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
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default examSolving;
