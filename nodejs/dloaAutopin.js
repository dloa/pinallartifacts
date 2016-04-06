var ipfsApi = require('ipfs-api');
var request = require('request');
var prettyj = require('prettyjson');
const exec  = require('child_process').exec;

// dloaAutopin.js
// Author:  Bill Gleim
// twitter: @billgleim

// pin to IPFS via the node-ipfs-api global variable providing access
var ipfs = ipfsApi('localhost', '8080', {protocol: 'http'});

// Retrieve catalog contents from cloud server
//request('http://libraryd.alexandria.media/alexandria/v1/media/get/all', function (error, response, body) {

// Retrieve catalog contents from local server
request('http://127.0.0.1:41289/alexandria/v1/media/get/all', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var options = {
      noColor: true
    };

    jsonBody = JSON.parse(body)

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
        
    function pinCatalogItemInfo(item) {
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
          if (filename === "none") {
            // pin each field available
            
            if (validMultihash(dhtHash))     ipfsPin(dhtHash);
            if (validMultihash(posterFrame)) ipfsPin(posterFrame);
            if (validMultihash(coverArt))    ipfsPin(coverArt);
            if (validMultihash(poster))      ipfsPin(poster);
            if (validMultihash(trailer))     ipfsPin(trailer);
            if (validMultihash(track01))     ipfsPin(track01);
            if (validMultihash(track02))     ipfsPin(track02);
 
          } else {
            // pin each field as a filename relative to the DHT hash
            if (validMultihash(dhtHash)) {

              if (posterFrame) {
                ipfsPin(dhtHash + "/" + posterFrame);
              }
              if (coverArt) {
                ipfsPin(dhtHash + "/" + coverArt);
              }
              if (poster) {
                ipfsPin(dhtHash + "/" + poster);
              }
              if (trailer) {
                ipfsPin(dhtHash + "/" + trailer);
              }
              if (track01) {
                ipfsPin(dhtHash + "/" + track01);
              }
              if (track02) {
                ipfsPin(dhtHash + "/" + track02);
              }
            }
          }
        }
      }
    }

    // used to direct-pin (disabled) or export files to pin (enabled)
    function ipfsPin(file) {
      console.log(file);
    }

    // add this within verification of multihash 
    // to display IPFS view of each piece of content
    function ipfsCat(dhtContentToPin) {
      console.log("PRIOR TO IPFS CAT ATTEMPT with hash ", dhtContentToPin);
      ipfs.cat(dhtContentToPin)
        .then(function(catResponse) {
          console.log('IPFS CAT RESPONSE: ', catResponse);
        }); 
    }

    // export catalog items in filesToPin format
    jsonBody.forEach(pinCatalogItemInfo);

  }
})

