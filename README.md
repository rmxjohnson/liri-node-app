# liri-node-app

Rhonda Johnson

Link to deployed project
https://rmxjohnson.github.io/liri-node-app/

LIRI-BOT

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives back data.

This app sends requests to the Twitter, Spotify and OMDB APIs. 

   * [Twitter](https://www.npmjs.com/package/twitter)   
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)   
   * [Request](https://www.npmjs.com/package/request)
     * Request is used to grab data from the [OMDB API](http://www.omdbapi.com).
   * [DotEnv](https://www.npmjs.com/package/dotenv)


liri.js can take in one of the following commands:


1. `node liri.js my-tweets`

   * This shows the last 20 tweets and when they were created at in the terminal/bash window.  The screen_name is hard-coded.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about up to 10 songs that Spotify returns based on the song name in the terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to the song name "The Sign"

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to the terminal/bash window:
   
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.     

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'



4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
   * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.  

   * `random.txt` can be modified to run any of the liri commands  





