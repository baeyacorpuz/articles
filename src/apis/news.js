import Axios from "axios"


export const listNews = async () => {
  const url = `http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.REACT_APP_API}`

  const apiResponse = await Axios
  .get(url)
  .then((response) => response)
  .catch((error) => error.response);

  return apiResponse;
}