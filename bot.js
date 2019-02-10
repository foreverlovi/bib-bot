var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var muted = [];

var dvd = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var dvdrunning = false;
var editdvd = 0;
var editvals = 0;

var cornerhits = 0;
var wallhits = 0;

var ballx = Math.floor(Math.random() * 12);
var bally = Math.floor(Math.random() * 15);

var velx = 1;
var vely = 1;

var typers = [];
var votestart = [];

var typemessages = [];

var racerchannel = 543926287538847766;

var wordlist = ['earth', 'moons', 'which', 'venus', 'could', 'means', 'world', 'billo', 'omido', 'kenno', 'ileme', 'stack', 'giant', 'rings', 'jazzy', 'clout', 'gucci', 'nista', 'ricky', 'drive', 'sewer', 'sides', 'riche', 'globe', 'brook', 'victo', 'onion', 'fruit', 'apple', 'grape', 'trees', 'spins', 'rashi', 'thicc', 'ishac', 'kings', 'funny', 'trash', 'spoon', 'jobis', 'forks', 'music', 'smile', 'frown', 'rappi', 'kappi', 'quick', 'maths', 'bored', 'roast', 'fried', 'cooks', 'boils', 'broil', 'micro', 'macro', 'angle', 'ankle', 'broke'];
var paragraph = '';
var realpara = '';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('bib is now online!');
    bot.setPresence({
		game: {
		   name: 'ex: bib weather :canada;',
			   type: 0
		}
    });
	
	var msg = "";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .\n";
	msg += ".      .      .      .      .      .      .      .      .      .      .      .";
	bot.sendMessage({
		to: '543923042628272149',
		message: 'corner hits: 0\nwall hits: 0'
	});
	bot.sendMessage({
		to: '543923042628272149',
		message: msg
	});
});
function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = '';

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null){
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp;
}

bot.on('message', function (user, userID, channelID, message, event) {
    if(message.toLowerCase() == "bib features"){
		var info = 'hey there\ni have many functions and features\nsince u asked for them here u go:\n1. bib **weather** :yourplace;\n2. **bib-racer**, a typing game\n  - bib join race\n  - bib leave race\n  - bib start race (which is a vote)\n3. **magic 8 ball** predicts an answer for any question like:\n  - bib am i cool\n  - bib am i smart\n  - bib is ken retarded\n4. **roasts**, roast your friends\n5. **human-like messages**, like responding to someone when they:\n  - ping themselves\n  - ping bill\n  - try to roast bib or bill\n6. **random image generation** gives u a random image\n7. punishing kids and muting kids who misbehave';
		bot.sendMessage({
			to: userID,
			message: info
		});
		bot.sendMessage({
			to: channelID,
			message: '<@' + userID + '> check ur dms'
		});
    }
	if(message.includes("bib run dvd") && userID == 460536699999748114){
		dvdrunning = true;
		editdvd = message.substring(message.indexOf("[") + 1, message.indexOf("]"));
		editvals = message.substring(message.indexOf("<") + 1, message.indexOf(">"));
	}
	if(dvdrunning){
		var interval = setInterval (function (){
			var msg = "";
			for(var y = 0; y < 15; y ++){
				for(var x = 0; x < 12; x ++){
					if(x == 11){
						if(x == ballx && y == bally){
							msg += "o\n";
						} else {
							msg += ".\n";
						}
					} else {
						if(x == ballx && y == bally){
							msg += "o      ";
						} else {
							if(y == bally && x == ballx - 1){
								msg += ".     ";
							} else {
								msg += ".      ";
							}
						}
					}
				}
			}
			bot.editMessage({
				channelID: '543923042628272149',
				messageID: editdvd,
				message: msg
			});
			bot.editMessage({
				channelID: '543923042628272149',
				messageID: editvals,
				message: 'corner hits: ' + cornerhits + '\nwall hits: ' + wallhits
			});
			
			if(ballx == 0){velx = 1; wallhits ++;}
			if(ballx == 11){velx = -1; wallhits ++;}
			if(bally == 0){vely = 1; wallhits ++;}
			if(bally == 14){vely = -1; wallhits ++;}
			ballx += velx;
			bally += vely;
			if(ballx == 0 && bally == 0){cornerhits ++;}
			if(ballx == 11 && bally == 0){cornerhits ++;}
			if(ballx == 0 && bally == 14){cornerhits ++;}
			if(ballx == 11 && bally == 14){cornerhits ++;}
		}, 3000);
	}
});

