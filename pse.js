const request = require("request");
const moment = require("moment");
const process = require("process");

const query = process.argv[2];
const url = "http://phisix-api.appspot.com/stocks/" + query + ".json";
request(url, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    const result = JSON.parse(body);
    let as_of = result.as_of;
    let volume = result.stock[0].volume;
    const name = result.stock[0].name;
    const currency = result.stock[0].price.currency;
    const amount = result.stock[0].price.amount;
    const change = result.stock[0].percent_change;
    const symbol = result.stock[0].symbol;
    as_of = moment(as_of).format("MMMM Do YYYY, h:mm a");
    volume = volume.toLocaleString();
    console.log(`As of ${as_of}

${name} (${symbol})
====================
Price Amount: ${currency} ${amount}
Volume: ${volume}
Percent Change: ${change}`);
  } else {
    console.log("Not found.");
  }
});
