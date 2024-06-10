const fs = require(`fs`);

module.exports = async (DATABASE, File, Key, Value) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(typeof(Key) === `object`){
        Value = Key.Value;
        Key = Key.Key;
    }
    if(!Key) throw new TypeError(`I didn't find the Key`);
    if(Value === undefined) throw new TypeError(`I didn't find the Value`);
    if(typeof(Key) !== `string`) throw new TypeError(`The Key is not a string`);
    let valueType = typeof(Value);
    if(Array.isArray(Value)){
        valueType = `array`;
        Value = JSON.stringify(Value);
    } else if(valueType === `object`){
        Value = JSON.stringify(Value);
    } else {
        Value = Value.toString();
    }
    Value = Value.toString();
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let match = DATABASE.match(regex);
    let has = false;
    if(match){
        match = match[0].split(`|`);
        let Type = match[3].split(`Type-`)[1] ?? `string`;
        if(valueType !== Type) return false;
        let Value2 = match[2].split(`Value-`)[1] ?? `0`;
        if(Value2 === Value) has = true;
    }
    return has;
}