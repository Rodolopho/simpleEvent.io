//Handle returns from callback and deploy the data
//----scope---global, parent-grandparent-self
//------datatype-------


export default function manageReturns(el,$return,bool){

//if bool===true just sent return to self
//self can embed either string, number, html or array
 if(bool===true && el.classList.contains($impleEvent.init.$className.replace('.',""))){
 	console.log(bool);
 	if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
 		//has [data-feed], its there for other purpose, exit

					if(el.hasAttribute($impleEvent.init.$dataFeed)){ return false};
								//Not Html then its string or number
								if(!$return.nodeName){
									//doest string or number need to append or repalce 
									if(el.hasAttribute($impleEvent.init.$dataAppend)){
										//need to be append
												el.appendChild(document.createTextNode($return))

												
										}else{
											//clear contaner and put string/number
											el.innerHTML="";
											el.appendChild(document.createTextNode($return));
										}
								}else{
									//ITs HTML ELement
									//every time return new element after cloning
									let html=$impleEvent.render.cloneElement($return);
									if(el.hasAttribute($impleEvent.init.$dataAppend)){
										//append
											//clone element otherwise cant apped to muliple places
												el.appendChild(html);
										}else{
											//replace the container with new content
											el.innerHTML="";
											el.appendChild(html);

										}
										$impleEvent.update(html);
								}
 	}

 	return ;

 }
