var spider = require('../main')();
var jf = require('jsonfile')
var file = ('./href.json')
var recipes = {href: []}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

spider.
  route('oppskrift.klikk.no', '*',
  function ($) {
    $('div.next a.fontQ.brandColor').each(function() {
      var href = $(this).attr('href');
      spider.get(href);
      wait(1500);
    });
  
    if (this.fromCache) return;
    $('div.recipe-item div.text a').each(function() {
      if (!/^\//.test($(this).attr('href'))) {
        recipes.href.push($(this).attr('href'))
      }
      if (/^\//.test($(this).attr('href'))) {
        console.log('Skipped user URL')
      }
    });
  }).
  get('http://oppskrift.klikk.no').log('debug');



// Does it look okay?
console.dir(recipes)

//Write links to JSON file
jf.writeFile(file, recipes.href, {spaces: 2} function (err) {
  if(err) {
    console.error(err)
  }
})
