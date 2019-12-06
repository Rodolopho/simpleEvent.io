/*
import {init} from './init.js';
import {render} from "./render.js";
import eventManager from "./eventbeta.js";
import callbackHandler from "./callback.js";
import  manageReturns from "./return.js";
import  getData from "./retrive.js";
import {core} from './core.js';



export defautl class $impleEvent{
	constructor(){
		this.callbacks={};
		this.core=core;
		this.init=init;
		this.inCallbacks={};
		//this.vars={};
		
	}

	toString(){
		return "Object $impleEvent";
	}

	reset(ele,bool){
		let el=ele.parentNode;
		if(el.nodeType){
			if(bool===true){
				el.querySelectorAll(this.init.$className+"["+this.init.$dataFeed+"]").forEach((e)=>{e.innerHTML=''});
			}else{
				el.querySelectorAll(this.init.$className).forEach((e)=>{e.innerHTML=''});
			}
			
		}
	};



}

method(callback){
	let data=callback.split(/\./);
		if(data.length===2){
			if(this.inCallbacks.hasOwnProperty(data[0])){
				if(this.inCallbacks[data[0]].hasOwnProperty(data[1])){
					return this.inCallbacks[data[0]][data[1]];
				}else{
					console.error("Can't Found Method:"+data[1]+"in "+ data[0]+"Object : ref->"+callback+" ,Please Register event handler using '$impleEvent.addIn("+data[0]+", ....)' method?");
								return false;
				}

			}else{
				console.error("Can't Found Object:'" +data[0]+ "' in '"+ callback+"' ,For '.' notation, use  '$impleEvent.addIn()' method?");
				return false;
				}
			

	// ------------------End for dot notaion
		} else if(this.core.hasOwnProperty(callback)){
			 return this.core[callback];
			}else if(this.callbacks.hasOwnProperty(callback)){
				return  this.callbacks[callback];
			}else{
				console.error("Can't Found Method:"+callback+" ,Please Register event handler using '$impleEvent.add()' method?");
			return false;
			}
	}

	addIn(name,a,b){
		let _thisCallbacks=null;
		if(this.inCallbacks.hasOwnProperty(name)){
			_thisCallbacks=this.inCallbacks[name];
		}else{
		 _thisCallbacks=this.inCallbacks[name]={};
		}
		
		
			if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={name:callabck}
				for ( var keys in a){
					if(Object.prototype.toString.call(a[keys]) === '[object Function]'){
						_thisCallbacks[keys]=a[keys];
					}else{
						console.error("Please provide valid callback function for :" + keys);
					}
				}
			}else if((Object.prototype.toString.call(a) === '[object String]') && (Object.prototype.toString.call(b) === '[object Function]')){
				//patern (name, method)	
				_thisCallbacks[a]=b;

			}else{
				console.error("Invalid argument supplied to add("+a+", "+b+") : Supply method name and callback");
			}

			// //Initialize query and event attachment
			if(!this.initiate){
			this.launch();

			this.initiate=true;
			}

			return this;
	

	}

	
	//Covert html string in html.
	$impleEvent.asHTML=function(string){
		var ele=this.createElement('div');
		ele.innerHTML=string;
		 return this.render.cloneElement(ele).firstElementChild;
	};
	$impleEvent.html=function(string){
		return this.asHTML(string);
	}
	//create element e.g $impleEvent.createElement("h1",{id:"h1", class:"one two ", text:"I am a title"});
	//used in render
	$impleEvent.createElement=function(tag, attr){
		var element=document.createElement(tag);
			for (var keys in attr){
				if(keys=="text"){
					element.innerText=attr[keys];
				}else{
					element.setAttribute(keys,attr[keys]);
				}
		        
		      }
		 return element;
	};
	// $impleEvent.notify=function(Message){
	// 	// var st=setTimeout(function(){
	// 	// 	if($impleEvent.init.$noti)
	// 	// },3000)

	// };
	// $impleEvent.alert=function(){

	// };
	// $impleEvent.error=function(el,$return){
	// 	return $impleEvent.manageReturns(el,$return);
	// };
	//------------------------------------------------------------------------------------------
	//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
	$impleEvent.getData=getData;
	
	//Validation  check and reference check to callback provide by user 
	//this function is called by $impleEvent.getData(); which passes e, name, value to this function
	//only applicable to user input not applicable to getAttribute("value");
	$impleEvent.validate=function(e,name, value){//e=event, name=name attribute value e.g name, email
			let validate=e.getAttribute($impleEvent.init.$dataValidate);
				if($impleEvent.callbacks[validate]){
					return $impleEvent.callbacks[validate](e,name,value);
				}
			};
	//------------------------------------------------------------------------------------------	
	//--------------------------------------------------------------------
//End of Helper Methods
 $impleEvent.initiate=null;

//Register your callback through .add() or . register();
		$impleEvent.add=function(a,b){
		

			if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={name:callabck}
				for ( var keys in a){
					if(Object.prototype.toString.call(a[keys]) === '[object Function]'){
						this.callbacks[keys]=a[keys];
					}else{
						console.error("Please provide valid callback function for :" + keys);
					}
				}
			}else if((Object.prototype.toString.call(a) === '[object String]') && (Object.prototype.toString.call(b) === '[object Function]')){
				//patern (name, method)	
				this.callbacks[a]=b;

			}else{
				console.error("Invalid argument supplied to add("+a+", "+b+") : Supply method name and callback");
			}

			// //Initialize query and event attachment
			// if(!this.initiate){
			// this.launch();

			// this.initiate=true;
			// }

			return this;
	};

	$impleEvent.register=function(a,b){
		return this.add(a,b);
	};
	$impleEvent.$add=function(){
		if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={variable:'data'}
				for ( var keys in a){
					this.vars[keys]=a[key];
				}
			}else if((Object.prototype.toString.call(a) === '[object String]')){
				//patern ('id', "123")	
				this.vars[a]=b;

			}else{
				console.error("Invalid argument supplied to add("+a+", "+b+") : Supply vaild arguments");
			}


			return this;
	};
	$impleEvent.addVar=function(a,b ){
		return this.$add(a,b);
	};



	//------------------------------------------------------------------------------------------
	
	//This will update $impleEvent or refresh $impleEvent on specified element.

	$impleEvent.update=function(el){ this.launch(el)};
	//------------------------------------------------------------------------------------------

	//Allows to congif the application e.g, $impleElement.config('$root', document.getElementById('app'));
	$impleEvent.config=function(a,b){
		//if {} is passed
		if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={name:callabck}
				for (var keys in a){
					if(this.init.hasOwnProperty(keys)){
						this.init[keys]=a[keys];
					}else{
						console.error("Unvalid Config Property :" + keys);
					}
				}
			}else{

				if(this.init.hasOwnProperty(a)){
						this.init[a]=b;
					}else{
						console.error("Unvalid Config Property :" + a);
					}
			} 
			return this;
	};
	//------------------------------------------------------------------------------------------

	//Lauched the Application
	$impleEvent.launch=function(el){
		//find the elements with event attribute and attach a handler and listener
			var element=el || this.init.$root;
			var elements=element.querySelectorAll('[event]');
			
			 for(var i=0; i<elements.length; i++){
			 	
				var eventAttribute=elements[i].getAttribute('event');
				
				if(eventAttribute.trim()){
					if(this.init.$useArrow===true){
						let remains=eventAttribute.replace($impleEvent.init.$seperatorArrowGlobal,"");

						if(remains.replace(/,/g,"").trim()){
							console.error("Invalid syntax defination:'"+remains,elements[i]);
							console.warn(" Must provided atleast eventname and callback  in arrow function format 'event=>callback(,arg1,ar2)' seperated by ',' for multiple entry" );
						}
			
						this.eventManager(elements[i], eventAttribute.match(this.init.$seperatorArrowGlobal));
					}else{
						this.eventManager(elements[i],eventAttribute.split(/\s+/));
					}
					
					
				}
					
			}
	};
	//------------------------------------------------------------------------------------------

//processors
	//Responisble for binding event to element with coressponding callbacks
	$impleEvent.eventManager=eventManager;
	//------------------------------------------------------------------------------------------

	//Handle callback , check for callback data 
	$impleEvent.callbackHandler=callbackHandler;
	//----------------------------------------------------------
	//Handle the returns from callback when event occurs, if callback has a return
	 $impleEvent.manageReturns=manageReturns;
	
	//Responsible for rendering html to the document, with approppriate returns
	 $impleEvent.render=render;
	//------------------------------------------------------------------------------------------

	//attach $implEvent to Window after checking for namespace collision and duplicate implementation of library
	if(window.$impleEvent){
		if(window.$impleEvent.toString()==="Object $impleEvent"){
			console.warn("Duplicate $impleEvent libaray Found! Make sure you are not importing $impleEvent more than one time. ");
		}else{
			console.error("$impleEvent name is already used, Please Dont assign '$impleEvent' to any varibale, function or objects. Please free ' $impleEvent' namespace from global scope.");
		}
	}else{
		window.$impleEvent=$impleEvent;

			// window.addEventListener("load", function(event) {
   //  			window.$impleEvent.launch();
  	// 		});
	}

