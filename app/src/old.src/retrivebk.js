//retrive data from Dom, validate data.

//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
export default function getData(el,bool){
		//Container for Key value pair
			var result={};

			var key=el.hasAttribute("name")?el.getAttribute('name'):el.getAttribute($impleEvent.init.$dataGet);
			
			if(key){
				let value=null;
				if(el.value || el.value===""){
					value=el.value;
				}else if(el.hasAttribute('value')){
					value=el.getAttribute('value');

				}
				//var value=el.hasAttribute('value')?el.getAttribute('value'):el.value;
				if(value==="" || value){
				// -------------------$impleEvent.init.$dataFilter------------------
							if(el.hasAttribute($impleEvent.init.$dataFilter)){
							var filter=el.getAttribute($impleEvent.init.$dataFilter);

								if($impleEvent.core.hasOwnProperty(filter)){
									value=$impleEvent.core[filter].call(el,value);

								}else if($impleEvent.callbacks.hasOwnProperty(filter)){
									value=$impleEvent.callbacks[filter].call(el,value);
								}else{
									console.error("Unable to apply filter" +filter +": Missing filter method");
								}

								if(!value){
								console.error("Error in "+$impleEvent.init.$dataFilter+": Must return value with valid data type; check return from '"+filter+ "' method");
									return false;
								}				
							}//ENDIfDATAFILTER
								
				}//ENDIFVALUE

				//If Single data is asked a current element
				if(bool==true) return [key, value];

				if(el.getAttribute($impleEvent.init.$dataValidate)){
					var validate=el.getAttribute($impleEvent.init.$dataValidate);
					if($impleEvent.callbacks.hasOwnProperty(validate)){
						if(!$impleEvent.callbacks[validate].call(el,key,value)){
							result.hasError=true;
						}

					}else{
						console.log("Error in " + $impleEvent.init.$dataValidate + " unable to find callback :"+validate);
					}
				}

				result[key]=value;

			}//END OF IF KEY
				

			// }//end of check for self data-get
			//--------------------------------------------------------------
			//Retrive data from child elements is has any
			if(el.childElementCount){
				Array.prototype.forEach.call(el.querySelectorAll('['+$impleEvent.init.$dataGet+'], [name]'),function(e){
					
					var key=e.hasAttribute("name")?e.getAttribute('name'):e.getAttribute($impleEvent.init.$dataGet);
				
				if(key){
					let value=null;
					if(e.value || e.value===""){
						value=e.value;
					}else if(e.hasAttribute('value')){
						value=e.getAttribute('value');

					}
						//var value=e.hasAttribute('value')?e.getAttribute('value'):e.value;
					if(value==="" || value){
					// -------------------$impleEvent.init.$dataFilter------------------
								if(e.hasAttribute($impleEvent.init.$dataFilter)){
								var filter=e.getAttribute($impleEvent.init.$dataFilter);

									if($impleEvent.core.hasOwnProperty(filter)){
										value=$impleEvent.core[filter].call(e,value);

									}else if($impleEvent.callbacks.hasOwnProperty(filter)){
										value=$impleEvent.callbacks[filter].call(e,value);
									}else{
										console.error("Unable to apply filter" +filter +": Missing filter method");
									}

									if(!value){
									console.error("Error in "+ $impleEvent.init.$dataFilter+" : Must return value with valid data type; check return from '"+filter+ "' method");
										return false;
									}				
								}//ENDIfDATAFILTER
									
					}//ENDIFVALUE
					if(e.getAttribute($impleEvent.init.$dataValidate)){
						var validate=e.getAttribute($impleEvent.init.$dataValidate);
						if($impleEvent.callbacks.hasOwnProperty(validate)){
							var isValid=$impleEvent.callbacks[validate].call(e,key,value);
							if(Array.isArray(isValid)){
									result.validate=[];
							}
							if(isValid===false){
								result.hasError=true;
							}

						}else{
							console.error("Error in " +$impleEvent.init.$dataValidate+ " unable to find callback :"+validate);
						}
					}

					result[key]=value;
				}//END OF IF KEY

				
			});
	}//ENDIFCHILDCOUNT
		return result;

	};//end of getData();		

