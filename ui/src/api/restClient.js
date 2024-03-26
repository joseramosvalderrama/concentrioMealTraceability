const BASE_URL = "http://localhost:3000";

const getMainStatistics = async () => {
  const response = await fetch(`${BASE_URL}/restaurant/statistic/main`);
  return response.json();
};

const findAllResturant = async () => {
  const response = await fetch(`${BASE_URL}/restaurant`);
  return response.json();
};

const findAllDish = async () => {
  const response = await fetch(`${BASE_URL}/dish`);
  return response.json();
};

const postDish = async (dish) => {
  const response = await fetch(`${BASE_URL}/dish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dish),
  });
  return response.json();
};

const postScore = async (score) => {
  await fetch(`${BASE_URL}/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(score),
  });
};

export {
  getMainStatistics,
  findAllResturant,
  findAllDish,
  postDish,
  postScore,
};
