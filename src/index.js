const fs = require(`fs`);

function Database(File){
    try {
        if(!File.includes(`.txt`)) File += `.txt`;
        let Dir = File.substring(0, File.lastIndexOf('/'));
        if(!fs.existsSync(Dir)){
            if(Dir !== ``){
                fs.mkdirSync(Dir, { recursive: true });
            }
        }
        if(!fs.existsSync(File)){
            fs.writeFileSync(File, ``);
        }
        let DATABASE = fs.readFileSync(File, `utf-8`);
        if(!DATABASE){
            fs.writeFileSync(File, ``);
        }
        let Settings;
        (async () => {
            Settings = await require(`../src/functions/getSettings.js`)();
        })();
        if(Boolean(Settings?.STTM) === false) DATABASE = ``;
        return {
            set(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/set`)(DATABASE, File, Key, Value);
            },
            get(Key){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/get`)(DATABASE, File, Key);
            },
            delete(Key){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/delete`)(DATABASE, File, Key);
            },
            has(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/has`)(DATABASE, File, Key, Value);
            },
            add(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`./database/add.js`)(DATABASE, File, Key, Value);
            },
            subtraction(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/subtraction`)(DATABASE, File, Key, Value);
            },
            push(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/push`)(DATABASE, File, Key, Value);
            },
            async pull(Key, Value){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/pull`)(DATABASE, File, Key, Value);
            },
            async allKeys(){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/allKeys`)(DATABASE, File);
            },
            async allValues(){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/allValues`)(DATABASE, File);
            },
            async all(){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/all`)(DATABASE, File);
            },
            type(Key){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/all`)(DATABASE, File, Key);
            },
            get reset(){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/pull`)(DATABASE, File);
            },
            backup(Path){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/backup`)(DATABASE, File, Path);
            },
            get length(){
                if(Settings?.STTM === `true`){
                    DATABASE = fs.readFileSync(File, `utf-8`);
                } else DATABASE = ``;
                return require(`../src/database/length`)(DATABASE, File);
            }
        }
    } catch (error){
        console.error(error);
    }
}

const Settings = {
    set({ STTM }){
        return require(`../src/settings/set`)(STTM);
    },
    get this(){
        return require(`../src/settings/this`)();
    }
};