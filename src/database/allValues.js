const fs = require(`fs`);

module.exports = async (DATABASE, File) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    let Values = [];
    let Array = DATABASE.split(`\n`);
    if(!Array[0].length || Array[0].length <= 0) return undefined;
    await Array.forEach(async Data => {
        Data = Data.split(`|`);
        let Value = Data[2].split(`Value-`)[1];
        let Type = Data[3].split(`Type-`)[1];
        if(Type === `array` || Type === `object`){
            Value = JSON.parse(Value);
        } else if(Type === `boolean`){
            Value = (Value === `true`);
        } else if(Type === `number`){
            Value = Number(Value);
        } else if(Type === `bigint`){
            Value = BigInt(Value);
        } else if(Type === `undefined`){
            Value = undefined;
        } else if(Type === `null`){
            Value = null;
        } else {
            Value = Value.toString();
        }
        return Values.push(Value);
    });
    return Values;    
}