//if return is array
export function component(el,data){
	if(el.hasAttribute('data-filter')){
		var result=$impleEvent.callbacks[el.getAttribute]();
		if(Object.prototype.toString.call(result) === '[object Array]'){
			data=result;

		}else{
			console.log("data-filter must return array: got" +result+ "check callback");
			return false;
		}
	}
	if(el.hasAttribute('data-component')){
			if(el.getAttribute('data-component')){
			var component=document.querySelector(el.getAttribute('data-component'));
			if(component.nodeName){
				//foreach item in data
				for(var i=0; i<data.length;i++){
					var cloneComponent=$impleEvent.render.cloneElement(component);
					$impleEvent.dispatchReturns(cloneComponent,data[i]);
					el.appendChild(cloneComponent);
				}
				// var obj={};
				// obj.tagName=component.nodeName.toLowerCase();
				// obj.attributes={};
				// 	for(var j=0;j<component.attributes.length;j++){component.attributes.length
				// 		//console.log(j);
				// 		obj.attributes[component.attributes[j].name]=component.attributes[j].value;
				// 	}
					
				// 	$impleEvent.render.to(el,component,$return,obj);
				// }
			}
		}
		$impleEvent.update(el);
	}
}

	/*
	first check for data-component,
	for each data in array wrape create new clone
	 and return the data , filter it and append 
	 to target element and update evnet



	*/