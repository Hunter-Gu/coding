function $$(el, i, father){
	var index = i || 0;
	var target = father || document;
	if(el[0] === '#'){
		return target.getElementById(el.substring(1,el.length));
	}else if(el[0] === '.'){
		return target.getElementsByClassName(el.substring(1,el.length))[index];
	}else{
		return target.getElementsByTagName(el.substring(0,el.length))[index];
	}
}
// var opts = {
// 	type: 'get',
// 	url: 'data.php',
// 	data: {
// 		name:1,
// 		qq:2,
// 		words:3,
// 		loves:4,
// 		sex:5
// 	},
// 	success: rspSuccess,
// 	error: rspFail
// };
function ajax(opts){
	var xmlHttp = new XMLHttpRequest();
	value = '';
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
			opts.success(JSON.parse(responseText));
		}else{
			opts.error();
		}
	};
	for(var keys in opts.data){
		value += opts.data[keys] + '&';
	}
	value = value.substr(0,value.length - 1);
	if(opts.type.toLowerCase() === 'get'){
		xmlHttp.open(opts.type,opts.url + '?' + value,true);
		xmlHttp.send();
	}else if(opts.type.toLowerCase() === 'post'){
		xmlHttp.open(opts.type,opts.url,true);
		xmlHttp.send(value);
	}
}