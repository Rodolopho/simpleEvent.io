

export var dispatcher=function(el,$return ){//for key value pair
		if(el.hasAttribute($impleEvent.init.$dataFeed)){
			var key=el.getAttribute($impleEvent.init.$dataFeed).trim();
			if(key){
				var value=$impleEvent.dataFeedValue(key, $return);

				if(value){
					//if value is string or number 
					if(Object.prototype.toString.call(value) === '[object String]' || Object.prototype.toString.call(value) === '[object Number]'){
							if(el.hasAttribute($impleEvent.init.$dataAppend)){
							el.appendChild(document.createTextNode(value));
						}else{
							el.innerHTML=value;
						}
					//if value is html	
					}else if(value.nodeName){
						if(el.hasAttribute($impleEvent.init.$dataAppend)){
							el.appendChild(value);

						}else{
							console.log(value);
							el.innerHTML="";
							el.appendChild(value);
						}
					}else{
						
						console.error("Only String , Number and Html Element  can be embeded; Cannot embed " + $return[key] + "in :"+ el.nodeName.toLowerCase()+ " Html Element");
						console.log(el);

					}

				}
			}else{
				console.warn("Make sure you have :" + $impleEvent.init.$dataFeed + " attribute to handle given return" + $return )
			}

	}
};
export function dispatchReturns(el,$return){
	//if return is number or string
	if(typeof $return === 'string' || typeof $return === 'number' ){
		$return=document.createTextNode($return);
		Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
				if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
	 				if(e.hasAttribute($impleEvent.init.$dataAppend)){
							e.appendChild($return)
						}else{
							e.innerHTML="";
							e.appendChild($return);
						}
				});//
			return true;
	//if return is HTML 		
	}else if($return.nodeName){
		Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
				if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
	 				if(e.hasAttribute($impleEvent.init.$dataAppend)){
							e.appendChild($return)
						}else{
							e.innerHTML="";
							e.appendChild($return);
						}
				});//
		return true;
	//if return is object i.e {}
	}else if(Object.prototype.toString.call($return) === '[object Object]'){
		$impleEvent.dispatchObject(el,$return);

	//if return is array
	}else if(Object.prototype.toString.call($return) === '[object Array]'){
		if(el.hasAttribute('data-component')){
			$impleEvent.component(el,$return);
		}
	//id return is function
	}else if(Object.prototype.toString.call($return) === '[object Function]'){	

	//if return is any other type then above
	}else{
		console.log($return +" type of cannot be returned into HTML PAGE");
	}
	
};
//for handling date-feed="data.name.firstname" i.e nested value
export var dataFeedValue=function(key,$return){
	//check for default value;
	var feed=key.split('.');
	
		if(feed.length){
			if(feed.length==1){
				return $return[key];
			}else if(feed.length>1){
				var result=$return;
				for(var j=0; j<feed.length; j++){
					if(result[feed[j]]){
						result=result[feed[j]];
					}else{
						
						console.log("Cannot find:" + key + "in" +$return);
						break;
					}
					
					//console.log(result);
				}
				
				return result;

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
	