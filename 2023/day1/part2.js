const fs = require('fs');
const fileName = '2023/day1/input';


fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
    return;
  }


const nums = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}

const res = data.trim().split("\n").map(text => {
    let first = null;

    let firstAcc = "";

    for(const char of text){
        if(!first){
            if(!Number.isNaN(Number(char))){
                first = char
                firstAcc = "";
            } else {
                firstAcc += char

                const matching = Object.entries(nums)
                    .find(([key, num]) => {
                        if(firstAcc.includes(key)){
                            return num;
                        }
                    })
        
                if(matching){
                    first = matching[1];
                    firstAcc = "";
                }
            }
        }
    }

    let second = null;

    let secondAcc = "";

    for(const char of text.split("").reverse()){
        if(!second){
            if(!Number.isNaN(Number(char))){
                second = char
                secondAcc = "";
            }  else {
                secondAcc += char

                const matching = Object.entries(nums)
                    .find(([key, num]) => {
                        if(secondAcc.split("").reverse().join("").includes(key)){
                            return num;
                        }
                    })
            
                if(matching){
                    second = matching[1];
                    secondAcc = "";
                }
            }
        }
    }

    return Number(`${first}${second}`)
})
    .reduce((acc, n) => acc + n, 0)

console.log(res);
});