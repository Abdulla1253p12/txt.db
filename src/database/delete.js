const fs = require(`fs`);

module.exports = async (DATABASE, File, Key) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(!Key) throw new TypeError(`I didn't find the Key`);
    if(typeof(Key) !== `string`) throw new TypeError(`The Key is not a string`);
    let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
    if(regex.test(DATABASE)){
        let match = DATABASE.match(regex);
        DATABASE = DATABASE.replace(`\n${match[0]}`, ``);
    } else throw new TypeError(`I didn't find the Data`);
    let Dir = File.substring(0, File.lastIndexOf('/'));
    if(!fs.existsSync(Dir)){
        if(Dir !== ``){
            fs.mkdirSync(Dir, { recursive: true });
        }
    }        
    fs.writeFileSync(File, DATABASE.trim());
}