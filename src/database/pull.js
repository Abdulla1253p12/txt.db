const fs = require(`fs`);

module.exports = async (DATABASE, File, Key, Value) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(typeof(Key) === `object`){
        Key = Key.Key;
        Value = Value.Key;
    }
    if(!Key) throw new TypeError(`I didn't find the Key`);
    if(typeof(Key) !== `string`) throw new TypeError(`The Key is not a string`);
    if(Value === undefined) throw new TypeError(`I didn't find the Value`);
    let DATE = new Date();
    DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let match = DATABASE.match(regex);
    if(match){
        match = match[0].split(`|`);
        let Value2 = match[2].split(`Value-`)[1] || `[]`;
        let Type = match[3].split(`Type-`)[1];
        if(Type !== `array`) throw new TypeError(`The Data is not an array`);
        Value2 = JSON.parse(Value2);
        if(Value2.length === 0) return;
        Value2 = await Value2.filter(Item => {
            if(typeof Item === `string`){
                if(Item === Value) return;
            } else if(typeof Item === `number`){
                if(Number(Item) === Value) return;
            } else if(typeof Item === `boolean`){
                if(Boolean(Item) === Value) return;
            } else if(typeof Item === `object` && !Array.isArray(Item)){
                if(JSON.stringify(Item) === JSON.stringify(Value)) return;
            } else if(Array.isArray(Item)){
                if(JSON.stringify(Item) === JSON.stringify(Value)) return;
            }
            return true;
        });
        let newData = `${DATE}|Key-${Key}|Value-${JSON.stringify(Value2)}|Type-array`;
        DATABASE = DATABASE.replace(regex, newData);
        let Dir = File.substring(0, File.lastIndexOf('/'));
        if(!fs.existsSync(Dir)){
            if(Dir !== ``){
                fs.mkdirSync(Dir, { recursive: true });
            }
        }            
        fs.writeFileSync(File, DATABASE.trim());
    } else {
        throw new TypeError(`The Key does not exist`);
    }
}