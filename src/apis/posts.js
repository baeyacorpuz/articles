import Axios from "axios"

export const listPosts = async () => {
  const apiResponse = await Axios
  .get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20')
  .then((response) => response)
  .catch((error) => error.response);

  return apiResponse;
}

export const createPost = async (values) => {
  console.log(values)
  const apiResponse = await Axios
  .post('https://jsonplaceholder.typicode.com/posts', values)
  .then((response) => response)
  .catch((error) => error.respons);

  return apiResponse;
}

export const getPost = async (id) => {
  const apiResponse = await Axios
  .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response)
  .catch((error) => error.respons);

  return apiResponse;
}

export const updatePost = async (id, values) => {
  const apiResponse = await Axios
  .put(`https://jsonplaceholder.typicode.com/posts/${id}`, values)
  .then((response) => response)
  .catch((error) => error.respons);

  return apiResponse;
}

export const deletePost = async (id) => {
  const apiResponse = await Axios
  .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response)
  .catch((error) => error.respons);

  return apiResponse;
}

export const getComments = async (id) => {
  const apiResponse = await Axios
  .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  .then((response) => response)
  .catch((error) => error.respons);

  return apiResponse;
}