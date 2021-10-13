
//--------------------------------------------------------------
	//Handle Arguments 
	export default function argumentsHandler(el,args){
		//if there is args
				if(args){
						//mapping args 
						args=args.map(function(rawArg){
							let arg=rawArg.trim();
											//case 1--------------------------- digit and boolean
										//if argument is a digit
					  						//parse number input into number
					  						if(/^[\d]+[\.]?[\d]*$/.test(arg)) return parseFloat(arg);
					  						
					  						//if argument is true or false
					  						//parse string true to javascript true
					  						if(/^true$/.test(arg)) return true;
					  						//parse string false to javascript false;
					  						if(/^false$/.test(arg)) return false;
					  						

					  						//if argument is queryselector
					  						//Query selector All <> sign
					  						//case :2----------------query seletor
					  						if(/^<.+>/.test(arg)){
					  							console.log(arg);
					  							let selector=arg.match(/<(.+)>(\[(\d+)\])?(\..+)?/);
					  							if(selector[1]){
					  								//CHECK IF IT IS parent , next, prevous, first ,last, 
					  								if(selector[1]==='parent'){
					  									return el.parentNode;

					  								}else if(selector[1]==='next'){
					  									return el.nextElementSibling

					  								}else if(selector[1]==='previous'){
					  									return el.previousElementSibling
					  								}else if(selector[1]==='first'){
					  									return el.parentElement.firstElementChild;
					  								}else if(selector[1]==='last'){
					  									return el.parentElement.lastElementChild;
					  								}else if(isFinite(selector[3])){
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
															//we can check for invalid value
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
					  						// data-var replace(/^[a-z0-9-_]+([A-Z])[a-z0-9-_]+$/,function(e,a){ return e.replace(a,'_'+a.toLowerCase())});
											if(arg.match(/^\$*[a-zA-Z0-9-]+/)){
												//strip $ identifier
												let $arg=arg.replace(/^\$+/,"");
												let $arg$length=arg.match(/^\$+/)[0].length-1;

												///-----------new $$$$-------------

												if($arg$length){
													for (var i =1 ; i <=$arg$length ; i++) {
														if(!el["parentNode"] || el.tagName==='HTML'){
															break;
														}
												   			el=el['parentNode'];
													}
												}

												//------------endofnew$$$----------
												//case one: scopify from the parent 
												// if(arg.match(/^\$+/)[0].length==2){
												// 	if($arg)
												// 	el=el.parentNode;
												// }else if(arg.match(/^\$+/)[0].length==3){
												// 	el=el.parentNode.parentNode;

												// }
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
														//we can check for invalid value..
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