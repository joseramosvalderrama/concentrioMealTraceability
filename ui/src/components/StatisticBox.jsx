import DishBox from "./DishBox";

function StatisticBox(props) {
  const { name, uuid, average, dishesOrderedByScore } = props.statistic;
  return (
    <div
      className="flex-col justify-center items-center mx-20 my-2 p-5 border-black border-2 rounded-md"
      key={uuid}
    >
      <div className="flex justify-center">
        <h3>{name}</h3>
      </div>
      <div className="flex justify-center">
        <p>{average}</p>
      </div>
      <div className="flex justify-center">
        <p>Top 3 dishes</p>
      </div>
      <div className="flex justify-center">
        {dishesOrderedByScore.map((dish) => (
          <DishBox dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default StatisticBox;
