;(function(){
	var Def = function(){ return constructor.apply(this,arguments); }
	var attr = Def.prototype;

	//list the attributes
	attr.url;
	attr.method;
	attr.params;
	attr.jspack;

	//construct
	function constructor(){
		this.jspack = new JSPack();
	};
	
	//define methods
	attr.call = function(url, method, params){
		this.url = url;
		this.method = method;
		this.params = params;
	};
	
	attr._decimalToStringHex = function(d, padding) {
		var hex = Number(d).toString(16);
	    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
	    while (hex.length < padding) {
	        hex = "0" + hex;
	    }
	    return "\\x"+hex;
	};
	
	attr._encode_utf8 = function(s){
		for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
	        s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
	    );
	    return s.join("");
	};
	
	attr._decode_utf8 = function(s){
		for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
	        ((a = s[i][c](0)) & 0x80) &&
	        (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
	        o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
	    );
	    return s.join("");
	};
	
	attr._isint = function(s){ 
		if((parseFloat(s) == parseInt(s)) && !isNaN(s)){
			return true;
		} else { 
			return false;
		} 
	};
	
	attr._read_ushort = function(s){
		return this.jspack.Unpack(">H", s);
	};
	
	attr._write_ushort = function(s){
		if(Object.prototype.toString.call(s) !== '[object Array]'){
			s = [s];
		}
		if(this._isint(s) && s >= 0 && s <= 65535){
			var array = this.jspack.Pack(">H", s);
			/*var res = undefined;
			for(var i = 0; i < array.length; i++){
				if(res === undefined) res = "";
				res += this._decimalToStringHex(array[i]);
			}
			return res;*/
			return array;
		}
		return undefined;
	};
	
	attr._read_utf8_string = function(s){
		s = this.jspack.Unpack(">"+s.length+"s", s);
		return this._decode_utf8(s[0]);
	};
	
	attr._write_utf8_string = function(s){
		if(Object.prototype.toString.call(s) !== '[object Array]'){
			s = this._encode_utf8(s);
			s = [s];
		}
		else{
			s[0] = this._encode_utf8(s[0]);
		}
		var array = this.jspack.Pack(">"+s[0].length+"s", s);
		/*var res = undefined;
		for(var i = 0; i < array.length; i++){
			if(res === undefined) res = "";
			res += this._decimalToStringHex(array[i]);
		}
		return res;*/
		return array;
	}
	
	//unleash your class
	window.AMFjs = Def;
})();