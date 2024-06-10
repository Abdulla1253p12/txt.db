const fs = require(`fs`);

module.exports = async (DATABASE, File, Key) => {
    let Settings = await require(`../functions/getSettings.js`)();
    console.log(DATABASE);
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(!Key) throw new TypeError(`I didn't find the Key`);
    if(typeof(Key) !== `string`) throw new TypeError(`The Key is not a string`);

    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let match = DATABASE.match(regex);
    if(match){
        match = match[0].split(`|`);
        let Value = match[2].split(`Value-`)[1];
        let Type = match[3].split(`Type-`)[1];

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

        return {
            Date: {
                Year: match[0].split(`:`)[0],
                Month: match[0].split(`:`)[1],
                Day: match[0].split(`:`)[2],
                Hours: match[0].split(`:`)[3],
                Minutes: match[0].split(`:`)[4],
                Seconds: match[0].split(`:`)[5],
                Full: match[0]
            },
            Data: {
                Key: match[1].split(`Key-`)[1],
                Value: {
                    Data: Value,
                    Type: Type
                }
            }
        };
    } else {
        return undefined;
    }
}