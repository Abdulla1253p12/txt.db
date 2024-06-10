<center>
	<p>
		<a href="https://www.npmjs.com/package/txt.db"><img src="https://i.imgur.com/BPX2i1q.png" alt="txt.db"/></a>
        <br>
        <a href="https://www.npmjs.com/package/txt.db"><img src="https://img.shields.io/npm/dt/txt.db?color=4B68F6" alt="Downloads"/></a>
		<a href="https://www.npmjs.com/package/txt.db"><img src="https://img.shields.io/npm/v/txt.db?color=04DCC6" alt="Version"/></a>
	</p>
</center>

# txt.db

txt.db is a simple database package that utilizes text files for storage. It provides basic CRUD (Create, Read, Update, Delete) operations along with additional functionalities like backup and length calculation.

## Installation

```bash
npm install txt.db fs
```

# Using Database

## Create new database

```js
const { Database } = require('txt.db');
const db = new Database('path.txt');
```

## Set the Settings

```js
Settings.set({
    STTM: true, // true, false
    //This option is to save a copy of the data piece in your device's RAM while your project is running

    //API settings are under construction
});

//To show all settings you can write this
//await Settings.this;
//{ STTM: 'true/false' }
```

## Set

```js
db.set(`id`, 1);
db.set({ Key: `id`, Value: 1 });
/*
You can put these types at the top
string, number, boolean, object, array, bigint, undefined, null
*/
```

## Get

```js
db.get(`data`);
```

## Delete

```js
db.delete(`last_day`); //To delete the data
```

## Has

```js
db.has(`bay`, `what?`); //It will output if the key and value are true or false
```

## Add

```js
db.add(`ids`, 1); //If the peak is 10, it will become 11
```

## Subtraction

```js
db.add(`reps`, 1); //If the peak is 10, it will become 9
```

## Push

```js
db.push(`user_actions_1`, `login at 12:00 PM`); //To add something to a specific array
```

## Pull

```js
db.pull(`user_actions_2`, `login at 12:00 PM`); //To remove something to a specific array
```

## Type

```js
db.type(`number`); //If the value is a number, a number will appear
```

## AllKeys

```js
await db.allKeys(); //It will take out all the keys
```

## AllValues

```js
await db.allValues(); //It will take out all the values
```

## All

```js
await db.all(); //It will take out all the values
```

## Backup

```js
db.backup(`./backup.txt`); //A copy of the data base will be made on the same path
```

## Length

```js
db.length; //To know the number of items in the database
```

## Reset

```js
db.reset; //To reset the database
```

## Settings

```js
const { Settings } = require(`txt.db`);
Settings.set({
    STTM: false, // true, false
});
//STTM = Use a copy in the RAM cache
```

## Using API

The API system is under construction and will be present in the next update.

# License

This project is licensed under the ISC License. See the LICENSE file for details.