export default function dispatchObject(el,$return){
	//case one Global scope; must have global as a object, if you want to return single value to 
	//global scope use returnto element to document
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
							$impleEvent.dispatchReturns(e,$return.returnTo.data);
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
		
}