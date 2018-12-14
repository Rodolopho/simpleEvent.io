//retrive data from Dom, validate data.

//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
export default function getData(el,bool){
		//Container for Key value pair
			var result={};

			var key=el.hasAttribute("name")?el.getAttribute('name'):el.getAttribute($impleEvent.init.$dataGet);
			
			if(key){
				var value=el.hasAttribute('value')?el.getAttribute('value'):el.value;
				if(value==="" || value){
				// --------------------data-filter-------------------
							if(el.hasAttribute('data-filter')){
							var filter=el.getAttribute('data-filter');

								if($impleEvent.core.hasOwnProperty(filter)){
									value=$impleEvent.core[filter].call(el,value);

								}else if($impleEvent.callbacks.hasOwnProperty(filter)){
									value=$impleEvent.callbacks[filter].call(el,value);
								}else{
									console.error("Unable to apply filter" +filter +": Missing filter method");
								}

								if(!value){
								console.error("Error in data-filter:Must return value with valid data type; check return from '"+filter+ "' method");
									return false;
								}				
							}//ENDIfDATAFILTER
								
				}//ENDIFVALUE

				//If Single data is asked a current element
				if(bool==true) return [key, value];

				if(el.getAttribute('data-validate')){
					var validate=el.getAttribute('data-validate');
					if($impleEvent.callbacks.hasOwnProperty(validate)){
						if(!$impleEvent.callbacks[validate].call(el,key,value)){
							result.hasError=true;
						}

					}else{
						console.log("Error in data-validate; unable to find callback :"+validate);
					}
				}

				result[key]=value;

			}//END OF IF KEY
				

			//Check for Self Data-get
			// if(el.getAttribute("name")){
			// 		if(el.hasAttribute('data-validate')){	
			// 			var validate=$impleEvent.validate(e,e.getAttribute('name'),el.value);
			// 			if(validate===false){
			// 				result.hasError=true;
			// 			}else{
			// 				result[el.getAttribute('name')]=el.value;
			// 			}

			// 		}else{
			// 			result[el.getAttribute('name')]=el.value;
			// 		}

			// }else if(el.getAttribute($impleEvent.init.$dataGet)){
			// 		if(el.value || el.value==""){
			// 			result[el.getAttribute($impleEvent.init.$dataGet)]=el.value;
			// 		}else if(el.hasAttribute("value")){
			// 			result[el.getAttribute($impleEvent.init.$dataGet)]=el.getAttribute('value');
			// 		}
				
			// }//end of check for self data-get
			//--------------------------------------------------------------
			//Retrive data from child elements is has any
			if(el.childElementCount){
				Array.prototype.forEach.call(el.querySelectorAll('['+$impleEvent.init.$dataGet+'], [name]'),function(e){
					
					var key=e.hasAttribute("name")?e.getAttribute('name'):e.getAttribute($impleEvent.init.$dataGet);
				
				if(key){
					var value=e.hasAttribute('value')?e.getAttribute('value'):e.value;
					if(value==="" || value){
					// --------------------data-filter-------------------
								if(e.hasAttribute('data-filter')){
								var filter=e.getAttribute('data-filter');

									if($impleEvent.core.hasOwnProperty(filter)){
										value=$impleEvent.core[filter].call(e,value);

									}else if($impleEvent.callbacks.hasOwnProperty(filter)){
										value=$impleEvent.callbacks[filter].call(e,value);
									}else{
										console.error("Unable to apply filter" +filter +": Missing filter method");
									}

									if(!value){
									console.error("Error in data-filter:Must return value with valid data type; check return from '"+filter+ "' method");
										return false;
									}				
								}//ENDIfDATAFILTER
									
					}//ENDIFVALUE
					if(e.getAttribute('data-validate')){
						var validate=e.getAttribute('data-validate');
						if($impleEvent.callbacks.hasOwnProperty(validate)){
							if(!$impleEvent.callbacks[validate].call(e,key,value)){
								result.hasError=true;
							}

						}else{
							console.error("Error in data-validate; unable to find callback :"+validate);
						}
					}

					result[key]=value;
				}//END OF IF KEY

				
			});
	}//ENDIFCHILDCOUNT
		return result;

	};//end of getData();		

				//------------------------------------------
	// $impleEvent.getData=function(el,bool){
	// 	if(bool===true){
	// 		if(el.hasAttribute('name')){
	// 			//check if name has some value
	// 			if(el.getAttribute('name')){
	// 				if(el.hasAttribute('data-validate')){
						
	// 					var validate=$impleEvent.validate(e,e.getAttribute('name'),el.value);
	// 					if(validate===false){
	// 						result.hasError=true;
	// 					}else{
	// 						result[e.getAttribute('name')]=e.value;
	// 					}

	// 				}else{
	// 					result[e.getAttribute('name')]=e.value;
	// 				}
	// 			}
	// 		}else{//then check for data-get
	// 			if(e.getAttribute($impleEvent.init.$dataGet)){
	// 				if(e.value || e.value==""){
	// 					result[e.getAttribute($impleEvent.init.$dataGet)]=e.value;
	// 				}else if(e.hasAttribute("value")){
	// 					result[e.getAttribute($impleEvent.init.$dataGet)]=e.getAttribute('value');
	// 				}
				
	// 			}
	// 		}
	// 	}
	// 	//initilaize key:pair container object
	// 	var result={};
	// 	Array.prototype.forEach.call(el.querySelectorAll('['+$impleEvent.init.$dataGet+'], [name]'),function(e){
		
	// 		//first check for name
	// 		if(e.hasAttribute('name')){
	// 			//check if name has some value
	// 			if(e.getAttribute('name')){
	// 				if(e.hasAttribute('data-validate')){
						
	// 					var validate=$impleEvent.validate(e,e.getAttribute('name'),e.value);
	// 					if(validate===false){
	// 						result.hasError=true;
	// 					}else{
	// 						result[e.getAttribute('name')]=e.value;
	// 					}

	// 				}else{
	// 					result[e.getAttribute('name')]=e.value;
	// 				}
	// 			}
	// 		}else{//then check for data-get
	// 			if(e.getAttribute($impleEvent.init.$dataGet)){
	// 				if(e.value || e.value==""){
	// 					result[e.getAttribute($impleEvent.init.$dataGet)]=e.value;
	// 				}else if(e.hasAttribute("value")){
	// 					result[e.getAttribute($impleEvent.init.$dataGet)]=e.getAttribute('value');
	// 				}
				
	// 			}
	// 		}
	// 	});
	// 	return result;
	// };
	//------------------------------------------------------------------------------------------
	//Validation  check and reference check to callback provide by user 
	//this function is called by $impleEvent.getData(); which passes e, name, value to this function
	//only applicable to user input not applicable to getAttribute("value");
	// $impleEvent.validate=function(e,name, value){//e=event, name=name attribute value e.g name, email
	// 		var validate=e.getAttribute('data-validate');
	// 			if($impleEvent.callbacks[validate]){
	// 				return $impleEvent.callbacks[validate](e,name,value);
	// 			}
	// 		};
	//------------------------------------------------------------------------------------------	
	//--------------------------------------------------------------------
//End of Helper Methods

