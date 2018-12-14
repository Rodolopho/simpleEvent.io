
//-------------------------------------------------------------------------------------
export function dispatchReturns(el, $return){
	//for String/number/Html
	if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
			Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
						
						if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
								if(!$return.nodeName){
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
												e.appendChild(document.createTextNode($return))
											}else{
												e.innerHTML="";
												e.appendChild(document.createTextNode($return));
											}
								}else{
									//console.log($return);
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
												e.appendChild($impleEvent.render.cloneElement($return));
											}else{
												e.innerHTML="";
												e.appendChild($impleEvent.render.cloneElement($return));
											}
								}
							
						 				
						});//
	
				return true;
	//For Object i.e {}			
	}else if(Object.prototype.toString.call($return) === '[object Object]'){
		$impleEvent.dispatchObject(el,$return);

	//For Array	
	}else if(Object.prototype.toString.call($return) === '[object Array]'){
		if(el.hasAttribute('data-component')){
			if(el.getAttribute('data-component')){
			var component=document.querySelector(el.getAttribute('data-component'));
			if(component.nodeName){
				if(!el.hasAttribute($impleEvent.init.$dataAppend)){
					el.innerHTML="";
				}
				//foreach item in data
				for(var i=0; i<$return.length;i++){
					var cloneComponent=$impleEvent.render.cloneElement(component);
					el.appendChild(cloneComponent);
					if(!cloneComponent.childElementCount){
						$impleEvent.dispatchSelf(cloneComponent,$return[i]);
					}else{
						$impleEvent.dispatchReturns(cloneComponent,$return[i]);
					}
					
				}
				$impleEvent.update(el);
			}
		}
		
	}

	}


}
//-------------------------------------------------------------------------------------
export var dispatcher=function(el,$return ){//for key value pair
		if(el.hasAttribute($impleEvent.init.$dataFeed)){
			var key=el.getAttribute($impleEvent.init.$dataFeed).trim();
			if(key){
				var value=$impleEvent.dataFeedValue(key, $return);

				if(value){
					if(typeof value === 'string' || typeof value === 'number' || value.nodeName ){
						
								if(!value.nodeName){
									if(el.hasAttribute($impleEvent.init.$dataAppend)){
												el.appendChild(document.createTextNode(value))
											}else{
												el.innerHTML="";
												el.appendChild(document.createTextNode(value));
											}
								}else{
									//console.log(value);
									if(el.hasAttribute($impleEvent.init.$dataAppend)){
												el.appendChild($impleEvent.render.cloneElement(value));
											}else{
												el.innerHTML="";
												el.appendChild($impleEvent.render.cloneElement(value));
											}
								}
							
						}else{
							console.error("Only String , Number and Html Element  can be embeded; Cannot embed "+value + "for "+key + "in : "+ el.nodeName.toLowerCase()+ " Html Element");
							console.log(el);
						}
				
				 }
			}else{
				console.warn("Make sure you have :" + $impleEvent.init.$dataFeed + " attribute to handle given return" + $return )
			}

	}
};
//-------------------------------------------------------------------------------------
//for handling date-feed="data.name.firstname" i.e nested value
export var dataFeedValue=function(key,$return){
	//check for default value;
	var feed=key.split('.');
	if(! $return.hasOwnProperty(feed[0])) return false;
		if(feed.length){
			if(feed.length==1){
				return $return[key];
			}else if(feed.length>1){
				var result=$return;
				for(var j=0; j<feed.length; j++){
					if(result[feed[j]]){
						result=result[feed[j]];
					}else{
						console.log($return);
						console.log("Cannot find:" + key + " in " +$return);
						break;
					}
					
					//console.log(result);
				}
				
				return result;

			}
		}
};
//-------------------------------------------------------------------------------------
export var dispatchSelf=function(e,$return){
	if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
						if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
								if(!$return.nodeName){
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
												e.appendChild(document.createTextNode($return))
											}else{
												e.innerHTML="";
												e.appendChild(document.createTextNode($return));
											}
								}else{
									//console.log($return);
									if(e.hasAttribute($impleEvent.init.$dataAppend)){
												e.appendChild($impleEvent.render.cloneElement($return));
											}else{
												e.innerHTML="";
												e.appendChild($impleEvent.render.cloneElement($return));
											}
								}	
	}
};
export var dispatchSingle=function(el, $return){

	if(Object.prototype.toString.call($return) === '[object String]' || Object.prototype.toString.call($return) === '[object Number]'){

			if(el.hasAttribute($impleEvent.init.$dataAppend)){
			el.appendChild(document.createTextNode($return));
		}else{
			el.innerHTML=$return;
		}
						
											
	}else if($return.nodeName){
			if(el.hasAttribute($impleEvent.init.$dataAppend)){
			el.appendChild($return);
		}else{
			el.innerHTML="";
			el.appendChild($return);
			$impleEvent.update(el);
		}
	}else{
		console.log('Unabel to handle this type of Data:'+ $return);
	}
};
	