    var ImageRecognition = require("image-recognition");
  var Filter = require('bad-words'),
    filter = new Filter();
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const attachment_moderator = require("./moderators/attachment_moderator");
const text_moderator = require('./moderators/text_moderator');
const { Client } = require("discord.js");
const client = new Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
attachment_moderator.load_model().then(() => {
	client.login(BOT_TOKEN);
});

client.on("ready", () => {
	console.log(`${client.user.tag} Listening`);
});

client.on("message", async (messageRef) => {
	if (messageRef.author.bot) return;
 
	if (messageRef.content === "!status") {
		messageRef.channel.send("Bot Status: HEALTHY");
	}

  msg_scanned += 1
	delete_flag = false;


	messageRef.attachments.forEach(async (attachment) => {
    
		let prediction = await attachment_moderator.moderate(attachment)

    
		if (process.env.NODE_ENV !== "production") {
			console.log("[INFO] ",prediction);
		}
		
		if (prediction)
		{
			const allowed_attributes = ["Neutral", "Drawing"];
			if (!allowed_attributes.includes(prediction)) {
        delete_flag = true
        msg_deleted += 1
				deleteMessage(messageRef);
			}
		}
	});

	if (messageRef.content != "" && delete_flag==false)
	{
		

			// some testing
		

		
		
	}
})
function deleteMessage(messageRef) {
  client.channels.cache.get(`826436917825503313`).send(`NSFW DELETED IN MEDIA CHANNEl\n ID:=${messageRef.author.id} \n TAG:-${messageRef.author.tag}\n ping:- <@${messageRef.author.id}>`)
	messageRef
	  .reply("Inappropriate message, hence will be deleted")
    
	  .then((responseRef) => {
		messageRef
		  .delete({ timeout: 0000 })
		  .then(() => {
			responseRef.edit("_Inappropriate message deleted by Bot_");
		  })
		  .catch((err) => {
			console.error(err.message);
		  });
	});
}
let msg_scanned = 0
let msg_deleted = 0

function getStats(){
	return {
		'scanned': msg_scanned,
		'deleted': msg_deleted,
	}
}

module.exports = getStats
