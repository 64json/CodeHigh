import Promise from 'bluebird';
import axios from 'axios';

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error.response.data);
});

const request = (url, process) => {
  const tokens = url.split('/');
  return (...args) => {
    return new Promise((resolve, reject) => {
      const mappedURL = '/api' + tokens.map((token, i) => token.startsWith(':') ? args.shift() : token).join('/');
      return resolve(process(mappedURL, args));
    });
  };
};

const GET = URL => {
  return request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.get(mappedURL, { params });
  });
};

const DELETE = URL => {
  return request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.delete(mappedURL, { params });
  });
};

const POST = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.post(mappedURL, body, { params });
  });
};

const PUT = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.put(mappedURL, body, { params });
  });
};

const AuthApi = {
  createAuth: POST('/auth/'),
  destroyAuth: DELETE('/auth/'),
};

const RatingApi = {
  allRatings: GET('/rating/'),
  addRating: POST('/rating/'),
  getRating: GET('/rating/:rating_id'),
  updateRating: PUT('/rating/:rating_id'),
  deleteRating: DELETE('/rating/:rating_id'),
};

const SolutionApi = {
  allSolutions: GET('/solution/'),
  addSolution: POST('/solution/'),
  getSolution: GET('/solution/:solution_id'),
  updateSolution: PUT('/solution/:solution_id'),
  deleteSolution: DELETE('/solution/:solution_id'),
};

const TestcaseApi = {
  allTestcases: GET('/testcase/'),
  addTestcase: POST('/testcase/'),
  getTestcase: GET('/testcase/:testcase_id'),
  updateTestcase: PUT('/testcase/:testcase_id'),
  deleteTestcase: DELETE('/testcase/:testcase_id'),
};

const TopicApi = {
  allTopics: GET('/topic/'),
  addTopic: POST('/topic/'),
  getTopic: GET('/topic/:topic_id'),
  updateTopic: PUT('/topic/:topic_id'),
  deleteTopic: DELETE('/topic/:topic_id'),
};

const UserApi = {
  allUsers: GET('/user/'),
  addUser: POST('/user/'),
  getUser: GET('/user/:user_id'),
  updateUser: PUT('/user/:user_id'),
  deleteUser: DELETE('/user/:user_id'),
};

export {
  AuthApi,
  RatingApi,
  SolutionApi,
  TestcaseApi,
  TopicApi,
  UserApi,
};