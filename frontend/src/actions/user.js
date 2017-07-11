function cookieToHash(cookie) {
  return String(cookie).split(';').map(value => value.trim()).reduce((memo, value) => {
    const [key, hashed] = value.split('=');
    memo[key] = decodeURIComponent(hashed);
    return memo;
  }, {});
}

function handleResponse(response) {
  if (response.status !== 200) {
    const error = cookieToHash(document.cookie)['Error'];
    return Promise.reject({ error });
  }
  return { success: true };
}

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
