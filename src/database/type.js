const fs = require(`fs`);

module.exports = async (DATABASE, File, Key) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(!Key) throw new TypeError(`I didn't find the Key`);
    if(typeof(Key) !== `string`) throw new TypeError(`The Key is not a string`);
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    let match = DATABASE.match(regex);
    if(match){
        match = match[0].split(`|`);
        let Type = match[3].split(`Type-`)[1];
        return Type;
    } else {
        return undefined;
    }
}