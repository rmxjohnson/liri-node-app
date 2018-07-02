// Rhonda Johnson
// 
// liri-bot

// code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// fs (file system) is a core Node package for reading and writing files
var fs = require("fs");

// Include the request , node-spotify-api, and twitter npm packages
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter")


// capture the user input
var param1 = (process.argv[2]);
var param2 = (process.argv[3]);

// convert input to lower case
if (!(param1 == undefined)) {
    param1 = param1.toLowerCase();
}
if (!(param2 == undefined)) {
    param2 = param2.toLowerCase();
}

// use OMDB API to find information about a song
function movieThis(mArg) {
    var movieName = '';

    // set movie if none provided by user
    if (mArg == undefined) {
        movieName = 'Mr. Nobody';
    }
    else movieName = mArg;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Then create a request to the queryUrl
    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body));
            // check if the movie is found
            if (JSON.parse(body).Response == "False") {
                console.log('***************************************************');
                console.log("Error: " + JSON.parse(body).Error);
                console.log('***************************************************');
                return;
            }

            // Parse the body of the site and recover the appropriate fields
            console.log();
            console.log('**********************************************************************************');
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("imdb Rating: " + JSON.parse(body).imdbRating);
            if (JSON.parse(body).Ratings.length > 1) {
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            }
            else {
                console.log("Rotten Tomatoes Rating: No Rating Found");
            }
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log('**********************************************************************************');
        }
    });

}

// read the contents of random.txt and do what it says
function doWhatItSays() {
    //console.log('Inside the dowhatitsays function');
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log("Error reading random.txt file " + error);
        }

        // Split the contents of data by commas and store it in an array
        var dataArray = data.split(",");

        // trim leading & trailing spaces
        var option = dataArray[0].trim();
        var dataValue = dataArray[1];

        // if file contains "my-tweets", there is no second parameter provided
        if (!(dataValue == undefined)) {
            // replace single and double quotes with spaces
            dataValue = dataValue.replace(/("|')/g, " ");

            // trim leading and trailing spaces
            dataValue = dataValue.trim();

        }
        //console.log("option = ", option);
        //console.log("dataValue =*" + dataValue + "*");
        choices(option, dataValue);
    })
}

// use Spotify to provide information about a song
function spotifyThisSong(songName) {

    var spotify = new Spotify(keys.spotify);

    // I am choosing to display up to 10songs that Spotify returns for my query
    var numberOfSongs = 10;

    // If no song provided, use "The Sign" by Ace of Base
    // This info was determined from Spotify
    // If I want to hardcode the info, use the section below
    // I hard-coded this information because this specific song shows up as song #6 if I perform the spotify query
    // if (songName == undefined) {
    //     songName = 'The Sign';
    //     console.log();
    //     console.log('**********************************************');
    //     console.log("Song Name: The Sign");
    //     console.log("Artist(s): Ace of Base");
    //     console.log("Preview URL: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=cb7d4843efb04215a0f37a595ec5a7d9");
    //     console.log("Album Name: The Sign (US Album) [Remastered]");
    //     console.log('**********************************************');
    //     return;
    // }

    // I did not hard-code the spotify results, just pass the songName into the spotify query
    if (songName == undefined) {
        songName = 'The Sign';
    }

    // query spotify
    spotify.search({ type: 'track', query: songName, limit: numberOfSongs }, function (error, data) {

        if (error) {
            return console.log('Error occurred in Spotify: ' + error);
        }

        // check to see if any matching items were returned
        if (data.tracks.items.length == 0) {
            console.log();
            console.log('***********************************************************');
            console.log("Sorry - No songs were found for the song title " + songName);
            console.log('***********************************************************');
        }

        // loop through the results
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log();
            console.log('******************************');
            console.log('       Song # ' + (i + 1));
            console.log('******************************');
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
            // some preview urls were NULL
            if (!(data.tracks.items[i].preview_url == null)) {
                console.log("Preview URL: " + data.tracks.items[i].preview_url);
            }
            else {
                console.log("Preview URL: No Preview URL found");
            }
            console.log("Album Name: " + data.tracks.items[i].album.name);
        }
    });
}

// use Twitter to display 20 most recent tweets for selected screen_name
function myTweets() {

    var searchCount = 20;

    //var searchName = 'nodejs';
    //var searchName = 'elvisduran';
    //var searchName = 'asdasdsdds';
    var searchName = 'jimmyfallon';

    var client = new Twitter(keys.twitter);

    var params = { screen_name: searchName, count: searchCount };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            var tweetsFound = tweets.length;

            // check to see if any tweets are found
            if (tweetsFound == 0) {
                console.log("****************************************************");
                console.log("Sorry - no tweets found for " + searchName);
                console.log("****************************************************");
                return;
            }

            // loop through the tweets found
            for (var i = 0; i < tweetsFound; i++) {
                console.log();
                console.log("***************************************************************");
                console.log("Tweet #" + (i + 1) + " created on " + tweets[i].created_at);
                console.log("***************************************************************")
                console.log(tweets[i].text);
                console.log();
            }
        }
        else {
            return console.log("Error occurred in Twitter: " + error);
        }
    });
}


// main function called to execute the action (arg1) with parameter (arg2)
function choices(arg1, arg2) {
    // console.log("arg1 =*" + arg1 + '*');
    // console.log("arg2 =*" + arg2 + '*');

    switch (arg1) {
        case ('my-tweets'):
            myTweets();
            break;

        case ('spotify-this-song'):
            spotifyThisSong(arg2);
            break;

        case ('movie-this'):
            movieThis(arg2);
            break;

        case ('do-what-it-says'):
            doWhatItSays();
            break;

        // user entered an invalid request
        default:
            console.log("*********************************************");
            console.log("*  You have entered an incorrect request.   *")
            console.log("*  --------------                           *");
            console.log("*  Valid options:                           *");
            console.log("*  --------------                           *");
            console.log("*  1) my-tweets                             *")
            console.log("*  2) spotify-this-song '<song name here>'  *");
            console.log("*  3) movie-this '<movie name here>'        *");
            console.log("*  4) do-what-it-says                       *");
            console.log("*                                           *");
            console.log("*********************************************");
    }
}

// On entry - call "choices" function with parameters entered by the user
choices(param1, param2);
