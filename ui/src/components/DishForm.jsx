import React, { useEffect, useState } from "react";
import { findAllDish, findAllResturant, postDish } from "../api/restClient";
import { useNavigate } from "react-router";

const ScoreForm = (props) => {
  const [score, setScore] = useState("");
  const [restaurant, setRestaurant] = useState();
  const [dish, setDish] = useState("");
  const [comment, setComment] = useState("");
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [dishOptions, setDishOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const restaurantOptions = await findAllResturant();
      const dishOptions = await findAllDish();
      setRestaurantOptions(restaurantOptions);
      setDishOptions(dishOptions);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurant) {
      return;
    }
    const foundDish =
      dishOptions.find((dishOpt) => dishOpt.name === dish) ||
      (await postDish({ name: dish }));
    console.log({ dish: foundDish });
    props.onSubmit({
      score,
      restaurantUuid: restaurant.uuid,
      dishUuid: foundDish.uuid,
      comment,
    });
    navigate("/main");
  };

  return (
    <div className="containers py-5 bg-slate-100">
      <div className="flex justify-center my-5">
        <h3 className="text-xl font-bold text-gray-700">Daily vote</h3>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="score"
            className="block mb-1 font-medium text-gray-700"
          >
            Score
          </label>
          <input
            type="text"
            pattern="[0-5](\.[0-9])?"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            max="5"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block mb-1 font-medium text-gray-700"
          >
            Comment
          </label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="restaurant"
            className="block mb-1 font-medium text-gray-700"
          >
            Restaurant
          </label>
          <select
            id="restaurant"
            value={restaurant ? restaurant.uuid : ""}
            onChange={(e) => {
              console.log(e.target.value);
              const selected = restaurantOptions.find(
                (el) => el.uuid === e.target.value
              );
              setRestaurant(selected);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option></option>
            {restaurantOptions.map((restaurant) => (
              <option key={restaurant.uuid} value={restaurant.uuid}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="dish"
            className="block mb-1 font-medium text-gray-700"
          >
            Dish
          </label>
          <input
            type="text"
            list="dishes"
            id="dish"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <datalist id="dishes">
            {dishOptions.map((dish) => (
              <option key={dish.uuid} value={dish.name} />
            ))}
          </datalist>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ScoreForm;
