var assert = require('assert');
var jsdom = require("jsdom");
var window = jsdom.jsdom().createWindow();
var Builder = require('./builder.js');
Builder.document = window.document;
jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.min.js',function(){
  $ = window.$;
  $('body').append(
    Builder.ul(
      Builder.li('item one'),
      Builder.li('item two')
    )
  );
  assert.equal($('body li').length,2);
  assert.equal($('body li:first').html(),'item one');
  Builder.$ = $;
  $('body').append(
    Builder.ul(
      Builder.li('item three'),
      Builder.li('item four').click(function(){})
    )
  );
  assert.equal($('body li').length,4);
  assert.equal($('body li:last').html(),'item four');
});