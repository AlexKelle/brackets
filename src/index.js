module.exports = function check(str, bracketsConfig) {
  const openBrackets = new Set();
  const closeBrackets = new Set();
  const bracketsPairs = new Set();

  bracketsConfig.forEach(config => {
    openBrackets.add(config[0]);
    closeBrackets.add(config[1]);
    bracketsPairs.add(`${config[0]}${config[1]}`)
  });

  const bracketsState = [];

  for(let i = 0; i < str.length; i++) {
    const bracket = str[i];
    if (openBrackets.has(bracket)) {
      if (closeBrackets.has(bracket)) {
        const closeBracket = bracketsState[bracketsState.length - 1];
        if (closeBracket === bracket) {
          bracketsState.pop();
        } else {
          bracketsState.push(bracket);  
        }
      } else {
        bracketsState.push(bracket);
      }
    } else if (closeBrackets.has(bracket)) {
      if (bracketsState.length) {
        const closeBracket = bracketsState.pop();
        if (!bracketsPairs.has(`${closeBracket}${bracket}`)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  if (bracketsState.length) {
    return false;
  }

  return true;
}