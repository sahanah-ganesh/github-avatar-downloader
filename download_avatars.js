var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + secrets.GITHUB_TOKEN
    }
  };

  function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function(err) {
          throw err;
        })
        .on('response', function(response) {
          console.log('Response Status: ', response.statusMessage);
          console.log('Response Header: ', response.headers['content-type']);
        })
        .pipe(fs.createWriteStream(filePath));
  }


  request(options, function(err, res, body) {
    var data = JSON.parse(body)

    cb(err, data);

    data.forEach(function(keys) {
      console.log(keys.avatar_url);
    });

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);

});