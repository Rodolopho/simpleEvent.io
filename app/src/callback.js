//Handle Call BACKS For EVENT
	export default function callbackHandler(el,callback,args,e){
						//-----------------Check for callback---------------
						// ------------for dot notation----------

							let data=callback.split(/\./);
							if(data.length===2){
								if($impleEvent.inCallbacks.hasOwnProperty(data[0])){
									if($impleEvent.inCallbacks[data[0]].hasOwnProperty(data[1])){
										callback= $impleEvent.inCallbacks[data[0]][data[1]];
									}else{
										console.error("Can't Found Method:"+data[1]+"in "+ data[0]+"Object : ref->"+callback+" ,Please Register event handler using '$impleEvent.addIn("+data[0]+", ....)' method?");
											return false;
									}

								}else{
									console.error("Can't Found Object:'" +data[0]+ "' in '"+ callback+"' ,For '.' notation, use  '$impleEvent.addIn()' method?");
									return false;
									}
								

						// ------------------End for dot notaion
							} else if($impleEvent.core.hasOwnProperty(callback)){
								 callback=$impleEvent.core[callback];
				  			}else if($impleEvent.callbacks.hasOwnProperty(callback)){
				  				callback=$impleEvent.callbacks[callback];
				  			}else{
				  				console.error("Can't Found Method:"+callback+" ,Please Register event handler using '$impleEvent.add()' method?");
								return false;
				  			}
				  	//------------callback end
				  			
							
							//----------Arguments----------------------------------------
									
									//  let $args=args.length?$impleEvent.argumentsHandler(el,args):args;
									// let $args=args;
									
									let $args=$impleEvent.argumentsHandler(el,args);
									//adds event as first arguments in argument array
									//$args.unshift(e);
									$args.push(e);
									// invoke callback with given arguments and assign this to current elemnt
									let $return=callback.apply(el,$args);
									
						//------------------End of Arguments-------------------------------

							
				//------------------RETURN :-If it has return the handle return----------------------------	
							 if($return || typeof $return === "string" ||typeof $return === "number"){//for "" "   "
								// if($return ){//for "" "   "
											 
								 // --------------------data-filter-------------------
									if(el.getAttribute($impleEvent.init.$dataFilter)){
										let filter=el.getAttribute($impleEvent.init.$dataFilter);

										if($impleEvent.core.hasOwnProperty(filter)){
											
											$return=$impleEvent.core[filter].call(el,$return);

										}else if($impleEvent.callbacks.hasOwnProperty(filter)){
											
											$return=$impleEvent.callbacks[filter].call(el,$return);
										}else{
											console.error("Unable to apply filter " +filter +": Missing filter method");
										}

										// if(!$return && typeof $return !== "string"){
										// 	console.error("Error in "+$impleEvent.init.$dataFilter+" Must return value with valid data type; check return from '"+filter+ "' method");
										// 	return false;
										// }					
								}//ENDIfDATAFILTER



							//----------Finally proccess the return to embed in document
										//By defaut , give the scope of parent Node
								$impleEvent.manageReturns(el.parentNode,$return);

							//--------------------------------------------------

						}//ENDIFRETURN


						//------------Set this el( transfer value from to another)data-value to another el/s		
						if(el.hasAttribute($impleEvent.init.$dataSet)){
								var arry=$impleEvent.getData(el,true);// true returns [key, value]
								if(Array.isArray(arry)){
									Array.prototype.forEach.call(
										document.querySelectorAll(el.getAttribute($impleEvent.init.$dataSet)),function(e){
										e.setAttribute($impleEvent.init.$dataGet, arry[0]);
										e.setAttribute('value', arry[1]);
									});
								}
							}
						


					};


//--------------------------------------------------------------
