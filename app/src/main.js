
import {init} from './init.js';
import {render} from "./render.js";
import eventPatcher from "./eventPatcher.js";
import * as Dispatch from "./dispatchReturns.js";
//------------------------------------------------------------------------------------------
	const $impleEvent={};
//Container or holders
	$impleEvent.callbacks={};
	$impleEvent.core={};
	$impleEvent.init=init;
	$impleEvent.toString=function(){return "Object $impleEvent";};
//------------------------------------------------------------------------------------------
//Helper Methods
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
	$impleEvent.validate=function(e,name, value){
			var validate=e.getAttribute('data-validate');
				if($impleEvent.callbacks[validate]){
					return $impleEvent.callbacks[validate](e,name,value);
				}
			};
	//------------------------------------------------------------------------------------------		
	$impleEvent.addEventListener=function(el,event,handler,data){
		el.addEventListener(event,function(e){
				//adding current event to args so that callback can acess it.
				var args=data.slice(2);
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

//User accessors: User mostly user these method to interaction with application 
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
	$impleEvent.update=function(el){ this.launch(el)};
	//------------------------------------------------------------------------------------------
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
						console.error("Unvalid Config Property :" + keys);
					}
			} 
			return this;
	};
	//------------------------------------------------------------------------------------------
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
	$impleEvent.eventPatcher=eventPatcher;
	//------------------------------------------------------------------------------------------
	$impleEvent.dispatchReturns=Dispatch.dispatchReturns;
	$impleEvent.dispatcher=Dispatch.dispatcher;
	$impleEvent.dispatchSingle=Dispatch.dispatchSingle;
	$impleEvent.dispatchArray=Dispatch.dispatchArray;
	$impleEvent.dataFeedValue=Dispatch.dataFeedValue;
	//------------------------------------------------------------------------------------------
	$impleEvent.render=render;
	//------------------------------------------------------------------------------------------
	if(window.$impleEvent){
		if(window.$impleEvent.toString()==="Object $impleEvent"){
			console.warn("Duplicate $impleEvent libaray Found! Make sure you are not importing $impleEvent more than one time. ");
		}else{
			console.error("$impleEvent name is already used, Please Dont assign '$impleEvent' to any varibale, function or objects. Please free ' $impleEvent' namespace from global scope.");
		}
	}else{
		window.$impleEvent=$impleEvent;
	}

