// api.js
const API_BASE_URL = "http://localhost:8000/api/"; // Replace with your actual API base URL

// Generic API fetcher function
const apiFetcher = async (url, method = "GET", token = null, data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    // Conditionally add the Authorization header if a token is provided
    options.headers.Authorization = `Token ${token}`;
  }
  // Conditionally add the body if there is data (for POST, PUT, PATCH requests)
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default apiFetcher;
