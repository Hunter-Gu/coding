$$('.submit').addEventListener('click',function(){
	if(username.value.length === 0 || qq.value.length === 0 || words.value.length === 0 || !filterEle1() || !filterEle2()){
		$$('.warning').style.display = 'inline-block';
		return ;
	}
	$$('.warning').style.display = 'none';
	$$('#modal').style.display = 'block';
},false);
$$('#modal').addEventListener('click',function(e){
	if(e.target.className === 'close' || e.target.value === '否' || e.target.className === 'cover' || e.target.value === '确定'){
		$$('#modal').style.display = 'none';
		$$('.modal-contain').style.display = 'block';
		$$('.error').style.display = 'none';
	}else if(e.target.value === '是'){
		ajax(opts);
	}
},false);

//-------------------
		var username = $$('input',0);
		var qq = $$('input',1);
		var words = $$('textarea');
		username.setAttribute('maxlength',10);
		qq.setAttribute('maxlength',15);
		words.setAttribute('maxlength',200);
		$$('.layout',1).addEventListener('keyup',function(e){
			$$('.warning').style.display = 'none';
			$$('.size',0,e.target.parentElement).innerText = e.target.value.length + '/' + e.target.getAttribute('maxlength');
			if(e.target.value.length === (+ e.target.getAttribute('maxlength'))){
				$$('.size',0,e.target.parentElement).style.color = 'red';
			}else{
				$$('.size',0,e.target.parentElement).style.color = '#aaa';
			}
			if(e.target.getAttribute('name') === 'name'){
				var pat1 = /^\w{1,10}$/;
				if(pat1.test(e.target.value) || e.target.value.length === 0){
					$$('.limit',0,e.target.parentElement).style.color = '#ccc';
				}else if(!pat1.test(e.target.value)){
					$$('.limit',0,e.target.parentElement).style.color = 'red';
				}
			}else if(e.target.getAttribute('name') === 'qq'){
				var pat2 = /^\d{1,15}$/;
				if(pat2.test(e.target.value) || e.target.value.length === 0){
					$$('.limit',0,e.target.parentElement).style.color = '#ccc';
				}else if(!pat2.test(e.target.value)){
					$$('.limit',0,e.target.parentElement).style.color = 'red';
				}
			}
		},false);
//-------------------
var opts = {
	type: 'get',
	url: 'data.php',
	data: {
		name:1,
		qq:2,
		words:3,
		loves:4,
		sex:5
	},
	success: rspSuccess,
	error: rspFail
};
function rspSuccess(json){

}
function rspFail(){
	$$('.modal-contain').style.display = 'none';
	$$('.error').style.display = 'block';
}


	$$('.select',0).addEventListener('click',function(e){
		if(e.target.getAttribute('checked') === 'checked'){
			e.target.removeAttribute('checked');
		}else{
			e.stopPropagation();
			e.target.setAttribute('checked','checked');
		}
		removeAtt();
	},false);
	$$('.select',1).addEventListener('click',function(e){
		for(var i = 0;i < this.getElementsByTagName('input').length;i ++){
			$$('input',i,this).removeAttribute('checked');
		}
		e.target.setAttribute('checked','checked');
		removeAtt();
	},false);
	function removeAtt(){
		for(var i = 0;i < document.getElementsByTagName('label').length;i ++){
			$$('label',i).removeAttribute('checked');
		}
	}
	function filterEle1(){
		for(var i = 0;i < $$('.select',0).getElementsByTagName('input').length;i ++){
			if($$('input',i,$$('.select',0)).getAttribute('checked') === 'checked'){
				return true;
			}
		}
		return false;
	}
	function filterEle2(){
		for(var i = 0;i < $$('.select',1).getElementsByTagName('input').length;i ++){
			if($$('input',i,$$('.select',1)).getAttribute('checked') === 'checked'){
				return true;
			}
		}
		return false;
	}