//Handle Call BACKS For EVENT
	export default function callbackHandler(el,callback,args,e){
						//-----------------Check for callback---------------
						// ------------for dot notation----------

							var data=callback.split(/\./);
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

				  			
							
							//----------Invoke callback with arguments and store any return
									
									let $args=makeArguments(el,args);

									$args.unshift(e);
									
									var $return=callback.apply(el,$args);
									
							//-------------------------------------------------
							
							//-------------If it has return----------------------------	
								if($return){
												 
								 // --------------------data-filter-------------------
									if(el.getAttribute($impleEvent.init.$dataFilter)){
										var filter=el.getAttribute($impleEvent.init.$dataFilter);
									if($impleEvent.core.hasOwnProperty(filter)){
										$return=$impleEvent.core[filter].call(el,$return);

									}else if($impleEvent.callbacks.hasOwnProperty(filter)){
										$return=$impleEvent.callbacks[filter].call(el,$return);
									}else{
										console.error("Unable to apply filter" +filter +": Missing filter method");
									}

									if(!$return){
										console.error("Error in "+$impleEvent.init.$dataFilter+" Must return value with valid data type; check return from '"+filter+ "' method");
										return false;
									}					
								}//ENDIfDATAFILTER



							//----------Finally proccess the return to embed in document
										//By defaut , give the scope of parent Node
								$impleEvent.manageReturns(el.parentNode,$return);

							//--------------------------------------------------

						}//ENDIFRETURN


						//------------Set this el( transfer value from to another)data-value to another el/s		
						if(el.hasAttribute($impleEvent.init.$dataSet)){
								var arry=$impleEvent.getData(el,true);
								if(Array.isArray(arry)){
									Array.prototype.forEach.call(document.querySelectorAll(el.getAttribute($impleEvent.init.$dataSet)),function(e){
										e.setAttribute($impleEvent.init.$dataGet, arry[0]);
										e.setAttribute('value', arry[1]);
									});
								}
							}
						


					};


//--------------------------------------------------------------
	//Handle Arguments 
	function makeArguments(el,args){
		//if there is args
				if(args){
						//mapping args 
						args=args.map(function(rawArg){
							let arg=rawArg.trim();
							//console.log(arg)
											//case 1--------------------------- digit and boolean
											//if argument is a digit
					  						//parse number input into number
					  						if(/^[\d]+[\.]?[\d]*$/.test(arg)) return parseFloat(arg);
					  						//if argument is true or false
					  						//parse string true to javascript true
					  						if(/^true$/.test(arg)) return true;
					  						//parse string false to javascript false;
					  						if(/^false$/.test(arg)) return false;
					  						//check for # sign for element if
					  						//if argument is queryselector
					  						//Query selector All <> sign
					  						//case :2----------------query seletor
					  						if(/^<.+>/.test(arg)){
					  							let selector=arg.match(/<(.+)>(\[(\d+)\])?(\..+)?/);
					  							if(selector[1]){
					  								if(isFinite(selector[3])){
					  									if(selector[4]){
					  										let $attr=selector[4].substr(1);
					  										let ele=document.querySelectorAll(selector[1])[parseInt(selector[3])];
					  										if(ele && ele.hasAttribute($attr.replace(".value",""))){

																if(/(\.value)$/.test($attr)) return ele.getAttribute($attr.replace(".value",""));

																let attObj={element:ele};
																attObj.get=function(){ return ele.getAttribute($attr)};
																attObj.set=function(val){
																 ele.setAttribute($attr, val)
																 this.value=val;
																};
																attObj.value=ele.getAttribute($attr);
																return attObj;
															  }else{
															  	console.error("Not Found " + selector[3] + " child Node or  attribute "+$attr);
															  }
															  	return null;

					  									}
					  									return document.querySelectorAll(selector[1])[parseInt(selector[3])];
					  								}
					  								return document.querySelectorAll(selector[1]);
					  							
					  							} 
					  						}
					  						//if it has id selector
					  						//if(/^#[a-zA-Z0-9-]+/.test(arg)) return document.getElementById(arg.replace("#",""));
					  						if(arg.match(/^#[a-zA-Z0-9-]+/)){
					  							//removing # tag
					  							let $arg=arg.replace(/^#/,"");
					  							//search for "."
					  							if($arg.search(/\./)!=-1){
					  								//split . notation into array
													let split=$arg.split(/\./);
													let $attr=split[1];
													// define element
													let ele=document.getElementById(split[0]);

													if(ele.hasAttribute($attr)){

														if(split.length===3 && split[2]=="value") return ele.getAttribute($attr);

														let attObj={element:ele};
														attObj.get=function(){ return ele.getAttribute($attr)};
														attObj.set=function(val){
														 ele.setAttribute($attr, val)
														 this.value=val;
														};
														attObj.value=ele.getAttribute($attr);
														return attObj;
													}

					  							}else{
					  								return document.getElementById($arg);
					  							}
					  						}
					  						//case:3------------------self, parent and grand parent
					  						//Check for $ sign variable identifier
											if(arg.match(/^\$+[a-zA-Z0-9-]+/)){
												//strip $ identifier
												let $arg=arg.replace(/^\$+/,"");
												//case one: scopify from the parent 
												if(arg.match(/^\$+/)[0].length==2){
													if($arg)
													el=el.parentNode;
												}else if(arg.match(/^\$+/)[0].length==3){
													el=el.parentNode.parentNode;

												}
												//check if element has data-get attribute and has a variable
												
												if($arg.search(/\./)!=-1){
													let split=$arg.split(/\./);
													if(el.getAttribute(split[0])){
														if(split[1]=="value") return el.getAttribute(split[0]);
													}

												}else if(el.hasAttribute($arg)){
													var attObj={};
													attObj.get=function(){ return el.getAttribute($arg)};
													attObj.set=function(val){
													 el.setAttribute($arg, val)
													 this.value=val;
													};
													attObj.value=el.getAttribute($arg);
													return attObj;

												}else if(el.getAttribute($impleEvent.init.$dataGet)===$arg){
														return el.value?el.value:el.getAttribute("value");
												}else if(el.getAttribute("name")===$arg){
													return el.value?el.value:el.getAttribute("value");
												}else if($arg==="value"){
													return el.value;
												}
												
											}
											//return as it is
												return arg.replace(/(^["'])|['"]$/g,"");
										
										});
					}//ENDIFARGS
					
					return args;
				}				