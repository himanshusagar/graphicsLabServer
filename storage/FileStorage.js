/**
 * Created by Himanshu Sagar on 18-07-2017.
 */


var fs = require('fs');
var path = require('path');

var fileNameBuildingsList =  path.join(
    path.dirname(   __dirname ) , "/public/buildingsList");









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
            var array = data.toString().trim().split(",");
            reqData =
                {
                    length : array.length,
                    myList : array
                }

            json = JSON.stringify(reqData);
            callback(null, json);

        }

    });


};



module.exports = {


    sendAllBuildingsList : sendAllBuildingsList
}
