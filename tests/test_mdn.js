var spider = require('../main');

var spider = spider();

spider
  .route('developer.mozilla.org', '/en-US/CSS/CSS_Reference', function ($) {
    $('a').each(function() {
      var href = $(this).attr('href');
      spider.get(href);
    });
  })
  .route('developer.mozilla.org', '/en-US/CSS/*', function ($) {
    console.log('visited documentation for ' + $('#title').text().trim());
  })
  .get('https://developer.mozilla.org/en/CSS/CSS_Reference')
  .log('debug')
;