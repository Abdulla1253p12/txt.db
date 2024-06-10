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
    let DATE = new Date();
    DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let newData = `${DATE}|Key-${Key}|Value-${Value}|Type-${valueType}`;
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