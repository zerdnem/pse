const request = require("request");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const file = path.resolve("config.json");
const config = fs.readFileSync(file, "utf-8", err => {
  console.log(err);
});
const query = JSON.parse(config);

for (let i = 0; i < query.exchange.length; i++) {
  const url =
    "http://phisix-api.appspot.com/stocks/" + query.exchange[i] + ".json";
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
      console.log(`${name} (${symbol})
====================
Price Amount: ${currency} ${amount}
Volume: ${volume}
Percent Change: ${change}
Date: ${as_of}
====================
`);
    } else {
      console.log("Not found.");
    }
  });
}
