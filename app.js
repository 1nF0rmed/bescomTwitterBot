var Twitter = require('twit');
var config = require('./config.js');

var myID = 2470522087

console.log(config)

var client = new Twitter(config);

function parseText(text) {
    var regex = /\d\d:\d\d\s+Hrs\s+\d\d\.\d\d\.\d\d\d\d/
    var found = text.match(regex)

    if( found!=null )
        return found[0]
    else 
        return null
}

function dropMessage(text) {
    var restoreTime = parseText(text)
    if( restoreTime!=null ) {
        var restoreMessage = "There is a power outage in your area. Power will be restored by: "+restoreTime
        client.post('direct_messages/events/new', {
            event: {
                type: "message_create",
                message_create: {
                    target: {
                        recipient_id: myID
                    },
                    message_data: {
                        text: restoreMessage
                    }
                }
            }
        }, (err, event)=>{
            if( err ) {
                console.log(err)
            } else {
                console.log(event)
            }
        })
    }
}

function streamTweets(userID) {
    var possibleLocations = ['k.r puram', 'gayathri layout','basavanapura','kr puram']
    var params = {
        //follow: [userID]
        track: 'Contact Bescom Helpline'
    }
    console.log("[LOG] Getting tweets")
    var stream = client.stream('statuses/filter', params)
    stream.on('tweet', function(tweet){
        //console.log(tweet)
        var extTweet = tweet.extended_tweet.full_text
        if( extTweet.includes('Contact Bescom Helpline')/*&&tweet.user.id==userID*/ ) {
            console.log("Tweet: ")
            console.log(extTweet)
            for(var i=0;i<possibleLocations.length;i++) {
                if( extTweet.toLowerCase().includes(possibleLocations[i]) ) {
                    console.log("[LOG] There will be a power cut")
                    dropMessage(extTweet)
                    break
                }
            }
        }
    })
}

function getUserID(callback) {
    client.get('users/show', {screen_name: 'NammaBESCOM'}, function(err, data, response){
        if( !err ) {
            console.log("User: ")
            console.log(data.id_str)
            callback(data.id)
        } else {
            console.log("[LOG][ERR] Unable to get user data")
            console.log("[LOG] Exiting...")
        }
    })
}

function main() {
    getUserID(streamTweets)
    /*var test = `Dear Consumer,

    No power supply in Gunjur palya, Panthur dinne and surrounding areas.
    
    Approximate restoration time: 18:30   Hrs 06.07.2020 
    
    Inconvenience Regretted. 
    
    Contact Bescom Helpline for more details.`
    console.log(parseText(test)!=null)
    dropMessage(test)*/
}

main()