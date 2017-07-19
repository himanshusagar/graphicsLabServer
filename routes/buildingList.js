/**
 * Created by Himanshu Sagar on 18-07-2017.
 */

var express = require('express');
var router = express.Router();
var path = require('path');


var fileStorage = require( path.join(
    path.dirname(__dirname) , "/storage/FileStorage")
);


// Building_List
router.post("/", function(req, res){

    console.log('Building_List POst');

    var reqData = new Array();
    reqData["myList"] = new Array();

    fileStorage.sendAllBuildingsList( reqData , function (err , result)
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
    console.log('Buidling_List Get');

    res.json(
        {
            type : "list + get",
            response: "true",
        }
    );

    res.send();


});


module.exports = router;