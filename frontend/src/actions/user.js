const postOptions = {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

function extractCookie(cookie, name) {
  const cookieMap = cookieToHash(cookie);
  return cookieMap[name];
}

function handleResponse(response) {
  if (response.status !== 200) {
    const error = extractCookie(document.cookie, 'Error');
    return Promise.reject({ error });
  }
  return { success: true };
}

function cookieToHash(cookie) {
  return String(cookie).split(';').map(value => value.trim()).reduce((memo, value) => {
    const [key, hashed] = value.split('=');
    memo[key] = decodeURIComponent(hashed);
    return memo;
  }, {});
}

export const postLogin = (loginData, history) =>
  fetch('/login', { ...postOptions, body: JSON.stringify(loginData) })
    .then(handleResponse)
    .then(() => history.push('/'));

export const postSignup = (signupData, history) =>
  fetch('/signup', {
    ...postOptions,
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .then(() => history.push('/'));

export const postLogout = history =>
  fetch('/logout', postOptions).then(handleResponse).then(() => history.push('/'));

export const fetchSelf = () =>
  fetch('/graphql', {
    ...postOptions,
    body: JSON.stringify({
      query: 'query self { me { username } }',
    }),
  }).then(response => {
    if (response.status !== 200) {
      return Promise.reject({ error: 'failed fetch' });
    }
    return response.json();
  });
