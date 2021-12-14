export let core={
//---------------developer and debug
	log:function(info){
		console.log(info);
	},
	logEvent:function(event){
		console.log(event.type,"\n",event);
	},
	logFunc:function(callbackName,arg1,arg2,arg3,arg4,arg5){
		callbackName=callbackName.trim();
		if($impleEvent.callbacks.hasOwnProperty(callbackName)){
			console.log($impleEvent.callbacks[callbackName](event,arg1,arg2,arg3,arg4,arg5));
		}else if(core.hasOwnProperty(callbackName)){
			console.log(core[callbackName](event,arg1,arg2,arg3,arg4,arg5));
		}
		
		
	},
	return:function(a,b,e){
		if(isFinite(e)){
			//a is time
			a=b;
			e={type:"interval/timeout"};
		}

		if(a){
			return a;
		}else{

			console.warn("Returning empty string  on " + e.type);
			return " ";
		}
		
	},
	returnTo:function(id,a,b,e){
		
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
					data:a
				}
			}
		}else{
			console.warn("Returning empty string  on " + e.type);
			return " ";
		}

	},
	//onevent when calling timeout function 
	timeout:function(a,b,e){
			if(!isFinite(b)){
				console.log("please Provide Time in ms; for timeout function");
				return false;

			}
			
			if($impleEvent.core.hasOwnProperty(a)){
				let timer=setTimeout($impleEvent.core[a].bind(this), b);
					
				}else if($impleEvent.callbacks.hasOwnProperty(a)){
					let timer=setTimeout($impleEvent.callbacks[a].bind(this,[timer,b]), e);
					

				//case 3: no callback is define
				}else{
					console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
					return false;

				}	


		},

		interval:function(a,b,e){
			if(!isFinite(b)){
				console.log("please Provide Time in ms; for interval function");
				return false;

			}
			if($impleEvent.core.hasOwnProperty(a)){
				console.log("wow");
				let interval=setInterval($impleEvent.core[a].bind(this,[interval,b]), e);
					
				}else if($impleEvent.callbacks.hasOwnProperty(a)){
					let interval=setInterval($impleEvent.callbacks[a].bind(this,[interval,b]), e);
					

				//case 3: no callback is define
				}else{
					console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
					return false;

				}	


		},
	//-------------------
	close:function(ele,bool){
		let el=id.nodeType?id:(id=="parent")?this.parentNode:document.getElementById(id);
		if(el){
			if(el.style.display=="none") {return false};

			if(bool===true){
				let result=confirm('Are you sure want to close?');
				
				return result?(el.style.display="none"):false;
			}
			el.style.display="none";
		}else{
			console.warn("close error:-Cannot Find Element with id:"+id);
		}

	},
	openClose:function(id,bool){
		let el=id.nodeType?id:(id=="parent")?this.parentNode:document.getElementById(id);
		if(el){
			if(el.style.display=="none") {
				el.style.display="initial";
				return false};

			if(bool===true){
				let result=confirm('Are you sure want to close?');
				
				return result?(el.style.display="none"):false;
			}
			el.style.display="none";
		}else{
			console.warn("openClose error:-Cannot Find Element to close:"+id);
		}

	},
	

	//----------------------------core-------
	typewriter:function(a,b){
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
	
	dataChanger:function(a,b){
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
	carousel:function(a,b,elements){
		
		if(!this.hasAttribute("index")){this.setAttribute("index",0);}
		let index=parseInt(this.getAttribute('index'));

		for(let i=0;i < elements.length;i++){
			elements[i].style.display="none";
		}

		index++;
		if(index>images.length){index=1}
			elements[index-1].style.display="block";
		this.setAttribute("index",index);
		    
	},
	//-----------------------class------------------------
	addClassName:function(a,id){
		let el=id.nodeType?id:(id=="parent")?this.parentNode:document.getElementById(id);
		let ele=this;
		if(id && document.getElementById(id)){
			ele=document.getElementById(id);
		}
		// if(Array.isArray(a)){ a.}
		ele.classList.add(a);


	},
	removeClassName:function(a,id){
		let ele=this;
		if(id && document.getElementById(id)){
			ele=document.getElementById(id);
		}
		ele.classList.remove(a);
	},
	toggleClassName:function(a,id){
		let ele=this;
		if(id && document.getElementById(id)){
			ele=document.getElementById(id);
		}
		ele.classList.toggle(a);
	},
	
	css:function(property,value,id,e){
		this.style.transition="all 0.35s";
		if(arguments.length==3){
			this.style[property]=value;

		}else if(arguments.length=4 && document.getElementById(id)){
			document.getElementById(id).style.transition="all 0.35s";
			document.getElementById(id).style[property]=value;

		}else{
			console.warn("Something Wrong with arguments you provided, unable to appy style/css on " + e.type);
		}

	},
	
		validate:{
			email:{
				test:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
				success:"You have provided Valid email Id",
				fail:"Please provide Valid Email address",
			},
			number:{
				test:/^\d+$/,
				success:"",
				fail:"Please provide number only",
			}, 
			required:{
				test:/\S+/,
				success:"",
				fail:"This field cant be empty"
			}
		},
		
		
};








