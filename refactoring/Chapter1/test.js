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












function createStatementData(invoice, plays){
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance){
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }
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
  function volumeCreditsFor(aPerformance){
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }
  function totalAmount(data){
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
  function totalVolumeCredits(data){
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function htmlStatement(invoice, plays){
  return renderHTML(createStatementData(invoice, plays));
}



function renderHTML(data, invoice, plays){
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for(let perf of data.performances){
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function usd(aNumber){
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USE", minimumFractionDigits: 2}).format(aNumber/100);
}




const result = htmlStatement(invoices, plays);
console.log(resultOrigin == result);
console.log(result);
