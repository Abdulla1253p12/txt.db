const fs = require(`fs`);

module.exports = async () => {
    let Path = `./db-txt/config.conf`;
    let Dir = Path.substring(0, Path.lastIndexOf('/'));
    if(!fs.existsSync(Dir)){
        if(Dir !== ``){
            fs.mkdirSync(Dir, { recursive: true });
        }
    }
    if(!fs.existsSync(Path)){
        fs.writeFileSync(Path, ``);
    }
    let Data = fs.readFileSync(Path, `utf-8`) || ``;
    Data = Data.split(`\n`);
    let Return = {};
    (async () => {
        await Data.forEach(Setting => {
            Setting = Setting.split(`=`);
            if(Setting[0] === ``) return;
            Return[Setting[0]] = Setting[1];
        });
    })();
    return Return;
}