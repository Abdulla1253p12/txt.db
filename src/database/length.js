const fs = require(`fs`);

module.exports = async (DATABASE, File) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    DATABASE.split('\n').length > 0 ? (DATABASE.split('\n')[0].length > 0 ? DATABASE.split('\n').length : 0) : 0
}