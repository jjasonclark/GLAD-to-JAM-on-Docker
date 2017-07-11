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
  fetch('/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(handleResponse)
    .then(() => history.push('/'));

export const postSignup = (signupData, history) =>
  fetch('/signup', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  })
    .then(handleResponse)
    .then(() => history.push('/'));

export const postLogout = history =>
  fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then(() => history.push('/'));
