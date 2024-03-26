import StatisticBox from "../components/StatisticBox";
import { useEffect, useState } from "react";
import { getMainStatistics, postScore } from "../api/restClient";
import ScoreForm from "../components/DishForm";

function Main() {
  const [statistics, setStatistics] = useState([]);

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

  return (
    <div className="flex flex-col justify-center items-center p-3 m-3">
      <div className="flex justify-center m-5">
        <p className="text-3xl font-bold">Concentrio meal traceability</p>
      </div>
      {statistics.map((statistic) => (
        <StatisticBox statistic={statistic} />
      ))}
      <ScoreForm onSubmit={submitScore} />
    </div>
  );
}

export default Main;