//-------------------------------------------------------------------------------------	
//case-1: Handle String/number/htmlelement
if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					//has [data-feed], its there for other purpose, exit
					if(e.hasAttribute($impleEvent.init.$dataFeed) || e.hasAttribute($impleEvent.init.$dataComponent)){ return false};
								//Not Html then its string or number
								if(!$return.nodeName){
									//doest string or number need to append or repalce 
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
										//need to be append
												e.appendChild(document.createTextNode($return))

												
										}else{
											//clear contaner and put string/number
											e.innerHTML="";
											e.appendChild(document.createTextNode($return));
										}
								}else{
									//ITs HTML ELement
									//every time return new element after cloning
									let html=$impleEvent.render.cloneElement($return);
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
										//append
											//clone element otherwise cant apped to muliple places
												e.appendChild(html);
										}else{
											//replace the container with new content
											e.innerHTML="";
											e.appendChild(html);

										}
										$impleEvent.update(html);
								}
							
						 				
					});//EOFOR
	return true;

}
//-------------------------------------------------------------------------------------	
//case -2: Object {}
if(Object.prototype.toString.call($return) === '[object Object]'){
	//Scope1. global
	if($return.hasOwnProperty('global') && $return.global){
		//you can set the global scope by using $impleevent.config($global,document.body)
		$impleEvent.manageReturns($impleEvent.init.$global,$return.global);
	} 
	//Scope2:grand parent
	if($return.hasOwnProperty('grandParent') && $return.grandParent){
		$impleEvent.manageReturns(el.parentNode.parentNode,$return.grandParent);
		//delete $return.grandParent;
	}
	//Scope 3: parent
	if($return.hasOwnProperty('parent') && $return.parent){
		
		$impleEvent.manageReturns(el.parentNode,$return.parent);
	}
	//Scope 4:self
	if($return.hasOwnProperty('self') && $return.self){
		$impleEvent.manageReturns(el,$return.self);
		//delete $return.self;
	}

	//case 5: Normal

	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					//console.log($return);
					//-------------------------------------------------------------------------------------	
						//Check it rightfull container for object returns
						if(e.hasAttribute($impleEvent.init.$dataFeed)){
							//Get the key from [data-feed] to retrive value from key-value pair
							var key=e.getAttribute($impleEvent.init.$dataFeed).trim();
							//if has value procced
							if(key){
								//handle nested keys i.e data.person.name.firstname
								//------------------------------------------------------------------
									var value=null;
									var feed=key.split('.');
									if(! $return.hasOwnProperty(feed[0])) return false;
										if(feed.length){
											if(feed.length==1){
												value= $return[key];
											}else if(feed.length>1){
												var result=$return;
												for(var j=0; j<feed.length; j++){
													if(result[feed[j]]){
														result=result[feed[j]];
													}else{
														console.error("Cannot find:" + key + " in  the return " +JSON.stringify($return));
														break;
													}
													
													//
												}
												
												value=result;

											}
										}
								

								//-------------------------------------------------------------------
								

								if(value){
									if(typeof value === 'string' || typeof value === 'number' || value.nodeName ){
										
												if(!value.nodeName){
													if(e.hasAttribute($impleEvent.init.$dataAppend)){
																e.appendChild(document.createTextNode(value))
															}else{
																e.innerHTML="";
																e.appendChild(document.createTextNode(value));
															}
												}else{
													//console.log(value);
													//
													let html=$impleEvent.render.cloneElement(value);
													if(e.hasAttribute($impleEvent.init.$dataAppend)){
																e.appendChild(html);
															}else{
																e.innerHTML="";
																e.appendChild(html);
															}

															$impleEvent.update(html);
												}
											
										}else{
											console.error("Only String , Number and Html Element  can be embeded; Cannot embed "+value + "for "+key + "in : "+ e.nodeName.toLowerCase()+ " Html Element");
											console.log(e);
										}
								
								 }//End of Value
							}else{
								console.warn("Make sure you have :" + $impleEvent.init.$dataFeed + " attribute to handle given return" + $return )
							}//end of key

					//}
				};//ENDOFDatafeedcheck
					//-------------------------------------------------------------------------------------	
		});//ENDOFFOREACHLOOp



	//-----------------this is last because it need ot overwrite any other return
	//Scope 6:returnTo spedific element 
	// return to element spefied in returnTo key
	if($return.hasOwnProperty('returnTo') && $return.returnTo){
		console.log(1);
		//returnTo bydefault "el" key is used to find element, but you can change by $impleEvent.config("$returnTo","element");
		if($return.returnTo[$impleEvent.init.$returnTo] &&  $return.returnTo[$impleEvent.init.$returnTo].nodeName){
			console.log($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data, true);
			$impleEvent.manageReturns($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data, true);
		}else{
			console.error("returnTo, Element not found:Please give returnTo."+$impleEvent.init.$returnTo + " a valid html element");
		}
		
		
	}
	//returnToMany 
	if($return.hasOwnProperty('returnToMany') && Object.prototype.toString.call($return.returnToMany) === '[object Array]'){

		$return.returnToMany.forEach((e)=>{ $impleEvent.manageReturns(e[$impleEvent.init.$returnTo],e.data,true);})
	}

}//EOOBJECTCASE2
//-------------------------------------------------------------------------------------	
//case -3: Array//$impleEvent.init.$dataComponent holds query selector e.g #li 
if(Object.prototype.toString.call($return) === '[object Array]'){
	//if element has component as temlate
	//case if elemt have data-template
	let templateElement=null;
	let e=null;
	if(el.querySelector('['+$impleEvent.init.$dataTemplate+']')){
		let htmlTemplate=el.querySelector('['+$impleEvent.init.$dataTemplate+']').getAttribute($impleEvent.init.$dataTemplate);
		templateElement=$impleEvent.html(htmlTemplate);
		if(!templateElement){
			console.error("Please provide valid html Element e.g <li></li>;  Provided :-" +htmlTemplate );
			return false;
		}
		e=el.querySelector('['+$impleEvent.init.$dataTemplate+']');
	}else if(el.querySelector('['+$impleEvent.init.$dataComponent+']')){
		let templateSource=el.querySelector('['+$impleEvent.init.$dataComponent+']').getAttribute($impleEvent.init.$dataComponent);
		templateElement=document.querySelector(templateSource);
		if(!templateElement){
			console.error("Please provide valid querySelector:  Provided :-" +templateSource );
			return false;
		}

		e=el.querySelector('['+$impleEvent.init.$dataComponent+']');
	}else{
		//Need data-template or data-component
		console.error("Array returns need ["+$impleEvent.init.$dataTemplate+"] or ["+$impleEvent.init.$dataComponent+"] holder: No such holder found ");
		return false;
	}

	
				if(!e.hasAttribute($impleEvent.init.$dataAppend)){
					e.innerHTML="";
				}

				let rawElement=document.createElement("div");
				//Loop for each item in array

				for(var i=0; i<$return.length;i++){
					var cloneComponent=$impleEvent.render.cloneElement(templateElement);
					//giving clone element unique id
					if(cloneComponent.id) cloneComponent.id=cloneComponent.id+"_"+i;
					cloneComponent.setAttribute("index", i);
					e.appendChild(cloneComponent);
					//check if its standlone i.e single element without childs e.g <li id="li" class="return"></li>
					if(!cloneComponent.childElementCount){
						//--------------------------------------------------
						if(typeof $return[i] === 'string' || typeof $return[i] === 'number' || $return[i].nodeName ){
						if(cloneComponent.hasAttribute($impleEvent.init.$dataFeed)){ return false};
								if(!$return[i].nodeName){
									if(cloneComponent.hasAttribute($impleEvent.init.$dataAppend)){
												cloneComponent.appendChild(document.createTextNode($return[i]))
											}else{
												cloneComponent.innerHTML="";
												cloneComponent.appendChild(document.createTextNode($return[i]));
											}
								}else{
									//consolcloneComponent.log($return[i]);
									if(cloneComponent.hasAttribute($impleEvent.init.$dataAppend)){
												cloneComponent.appendChild($impleEvent.render.cloneElement($return[i]));
											}else{
												cloneComponent.innerHTML="";
												cloneComponent.appendChild($impleEvent.render.cloneElement($return[i]));
											}
								}	
							}
						
						//-----------------------------------------------------
					}else{
						$impleEvent.manageReturns(cloneComponent,$return[i]);
					}

					$impleEvent.update(cloneComponent);
				}//END of for loop


		
	}//ENDOF-Object-type-Array

	

}//EOmanageRETURNS




















