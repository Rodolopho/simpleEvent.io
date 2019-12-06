export var core={

	close:function(e,id,a){
		var el=id.nodeType?id:(id=="parent")?this.parentNode:document.getElementById(id);
		if(el){
			if(el.style.display=="none") {return false};

			if(a==="true"){
				var result=confirm('Are you sure want to close?');
				$impleEvent.core.animate.call(this, e, "bounce");
				return result?(el.style.display="none"):false;
			}
			el.style.display="none";
		}else{
			console.warn("close error:-Cannot Find Element with id:"+id);
		}

	},
	log:function(e,a){
		console.log(a);
	},
	logEvent:function(e){
		console.log(e.type,"\n",e);
	},
	logFunc:function(ev,f,a,b,c,d,e){
		f=f.trim();
		if($impleEvent.callbacks.hasOwnProperty(f)){
			console.log($impleEvent.callbacks[f](ev,a,b,c,d,e));
		}else if(core.hasOwnProperty(f)){
			console.log(core[f](ev,a,b,c,d,e));
		}
		
		
	},
	animate:function(e,a,b,bool){
		// console.log("fjh");
		//Require animate.css
		// https://daneden.github.io/'animate.css' for animate to work
		var el=b?document.getElementById(b):this;
			el.classList.add("animated");
			el.classList.add(a);
			let t=setTimeout(function(){
				el.classList.remove("animated");
				el.classList.remove(a);
				clearTimeout(t);
			},1000);
			
		//el.classList.remove("animated");
		//el.classList.remove(a);
		//el.setAttribute('class',el.hasAttribute('class')?el.getAttribute('class')+ " " +a+" animated":" " +a+" animated");
		
		// if(!bool===true){var t=setTimeout(function(){
		// 	el.setAttribute('class',el.getAttribute('class').replace(a,"").replace('animated',"").trim());
		// 	clearTimeout(t);
		// },1000);
		// }
		
	},
	//----------------------------core-------
	typewriter:function(e,a,b){
			//if a===true the chnage event to keyup
		//if(this.hasAttribute($impleEvent.init.$dataGet)){
			

					// let label=$impleEvent.createElement("label",{style:"font-weight:bold;margin:0px 5px;background:#ccc",});
					let input=$impleEvent.createElement("input",{
						style:"outline:none; border:none;font-style:italic;padding:0px;margin:0px;width:1rem;font:inherit;",
						placeholder:"TypeWriter"
					});
					// label.innerText=this.getAttribute($impleEvent.init.$dataGet);
					// input.value=this.getAttribute("value");

					
					
					
			
			let _this=this;
			//console.log(this);
			input.onclick=function(e){
				e.stopPropagation();	
			};
						
			 this.style.position="relative";
			 
			 input.value=this.value?this.value:this.getAttribute("value");

			this.appendChild(input);
			
				input.onkeyup=function(ev){
					
					if(ev.which==8){
						console.log(this.previousSibling);
						return;
					}
				//}
				_this.setAttribute("value","");
				$impleEvent.manageReturns(_this,this.value,true);
				input.value="";
			}

			input.onchange=function(){
					input.parentNode.removeChild(input);
				}
				input.onblur=function(){
					input.parentNode.removeChild(input);
				}
				input.focus();
		//}
		
	

	},
	
	dataChanger:function(e,a,b){
			//if a===true the chnage event to keyup
		if(this.hasAttribute($impleEvent.init.$dataGet)){
			
				let form=$impleEvent.createElement("div", {
				style:"padding:5px;border:1px solid #ccc;background:#ccc;border-radius:5px;postion:absolute;z-index:12345678998654;"
				});
					let label=$impleEvent.createElement("label",{style:"font-weight:bold;margin:0px 5px;background:#ccc",});
					let input=$impleEvent.createElement("input",{style:"outline:none; border:none;border-bottom:1px solid #eee;"});
					label.innerText=this.getAttribute($impleEvent.init.$dataGet);
					input.value=this.getAttribute("value");

					form.appendChild(label);
					form.appendChild(input);
					form.style.position="absolute";
					form.style.zIndex=123456789876644;
					form.style.top="100%";
					form.style.opacity="0.9";
					//{form:form,label:label,input:input};
			
			let _this=this;
			//console.log(this);
			form.onclick=function(e){
				e.stopPropagation();	
			};
						 //
			 this.style.position="relative";
			 label.innerText=this.getAttribute($impleEvent.init.$dataGet);
			 input.value=this.value?this.value:this.getAttribute("value");

			this.appendChild(form);
			if(a===true){
				input.onkeyup=function(){
				
				_this.setAttribute("value",this.value);
				$impleEvent.manageReturns(_this,this.value)

				input.onchange=function(){
					form.parentNode.removeChild(form);
				}
				//return this.getAttribute("value");
			}
		}else{

		
			input.onchange=function(){
				
				_this.setAttribute("value",this.value);
				$impleEvent.manageReturns(_this,this.value)

				form.parentNode.removeChild(form);

				//return this.getAttribute("value");
			}
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
	return:function(e,a,b){
		if(isFinite(e)){
			//a is time
			a=b;

		}
		if(a){
			return a.replace(/\/s/g," ").trim();
		}else{

			console.warn("Returning empty string  on " + e.type);
			return " ";
		}

	},
	returnTo:function(e,id,a,b){
		
		if(isFinite(e)){
			//a is time
			id=a;
			a=b;
			e={type:"interval/timeout"};

		}
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
		}else{
			console.warn("Returning empty string  on " + e.type);
			return " ";
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
		
		
};