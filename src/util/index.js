export const generatePaddedRandomNumber = () => {
  // Generate a random integer between 1000 and 9999 (inclusive)
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  // Convert the number to a string
  let numString = randomNumber.toString();

  // Pad with leading zeros if the length is less than 5
  while (numString.length < 5) {
    numString = '0' + numString;
  }

  return numString;
};
