const randomIndex = (arr) => {
  const max = arr.length + 1;
  return Math.floor(Math.random() * max);
};

export default randomIndex;
