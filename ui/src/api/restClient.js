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

export { getMainStatistics, findAllResturant, findAllDish };
