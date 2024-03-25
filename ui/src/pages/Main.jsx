import StatisticBox from "../components/StatisticBox";
import { useEffect, useState } from "react";
import { getMainStatistics } from "../api/restClient";
import DishForm from "../components/DishForm";

function Main() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainStatistics = await getMainStatistics();
        setStatistics(mainStatistics);
      } catch (error) {
        console.error("Error fetching main statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-3 m-3">
      <div className="flex justify-center m-5">
        <p className="text-3xl font-bold">Concentrio meal traceability</p>
      </div>
      {statistics.map((statistic) => (
        <StatisticBox statistic={statistic} />
      ))}
      <DishForm />
    </div>
  );
}

export default Main;