bot.on('message', function (user, userID, channelID, message, event) {
if(message == "bib random image"){
    bot.sendMessage({
        to: channelID,
        message: 'https://picsum.photos/g/150/150/?image=' + Math.floor(Math.random() * 1085)
    });
}
if(message.includes('bib set racerchannel') && userID == 460536699999748114){
    racerchannel = message.substring(message.indexOf("<") + 1, message.indexOf(">"));
}
if(channelID == racerchannel){
    typemessages.push(event.d.id);

    if(userID == 460536699999748114 && message == "bib end race"){
	paragraph = '';
	realpara = '';
	typers = [];
	votestart = [];
	bot.sendMessage({
            to: channelID,
            message: 'race ended'
        });
    }
    if(userID == 460536699999748114 && message == "bib clear channel"){
	bot.deleteMessages( {channelID: channelID, messageIDs: typemessages} );
    }
    if(userID != 542486364663316495){
	bot.deleteMessage({channelID: channelID, messageID: event.d.id});
    }
    if(message == "bib join race"){
	if(paragraph == ""){
	    if(typers.length < 5){
		if(!typers.includes(userID)){
	            typers.push(userID);

		    bot.sendMessage({
                    	to: channelID,
                    	message: '[' + typers.length + '/5 racers]'
            	    });
	            bot.sendMessage({
                    	to: channelID,
                    	message: '<@' + userID + "> joined the race"
           	    });
		} else {
		    bot.sendMessage({
                    	to: channelID,
                    	message: '<@' + userID + "> youre already in the race!"
           	    });
		}
	    } else {
	    	bot.sendMessage({
                    to: channelID,
                    message: 'sorry <@' + userID + "> the racetracks full with 5 players"
            	});
	    }
	} else {
	    bot.sendMessage({
                to: channelID,
                message: 'sorry <@' + userID + "> theres already a race going on"
            });
	}
    }
    if(message == "bib leave race"){
	if(typers.includes(userID)){
	    typers.pop(typers.indexOf(userID));
	    if(typers.length == 0){
		paragraph = '';
	    	realpara = '';
	    	typers = [];
	    	votestart = [];
	    	bot.sendMessage({
                    to: channelID,
                    message: 'race ended'
           	});
	    }
	    if(votestart.includes(userID)){
			votestart.pop(votestart.indexOf(userID));
	    }

	    bot.sendMessage({
            to: channelID,
            message: '[' + typers.length + '/5 racers]'
        });
	    bot.sendMessage({
                to: channelID,
                message: '<@' + userID + "> left the race"
            });
	} else {
	    bot.sendMessage({
                to: channelID,
                message: '<@' + userID + "> ur not in the race"
            });
	}
    }

    if(paragraph != '' && typers.includes(userID)){
	if(message != realpara){
	    if(message != "bib leave race"){
	    	bot.sendMessage({
                    to: channelID,
                    message: '<@' + userID + "> incorrect text sorry!"
           	});
	    }
	} else {
	    paragraph = '';
	    realpara = '';
	    typers = [];
	    votestart = [];
	    bot.sendMessage({
                to: channelID,
                message: '<@' + userID + "> wins the race!"
            });
	}
    }

    if(message == "bib start race"){
	if(typers.includes(userID)){
	    if(!votestart.includes(userID) && paragraph == ''){
	    	votestart.push(userID);
	    	
		if(paragraph == ''){
		    if(votestart.length < Math.floor(typers.length/2 + 1)){
	    	    	bot.sendMessage({
                    	    to: channelID,
                    	    message: '<@' + userID + "> voted to start race"
                        });
	            	bot.sendMessage({
                    	    to: channelID,
		    	    message: '[' + typers.length + '/' + Math.floor(typers.length/2 + 1) + ' voters]'
            	        });
		    }
		}

		if(votestart.length >= Math.floor(typers.length/2 + 1)){
		    for(var i = 0; i < 20; i ++){
		    	var randex = Math.floor(Math.random() * wordlist.length);
		    	paragraph += wordlist[randex];
		    	realpara += wordlist[randex];
		    	if(i < 19){
			    paragraph += '  ';
			    realpara += ' ';
		    	}
		    }

		    bot.sendMessage({
                    	to: channelID,
		    	message: paragraph
                    });

		    bot.sendMessage({
                    	to: channelID,
		    	message: 'race started! heres your text:'
                    });
	    	}
	    } else {
		bot.sendMessage({
                    to: channelID,
                    message: '<@' + userID + "> you already voted lol"
                });
	    }
	} else {
	    bot.sendMessage({
                to: channelID,
                message: '<@' + userID + "> u have to join race first"
            });
	}
    }
}
});
bot.on('message', function (user, userID, channelID, message, event) {
    if(message.includes("bib punish") && userID == 460536699999748114){
		var tobemuted = message.substring(message.indexOf("<@") + 2, message.indexOf(">"));
		if(muted.includes(tobemuted) == false){
			muted.push(tobemuted);
			
			bot.addToRole({
				serverID: 543920943836299284,
				userID: tobemuted,
				roleID: 543924254169890838
			});
		
			bot.sendMessage({
				to: channelID,
				message: 'ok <@' + tobemuted + ">'s been punished"
			});
		} else {
			bot.sendMessage({
				to: channelID,
				message: '<@' + tobemuted + '> is already punished'
			});
		}
    }
    if(message.includes("bib free") && userID == 460536699999748114){
		var tobefreed = message.substring(message.indexOf("<@") + 2, message.indexOf(">"));
		if(muted.includes(tobefreed) == true){
			muted.pop(muted.indexOf(tobefreed));
			
			bot.removeFromRole({
				serverID: 543920943836299284,
				userID: tobefreed,
				roleID: 543924254169890838
			});

			bot.sendMessage({
				to: channelID,
				message: 'ok <@' + tobefreed + ">'s been released"
			});
		} else {
			bot.sendMessage({
				to: channelID,
				message: '<@' + tobefreed + '> isnt in jail'
			});
		}
    }
    /*if(muted.includes(userID)){
	bot.deleteMessage({channelID: channelID, messageID: event.d.id});
    }*/
});

