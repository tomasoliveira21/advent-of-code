const fs = require("fs");

fs.readFile("2023/04/input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").map((x) => x.replace(/  /g, " 0"));

    const res = input.reduce((acc, row) => {
      const [, cards] = row.split(": ");
      const [winners, deck] = cards.split(" | ");
  
      const point = deck
        .split(" ")
        .filter((card) => winners.includes(card)).length;
  
      const value = point === 0 ? 0 : Math.pow(2, point - 1);
  
      console.log('winners: ', winners);
      console.log('deck: ', deck);

      return acc + value;
    }, 0);
  
    console.log(res);
});