export default (array, elementsAmount) => {
  const randArray = Array.from(array).sort(() => 0.5 - Math.random()).slice(0, elementsAmount);
  return (randArray.length === 1) ? randArray[0] : randArray;
};
