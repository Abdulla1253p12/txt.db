const fs = require(`fs`);

module.exports = async (DATABASE, File) => {
    DATABASE = ``;
    let Dir = File.substring(0, File.lastIndexOf('/'));
    if(!fs.existsSync(Dir)){
        if(Dir !== ``){
            fs.mkdirSync(Dir, { recursive: true });
        }
    }        
    fs.writeFileSync(File, ``);
}