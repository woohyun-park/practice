import createStatementData from './createStatementData.js';

export default function htmlStatement(invoice, plays){
  return renderHTML(createStatementData(invoice, plays));

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
}
