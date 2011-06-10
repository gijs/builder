(function() {
  var Builder, array_flatten, array_from, attribute_map, attribute_translations, element_cache, ie, ie_attribute_translation_sniffing_cache, ie_attribute_translations, is_$, is_array, is_element, process_node_argument, supported_html_tags, tag_name, _fn, _i, _len;
  is_array = function(array) {
    return Boolean(array && Object.prototype.toString.call(array) === '[object Array]');
  };
  is_element = function(element) {
    return Boolean((element != null ? element.nodeType : void 0) === 1 || (element != null ? element.nodeType : void 0) === 3);
  };
  is_$ = function($) {
    var _ref;
    return Boolean(($ != null ? $[0] : void 0) && ($ != null ? (_ref = $[0]) != null ? _ref.nodeType : void 0 : void 0) && ($.length != null));
  };
  array_from = function(object) {
    var length, results;
    if (!object) {
      return [];
    }
    length = object.length || 0;
    results = new Array(length);
    while (length--) {
      results[length] = object[length];
    }
    return results;
  };
  array_flatten = function(array) {
    var flattened, item, _i, _len;
    flattened = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      if (is_array(item)) {
        flattened = flattened.concat(array_flatten(item));
      } else {
        flattened.push(item);
      }
    }
    return flattened;
  };
  Builder = function(tag_name) {
    var argument, attribute_name, attributes, document, element, elements, name, tag, test_element, value, _element, _i, _j, _len, _len2, _ref;
    document = Builder.document != null ? Builder.document : window.document;
    elements = [];
    attributes = {};
    _ref = array_from(arguments).slice(1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      argument = _ref[_i];
      process_node_argument(this, elements, attributes, argument);
    }
    tag_name = tag_name.toLowerCase();
    if (ie && (attributes.name || (tag_name === 'input' && attributes.type))) {
      tag = '<' + tag_name;
      if (attributes.name) {
        tag += ' name="' + attributes.name + '"';
      }
      if (tag_name === 'input' && attributes.type) {
        tag += ' type="' + attributes.type + '"';
      }
      tag += '>';
      delete attributes.name;
      delete attributes.type;
      element = document.createElement(tag);
    } else {
      if (!element_cache[tag_name]) {
        element_cache[tag_name] = document.createElement(tag_name);
      }
      element = element_cache[tag_name].cloneNode(false);
    }
    for (attribute_name in attributes) {
      name = attribute_translations[attribute_name] || attribute_name;
      if (ie && ie_attribute_translations[name]) {
        if (ie_attribute_translation_sniffing_cache[name] != null) {
          name = ie_attribute_translations[name];
        } else {
          test_element = document.createElement('div');
          test_element.setAttribute(name, 'test');
          if (test_element[ie_attribute_translations[name]] !== 'test') {
            test_element.setAttribute(ie_attribute_translations[name], 'test');
            if (ie_attribute_translation_sniffing_cache[name] = test_element[ie_attribute_translations[name]] === 'test') {
              name = ie_attribute_translations[name];
            }
          }
        }
      }
      value = attributes[attribute_name];
      if (value === false || !(value != null)) {
        element.removeAttribute(name);
      } else if (value === true) {
        element.setAttribute(name, name);
      } else if (name === 'style') {
        element.style.cssText = value;
      } else {
        element.setAttribute(name, value);
      }
    }
    for (_j = 0, _len2 = elements.length; _j < _len2; _j++) {
      _element = elements[_j];
      if (is_element(_element)) {
        element.appendChild(_element);
      } else {
        element.appendChild(document.createTextNode(String(_element)));
      }
    }
    if (Builder.$) {
      element = Builder.$(element);
    }
    return element;
  };
  process_node_argument = function(context, elements, attributes, argument) {
    var attribute, attribute_name, flattened, flattened_argument, _element, _i, _j, _len, _len2;
    if (!(argument != null) || argument === false) {
      return;
    }
    if (typeof argument === 'function') {
      argument = argument.call(context);
    }
    if (is_$(argument)) {
      for (_i = 0, _len = argument.length; _i < _len; _i++) {
        _element = argument[_i];
        return elements.push(_element);
      }
    }
    if (is_element(argument)) {
      return elements.push(argument);
    }
    if (typeof argument !== 'string' && typeof argument !== 'number' && !is_array(argument) && !is_$(argument) && !is_element(argument)) {
      for (attribute_name in argument) {
        attribute = argument[attribute_name];
        attributes[attribute_name] = attribute;
      }
      return;
    }
    if ((argument.toArray != null) && typeof argument.toArray === 'function') {
      argument = argument.toArray();
    }
    if (is_array(argument)) {
      flattened = array_flatten(argument);
      for (_j = 0, _len2 = flattened.length; _j < _len2; _j++) {
        flattened_argument = flattened[_j];
        process_node_argument.call(this, context, elements, attributes, flattened_argument);
      }
      return;
    }
    if (is_element(argument) || typeof argument === 'string' || typeof argument === 'number') {
      return elements.push(argument);
    }
  };
  ie = (typeof window != "undefined" && window !== null) && !!(window.attachEvent && !window.opera);
  ie_attribute_translations = {
    "class": 'className',
    checked: 'defaultChecked',
    usemap: 'useMap',
    "for": 'htmlFor',
    readonly: 'readOnly',
    colspan: 'colSpan',
    bgcolor: 'bgColor',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding'
  };
  ie_attribute_translation_sniffing_cache = {};
  attribute_translations = {
    className: 'class',
    htmlFor: 'for'
  };
  element_cache = {};
  supported_html_tags = 'a abbr acronym address applet area b base basefont bdo big blockquote body\
  br button canvas caption center cite code col colgroup dd del dfn dir div dl dt em embed fieldset\
  font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex\
  kbd label legend li link menu meta nobr noframes noscript object ol optgroup option p\
  param pre q s samp script select small span strike strong style sub sup table tbody td\
  textarea tfoot th thead title tr tt u ul var\
  article aside audio command details figcaption figure footer header hgroup keygen mark\
  meter nav output progress rp ruby section source summary time video'.split(/\s+/m);
  attribute_map = {
    htmlFor: 'for',
    className: 'class'
  };
  _fn = function(tag_name) {
    return Builder[tag_name] = function() {
      return Builder.apply(this, [tag_name].concat(array_from(arguments)));
    };
  };
  for (_i = 0, _len = supported_html_tags.length; _i < _len; _i++) {
    tag_name = supported_html_tags[_i];
    _fn(tag_name);
  }
  if ((typeof module != "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = Builder;
  } else {
    this.Builder = Builder;
  }
  if (this.ender != null) {
    this.ender({
      builder: Builder
    });
  }
}).call(this);
