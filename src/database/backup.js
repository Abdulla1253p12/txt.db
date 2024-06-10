const fs = require(`fs`);

module.exports = async (DATABASE, File, Path) => {
    let Settings = await require(`../functions/getSettings.js`)();
    if(Settings?.STTM === `false`) DATABASE = fs.readFileSync(File, `utf-8`);
    if(!Path.includes('.txt')) Path += '.txt';
    let Dir = Path.substring(0, Path.lastIndexOf('/'));
    if(!fs.existsSync(Dir)){
        if(Dir !== ``){
            fs.mkdirSync(Dir, { recursive: true });
        }
    }
    fs.writeFileSync(Path, DATABASE.trim());
}