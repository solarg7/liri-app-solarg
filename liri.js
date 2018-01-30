require("dotenv").config();
var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
console.log("paolita");
var fs = require("fs");

var wordInput = process.argv;

functionLiri(wordInput[2]);

function functionLiri(action){
    switch (action){
        case "my-tweets":
        
        getTweets();
        break;

        case "spotify-this-song":
        getSong();
        break;
        
    }
}


function getTweets(){
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'Chootan2046', count: 20};
    console.log("holanda");
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("hola_001");
            for (var i = 0; i < tweets.length; i++){
                var q = i + 1;
                var packOutPut = "user: " + 
                    tweets[i].user.screen_name + "\ntweet " + q + ": " + 
                    tweets[i].text + "\ndate: " + 
                    tweets[i].created_at;
                console.log(packOutPut);
            }
        }else {
            console.log("fallo");
            console.log(error);
        };
    });


}




    

    







