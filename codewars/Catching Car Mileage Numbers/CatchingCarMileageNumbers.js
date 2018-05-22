console.log('CatchingCarMileageNumbers');
function isInteresting(number, awesomePhrases) {
  // Go to town!
}
const isFollowByAllZeros = (number) => {
  var set = new Set(number.toString().substr(1).split(''));
  return set.size === 1 && set.has(0);
}
const isEveryDigitSameNumber = (number) => {
  return new Set(number.toString().split('')).size === 1;
}
const isAwesomePhrases = (number, awesomePhrases) => {
  return awesomePhrases.indexOf(number) !== -1;
}
const isAscendant = (number) => {
  return isOrdered(number, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
}
const isDescendant = (number) => {
  return isOrdered(number, [9,8,7,6,5,4,3,2,1,0]);
}
const isOrdered = (number, order) => {
  let numArr = number.toString().split('').map(n => +n);
  return new Set(numArr).size === number.toString().length ? numArr.every((n, i, a) => {
    return a[i - 1] ? order.indexOf(a[i]) == order.indexOf(a[i - 1]) + 1 : true;
  }) : false;
}