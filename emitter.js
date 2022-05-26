var axios = require('axios')
var fs = require('fs');

var test = ['ROWAN%20PSYCHIATRIC%20AND%20MEDICAL%20SERVICES%20INC','A%20S%20A%20APORT%20HEALTH SERVICES']
const apiKey = ''

var jsonObj ={
    "name":"NewFeatureType",
    "type":"FeatureCollection",
    "features": []
}
getAllProvidersFromArray(test)

function getAllProvidersFromArray (arr) {
    urlBase = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cplace_id%2Cgeometry%2Crating&input='
    urlAppend = '&inputtype=textquery&key=' + apiKey

    
    for(let i = 0; i < arr.length; i++) {
        var config = {
            method: 'get',
            url: urlBase + arr[i] + urlAppend,
            headers: { }
          };

          axios(config)
          .then(function (response) {
            
            var temp = response.data;
            
            tempArr = temp.candidates;
            resultArr = []
            tempArr.forEach(result => {

            
            var newJson = {
                    "type":"Feature",
                    "geometry":{
                        "type":"Point",
                        "coordinates": []
                    },
                    "properties": {
                        "name":"",
                        "formatted_address":"",
                        "place_id": "",
                        "rating": 0
                    }
            }

            newJson.geometry.coordinates.push(result.geometry.location.lat)
            newJson.geometry.coordinates.push(result.geometry.location.lng)

            newJson.properties.formatted_address = result.formatted_address
            newJson.properties.name = result.name
            newJson.properties.place_id = result.place_id
            newJson.properties.rating = result.rating

            resultArr.push(newJson)
        })

            resultArr.forEach(result => jsonObj.features.push(result))
            
            fs.writeFile ("geo-array.js", JSON.stringify(jsonObj, null, 2), function(err) {
                if (err) throw err;
              //  console.log(complete)
                }
            );
          })
          .catch(function (error) {
           // console.log("error")
          });
    }
    

}


// http request
const netCrawler = require('crawler-request')

// local pdf
const offlineCrawler = require('pdf-parse')

let dataBuffer = fs.readFileSync('provider-directory.pdf')

startPage = 10544
endPage = 13476
termToSearch = 'BEHAVIORAL HEALTH'

options = {
    max: endPage - startPage
}

offlineCrawler(dataBuffer, options).then(function(data) {
    // print to console
    // console.log(data)
   
   //full loop
    getAllProvidersFromArray(data)

})
.catch(function(error){
    console.log(error)
})

// if string is in format 'CAPS,' eat that line. Look for numbers or 'CAPS,' pattern

// netCrawler("https://www.amerihealthcaritasnc.com/assets/pdf/provider-directory.pdf").then(function(response){
//     // handle response
//     console.log(response.text.lenght);
// });


