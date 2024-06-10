const fs = require(`fs`);

module.exports = async (STTM) => {
    try {
        if(!STTM && typeof(STTM) !== `boolean`) throw new TypeError(`The value must be true or false`);
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
        let RegEx = new RegExp(`^.*STTM=.*$`, `m`);
        if(RegEx.test(Data)){
            Data = Data.replace(RegEx, `STTM=${STTM}`);
        } else {
            Data += `\nSTTM=${STTM}`;
        }
        fs.writeFileSync(Path, Data);
    } catch (error) {
        console.error(error);
    }
}