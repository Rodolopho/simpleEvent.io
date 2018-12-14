
import {init} from './init.js';
import {render} from "./render.js";
import eventPatcher from "./eventPatcher.js";
import * as Dispatch from "./dispatchReturnBeta.js";
import dispatchObject from "./dispatchObjectBeta.js";
import {core} from './core.js';
//------------------------------------------------------------------------------------------
	const $impleEvent={};
//Container or holders
	//conatiner to hold callback or event handlers supplied by user using $impleEvent.add(), method
	$impleEvent.callbacks={};
	//$imple Event native Collection of callbacks
	$impleEvent.core=core;
	//Application initilization and config data, can be modified using $impleEvent.config(), method
	$impleEvent.init=init;
	//to string identifier
	$impleEvent.toString=function(){return "Object $impleEvent";};
//------------------------------------------------------------------------------------------
//Helper Methods
	//create element e.g $impleEvent.createElement("h1",{id:"h1", class:"one two ", text:"I am a title"});
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
	//------------------------------------------------------------------------------------------
	//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
	$impleEvent.getData=function(el){
		var result={};
		Array.prototype.forEach.call(el.querySelectorAll('['+$impleEvent.init.$dataGet+'], [name]'),function(e){
		
			//first check for name
			if(e.hasAttribute('name')){
				//check if name has some value
				if(e.getAttribute('name')){
					if(e.hasAttribute('data-validate')){
						
						var validate=$impleEvent.validate(e,e.getAttribute('name'),e.value);
						if(validate===false){
							result.hasError=true;
						}else{
							result[e.getAttribute('name')]=e.value;
						}

					}else{
						result[e.getAttribute('name')]=e.value;
					}
				}
			}else{//then check for data-get
				if(e.getAttribute($impleEvent.init.$dataGet)){
					if(e.value || e.value==""){
						result[e.getAttribute($impleEvent.init.$dataGet)]=e.value;
					}else if(e.hasAttribute("value")){
						result[e.getAttribute($impleEvent.init.$dataGet)]=e.getAttribute('value');
					}
				
				}
			}
		});
		return result;
	};
	//------------------------------------------------------------------------------------------
	//Validation  check and reference check to callback provide by user 
	//this function is called by $impleEvent.getData(); which passes e, name, value to this function
	//only applicable to user input not applicable to getAttribute("value");
	$impleEvent.validate=function(e,name, value){//e=event, name=name attribute value e.g name, email
			var validate=e.getAttribute('data-validate');
				if($impleEvent.callbacks[validate]){
					return $impleEvent.callbacks[validate](e,name,value);
				}
			};
	//------------------------------------------------------------------------------------------	
	//data=>is agruments supplied in event attribute of element	after callback i.e event="click_callback_arg1_arg2"
	$impleEvent.addEventListener=function(el,event,handler,data){
		el.addEventListener(event,function(e){
			//check if argument dynamic arguments i.e $args
			var map=data.map(function(arg){
				if(arg.match(/^\$[a-zA-Z0-9]+/)){
					if(el.getAttribute($impleEvent.init.$dataGet)===arg.replace(/^\$/,"")){
						return el.value?el.value:el.getAttribute("value");
					}
					return arg;
			}
					return arg;
			
			});
			
				//adding current event to args so that callback can acess it.
				var args=map.slice(2);
				var getIndex=args.indexOf('$value');

				if(getIndex!==-1){
					args[getIndex]=el.value;
				}
				args.unshift(e);
				 //caputure any return from callback to feed return feeder
					var $return=handler.apply(this,args);//give callback this scope of addEventListener i.e target element
						if($return){
							//if any return handle it
							if(el.hasAttribute('data-filter')){
									
									var filter=el.getAttribute('data-filter');
									if($impleEvent.core.hasOwnProperty(filter)){
										$return=$impleEvent.core[filter]($return);

									}else if($impleEvent.callbacks.hasOwnProperty(filter)){
										$return=$impleEvent.callbacks[filter]($return);
									}else{
										console.error("Unable to apply filter" +filter +": Missing filter method");
									}					
													}
								$impleEvent.dispatchReturns(this,$return);
							}
					},false);
		};
	//------------------------------------------------------------------------------------------
//End of Helper Methods



//User accessors: User mostly user these method to interaction with application 

	//It allow user to add callbacks, $impleEvent.add('methodname', function(){}).add({method1:function(){}, method2:function(){}})
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

			return this;
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
			
				var eventList=elements[i].getAttribute('event').trim().split(/\s+/);
				if(eventList.length){
					this.eventPatcher(elements[i],eventList);
				}else{
					return false;
				}
					
			}
	};
	//------------------------------------------------------------------------------------------

//processors
	//Responisble for binding event to element with coressponding callbacks
	$impleEvent.eventPatcher=eventPatcher;
	//------------------------------------------------------------------------------------------

	//Handle the returns from callback when event occurs, if callback has a return
	$impleEvent.dispatchReturns=Dispatch.dispatchReturns;
	$impleEvent.dispatcher=Dispatch.dispatcher;
	$impleEvent.dispatchSingle=Dispatch.dispatchSingle;
	$impleEvent.dispatchSelf=Dispatch.dispatchSelf;
	$impleEvent.dataFeedValue=Dispatch.dataFeedValue;
	$impleEvent.dispatchObject=dispatchObject;
	//------------------------------------------------------------------------------------------

	//Responsible for render html to the document, with approppriate returns
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
	}

