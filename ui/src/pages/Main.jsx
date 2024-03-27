import StatisticBox from "../components/StatisticBox";
import { useEffect, useState } from "react";
import { getMainStatistics, postScore } from "../api/restClient";
import ScoreForm from "../components/DishForm";
import { useNavigate } from "react-router";

function Main() {
  const [statistics, setStatistics] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const mainStatistics = await getMainStatistics();
      setStatistics(mainStatistics);
    } catch (error) {
      console.error("Error fetching main statistics:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitScore = async (score) => {
    await postScore(score);
    fetchData();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
      <div className="flex justify-center items-center m-5">
        <p className="text-3xl font-bold">Concentrio meal traceability</p>
      </div>
      <div className="flex justify-center flex-wrap p-3 m-3">
        {statistics.map((statistic) => (
          <StatisticBox statistic={statistic} />
        ))}
      </div>
      <ScoreForm onSubmit={submitScore} />
    </>
  );
}

export default Main;
