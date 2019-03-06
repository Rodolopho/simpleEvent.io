//Event Handler

export default function eventManager(el,eventList){
//function eventManager(el,eventList){
	//event list is the list of events like [click_somefunc,dbl_someOtherfunc]
	//for each events in eventList
		for(var i=0; i<eventList.length;i++){
				var data=eventList[i].split($impleEvent.init.$seperator);
				//check event data has atleast eventname and callback
					if(data.length<2){
						console.warn("Insufficient Agruments: Must provided atleast eventname and callback name or event attribute format is not understood:used seperator is "+$impleEvent.init.$seperator);
						return false;
					}
				// --------------------------------------Interval and Time out--------------//
					if(data[0].match(/timeout|interval/)){
						//handle set interval and Timeout
				  		//e.g event="timeout_callback_t_arg2_arg3"//time will be agr1
				  		if(data.length>=3 && isFinite(data[2])){
				  			var callback=null;
				  			if($impleEvent.core.hasOwnProperty(data[1])){
				  				callback=$impleEvent.core[data[1]];
				  			}else if($impleEvent.callbacks.hasOwnProperty(data[1])){
				  				callback=$impleEvent.callbacks[data[1]];

				  			}else{
				  				console.error("Can't Found Method:"+data[1]+" ,Please Register event handler using '$impleEvent.add()' method?");
								return false;
				  			}

				  			if(data[0]=="interval"){
				  				var interval=setInterval(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(2);
									args.unshift(interval);
									 //caputure any return from callback to feed return feeder
										var $return=callback.apply(el,args);//give callback this scope of addEventListener i.e target element
											if($return){
												 
												 // --------------------data-filter-------------------
													if(el.hasAttribute('data-filter')){
													var filter=el.getAttribute('data-filter');

													if($impleEvent.core.hasOwnProperty(filter)){
														$return=$impleEvent.core[filter].call(el,$return);

													}else if($impleEvent.callbacks.hasOwnProperty(filter)){
														$return=$impleEvent.callbacks[filter].call(el,$return);
													}else{
														console.error("Unable to apply filter" +filter +": Missing filter method");
													}

													if(!$return){
														console.error("Error in data-filter:Must return value with valid data type; check return from '"+filter+ "' method");
														return false;
													}					
												}//ENDIfDATAFILTER
											//--------------------------------------------------
												
											
											//hand over deployment task to return handler
											$impleEvent.manageReturns(el,$return);

											//if(el.hasAttribute("data-after-return"))
											//after return is handled
												}

											if(el.hasAttribute('data-set')){
												var arry=$impleEvent.getData(el,true);
												if(Array.isArray(arry)){
													Array.prototype.forEach.call(document.querySelectorAll(el.getAttribute("data-set")),function(e){
														e.setAttribute('data-get', arry[0]);
														e.setAttribute('value', arry[1]);
													});
												}
											}
												

										}, data[2]);


				  					

				  			}else {//timeout
				  				var timeout=setTimeout(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(2);
									args.unshift(timeout);
									 //caputure any return from callback to feed return feeder
										var $return=callback.apply(el,args);//give callback this scope of addEventListener i.e target element
											if($return){
												 // --------------------data-filter-------------------
													if(el.hasAttribute('data-filter')){
													var filter=el.getAttribute('data-filter');

													if($impleEvent.core.hasOwnProperty(filter)){
														$return=$impleEvent.core[filter].call(el,$return);

													}else if($impleEvent.callbacks.hasOwnProperty(filter)){
														$return=$impleEvent.callbacks[filter].call(el,$return);
													}else{
														console.error("Unable to apply filter" +filter +": Missing filter method");
													}

													if(!$return){
														console.error("Error in data-filter:Must return value with valid data type; check return from '"+filter+ "' method");
														return false;
													}					
												}//ENDIfDATAFILTER
											//--------------------------------------------------
												
											
											//hand over deployment task to return handler
											$impleEvent.manageReturns(el,$return);

											//if(el.hasAttribute("data-after-return"))
											//after return is handled
												}//end if return



										if(el.hasAttribute('data-set')){
												var arry=$impleEvent.getData(el,true);
												if(Array.isArray(arry)){
													Array.prototype.forEach.call(document.querySelectorAll(el.getAttribute("data-set")),function(e){
														e.setAttribute('data-get', arry[0]);
														e.setAttribute('value', arry[1]);
													});
												}
											}
												

										}, data[2]);
				  			}


				  		}else{
				  			console.error("please Provide Time in ms; for interval/timeout event");
							return false;
				  		}
					// ---------end of timout/interval



					//-----------procced to normal events
					}else{

						var callback=null;
				  			if($impleEvent.core.hasOwnProperty(data[1])){
				  				callback=$impleEvent.core[data[1]];
				  			}else if($impleEvent.callbacks.hasOwnProperty(data[1])){
				  				callback=$impleEvent.callbacks[data[1]];

				  			}else{
				  				console.error("Can't Found Method:"+ data[1] +" ,Please Register event handler using '$impleEvent.add()' method?");
								return false;
				  			}

				  			// Attach Event Listener 
				  			el.addEventListener(data[0],function f(e){
				  				//store callback reference so that we can detach listener
					  				e.removeEventListener=function(){
					  					el.removeEventListener(this.type, f);
					  				};

				  				//check and handle for dynamic arguments e.g event="click_callback_$name"
				  				// it will always update its value with data-get function
					  				var mapArgs=data.map(function(arg){
					  						//check for "$" variable identifier
											if(arg.match(/^\$[a-zA-Z0-9]+/)){
												//check if element has data-get attribute and has arv viable
												if(el.getAttribute($impleEvent.init.$dataGet)===arg.replace(/^\$/,"")){
														return el.value?el.value:el.getAttribute("value");
												}else if(el.getAttribute("name")===arg.replace(/^\$/,"")){
													return el.value?el.value:el.getAttribute("value");
												}
												return arg;
											}
											//return as it is
												return arg;
										
										});
					  				//-------------EO map arguments---------------//

					  				//adding current event to args so that callback can acess it.
										var args=mapArgs.slice(2);
										//By using $value you always get the value of inputs
										//ony use in input select text area where value can be obtain
										var getIndex=args.indexOf('$value');

										if(getIndex!==-1){
											args[getIndex]=el.value;
										}
										//put e first so that it alwyas remain first argument in our callback
										args.unshift(e);

										//call callback from core or callback library 

										var $return=callback.apply(this, args);

										if($return===false || $return === true){  
											return $return;
										}

										if($return){
											
											// --------------------data-filter-------------------
													if(el.hasAttribute('data-filter')){
													var filter=el.getAttribute('data-filter');

													if($impleEvent.core.hasOwnProperty(filter)){
														$return=$impleEvent.core[filter].call(el,$return);

													}else if($impleEvent.callbacks.hasOwnProperty(filter)){
														$return=$impleEvent.callbacks[filter].call(el,$return);
													}else{
														console.error("Unable to apply filter" +filter +": Missing filter method");
													}

													if(!$return){
														console.error("Error in data-filter:Must return value with valid data type; check return from '"+filter+ "' method");
														return false;
													}					
												}//ENDIfDATAFILTER
											//--------------------------------------------------
												
											
											//hand over deployment task to return handler
											$impleEvent.manageReturns(el,$return);

											//if(el.hasAttribute("data-after-return"))
											//after return is handled
										}//ENDIFRETURN


										if(el.hasAttribute('data-set')){
											var arry=$impleEvent.getData(el,true);
											if(Array.isArray(arry)){
												Array.prototype.forEach.call(document.querySelectorAll(el.getAttribute("data-set")),function(e){
													e.setAttribute('data-get', arry[0]);
													e.setAttribute('value', arry[1]);
												});
											}
										}


				  			},//EndOFAddEventHandler
				  			false);

				  }//eoelse	
		};//eo for loop

}//EOMAIN		
				  			
	