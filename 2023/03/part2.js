const fs = require("fs");

fs.readFile("2023/03/input.txt", "utf-8", (err, data) => {
  const input = data.split("\n").filter((n) => n);
  let rows = input.length;
  let cols = input[0].length;

  const gearsDic = {};

  const locateGears = (str, num, i, j) => {
    j = j === -1 ? 0 : j;
    for (let k = 0; k < str.length; k++) {
      const ch = str.charAt(k);
      if (ch === "*") {
        const ind = `${i}-${j + k}`;
        gearsDic[ind] = gearsDic[ind]
          ? [...gearsDic[ind], parseInt(num)]
          : [parseInt(num)];
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const n = "" + input[i][j];
      if (isNaN(n)) continue;

      let num = n;
      while (++j < cols) {
        if (Number.isInteger(parseInt(input[i][j]))) num += input[i][j];
        else break;
      }

      const top =
        i === 0 ? "" : input[i - 1].substring(j - num.length - 1, j + 1);
      const bottom =
        i === rows - 1 ? "" : input[i + 1].substring(j - num.length - 1, j + 1);
      const left = input[i][j - num.length - 1] || "";
      const right = input[i][j] || "";

      locateGears(top, num, i - 1, j - num.length - 1);
      locateGears(bottom, num, i + 1, j - num.length - 1);
      locateGears(left, num, i, j - num.length - 1);
      locateGears(right, num, i, j);
    }
  }

  const v = Object.values(gearsDic)
    .filter((x) => x.length === 2)
    .map((x) => x[0] * x[1])
    .reduce((a, x) => a + x, 0);

  console.log(v);
});