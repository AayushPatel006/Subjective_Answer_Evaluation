import Nav from "./Nav";
import useAuth from "../hooks/useAuth";


const ExamCreated = () => {
  const lists = {
    exam: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8", "Question 9", "Question 10", "Question 11", "Question 12", "Question 13","Question 14"],
    answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5", "Answer 6", "Answer 7", "Answer 8", "Answer 9", "Answer 10", "Answer 11", "Answer 12", "Answer 13","Answer 14"],
    score: ["90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90", "90","90"],
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
          <span className="mr-2 text-lg text-white font-semibold">
            Total Time: Time here
          </span>
        </div>
        <div className="mb-2 rounded-sm w-full flex flex-col bg-transparent p-1">
          <div className="overflow-y-auto w-full h-[400px] shadow-md">
            <table className="w-full mt-2 h-5/6 bg-transparent shadow-sm text-semibold text-md p-1 text-white">
              <thead className="shadow-md">
                <tr className="bg-transparent">
                  <th className="w-96 px-2 py-1 border-r-2 border-white font-semibold text-center">Question</th>
                  <th className="w-96 text-center px-2 py-1 border-r-2 border-white font-semibold">Solution</th>
                  <th className="w-96 text-center px-2 py-1 border-white font-semibold">Maximum Marks</th>
                </tr>
              </thead>
              <tbody className="">
                {lists.exam.map((exam, index) => (
                  <tr key={exam} className="bg-transparent">
                    <td className="text-left">
                    <input type="text" className="w-full text-white bg-transparent" defaultValue={exam} />
                    </td>
                    <td className="text-left px-2 py-1">
                    <input type="text" className="w-full text-white bg-transparent" defaultValue={lists.answer[index]} />
                      </td>
                    <td className="text-center px-2 py-1">
                    <input type="text" className="w-full text-center text-white bg-transparent" defaultValue={lists.score[index]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="justify-end flex">
          <button className=" text-white w-max mt-2 p-1 bg-[#8E7970] rounded-md shadow-md mr-4 hover:shadow-lg hover:bg-[#8E7967] hover:border-[#8E7967]">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCreated;