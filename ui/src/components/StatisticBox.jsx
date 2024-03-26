import DishBox from "./DishBox";

function StatisticBox(props) {
  const { name, uuid, average, dishesOrderedByScore } = props.statistic;
  return (
    <div
      className="flex flex-col justify-center items-center mx-10 my-10 p-3 border-2 border-blue-500 rounded-md w-2/5"
      key={uuid}
    >
      <div className="flex justify-center">
        <h3 className="text-xl font-bold text-gray-700">{name}</h3>
      </div>
      <div className="flex justify-center">
        <p>{Math.trunc(average * 100) / 100}/5</p>
      </div>
      <div className="mt-5">
        <div className="flex justify-center my-1">
          <p>Top dishes</p>
        </div>
        <div className="flex justify-center flex-wrap">
          {dishesOrderedByScore.map((dish) => (
            <DishBox dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatisticBox;
