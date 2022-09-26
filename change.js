function change(amount) {
  // Write your code here 
  let amountCents = amount * 100;

  const numCoins = {
    toonie: 0,
    loonie: 0,
    quarter: 0,
    dime: 0,
    nickel: 0,
    total: 0
  }

  const coinValues = [200, 100, 25, 10, 5];
  const coins = ['toonie', 'loonie', 'quarter', 'dime', 'nickel'];

  // Account for rounding of nickel from the start
  // E.g. $0.19 --> yields 2 dimes instead of 1 dime, 2 nickels
  amountCents = Math.round(amountCents / 5) * 5;

  // Count number of coins
  for (let i = 0; i < coins.length; i++) {
    if (amountCents / coinValues[i] > 0) {
      numCoins[coins[i]] += Math.floor(amountCents / coinValues[i]);
      numCoins.total += numCoins[coins[i]];
      amountCents %= coinValues[i];
    }
  }

  // Form coin statement output
  const coinStatementCount = [];
  let coinStatement = '';

  if (numCoins.total > 0) {
    coinStatement += 'You need to dispense ';

    for (coin of coins) {
      if (numCoins[coin] > 0) {
        // Pushes to coinStatementCount array: "<# of coin> <coin type><'s' if more than 1>"" --> E.g. '2 toonies'
        coinStatementCount.push(`${numCoins[coin]} ${coin}${insertS(numCoins[coin])}`);
      }
    }

    // Put everything together
    if (coinStatementCount.length > 1) {
      coinStatement += coinStatementCount.slice(0, coinStatementCount.length - 1).join(', ')
      coinStatement += ', and ' + coinStatementCount[coinStatementCount.length - 1] + '.';
    } else {
      coinStatement += coinStatementCount[0] + '.';
    }
  } else {
    coinStatement = "You don't need to dispense change.";
  }

  // Output
  console.log(coinStatement);
  console.log(`Total coins: ${numCoins.total}`);
}

// Inserts 's' for plural depending on argument number
function insertS(number) {
  return number > 1 ? 's' : '';
}

// Export the module
module.exports = change;
