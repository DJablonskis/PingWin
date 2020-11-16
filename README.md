# PingWin
Discord Bot that converts coordinates in messages to usable links for browser game Travian.

## Installation

All you need is: `npm install`

## Setup

- Bot token is stored in `.env` file in the root directory. Please create your own `.env` file.
- File contents should be:
```
BOT_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXX-XXXXXXXXXXX_XXXXXXXXX
```
- If runing localy start with `node bot`
- If deploying on Heroku do not forget to set enviromental variable with bot token instead of `.env` file
- Update world setings object in `bot.js` to match your world i.e.:
```
const worldSettings = {
    world: "tt.travian.com",
    mapSize: 400
}
// world -  String i.e.: "tt.travian.com"
// mapSize - int usualy 200 or 400
```
- set your prefered commad prefix: `const prefix = "!PW";`

## Commands

- `lnk` - takes 3 parameters (flags parameter is optional and defaults to string "ictr"). Usage: `lnk _flags_ xx yy` 

## License

[Apache License 2.0](/LICENSE)
