/**
 * Created by Himanshu Sagar on 18-07-2017.
 */


var fs = require('fs');
var path = require('path');

var fileNameBuildingsList =  path.join(
    path.dirname(   __dirname ) , "/public/buildingsList");


var publicRootDirName =  path.join(
    path.dirname(   __dirname ) , "/public/");







var sendAllBuildingsList = function (reqData , callback)
{
    fs.readFile(fileNameBuildingsList , { encoding : 'utf-8' } , function (err , data)
    {
        if(err)
        {
            console.log("Error in List" + err);
            json = JSON.stringify([]
            )
            callback(null , json);

        }
        else
        {
            //var array = data.toString().trim().replace('/\n/').split(",");

            var array = data.toString().trim().replace(/\n/g ,',').replace(/\r/g,'').split(',');

            for( index = 0 ; index < array.length ; index++)
            {
                array[index] = array[index].trim();

            }

            reqData =
                {
                    length : array.length,
                    myList : array
                };


            json = JSON.stringify(reqData);
            callback(null, json);

        }

    });


};


var sendSpecificBuildingData = function (reqData , callback)
{
    var fileNameBuilding = path.join(  publicRootDirName, reqData["name"]);
    //var floorCount  = reqData["floorCount"];
    var isBuildingExists = fs.existsSync(fileNameBuilding);

    if(!isBuildingExists || reqData["name"] == "" || reqData["name"]==undefined)
    {
        console.log("Building Doesn't Exist")
        var noBuilding = {
            name : "NULL"}
        json = JSON.stringify(noBuilding);
        callback(null, json);

    }
    else {
        var objToSend = {};
        var floorCountKey = "floorCount";
        var nameKey = "name";
        var floorListKey = "floorList";

        objToSend[nameKey] = reqData["name"];
        objToSend[floorListKey] = [];


        iterator = 0;

        for (iterator = 0; iterator < 20; iterator++) {

            var iString = null;
            if (iterator < 9)
                iString = "0" + iterator;
            else
                iString = iterator;

            var iFileNameFloor = path.join(fileNameBuilding, "Floor" + iString);

            var isFile = fs.existsSync(iFileNameFloor);
            if (isFile) {
                var iBuffer = fs.readFileSync(iFileNameFloor, {encoding: 'utf-8'});

                if (iBuffer) {


                    var iWaypoints = iBuffer.toString().trim().replace(/\n/g ,',').replace(/\r/g,',').split(',');

                    iObj = {
                        level: iterator,
                        waypoints: iWaypoints
                    };
                    objToSend[floorListKey].push(iObj);

                }
            }
            else {
                console.log("Files failed on " + (iterator - 1) + " " + iFileNameFloor);
                break;
            }

        }

        objToSend[floorCountKey] = iterator;
        // objToSend[floorListKey] = floorListArray;


        json = JSON.stringify(objToSend);
        callback(null, json);
    }
};


module.exports = {

    sendSpecificBuildingData :  sendSpecificBuildingData,
sendAllBuildingsList : sendAllBuildingsList
}
