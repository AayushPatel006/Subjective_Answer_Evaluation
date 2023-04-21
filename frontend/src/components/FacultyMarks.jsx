import Nav from "./Nav";
import useAuth from "../hooks/useAuth";


const FacultyMarks = () => {
  const lists = {
    student_name: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8", "Question 9", "Question 10", "Question 11", "Question 12", "Question 13","Question 14"],
    student_marks: ["90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90","90"],
  };

  const { user } = useAuth();
  return (
    <div className="w-full h-screen flex flex-grow items-center bg-[#0F1F38] justify-center ">
      <Nav />
      <div className="flex flex-col h-3/4 w-full shadow-md shadow-black bg-[#1B4B5A] mt-10 ml-10 mr-10" >
        <div className="rounded-sm w-full flex bg-transparent mt-1 p-1 items-center shadow-md justify-between">
          <h1 className="ml-2 text-lg text-white font-semibold">
            Exam Name
          </h1>
        </div>
        <div className="mb-2 rounded-sm w-full flex flex-col bg-transparent p-1">
          <div className="overflow-y-auto w-full h-[400px] shadow-md">
            <table className="w-full mt-2 h-5/6 bg-transparent shadow-sm text-semibold text-md p-1 text-white">
              <thead className="shadow-md">
                <tr className="bg-transparent">
                  <th className="w-96 px-2 py-1 border-r-2 border-white font-semibold text-center">Student Names</th>
                  <th className="w-96 text-center px-2 py-1 font-semibold">Student Marks</th>
                </tr>
              </thead>
              <tbody className="">
                {lists.student_name.map((student_name, index) => (
                  <tr key={student_name} className="bg-transparent">
                    <td className="text-center">{student_name}</td>
                    <td className="text text-center px-2 py-1">
                    {lists.student_marks[index]}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="justify-end flex">
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyMarks;