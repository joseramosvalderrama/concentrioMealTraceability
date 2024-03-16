function DishBox(props) {
  const { name, score, uuid } = props.dish;
  return (
    <div className="flex-col justify-center m-5" key={uuid}>
      <div className="flex justify-center">
        <p>{name}</p>
      </div>
      <div className="flex justify-center">
        <p>{score}</p>
      </div>
    </div>
  );
}

export default DishBox;
