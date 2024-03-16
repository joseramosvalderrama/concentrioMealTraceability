const BASE_URL = "http://localhost:3000";

const getMainStatistics = async () => {
  const response = await fetch(`${BASE_URL}/restaurant/statistic/main`);
  return response.json();
};

export { getMainStatistics };
