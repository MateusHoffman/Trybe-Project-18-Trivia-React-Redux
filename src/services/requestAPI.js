import md5 from 'crypto-js/md5';

export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const token = await response.json();
  return token;
};

export const createImageSrc = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
