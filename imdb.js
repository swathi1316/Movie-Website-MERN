import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://imdb-api.com',
  params: {
    apiKey: 'k_ib21842h',
  },
});

const searchTitle = 'The Game of Thrones';
const searchMovie = async (title) => {
  const response = await instance.get('en/API/AdvancedSearch/', {
    params: {
      title: title,
    },
  });
  console.log(response.data);
  return response.data;
};

export default searchMovie;