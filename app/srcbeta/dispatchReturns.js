export  function dispatchReturns(el,$return){
	//If return is string/number/html
	if(Object.prototype.toString.call($return) === '[object String]' || Object.prototype.toString.call($return) === '[object Number]'){
		//string or number
			Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
				if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
	 				if(e.hasAttribute($impleEvent.init.$dataAppend)){
						e.appendChild(document.createTextNode($return));
					}else{
						e.innerHTML=$return;
					}
				});//
			return true;
					

	}else if($return.nodeName){
		//this is html element
		Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
				if(e.hasAttribute($impleEvent.init.$dataFeed)){ return false};
	 				if(e.hasAttribute($impleEvent.init.$dataAppend)){
						e.appendChild($return);
					}else{
						e.innerHTML="";
						e.appendChild($return)
					}
				});//
			return true;
	//Incase return is object
	}else if(Object.prototype.toString.call($return) === '[object Object]'){
		//case one Global scope; must have global as a object
		if(Object.prototype.toString.call($return.global) === '[object Object]'){
			Array.prototype.forEach.call($impleEvent.init.$global.querySelectorAll($impleEvent.init.$className),function(e){
				$impleEvent.dispatcher(e,$return.global);


			});

		}

		//case two: grandparent scope
		if(Object.prototype.toString.call($return.grandParent) === '[object Object]'){
			Array.prototype.forEach.call(el.parentNode.parentNode.querySelectorAll($impleEvent.init.$className),function(e){
				if(!e.hasAttribute($impleEvent.init.$dataFeed)){
					$impleEvent.dispatcher(e,$return.grandParent);
				}
			});

		}else if($return.grandParent){
			Array.prototype.forEach.call(el.parentNode.parentNode.querySelectorAll($impleEvent.init.$className),function(e){
				if(!e.hasAttribute($impleEvent.init.$dataFeed)){
					$impleEvent.dispatchSingle(e,$return.grandParent);
				}
			});
		}

		//cae three: parent scope
		if(Object.prototype.toString.call($return.parent) === '[object Object]'){
			Array.prototype.forEach.call(el.parentNode.querySelectorAll($impleEvent.init.$className),function(e){
				$impleEvent.dispatcher(e,$return.parent);
			});

		}else if($return.parent){
			Array.prototype.forEach.call(el.parentNode.querySelectorAll($impleEvent.init.$className),function(e){
				if(!e.hasAttribute($impleEvent.init.$dataFeed)){
					$impleEvent.dispatchSingle(e,$return.parent);
				}
			});
		}

		//case four:self
			Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					$impleEvent.dispatcher(e,$return);
			});

			if($return.self){
				Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					if(!e.hasAttribute($impleEvent.init.$dataFeed)){
						$impleEvent.dispatchSingle(e,$return.self);
					}
					
				});

			}
		//case five:returnTO
		if($return.returnTo && $return.returnTo[$impleEvent.init.$returnTo]){

			//if($return.returnTo[$impleEvent.init.$returnTo].hasAttribute('return')){
				if(Object.prototype.toString.call($return.returnTo.data) === '[object Object]'){
					
						Array.prototype.forEach.call($return.returnTo[$impleEvent.init.$returnTo].querySelectorAll($impleEvent.init.$className),function(e){
							$impleEvent.dispatcher(e,$return.returnTo.data);
						});

					}else if(Object.prototype.toString.call($return.returnTo.data) === '[object Array]'){
							
						this.dispatchReturns($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data);

					}else if($return.returnTo.data){
						
						Array.prototype.forEach.call($return.returnTo[$impleEvent.init.$returnTo].querySelectorAll($impleEvent.init.$className),function(e){
							$impleEvent.dispatchSingle(e,$return.returnTo.data);
						});
					}
		}else{

		}
		
	
	//Incase return is Array	
	}else if(Object.prototype.toString.call($return) === '[object Array]'){
		if(el.hasAttribute('data-component')){
			if(el.getAttribute('data-component')){
			var component=document.querySelector(el.getAttribute('data-component'));
			if(component.nodeName){
				var obj={};
				obj.tagName=component.nodeName.toLowerCase();
				obj.attributes={};
					for(var j=0;j<component.attributes.length;j++){component.attributes.length
						//console.log(j);
						obj.attributes[component.attributes[j].name]=component.attributes[j].value;
					}
					
					$impleEvent.render.to(el,component,$return,obj);
				}
			}
		}

	}else if(Object.prototype.toString.call($return) === '[object Function]'){

	}else{
		console.log($return +" type of cannot be returned");
	}
	


};
export var dispatcher=function(el,$return ){
	//if(el.classList.contains($simpleEvent.init.$className.replace(".",""))){
		//if it has data-geet

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
}
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
export var dispatchArray=function(el,$array){

};
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
