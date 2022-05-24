const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

async function getToken() {
  const url = await fetch(TOKEN_URL);
  const response = await url.json();
  console.log(response);
  return response;
}

export default getToken;
