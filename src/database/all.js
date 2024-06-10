const fs = require(`fs`);

module.exports = async (DATABASE, File) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    let DATA = [];
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
        return DATA.push({
            Date: {
                Year: Data[0].split(`:`)[0],
                Month: Data[0].split(`:`)[1],
                Day: Data[0].split(`:`)[2],
                Hours: Data[0].split(`:`)[3],
                Minutes: Data[0].split(`:`)[4],
                Seconds: Data[0].split(`:`)[5],
                Full: Data[0]
            },
            Data: {
                Key: Data[1].split(`Key-`)[1],
                Value: {
                    Data: Value,
                    Type: Type
                }
            }
        });
    });
    return DATA;
}