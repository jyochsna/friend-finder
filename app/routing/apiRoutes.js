// var path = require('path');
var friendList = require('../data/friends.js');

//ROUTING
// Two Routes with express parameters
module.exports = function(app) {
   // A GET json route to display all possible friends
  app.get('/api/friends', function (req, res) {
    res.json(friendList);
  });
  // A POST route to handle incoming survey results
  app.post('/api/friends', function (req, res) {

    //grabbing new friends score to compare with friends in friendslist array

    var newFriendScores = req.body.scores;
    var scoresArray =[];
    var friendCount = 0;
    var bestMatch = 0;

    //run through all current friends in list
    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friendList[bestMatch];
    res.json(bff);

    //pushes new submission into the friendsList array
    friendList.push(req.body);
  });
};

    //req.body is available since we're using body-parser middleware
    