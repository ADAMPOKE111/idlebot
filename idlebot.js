var Steam = require("steam"); // Require NodeJS "Steam" package
var fs = require("fs"); // Require NodeJS "fs" package
var bot = new Steam.SteamClient(); // Define "bot"
var admin = ""; // Admin SteamID64 - leave blank if no admin

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
    bot.gamesPlayed([730]); // You can put them in an array like so: gamesPlayed([730, 440, 570])
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