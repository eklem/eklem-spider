// Required modules
var request = require('request')
var cheerio = require("cheerio")
var jf = require('jsonfile')

// Variables needed
var hrefFile = ('./href.json')
var recipesFile = ('./recipes.json')
var recipes = []
var playNice = 10000
var hrefArray = jf.readFileSync(hrefFile)
var arrayLength = hrefArray.length


for (var i = 0; i < arrayLength; i++) {
  request(hrefArray[i], function (error, response, body) {
    if (error) {
      console.log(error)
    }
    if (!error) {
      var item = {'id': '', 'url': '', 'title': '', 'photo': ''}
      var idArray = []
      var idRe = /\d+/g
      $ = cheerio.load(response)
      item.id = response.request.uri.path.match(/([^\/]*)\/*$/)[1]
      item.url = response.request.uri.href
      $ = null
      $ = cheerio.load(body)
      item.title = $('div.recipe h1.title').text()
      item.photo = $('div.recipe div.imageContainer img').attr('src')
      recipes.push(item)
    }
    console.dir(item)
  wait(playNice)
  })
}





// Write array of recipes to JSON file
function write(file, recipes) {
  jf.writeFile(file, recipes, {spaces: 2}, function (err) {
    if(err) {
      console.error(err)
    }
    if(!err) {
      // Does it look okay?
      //console.dir(recipes)
    }
  })
}

// Play nice - requesting server at a reasonable pace
function wait(ms){
   var start = new Date().getTime()
   var end = start
   while(end < start + ms) {
     end = new Date().getTime()
  }
}
