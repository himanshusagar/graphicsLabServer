/**
 * Created by Himanshu Sagar on 18-07-2017.
 */

var express = require('express');
var router = express.Router();
var path = require('path');


var fileStorage = require( path.join(
    path.dirname(__dirname) , "/storage/FileStorage")
);


// Building_Specific
router.post("/", function(req, res){

    console.log('Building_Specifc POst');

    var reqData = req.body;


    console.log("Specific Name"  + reqData["name"]);

    fileStorage.sendSpecificBuildingData(reqData , function (err , result)
    {
        console.log(result);
        res.writeHead(200, {
            'Content-Type' : 'x-application/json'
        });

        res.end(result);

    });


});

router.get("/", function(req, res)
{
    console.log('Buidling_Specific Get');

    res.json(
        {
            type : "Specific + get",
            response: "true",
        }
    );

    res.send();


});


module.exports = router;