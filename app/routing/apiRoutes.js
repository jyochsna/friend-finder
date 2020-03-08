var path = require('path');

var friends = require('../data/friends.js')



module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends)
    });

    app.post("/api/friends",function(req,res){
var userInput = req.body;
var userScore = userInput.score

var matchName="";
 var matchImage ="";
 var totalDiff= 10000; 

for (var i=0; i<friends.length; i++){
    var diff = 0;
    var currentFriend = friends[i]
    for (var j=0; j<userScore.length;j++){

        diff += Math.abs(friends[i].score[j]-userScore[j]);
    }
    if (diff <totalDiff){
        totalDiff = diff;
        matchName = friends[i].name;
        matchName = friends[i].photo;
    }
}
//add new user
friends.push(userInput);
        // Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};