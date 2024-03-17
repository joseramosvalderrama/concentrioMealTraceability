import DishBox from "./DishBox";

function StatisticBox(props) {
  const { name, uuid, average, dishesOrderedByScore } = props.statistic;
  return (
    <div
      className="flex flex-col justify-center items-center mx-20 my-10 p-3 border-black border-2 rounded-md w-1/2"
      key={uuid}
    >
      <div className="flex justify-center">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <div className="flex justify-center">
        <p>{Math.trunc(average * 100) / 100}/5</p>
      </div>
      <div className="mt-5">
        <div className="flex justify-center my-1">
          <p>Top dishes</p>
        </div>
        <div className="flex justify-center">
          {dishesOrderedByScore.map((dish) => (
            <DishBox dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatisticBox;
