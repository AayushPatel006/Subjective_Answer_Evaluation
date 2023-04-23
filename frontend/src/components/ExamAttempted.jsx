import Nav from "./Nav";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import httpRequest from "../utils/httpRequest";

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ExamAttempted = () => {
	let query = useQuery();
	const navigate = useNavigate();
	const [answers, updateAnswers] = useState(false);
	const { user } = useAuth();

	if (user && user.role == "teacher") {
		navigate("/");
	}

	useEffect(() => {
		const getAllAttemptedAnswers = async () => {
			const result = await httpRequest(
				"/student/get_exam_score/" + query.get("exam_ref"),
				"get",
				false,
				{
					token: localStorage.getItem("token"),
				},
				true
			);
			console.log(result.data);
			updateAnswers(result.data);
		};
		getAllAttemptedAnswers();
	}, []);

	return (
		<div className="w-full h-screen flex flex-grow items-center bg-[#0F1F38] justify-center ">
			<Nav />
			<div className="flex flex-col h-3/4 w-full shadow-md shadow-black bg-[#1B4B5A] mt-10 ml-10 mr-10">
				<div className="rounded-sm w-full flex bg-transparent mt-1 p-1 items-center shadow-md justify-between">
					<h1 className="ml-2 text-lg text-white font-semibold">
						{answers && answers["exam"]["title"]}
					</h1>
					<span className="mr-2 text-lg text-white font-semibold">
						Total Time: {answers && answers["exam"]["duration"]} minutes
					</span>
				</div>
				<div className="mb-2 rounded-sm w-full flex flex-col bg-transparent p-1">
					<div className="overflow-y-auto w-full h-[400px] shadow-md">
						<table className="w-full mt-2 h-5/6 bg-transparent shadow-sm text-semibold text-md p-1 text-white">
							<thead className="shadow-md">
								<tr className="bg-transparent">
									<th
										colspan="2"
										className="w-96 px-2 py-1 border-r-2 border-white font-semibold text-center"
									>
										Question
									</th>
									<th className="w-96 text-center px-2 py-1 font-semibold">
										Your score
									</th>
								</tr>
							</thead>
							<tbody>
								{answers &&
									answers["attempted_answers"].map((exam, index) => (
										<>
											<tr key={exam["index"]} className="bg-transparent">
												<td colspan="2" className="text-center">
													{exam["question"]}?
												</td>
												<td rowspan="3" className="text-center px-2 py-1">
													{exam["marks_obtained"]} / {exam["max_marks"]}
												</td>
											</tr>
											<tr>
												<td>Your answer:</td>
												<td>{exam["answer"]}</td>
											</tr>
											<tr>
												<td>Expected answer:</td>
												<td>{exam["model_answer"]}</td>
											</tr>
										</>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExamAttempted;
