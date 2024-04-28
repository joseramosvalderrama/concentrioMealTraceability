const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

const BASE_URL = `http://${API_HOST}:${API_PORT}`;

console.log(import.meta.env.MODE);

const getMainStatistics = async () => {
  const response = await makeFetch("GET", "/restaurant/statistic/main");
  return response.json();
};

const findAllResturant = async () => {
  const response = await makeFetch("GET", "/restaurant");
  return response.json();
};

const findAllDish = async () => {
  const response = await makeFetch("GET", "/dish");
  return response.json();
};

const postDish = async (dish) => {
  const response = await makeFetch("POST", `/dish`, dish);
  return await response.json();
};

const postScore = async (score) => {
  await makeFetch("POST", "/score", score);
};

const login = async (user) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token } = await response.json();
    sessionStorage.setItem("token", token);
  }
  return response.ok;
};

const makeFetch = async (method, url, body = undefined) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.status === 401) {
    sessionStorage.removeItem("token");
  }
  return response;
};

export {
  getMainStatistics,
  findAllResturant,
  findAllDish,
  postDish,
  postScore,
  login,
};
