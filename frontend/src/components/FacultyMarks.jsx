import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import httpRequest from "../utils/httpRequest";
import Nav from "./Nav";

const FacultyMarks = () => {
	let query = useQuery();

	const [attempts, setAttempts] = useState([]);
	const [noOfAttempts, setNoOfAttempts] = useState(0);

	const fetchAttempts = async () => {
		const result = await httpRequest(
			"/faculty/exam_details/" + query.get("examRef"),
			"get",
			false,
			{
				token: localStorage.getItem("token"),
			},
			true
		);
		console.log(result);
		if (result.data) {
			setAttempts(result.data.total_attempts);
			setNoOfAttempts(result.data.len_total_attempts);
		}
	};

	useEffect(() => {
		fetchAttempts();
	}, []);

	const { user } = useAuth();
	return (
		<div className="w-full h-screen flex flex-grow items-center bg-[#0F1F38] justify-center ">
			<Nav />
			<div className="flex flex-col h-3/4 w-full shadow-md shadow-black bg-[#1B4B5A] mt-10 ml-10 mr-10">
				<div className="rounded-sm w-full flex bg-transparent mt-1 p-1 items-center shadow-md justify-between">
					<h1 className="ml-2 text-lg text-white font-semibold">Exam Name</h1>
				</div>
				<div className="mb-2 rounded-sm w-full flex flex-col bg-transparent p-1">
					<div className="overflow-y-auto w-full h-[400px] shadow-md">
						<table className="w-full mt-2 h-5/6 bg-transparent shadow-sm text-semibold text-md p-1 text-white">
							<thead className="shadow-md">
								<tr className="bg-transparent">
									<th className="w-96 px-2 py-1 border-r-2 border-white font-semibold text-center">
										Student Names
									</th>
									<th className="w-96 text-center px-2 py-1 font-semibold">
										Student Marks
									</th>
								</tr>
							</thead>
							<tbody className="">
								{attempts.map((attempt, index) => (
									<tr key={attempt._id} className="bg-transparent">
										<td className="text-center">{attempt.user.name}</td>
										<td className="text text-center px-2 py-1">
											{attempt.total_marks}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="justify-end flex"></div>
				</div>
			</div>
		</div>
	);
};

function useQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

export default FacultyMarks;
