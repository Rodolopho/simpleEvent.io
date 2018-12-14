export default function dispatchObject(el,$return){
	//case1. global
	if($return.hasOwnProperty('global') && $return.global){
		$impleEvent.dispatchReturns($impleEvent.init.$global,$return.global);
	} 
	//case2:grand parent
	if($return.hasOwnProperty('grandParent') && $return.grandParent){
		$impleEvent.dispatchReturns(el.parentNode.parentNode,$return.grandParent);
		//delete $return.grandParent;
	}
	//case 3: parent
	if($return.hasOwnProperty('parent') && $return.parent){
		
		$impleEvent.dispatchReturns(el.parentNode,$return.parent);
	}
	//case 4:self
	if($return.hasOwnProperty('self') && $return.self){
		$impleEvent.dispatchReturns(el,$return.self);
		//delete $return.self;
	}

	//case 5: Normal

	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					//console.log($return);
					$impleEvent.dispatcher(e,$return);
		});



	//-----------------this is last because it need ot overwrite any other return
	//case 6:returnTo
	if($return.hasOwnProperty('returnTo') && $return.returnTo){
		if($return.returnTo[$impleEvent.init.$returnTo] &&  $return.returnTo[$impleEvent.init.$returnTo].nodeName){
			$impleEvent.dispatchReturns($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data);
		}else{
			console.error("returnTo, Element not found:Please give returnTo."+$impleEvent.init.$returnTo + " a valid html element");
		}
		
		
	}
};

	