bot.on('message', function (user, userID, channelID, message, evt) {
    var lowcase = message.toLowerCase();
    if(userID == 460536699999748114){
	if(message.includes("<@") && message.includes(">") && !message.includes(userID) && !message.includes("roast") && !message.includes("bib punish") && !message.includes("bib free")){
	    bot.sendMessage({
                to: channelID,
                message: 'yeah, ' + "<@" + message.substring(message.indexOf("<@") + 2, message.indexOf(">")) + '>'
            });
	}
    }
    if(message.includes("<@"+userID+">")){
	bot.sendMessage({
            to: channelID,
            message: 'lmfao wtf why u pinging urself kid'
        });
    } else if(message.includes("<@460536699999748114>") && userID != 542486364663316495 && !message.includes("roast")){
	bot.sendMessage({
            to: channelID,
            message: 'bruh dont ping him kid'
        });
    }
    if(message.includes("<@542486364663316495>") && !message.includes("roast")){
	bot.sendMessage({
            to: channelID,
            message: 'wtf dont ping me'
        });
    }
    if (lowcase.substring(0, 4) == 'bib ') {
        var args = message.substring(4);
        var cmd = args.toLowerCase();
        if(cmd.includes("what is ken ") || cmd == "what is ken"){
	    bot.sendMessage({
                to: channelID,
                message: 'a bot xd'
            });
	} else if(cmd.includes("what is omid ") || cmd == "what is omid"){
	    bot.sendMessage({
                to: channelID,
                message: 'full time fortnite csgo bot'
            });
	} else if(cmd.includes("what is bill ") || cmd == "what is bill"){
	    bot.sendMessage({
                to: channelID,
                message: 'awesome'
            });
	} else if(cmd.includes("what is yun fan ") || cmd == "what is yun fan"){
	    bot.sendMessage({
                to: channelID,
                message: 'never'
            });
	} else if(cmd.includes("what is ")){
	    bot.sendMessage({
                to: channelID,
                message: 'no'
            });
	}
	if(lowcase.includes("weather")){
	    var place = "";
	    place = message.substring(message.indexOf(":") + 1, message.indexOf(";"));
	    try {
    	    	var gjson;
	 	gjson = getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=metric&appid=8607de0f60edf5f7a97e758d694c6d13");
	 	var info = JSON.parse(gjson);
	   	var weather = info.weather;
	    	var main = info.main;

		var sendmessage = JSON.stringify(weather[0].main).toLowerCase() + " " + JSON.stringify(Math.round(main.temp)) + " C right now in " + place;

		bot.sendMessage({
                    to: channelID,
                    message: '<@' + userID + '> ' + sendmessage
           	});
	    } catch(err) {
		if(message.includes(":") && message.includes(";") && message.indexOf(":") < message.indexOf(";")){
		    bot.sendMessage({
                        to: channelID,
                        message: '<@' + userID + '> ' + 'u sure thats a place? lol ' + '"' + place + '"'
           	    });
		} else {
		    bot.sendMessage({
                        to: channelID,
                        message: '<@' + userID + '> ' + 'dont forget to have ur place in between :; like this: :yourplace;'
           	    });
		}
	    }
        }
	if(cmd.substring(0, 2) == "is" || cmd.substring(0, 3) == "are" || cmd.substring(0, 4) == "does" || cmd.substring(0, 5) == "would" || cmd.substring(0, 4) == "will" || cmd.substring(0, 5) == "could" || cmd.substring(0, 3) == "can" || cmd.substring(0, 6) == "should" || cmd.substring(0, 2) == "am"){
	    	var probs = ["definitely not", "probably not", "maybe?", "probably", "definitely", "101%"];
	    	var answer = probs[Math.floor(Math.random() * probs.length)];
	   	if(cmd.includes("is bib real") || cmd.includes("are you real") || cmd.includes("are u real")){
		    bot.sendMessage({
                        to: channelID,
           	        message: "obviously lol"
                    });
	        } else if(lowcase.includes("bill") || lowcase.includes("arctic") || lowcase.includes("sparrow") || lowcase.includes("artic") || lowcase.includes("sparow")){
		    bot.sendMessage({
                        to: channelID,
           	        message: "stfu about bill"
                    });
	 	} else if( ( (lowcase.includes("dede") || lowcase.includes("kenneth's bot") || message.includes("<@542520337255104524>") ) && lowcase.includes("you") ) || ( (lowcase.includes("dede") || lowcase.includes("kenneth's bot") || message.includes("<@542520337255104524>") ) && lowcase.includes("bib") ) ){
		    bot.sendMessage({
                        to: channelID,
           	        message: "im superior lol"
                    });
	    	} else {
		    bot.sendMessage({
                        to: channelID,
           	        message: answer
                    });
		}
	}
	if(cmd.includes("roast") && cmd.includes("<@")){
	    var roasts = ["weird", "stupid", "dumb", "like ur mom", "like you got hit by a train", "dead", "like diarrhea", "only slightly better than omid"];
	    if(userID == 460536699999748114){
		bot.sendMessage({
                    to: channelID,
           	    message: "<@" + message.substring(message.indexOf("<@") + 2, message.indexOf(">")) + '>' + ", you look " + roasts[Math.floor(Math.random() * roasts.length)]
                });
	    } else if(message.includes("<@542486364663316495>") || message.includes("<@543569037574012954>")){
		bot.sendMessage({
                    to: channelID,
           	    message: "no lmfao"
                });
	    } else {
		if(message.substring(message.indexOf("<@") + 2, message.indexOf(">")) == 460536699999748114){
		   bot.sendMessage({
                      to: channelID,
           	      message: "you look cool, bill"
                   });
		} else {
		   if(message.substring(message.indexOf("<@") + 2, message.indexOf(">")) != userID){
		  	bot.sendMessage({
                      	    to: channelID,
           	      	    message: "<@" + message.substring(message.indexOf("<@") + 2, message.indexOf(">")) + ">, you look almost as ugly as " + "<@" + userID + ">"
                   	});
		   } else {
			bot.sendMessage({
                      	    to: channelID,
           	      	    message: "are u retarded dont roast urself"
                   	});
		   }
		}
	    }
	}
     }
});
