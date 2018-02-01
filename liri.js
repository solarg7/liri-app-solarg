require("dotenv").config();

var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');

var fs = require("fs");
var Spotify = require('node-spotify-api');

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

        case "movie-this":
        getMovie();
        break;

        case "do-what-it-says":
        getRandomAction();
        break;
        
    }
}


function getTweets(){
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'Chootan2046', count: 20};
    //console.log("holanda");
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log("hola_001");
            for (var i = 0; i < tweets.length; i++){
                var q = i + 1;
                var packOutPut = "user: " + 
                    tweets[i].user.screen_name + "\ntweet " + q + ": " + 
                    tweets[i].text + "\ndate: " + 
                    tweets[i].created_at;
                console.log(packOutPut);
                console.log("==============");
            }
        }else {
            //console.log("fallo");
            console.log("error :" + error);
        };
    });


}

function lookupValue() {
    
        var lookup = "";
        for (i = 3; i < wordInput.length; i++) {
            lookup += wordInput[i] + " "; 
        }
        //console.log(lookup);
        return lookup.trim(); 
}



function getSong(){
    if (wordInput.length != 3) {
        var songSearch = lookupValue();
        //console.log(wordInput);
        
    } else { 
       //console.log(wordInput);  
        var songSearch = "The Sign";
    };


    //console.log("pao");
    
    var spotify = new Spotify(keys.spotify);
    //console.log(songSearch);
    spotify.search({ type: "track", query: songSearch}, function(err, data){
        if (err) {
            console.log("error :" + err);
        }

        console.log("======Track:========");
        console.log(data.tracks.items[0].name);
        console.log("======Artist:========");
        console.log(data.tracks.items[0].artists[0].name);
        console.log("======Album:========");
        console.log(data.tracks.items[0].album.name);
        console.log("======Spotify Link:========");
        console.log(data.tracks.items[0].preview_url);
        console.log("======================");
        //console.log("amparito");
    });
}



function getMovie() {
   

   
    if (wordInput.length != 3) {
        var lookupMovieValue = lookupValue();
        //console.log(wordInput);
    } else { 
       //console.log(wordInput);  
        var lookupMovieValue = "Mr. Nobody";
    };
    
    var lookupMovie = "http://www.omdbapi.com/?t=" + lookupMovieValue + "&y=&plot=short&apikey=trilogy";
    
    request(lookupMovie, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
            
            var movieBody = JSON.parse(body);
            console.log("=============");
            console.log("Title: " + movieBody.Title
                + "\nYear: " + movieBody.Year
                + "\nIMDB Rating: " + movieBody.imdbRating
                + "\n" + movieBody.Ratings[1].Source + " Rating: " + movieBody.Ratings[1].Value
                + "\nCountry: " + movieBody.Country
                + "\nLanguage: " + movieBody.Language
                + "\nPlot: " + movieBody.Plot
                + "\nActors: " + movieBody.Actors);
            console.log("=============");    
        }
    });
}

function getRandomAction() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        var randomInput = data.split(",");
        wordInput[2] = randomInput[0];
        wordInput[3] = randomInput[1];
        var aux =  wordInput[2] ;
        functionLiri(aux);

    });
    
}
    







