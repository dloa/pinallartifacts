var request = require('request');
var prettyj = require('prettyjson');

// dloaAutopin.js
// Author:  Bill Gleim
// twitter: @billgleim

// Retrieve catalog contents from cloud server
//request('http://libraryd.alexandria.media/alexandria/v1/media/get/all', function (error, response, body) {

// Retrieve catalog contents from local server
request('http://127.0.0.1:41289/alexandria/v1/media/get/all', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var options = {
      noColor: true
    };

    // unparsed body (JSON string)
    //console.log(prettyj.render(body, options));
 
    jsonBody = JSON.parse(body)

    // parsed body (pure JSON)
    //console.log("%j", jsonBody);

    // parsed body (pretty JSON)
    console.log(prettyj.render(jsonBody, options));

    function validMultihash(string) {
      if (string) {
        if (string[0] == "Q" && string[1] == "m") {
          return true;
        }
      }
      return false;
    }
 
    // utility function to display catalog item tx id
    function displayCatalogItemTxid(item) {
      if (item) {
        console.log(item.txid);
      }
    }

    // utility function to display catalog item DHT hash
    function displayCatalogItemDHTHash(item) {
      if (item) {
        var dhtHash = item['media-data']['alexandria-media']['info']['extra-info']['DHT Hash'];
        
        if (dhtHash) {
          console.log("DHT Hash: " + dhtHash);
        }
      }
    }

    // utility function to display catalog item DHT hash in addition to filename
    function displayCatalogItemDHTHashWithFilename(item) {
      if (item) {
        var dhtHash  = item['media-data']['alexandria-media']['info']['extra-info']['DHT Hash'];
        var filename = item['media-data']['alexandria-media']['info']['extra-info']['filename'];
        
        if (dhtHash) {
          console.log("DHT Hash: " + dhtHash);
        }
        
        if (filename) {
          console.log("filename: " + filename);
        }
      }
    }

    // utility function to display catalog item extra information to pin
    function displayCatalogItemInfo(item) {
      if (item) {
        var extraInfo = item['media-data']['alexandria-media']['info']['extra-info'];
        var filename  = extraInfo['filename'];
        
        var dhtHash     = extraInfo['DHT Hash'];
        var posterFrame = extraInfo['posterFrame'];
        var coverArt    = extraInfo['coverArt'];
        var poster      = extraInfo['poster'];
        var trailer     = extraInfo['trailer'];
        var track01     = extraInfo['track01'];
        var track02     = extraInfo['track02'];

        if (dhtHash) {
          console.log("DHT Hash: " + dhtHash);
        }
        
        if (posterFrame) {
          console.log("Poster Frame: " + posterFrame);
        }
        
        if (coverArt) {
          console.log("Cover Art: " + coverArt);
        }
        
        if (dhtHash) {
          console.log("Poster: " + poster);
        }
        
        if (trailer) {
          console.log("Trailer: " + trailer);
        }
        
        if (track01) {
          console.log("Track 01: " + track01);
        }
        
        if (track02) {
          console.log("Track 02: " + track02);
        }
      }
    }
        
    function displayCatalogItemInfoToPin(item) {
      if (item) {
        var extraInfo = item['media-data']['alexandria-media']['info']['extra-info'];
        var filename  = extraInfo['filename'];
        
        var dhtHash     = extraInfo['DHT Hash'];
        var posterFrame = extraInfo['posterFrame'];
        var coverArt    = extraInfo['coverArt'];
        var poster      = extraInfo['poster'];
        var trailer     = extraInfo['trailer'];
        var track01     = extraInfo['track01'];
        var track02     = extraInfo['track02'];

        if (filename) {
          var filesToPin = [];

          if (filename === "none") {
            // pin each field available
            
            if (validMultihash(dhtHash))     filesToPin.push(dhtHash);
            if (validMultihash(posterFrame)) filesToPin.push(posterFrame);
            if (validMultihash(coverArt))    filesToPin.push(coverArt);
            if (validMultihash(poster))      filesToPin.push(poster);
            if (validMultihash(trailer))     filesToPin.push(trailer);
            if (validMultihash(track01))     filesToPin.push(track01);
            if (validMultihash(track02))     filesToPin.push(track02);
 
          } else {
            // pin each field as a filename relative to the DHT hash
            if (validMultihash(dhtHash)) {
              if (posterFrame) {
                filesToPin.push(dhtHash + "/" + posterFrame);
              }
              if (coverArt) {
                filesToPin.push(dhtHash + "/" + coverArt);
              }
              if (poster) {
                filesToPin.push(dhtHash + "/" + poster);
              }
              if (trailer) {
                filesToPin.push(dhtHash + "/" + trailer);
              }
              if (track01) {
                filesToPin.push(dhtHash + "/" + track01);
              }
              if (track02) {
                filesToPin.push(dhtHash + "/" + track02);
              }
            }
          }
          filesToPin.forEach(console.log);
        }
      }
    }

    jsonBody.forEach(displayCatalogItemInfo);

    jsonBody.forEach(displayCatalogItemInfoToPin);

  }
})

