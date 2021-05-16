const plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"},
}

const invoices = {
  "customer": "BigCo",
  "performances": [
    {
      "playID": "hamlet",
      "audience": 55
    },
    {
      "playID": "as-like",
      "audience": 35
    },
    {
      "playID": "othello",
      "audience": 40
    }
  ]
}

function statementOrigin(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USE", minimumFractionDigits: 2}).format;

  for(let perf of invoice.performances){
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type){
      case "tragedy":
        thisAmount = 40000;
        if(perf.audience > 30){
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if(perf.audience > 20){
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Erorr(`알 수 없는 장르: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);
    if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

const resultOrigin = statementOrigin(invoices, plays);










function playFor(aPerformance){
  return plays[aPerformance.playID];
}

function amountFor(aPerformance){
  let result = 0;

  switch (playFor(aPerformance).type){
    case "tragedy":
      result = 40000;
      if(aPerformance.audience > 30){
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if(aPerformance.audience > 20){
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Erorr(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }
  return result;
}

function statement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USE", minimumFractionDigits: 2}).format;

  for(let perf of invoice.performances){
    volumeCredits += Math.max(perf.audience - 30, 0);
    if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

const result = statement(invoices, plays);
console.log(resultOrigin == result);
