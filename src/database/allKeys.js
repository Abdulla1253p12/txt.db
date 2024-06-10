const fs = require(`fs`);

module.exports = async (DATABASE, File) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    let Keys = [];
    let Array = DATABASE.split(`\n`);
    if(!Array[0].length || Array[0].length <= 0) return undefined;
    await Array.forEach(async Data => {
        Data = Data.split(`|`);
        return Keys.push(Data[1].split(`Key-`)[1]);
    });
    return Keys;
}