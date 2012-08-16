;(function(){
	var amfjs = new AMFjs();
	//console.info(amfjs._write_ushort(22));
	
	//var aux = amfjs._write_ushort(22);
	//console.info(amfjs._read_ushort(aux));
	
	//console.info(amfjs._write_utf8_string("agregador.executarHello"));
	
	var aux = amfjs._write_utf8_string("agregador.executaHello");
	console.info(aux);
	console.info(amfjs._read_utf8_string(aux));
})();