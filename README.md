# idlebot
idlebot is a steam game idler using nodejs

## Usage
To use idlebot you'll need nodejs 0.12.x (tested and working with 0.12.9) and node-steam 0.6.8

### Features
* "idle" - type 'idle' in steam chat to the bot and it will reply if/what it's idling.
* "/change APPID" - type '/change APPID' to change to a new appID to idle where 'APPID' is a steam app's ID.
* "/name NAMEHERE" - type '/name NAMEHERE' to change the bot's steam name where NAMEHERE is the steam name.

## Running/Installing
### Requirements:
* NodeJS 0.12.x (latest 0.12.x version)
* NodeJS Steam Module v0.6.8 (npm install -g steam@0.6.8)

### Running:
* Optionally enter an alternate accounts steam ID into the admin variable on line 4 to be notified of the bot's status
* Line 15/16/24/25 - Enter your steam username & password.
* Line 26 - Enter your steam guard code from your email after running it first time
* Line 34/6 - Enter the Steam AppID you want to idle
* "node/nodejs idlebot.js"

## Known Bugs/Issues
* "/name NAMEHERE" doesn't allow spaces or quotations and such in the 'NAMEHERE' part.
