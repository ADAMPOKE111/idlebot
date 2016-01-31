var Steam = require("steam"); // Require NodeJS "Steam" package
var fs = require("fs"); // Require NodeJS "fs" package
var bot = new Steam.SteamClient(); // Define "bot"
//var botfriends = new Steam.SteamFriends(SteamClient); // Define "botfriends"
var admin = ""; // Admin SteamID64 - leave blank if no admin
var appID = ""; // Game to idle's AppID - 

if (admin == "") {
    admin = "0"
}
 
if (fs.existsSync("sentryfile")) // If the sentryfile exists
{
    var sentry = fs.readFileSync("sentryfile");
    console.log("[BOT] Logging in with sentry file");
    bot.logOn({
      accountName: "", // Username
      password: "", // Password
      shaSentryfile: sentry
    });
}
else
{
    console.log("[BOT] Logging in without sentry");
    bot.logOn({
      accountName: "", // Username
      password: "", // Password
      authCode: "" // SteamGuard Code
    });
}
bot.on("loggedOn", function() {
    console.log("[BOT] Logged in");
    bot.setPersonaState(Steam.EPersonaState.Online);
    bot.sendMessage(admin, "[BOT] Logged in", Steam.EChatEntryType.ChatMsg);
    //Tell steam we are playing games. 440=TF2, 550=L4D2, 730=CSGO, 570=DOTA2
    bot.gamesPlayed([730]); // You can put them in an array like so: gamesPlayed([730, 440, 570]) or just put (appID) to idle whatever's in the appID
});

bot.on("friendMsg", function(steamID, message, type) {
    if(type != Steam.EChatEntryType.ChatMsg) return;
    if(steamID == admin) { // Chat responses only availible to admins
    
        if(message.indexOf("/change") == 0) { // Command to change game to idle via steam chat
            if(message.length > 8) {
                var newappID = message.split(" ")[1]; // Get the appID to idle
                bot.gamesPlayed([newappID]); // Idle it
                console.log("Now idling AppID: " + newappID); // Log it to the console
            } else {
                bot.sendMessage(admin, "You need to provide an appID like this: \"/change APPIDHERE\"", Steam.EChatEntryType.ChatMsg);
            }
        }
        
        if(message.indexOf("/name") == 0) { // Command to change name via steam chat
            if(message.length > 5) {
                var newName = message.split(" ")[1]; // Get the name - bug: does not allow spaces or quotations and such
                bot.setPersonaName(newName); // Change it
                console.log("Steam name changed: \"" + newName + "\""); // Log it to the console
            } else {
                bot.sendMessage(admin, "You need to provide a name like this: \"/name NAMEHERE\"", Steam.EChatEntryType.ChatMsg);
            }
        }
    }
    
    if(steamID != admin || steamID == admin) {
        
        if(message.indexOf("idle") > -1) { // > -1 means that it'll check the whole message for the string whereas == 0 will check explicitly
        bot.sendMessage(steamID, "[BOT] Yeah i'm idling. AppID: " + appID, Steam.EChatEntryType.ChatMsg);
        console.log(steamID + " has checked if bot is idle.");
    }
    }
});
 
bot.on("sentry", function(sentryHash)
{//A sentry file is a file that is sent once you have passed steamguard verification.
    console.log("[BOT] Received sentry file");
    fs.writeFile("sentryfile",sentryHash,function(err) {
    if(err){
      console.log(err);
    } else {
      console.log("[FS] Saved sentry file to disk");
    }});
});
 
//Handle logon errors
bot.on("error", function(e) {
console.log("[BOT] Error: Logon failed");
    if (e.eresult == Steam.EResult.InvalidPassword)
    {
    console.log("Error: Invalid Password");
    }
    else if (e.eresult == Steam.EResult.AlreadyLoggedInElsewhere)
    {
    console.log("Error: Already logged in somewhere else");
    }
    else if (e.eresult == Steam.EResult.AccountLogonDenied)
    {
    console.log("Error: Logon denied - SteamGuard required");
    }
})