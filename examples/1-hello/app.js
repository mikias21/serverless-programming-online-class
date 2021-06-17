const result = document.querySelector(".result");

const fetchData = async () => {
  try {
    // const { data } = await axios.get("/.netlify/functions/first_function");
    const { data } = await axios.get("/api/first_function");
    result.textContent = data;
  } catch (e) {
    console.log(e.response);
  }
};

fetchData();
