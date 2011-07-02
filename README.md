Builder
=======
Liberal JavaScript DOM builder 

    npm install builder

element = Builder(tag_name, attributes = {}, elements = [], content = '', callback)
-------
Accepts a variable number of arguments which may be:

- Hashes of attributes
- Elements
- Strings of content
- Arrays (which can be nested) of any of the above
- Function to call, which can return any of the above

All HTML5 tag names are available as functions on the Builder object which will generate the corresponding element. For maximum readability when generating multiple elements it can be useful to call a function with Builder as the context.

    # using Builder
    div = Builder 'div', className: 'tasty'
    ul = Builder.ul Builder.li 'Item One'
    
    # calling a function with Builder as the context
    table = (->
      @table cellpadding: 0, cellspacing: 0,
        @tbody(
          @tr(
            @td 'Cell One'
            @td 'Cell Two'
          )
        )
    ).call Builder
    
Builder.document
----------------
If no document is present in the global scope (i.e. on Node), you can explicitly set the document element:

    jsdom = require 'jsdom'
    Builder = require 'builder'
    window = jsdom.createWindow()
    Builder.document = window.document
    div = Builder.div()

Builder.$
---------
Setting $ on Builder will make Builder return a wrapped object containing the element (i.e. a jQuery/Zepto/Ender array). Builder will always look inside these objects for the actual elements so in practice you can use them as if they were the Element objects, with the added benefit of attaching event handlers inline, etc:
    
    Builder.$ = jQuery
    list = (->
      @ul @li @a('Link',href:'#').click ->
    ).call Builder

Backbone
--------
To use in a [Backbone](http://documentcloud.github.com/backbone/) project, include builder.js then:

    BuilderView = Backbone.View.extend Builder
    MyView = BuilderView.extend
      render: ->
        @el.appendChild @ul li 'Item One'
        
Ender
-----
When including builder in an Ender build, it becomes available as $.builder:

    div = $.builder 'div'