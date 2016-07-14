var spider = require('../main')()
var jf = require('jsonfile')
var file = ('./href.json')
var recipes = {href: []}
var playNice = 2500

spider.route('oppskrift.klikk.no', '*',

  // Getting next page url and spidering
  function ($) {
    $('div.next a.fontQ.brandColor').each(function() {
      var href = $(this).attr('href')
      spider.get(href)
      wait(playNice)
    })
    
    // Extracting recipes URLs    
    $('div.recipe-item div.text a').each(function() {
      if (!/^\//.test($(this).attr('href'))) {
        var hrefItem = $(this).attr('href')
        spider.get(hrefItem)
        wait(playNice)
      }
      if (/^\//.test($(this).attr('href'))) {
        console.log('Skipped user URL')
      }
    })
  
    if (this.fromCache) return
  })

spider.route('oppskrift.klikk.no', '/:title/:id/',
  function ($) {
    // Extracting recipes URLs    
    $('div.recipe h1.title').each(function() {
      var href = $(this).attr('href')
      spider.get(href)
      wait(playNice)
    })
    
    // Extracting recipes URLs    
    $('body').each(function() {
      console.log($('div.recipe h1.title').text())
    })
  })

// Starting point
spider.get('http://oppskrift.klikk.no/?start=5832')

// spider-logging to console
spider.log('debug')

//Write links to JSON file
function write(file, href) {
  jf.writeFile(file, href, {spaces: 2}, function (err) {
    if(err) {
      console.error(err)
    }
    if(!err) {
      // Does it look okay?
      //console.dir(href)
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