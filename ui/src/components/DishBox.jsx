function DishBox(props) {
  const { name, score, uuid } = props.dish;
  return (
    <div
      className="flex flex-col justify-center mx-10 my-1 p-1 border-black border-2 rounded-md min-w-28"
      key={uuid}
    >
      <div className="flex justify-center">
        <p>{name}</p>
      </div>
      <div className="flex justify-center">
        <p>{score}/5</p>
      </div>
    </div>
  );
}

export default DishBox;
