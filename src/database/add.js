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
    let DATE = new Date();
    DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let match = DATABASE.match(regex);
    if(match){
        match = match[0].split(`|`);
        let Value2 = match[2].split(`Value-`)[1] || `0`;
        let Type = match[3].split(`Type-`)[1];
        if(Type !== `number`) throw new TypeError(`The Data is not a number`);
        Value = Number(Value);
        Value2 = Number(Value2);
        Value = Value2 + Value;
    }
    let newData = `${DATE}|Key-${Key}|Value-${Value.toString()}|Type-${valueType}`;
    if(regex.test(DATABASE)){
        DATABASE = DATABASE.replace(regex, newData);
    } else {
        DATABASE += `\n${newData}`;
    }
    let Dir = File.substring(0, File.lastIndexOf('/'));
    if(!fs.existsSync(Dir)){
        if(Dir !== ``){
            fs.mkdirSync(Dir, { recursive: true });
        }
    }
    fs.writeFileSync(File, DATABASE.trim());
}