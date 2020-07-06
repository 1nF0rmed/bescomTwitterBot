var Twitter = require('twitter');
var config = require('./config.js');

var client = new Twitter(config);

// Tweet search parameters
var params = {
    // This is the twitter id for BESCOM
    follow: '570677817'
}

var stream = client.stream('statuses/filter', params)

stream.on('tweet', function(tweet){
    console.log(tweet.text)
})