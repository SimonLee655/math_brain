// http://www.codewars.com/kata/ranking-poker-hands/train/javascript
// 2, 3, 4, 5, 6, 7, 8, 9, T(en), J(ack), Q(ueen), K(ing), A(ce)
// S(pades), H(earts), D(iamonds), C(lubs)
// AH AC 5H 6H 7S
console.log('poker hands');
function PokerHand(hand){
  // rank: Royal Straight Flush > Straight Flush > Four of a kind > Full house > Flush
  //       > Straight > Three of a kind > Two pair > One pair > No-pair
  var type = {
    'RoyalStraightFlush': 10,
    'StraightFlush': 9,
    'FourOfAKind': 8,
    'FullHouse': 7,
    'Flush': 6,
    'Straight': 5,
    'ThreeOfAKind': 4,
    'TwoPair': 3,
    'OnePair': 2,
    'NoPair': 1
  }
  var value = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
  }
  const isFlush = function(hand){
    var suits = hand.split(' ').map(card => card.substr(1, 1));
    return new Set(suits).size === 1;
  };
  const isStraight = function(hand){
    var values = hand.split(' ').map(card => value[card.substr(0, 1)]).sort(compare);
    return values[4] - values[0] === 4 || values[0] === 2 && values[3] === 5 && values[4] === 14;
  }
  const isThreeOfAKind = function(hand){
    var kindcount = {};
    hand.split(' ').map(card => value[card.substr(0, 1)]);
  }
  const kindSorted = function(hand){
    return hand.split(' ').map(card => value[card.substr(0, 1)]).sort(compare);
  }
  const kindCount = function(hand){
    var values = hand.split(' ').map(card => value[card.substr(0, 1)]);
    return new Set(values).size;
  }
  const kindData = function(hand){
    var data = {'2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, 'T': 0, 'J': 0, 'Q': 0, 'K': 0, 'A': 0};
    hand.replace(/[HSDC ]/g, '').split('').forEach((c)=>{
      data[c]++;
    });
    Object.keys(data).forEach((key)=>{
      if(!data[key])
        delete data[key];
    })
    return data;
  }
  const getMaxCount = function(hand){
    const data = kindData(hand);
    var max = 0;
    Object.keys(data).forEach((key)=>{
      if(data[key] > max)
        max = data[key];
    })
    return max;
  }
  const getMaxValue = function(hand){
    return kindSorted(hand)[4];
  }
  // const getRankCount = function(hand){
  //   var data = kindData(hand);

  // }
  const getsubRank = function(hand, t){
    switch (t){
      // one element
      case type.RoyalStraightFlush:
      case type.StraightFlush:
      case type.Straight:
        return [getMaxValue(hand)];
        break;
      // two element
      case type.FourOfAKind:
      case type.FullHouse:
        var values = kindSorted(hand);
        var rank = [];
        rank.push(values[2]);
        rank.push(values[2] === values[0] ? values[4] : values[0]);
        return rank;
        break;
      // three element
      case type.ThreeOfAKind:
      case type.TwoPair:
        var rank = [];
        var data = kindData(hand);
        Object.keys(data).forEach((k)=>{
          if(data[k] > 1){
            rank.push(k);
          }
        });
        rank = rank.sort(compare);
        rank.push(Object.keys(data)[0]);
        return rank;
        break;
      case type.OnePair:
        var data = kindData(hand);
        var maxCount = getMaxCount(hand);
        var rank = [];
        var pairNumber = getKeyByValue(data, maxCount);
        kindSorted(hand).forEach((value)=>{
          if(value !== rank[0])
          rank.push(value);
        });
        rank.push(getKeyByValue(data, maxCount));
        return rank;
        break;
      case type.NoPair:
      case type.Flush:
        return kindSorted(hand).reverse();
    }
  }
  function compare(a, b){ return a - b;};
  this.getTypeString = function () {
    return getKeyByValue(type, this.type);
  }
  this.getMaxValue = function(){
    return getMaxValue(this.hand);
  }
  this.hand = hand;
  // initial
  switch (kindCount(hand)){
    case 2: // Full house, Four of a kind
      this.type = getMaxCount(hand) === 4 ? type.FourOfAKind : type.FullHouse;
      break;
    case 3: // Two pair, Three of a kind
      this.type = getMaxCount(hand) === 3 ? type.ThreeOfAKind : type.TwoPair;
      break;
    case 4: // One pair
      this.type = type.OnePair;
      break;
    // above could not be flush
    case 5: // No pair, Straight, Flush
      this.type = isStraight(hand) ? isFlush(hand) ? kindSorted(hand)[4] === 14 ? type.RoyalStraightFlush : type.StraightFlush : type.Straight : isFlush(hand) ? type.Flush : type.NoPair;
      break;
  }
  this.subRank = getsubRank(hand, this.type);
}
const getKeyByValue = function(object, value){
  return Object.keys(object).find(key => object[key] === value);
}
var Result = { "win": 1, "loss": 2, "tie": 3 }
PokerHand.prototype.compareWith = function(hand){
  if(this.type > hand.type) return Result.win;
  if(this.type < hand.type) return Result.loss;
  var final = Result.tie;
  this.subRank.some((r, i)=>{
    if(r > hand.subRank[i]){
      final = Result.win
      return true;
    }
    if(r < hand.subRank[i]){
      final = Result.loss;
      return true;
    }
  })
  return final;
}