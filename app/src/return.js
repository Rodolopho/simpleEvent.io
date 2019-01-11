//Handle returns from callback and deploy the data
//----scope---global, parent-grandparent-self
//------datatype-------
export default function manageReturns(el,$return){
//-------------------------------------------------------------------------------------	
//case-1: Handle String/number/htmlelement
if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					//has [data-feed], its there for other purpose, exit
					if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
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
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
										//append
											//clone element otherwise cant apped to muliple places
												e.appendChild($impleEvent.render.cloneElement($return));
										}else{
											//replace the container with new content
											e.innerHTML="";
											e.appendChild($impleEvent.render.cloneElement($return));
										}
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
														console.info("Cannot find:" + key + " in  the return " +JSON.stringify($return));
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
													if(e.hasAttribute($impleEvent.init.$dataAppend)){
																e.appendChild($impleEvent.render.cloneElement(value));
															}else{
																e.innerHTML="";
																e.appendChild($impleEvent.render.cloneElement(value));
															}
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
		//returnTo bydefault "el" key is used to find element, but you can change by $impleEvent.config("$returnTo","element");
		if($return.returnTo[$impleEvent.init.$returnTo] &&  $return.returnTo[$impleEvent.init.$returnTo].nodeName){
			$impleEvent.manageReturns($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data);
		}else{
			console.error("returnTo, Element not found:Please give returnTo."+$impleEvent.init.$returnTo + " a valid html element");
		}
		
		
	}

}//EOOBJECTCASE2
//-------------------------------------------------------------------------------------	
//case -3: Array//data-component holds query selector e.g #li 
if(Object.prototype.toString.call($return) === '[object Array]'){
	//if element has component as temlate
		if(el.hasAttribute('data-component')){
			if(el.getAttribute('data-component')){
			var component=document.querySelector(el.getAttribute('data-component'));
			if(component.nodeName){
				if(!el.hasAttribute($impleEvent.init.$dataAppend)){
					el.innerHTML="";
				}
				
				//foreach item in data
				//---------------------------------------------------------------
				for(var i=0; i<$return.length;i++){
					var cloneComponent=$impleEvent.render.cloneElement(component);
					el.appendChild(cloneComponent);
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
					
				}
				//------------------------------------------------------------

				//Finally update for any event attached to newlly updated DOM
				$impleEvent.update(el);

			}else{
				console.log("Couldn't find element with querySelector :"+el.getAttribute('data-component'));

			}
		}//EOGETCOMPONENT
		
	}else{//EOHASCOmPOMENT
		console.error("Couldn't able to hancle Array, with out component");
	}

	}//ENDIFArray


}//EOmanageRETURNS




















