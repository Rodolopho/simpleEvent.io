//retrive data from Dom, validate data.

//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
export default function setData(el,obj){
		//Container for Key value pair


			let key=el.hasAttribute("name")?el.getAttribute('name'):el.getAttribute($impleEvent.init.$dataGet);
			
			if(obj.hasOwnProperty(key)){
				if(el.hasAttribute('value')){
					el.setAttribute('value', obj[key]);
				}else{
					el.value=obj[key];
				}
			}


			// }//end of check for self setData
			//--------------------------------------------------------------
			//Retrive data from child elements is has any
			if(el.childElementCount){
				Array.prototype.forEach.call(el.querySelectorAll('['+$impleEvent.init.$dataGet+'], [name]'),function(e){
					
					let key=e.hasAttribute("name")?e.getAttribute('name'):e.getAttribute($impleEvent.init.$dataGet);
					if(obj.hasOwnProperty(key)){
						if(e.value || e.value===""){
							e.value=obj[key];
						}else if(e.hasAttribute('value')){
							e.setAttribute('value',obj[key]);
						}
						}
			});
	}//ENDIFCHILDCOUNT
		
	};//end of getData();		

