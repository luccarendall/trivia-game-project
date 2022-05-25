async function getQuestions(token) {
  const url = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await url.json();
  return response;
}

export default getQuestions;
