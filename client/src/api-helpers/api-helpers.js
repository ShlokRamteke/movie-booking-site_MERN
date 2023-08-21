import axios from "axios";

const port = 8000;
export const getAllMovies = async () => {
  const res = await axios
    .get(`http://localhost:${port}/movie`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};
