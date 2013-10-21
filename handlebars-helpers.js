//handlebars-helpers.js

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

Handlebars.registerHelper('formatDollars', function(value) {
    var n = value,
        c = 2,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
});

Handlebars.registerHelper('titleCase', function(str) {
    if (typeof str === 'undefined') return '';
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});

Handlebars.registerHelper('encode', function(context) {
    return encodeURIComponent(context);
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '', i;
    for(i = 1; i <= n; i++) {
        accum += block.fn(i);
    }
    return accum;
});

Handlebars.registerHelper('eachProperty', function(context, options) {
    var ret = "";
    for(var prop in context) {
        if (context.hasOwnProperty(prop)){
            ret = ret + options.fn({property:prop,value:context[prop]});
        }
    }
    return ret;
});

Handlebars.registerHelper('join', function(items, block) {
    var delimiter = block.hash.delimiter || ",",
        start = start = block.hash.start || 0,
        len = items ? items.length : 0,
        end = block.hash.end || len,
        out = "";

        if(end > len) end = len;

    if ('function' === typeof block) {
        for (i = start; i < end; i++) {
            if (i > start) out += delimiter;
            if('string' === typeof items[i])
                out += items[i];
            else
                out += block(items[i]);
        }
        return out;
    } else {
        return [].concat(items).slice(start, end).join(delimiter);
    }
});

Handlebars.registerHelper('setIndex', function(value){
    this.index = Number(value);
});