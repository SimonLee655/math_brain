// console.log('pokerhand 2');
var Result = { "win": 1, "loss": 2, "tie": 3 }

function PokerHand(hand) {
  var handtype = {
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
  var handtypeString = {
    '10': 'RoyalStraightFlush',
    '9': 'StraightFlush',
    '8': 'FourOfAKind',
    '7': 'FullHouse',
    '6': 'Flush',
    '5': 'Straight',
    '4': 'ThreeOfAKind',
    '3': 'TwoPair',
    '2': 'OnePair',
    '1': 'NoPair',
  }
  var cardvalue = {
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
  var compareDesc = function(a, b){
    return b - a;
  }
  var compareDistinct = function(a, b){
    if(a.count !== b.count)
      return b.count - a.count;
    return b.value - a.value;
  }
  var getHandType = function(hand){
    var valuekinds = getValueKind(hand);
    var type;
    switch (valuekinds.length) {
      case 2: // Full House, Four of a kind
        var sorted = getValueSorted(hand);
        return sorted[1] === sorted[3] ? handtype.FourOfAKind : handtype.FullHouse;
      case 3: // Two pair, Three of a kind
        var sorted = getValueSorted(hand);
        var max = 0;
        var count = {};
        sorted.forEach((v) => {
          if (count[v])
            count[v]++;
          else
            count[v] = 1;
          max = count[v] > max ? count[v] : max;
        });
        return max === 3 ? handtype.ThreeOfAKind : handtype.TwoPair;
      case 4: // One pair
        return handtype.OnePair;
      case 5: // No pair, Straight, Flush, StraightFlush, RoyalStraightFlush
        var isflush = isFlush(hand);
        var isstraight = isStraight(hand);
        if (isflush) {
          if (isstraight) {
            if (getValueSorted(hand)[0] === 14) {
                return handtype.RoyalStraightFlush;
            }
            return handtype.StraightFlush;
          }
          return handtype.Flush;
        }
        if (isstraight) {
          return handtype.Straight;
        }
        return handtype.NoPair;
    }
  }
  var getValueKind = function(hand){
    return [...new Set(hand.split(' ').map(card => cardvalue[card.substr(0, 1)]))];
  };
  var getValueSorted = function(hand){
    return hand.replace(/[HSDC ]/g, '').split('').map(c => cardvalue[c]).sort(compareDesc);
  };
  var getRankSorted = function(hand){
    var values = hand.replace(/[HSDC ]/g, '').split('');
    var distinctValue = [...new Set(values)];
    var distinctCount = [];
    values.forEach((v)=>{
      if(distinctCount[distinctValue.indexOf(v)])
        distinctCount[distinctValue.indexOf(v)]++;
      else
        distinctCount[distinctValue.indexOf(v)] = 1;
    });
    var distinct = [];
    distinctValue.forEach((v, i)=>{
      distinct.push({
        value: cardvalue[v],
        card: v,
        count: distinctCount[i]
      });
    })
    return distinct.sort(compareDistinct);
  };
  const isFlush = function(hand){
    var suits = hand.split(' ').map(card => card.substr(1, 1));
    return new Set(suits).size === 1;
  };
  const isStraight = function(hand){
    var values = hand.split(' ').map(card => cardvalue[card.substr(0, 1)]).sort(compareDesc);
    return values[0] - values[4] === 4 || values[4] === 2 && values[1] === 5 && values[0] === 14;
  };
  // initial
  this.hand = hand;
  this.type = getHandType(hand);
  this.rank = getRankSorted(hand);
  this.typeString = handtypeString[this.type];
}

PokerHand.prototype.compareWith = function(hand){
    if(this.type !== hand.type)
      return this.type > hand.type ? Result.win : Result.loss;
    var result;
    this.rank.some((r,i)=>{
      if(r.value !== hand.rank[i].value){
        result = r.value > hand.rank[i].value ? Result.win : Result.loss;
        return true;
      }
    })
    return result || Result.tie;
}