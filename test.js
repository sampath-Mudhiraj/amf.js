function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return "\\x"+hex;
}
var Utf8 = {
 // public method for url encoding
 encode : function (string) {
 string = string.replace(/\r\n/g,"\n");
 var utftext = "";
 
 for (var n = 0; n < string.length; n++) {
  var c = string.charCodeAt(n);
  if (c < 128) {
   utftext += String.fromCharCode(c);
  }
  else if((c > 127) && (c < 2048)) {
   utftext += String.fromCharCode((c >> 6) | 192);
   utftext += String.fromCharCode((c & 63) | 128);
  }
  else {
   utftext += String.fromCharCode((c >> 12) | 224);
   utftext += String.fromCharCode(((c >> 6) & 63) | 128);
   utftext += String.fromCharCode((c & 63) | 128);
  }
 }
 return utftext;
},

 // public method for url decoding
 decode : function (utftext) {
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;
  
  while ( i < utftext.length ) {
   c = utftext.charCodeAt(i);
   if (c < 128) {
    string += String.fromCharCode(c);
    i++;
   }
   else if((c > 191) && (c < 224)) {
    c2 = utftext.charCodeAt(i+1);
    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    i += 2;
   }
   else {
    c2 = utftext.charCodeAt(i+1);
    c3 = utftext.charCodeAt(i+2);
    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    i += 3;
   }
  }
  return string;
 }
}
UTF8 = {
    encode: function(s){
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
        );
        return s.join("");
    },
    decode: function(s){
        for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
            ((a = s[i][c](0)) & 0x80) &&
            (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
            o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
        );
        return s.join("");
    }
};

var jspack = new JSPack();
var arr = jspack.Pack("!2s", [Utf8.encode("/1")]);
var res = "";
for(var i = 0; i < arr.length; i++){
	console.info(decimalToHex(arr[i]));
}