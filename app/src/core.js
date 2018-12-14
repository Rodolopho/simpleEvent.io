export var core={

	//---------helpers for core---------------
	scopify:function(el,scope,classname){
		if(scope=="global"){//global
			return document.querySelectorAll("."+classname);

		}else if(scope=="parent"){//parent
			return el.parentNode.querySelectorAll("."+classname);

		}else if(scope=="grandParent"){//grandparent
			return el.parentNode.parentNode.querySelectorAll("."+classname);

		}else{//slef
			return el.querySelectorAll("."+classname);

		}


	},
	refactorArgs:function(args,n){

		var n=n||0;
		n=n+1;//add 1 for e evnet variable
		var scope=null;
		var classname=null;
		var arg=Array.prototype.slice.call(args,1,n);
		//if its has clasname or scope
		if(args.length>n){
			if(args[n]){
				classname=args[n];
				//console.log(classname);
			}
			if(args[n+1]){
				scope=args[n+1];
				//console.log(scope);
			}
		return {
				classname:classname,
				args:arg,
				scope:scope,
			};

		}else if(args.length==n){
			return arg;
		}else{
			return false;
		}
		
		
	},
	main:function(){

	},
	//----------------------------core-------
	dataChanger:function(e,a,b){
		if(this.hasAttribute("data-get")){
			if(!$impleEvent.form){
				var form=$impleEvent.createElement("div", {
				style:"padding:5px;border:1px solid #ccc;background:#ccc;border-radius:5px;postion:absolute;z-index:12345678998654;"
				});
					var label=$impleEvent.createElement("label",{style:"font-weight:bold;margin:0px 5px;background:#ccc",});
					var input=$impleEvent.createElement("input",{style:"outline:none; border:none;border-bottom:1px solid #eee;"});
					label.innerText=this.getAttribute("data-get");
					input.value=this.getAttribute("value");

					form.appendChild(label);
					form.appendChild(input);
					form.style.position="absolute";
					form.style.zIndex=123456789876644;
					form.style.top="100%";
					form.style.opacity="0.9";
					$impleEvent.form={form:form,label:label,input:input};
			}
			var _this=this;
			//console.log(this);
			$impleEvent.form.form.onclick=function(e){
				e.stopPropagation();
				
				
			};
						 //$impleEvent.form;
			 this.style.position="relative";
			 $impleEvent.form.label.innerText=this.getAttribute("data-get");
					$impleEvent.form.input.value=this.getAttribute("value");
			this.appendChild($impleEvent.form.form);
			$impleEvent.form.input.onchange=function(){
				
				_this.setAttribute("value",this.value);
				console.log(_this);
			}
		}

	},
	carousel:function(e,a,b){
		var images=this.getElementsByTagName("img");
		if(!this.hasAttribute("index")){this.setAttribute("index",0);}
		var index=parseInt(this.getAttribute('index'));

		for(var i=0;i<images.length;i++){
			images[i].style.display="none";
		}

		index++;
		if(index>images.length){index=1}
			images[index-1].style.display="block";
		this.setAttribute("index",index);
		    // var i;
		    // var x = images;
		    // for (i = 0; i < x.length; i++) {
		    //    x[i].style.display = "none";
		    // }
		    // var index=parseInt(this.getAttribute('index'));
		    // this.setAttribute("index",index+1);
		    // if (index > x.length) {index=1}
		    // x[index-1].style.display = "block";
		    // //setTimeout(carousel, 3000);
		    console.log("hiiii");
		//}
	},
	//-----------------------class------------------------
	addClass:function(e,a,b){
		var ele=this;
		if(b && document.getElementById(b)){
			ele=document.getElementById(b);
		}
		ele.classList.add(a);


	},
	removeClass:function(e,a,b){
		var ele=this;
		if(b && document.getElementById(b)){
			ele=document.getElementById(b);
		}
		ele.classList.remove(a);
	},
	toggleClass:function(e,a,b){
		var ele=this;
		if(b && document.getElementById(b)){
			ele=document.getElementById(b);
		}
		ele.classList.toggle(a);
	},
	//--------------------------------------------------
	rotate:function(e,a,b,c){
		this.style.transition="all 0.35s";
		var args=core.refactorArgs(arguments,1);
		if(Object.prototype.toString.call(args) == "[object Object]"){
			Array.prototype.forEach.call(core.scopify(this,args.scope,args.classname),function(e){
				e.style.transition="all 0.35s";
				e.style.transform="rotate( "+args.args[0]+")";
			});

		}else if(args){
			this.style.transform="rotate( "+args[0]+")";
		}else{
			var value=Math.round(Math.random(1)*90) +"deg";
			this.style.transform="rotate( "+value+")";
			return value;
		}	
	},
	verticalSlideChnage:function(){

	},
	scale:function(e,a,b,id){
		this.style.transition="all 0.35s";
		//case 1: if has one argsi.e if args.length=1;
		if(arguments.length==2 && isFinite(a)){
			this.style.transform="scale( "+a+")";
		}else if(arguments.length==3 && isFinite(a) && isFinite(b)){
			this.style.transform="scale( "+a+","+b+")";

		}else if(arguments.length==4 && isFinite(a) && isFinite(b) && document.getElementById(id)){
			document.getElementById(id).style.transition="all 0.35s";
				document.getElementById(id).style.transform="scale( "+a+","+b+")";
		}else{
			console.warn("Something Wrong with arguments you provided, unable to scale on " + e.type);
			

		}
		

	},
	css:function(e,a,b,id){
		this.style.transition="all 0.35s";
		if(arguments.length==3){
			this.style[a]=b;

		}else if(arguments.length=4 && document.getElementById(id)){
			document.getElementById(id).style.transition="all 0.35s";
			document.getElementById(id).style[a]=b;

		}else{
			console.warn("Something Wrong with arguments you provided, unable to appy style/css on " + e.type);
		}

	},
	return:function(e,a,id){

		if( a && document.getElementById(id)){
			a=a.replace(/\/s/g," ").trim();
			return {
				returnTo:{
					el:document.getElementById(id),
					data:{
						self:a
					}
				}
			}
		}else if(a){
			return a.replace(/\/s/g," ").trim();
		}else{

			console.warn("Returning empty string  on " + e.type);
			return " ";
		}

	},
	resize:function(e,a,b){
	
		if(a=="fullscreen" && b){
			var el=document.getElementById(b);
			if(el){
				el.setAttribute("data-resize",el.style.width+":"+el.style.height);
				el.style.width=window.innerWidth + "px";
				el.style.height=window.innerHeight+ "px";
				el.style.position="fixed";
				el.style.top="0";
				return false;
			}

			
		}
		if(a=="initial" && b){
			var el=document.getElementById(b);
			if(el){
				if(el.hasAttribute("data-resize")){
					el.style.width="initial";
					el.style.height="initial";
					el.style.position="initial";
					el.style.top="initial";
				return false;
				}else{
					el.style.width="initial";
					el.style.height="initial";
					el.style.position="initial";
					el.style.top="initial";
					return false;
				}
				
			}

		}

			var w=parseInt(this.style.width);
			var h=parseInt(this.style.height);
			var pw=parseInt(a);
			var ph=parseInt(b)
			if(pw && ph){
				this.style.width=w-w*pw/100 + "px";
				this.style.height=h-h*ph/100 + "px";

			}else if(pw){
				this.style.width=w-w*pw/100 + "px";
				this.style.height=h-h*pw/100 + "px";

			}
		},
		timeout:function(e,a,b){
			if(!isFinite(b)){
				console.log("please Provide Time in ms; for timeout function");
				return false;

			}
			if($impleEvent.core.hasOwnProperty(a)){
				var timer=setTimeout($impleEvent.core[a].bind(this), b);
					
				}else if($impleEvent.callbacks.hasOwnProperty(a)){
					var timer=setTimeout($impleEvent.callbacks[a].bind(this,[e,timer]), b);
					

				//case 3: no callback is define
				}else{
					console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
					return false;

				}	


		},
		interval:function(e,a,b){
			if(!isFinite(b)){
				console.log("please Provide Time in ms; for interval function");
				return false;

			}
			if($impleEvent.core.hasOwnProperty(a)){
				console.log("wow");
				var interval=setInterval($impleEvent.core[a].bind(this,[e,interval]), b);
					
				}else if($impleEvent.callbacks.hasOwnProperty(a)){
					var interval=setInterval($impleEvent.callbacks[a].bind(this,[e,interval]), b);
					

				//case 3: no callback is define
				}else{
					console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
					return false;

				}	


		},
		hide:function(e,a){//visibility: hidden
			if(a=="parent"){
				this.parentNode.style.transition="all 0.35s";
				this.parentNode.style.display="none";

			}else if(a=="prev"){
				this.previousElementSibling.style.transition="all 0.35s";
				this.previousElementSibling.style.display="none";
			}else if(a=="next"){
				this.nextElementSibling.style.transition="all 0.35s";
				this.nextElementSibling.style.display="none";
			}
		},
		show:function(e,a){//display:initial
			if(a=="parent"){
				this.parentNode.style.transition="all 0.35s";
				this.parentNode.style.display="initial";

			}else if(a=="prev"){
				this.previousElementSibling.style.transition="all 0.35s";
				this.previousElementSibling.style.display="initial";
			}else if(a=="next"){
				this.nextElementSibling.style.transition="all 0.35s";
				this.nextElementSibling.style.display="initial";
			}
		},
		toggle:function(e,a,c,d){

		 if(a=="prev"){
		 	//alert(this.previousElementSibling.style.display=="none");
		 		if(this.previousElementSibling.style.display!="none"){
		 			this.previousElementSibling.style.transition="all 0.35s";
		 			this.previousElementSibling.style.display="none";
		 			if(d) this.innerText=d;
		 		}else{
		 			this.previousElementSibling.style.transition="all 0.35s";
		 			this.previousElementSibling.style.display="initial";
		 			if(c)this.innerText=c;	
		 		}
				
			}else if(a=="next"){
				if(this.nextElementSibling.style.display!="none"){
					this.nextElementSibling.style.transition="all 0.35s";
		 			this.nextElementSibling.style.display="none";
		 			if(d) this.innerText=d;
		 		}else{
		 			this.nextElementSibling.style.transition="all 0.35s";
		 			this.nextElementSibling.style.display="initial";
		 			if(c)this.innerText=c;
		 		}
				
			}else if(document.getElementById(a)){

				if(document.getElementById(a).style.display!="none"){
					document.getElementById(a).style.transition="all 0.35s";
		 			document.getElementById(a).style.display="none";
		 			if(d) this.innerText=d;
		 		}else{
		 			document.getElementById(a).style.transition="all 0.35s";
		 			document.getElementById(a).style.display="initial";
		 			if(c)this.innerText=c;	
		 		}
			}else{
				console.warn("Something Wrong with arguments you provided, unable to appy style/css on " + e.type);
			}
		},
};