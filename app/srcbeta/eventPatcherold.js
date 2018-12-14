export default function eventPatcher(el,eventList){
	//event list is the list of events like [click_somefunc,dbl_someOtherfunc]
		for(var i=0; i<eventList.length;i++){
				var data=eventList[i].split($impleEvent.init.$seperator);
				//check event data has atleast eventname and callback
				if(data.length<2){
					console.warn("Insufficient Agruments: Must provided atleast eventname and callback name or event attribute format is not understood:used seperator is "+$impleEvent.init.$seperator);
					return false;
				}
// ----------------------------------------------Interval and Time out--------------//
				//handle set interval and Timeout
				if(data[0].match(/timeout|interval/)){
					if(data[0]=="interval"){
						if(!isFinite(data[2])){
								console.error("please Provide Time in ms; for interval event");
								return false;

							}
							if($impleEvent.core.hasOwnProperty(data[1])){
								var interval=setInterval(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(3);
									args.unshift(interval);
									 //caputure any return from callback to feed return feeder
										var $return=$impleEvent.core[data[1]].apply(el,args);//give callback this scope of addEventListener i.e target element
											if($return){
												//if any return handle it
												if(el.hasAttribute('data-filter')){

															
															var filter=el.getAttribute('data-filter');
															if($impleEvent.core.hasOwnProperty(filter)){
																$return=$impleEvent.core[filter]($return);

															}else if($impleEvent.callbacks.hasOwnProperty(filter)){
																$return=$impleEvent.callbacks[filter]($return);
															}else{
																console.error("Unable to apply filter" +filter +": Missing filter method");
															}
														
													}

													$impleEvent.dispatchReturns(el,$return);
												//}

												}	

										}, data[2]);	

								}else if($impleEvent.callbacks.hasOwnProperty(data[1])){
									var interval=setInterval(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(3);
									args.unshift(interval);

									 //caputure any return from callback to feed return feeder
										 var $return=$impleEvent.callbacks[data[1]].apply(el,args);//give callback this scope of addEventListener i.e target element
											
											if($return){
												//if any return handle it
												
												if(el.hasAttribute('data-filter')){
															var filter=el.getAttribute('data-filter');
															if($impleEvent.core.hasOwnProperty(filter)){
																$return=$impleEvent.core[filter]($return);

															}else if($impleEvent.callbacks.hasOwnProperty(filter)){
																$return=$impleEvent.callbacks[filter]($return);
															}else{
																console.error("Unable to apply filter" +filter +": Missing filter method");
															}
														
													}
													$impleEvent.dispatchReturns(el,$return);
												}	

										}, data[2]);
									

								//case 3: no callback is define
								}else{
									console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
									return false;

								}	



					}else if(data[0]=="timeout"){
						if(!isFinite(data[2])){
							console.log("please Provide Time in ms; for timeout event");
							return false;

						}
						if($impleEvent.core.hasOwnProperty(data[1])){
							var timer=setTimeout(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(3);
									args.unshift(timer);
									 //caputure any return from callback to feed return feeder
										var $return=$impleEvent.core[data[1]].apply(el,args);//give callback this scope of addEventListener i.e target element
											if($return){
												//if any return handle it
												if(el.hasAttribute('data-filter')){
															var filter=el.getAttribute('data-filter');
															if($impleEvent.core.hasOwnProperty(filter)){
																$return=$impleEvent.core[filter]($return);

															}else if($impleEvent.callbacks.hasOwnProperty(filter)){
																$return=$impleEvent.callbacks[filter]($return);
															}else{
																console.error("Unable to apply filter" +filter +": Missing filter method");
															}
														
													}
													$impleEvent.dispatchReturns(el,$return);
												}	

										}, data[2]);
								
							}else if($impleEvent.callbacks.hasOwnProperty(data[1])){
								var timer=setTimeout(function(){
									//adding current event to args so that callback can acess it.
									var args=data.slice(3);
									args.unshift(timer);
									 //caputure any return from callback to feed return feeder
										var $return=$impleEvent.callbacks[data[1]].apply(el,args);//give callback this scope of addEventListener i.e target element
											if($return){
												//if any return handle it
												if(el.hasAttribute('data-filter')){
															var filter=el.getAttribute('data-filter');
															if($impleEvent.core.hasOwnProperty(filter)){
																$return=$impleEvent.core[filter]($return);

															}else if($impleEvent.callbacks.hasOwnProperty(filter)){
																$return=$impleEvent.callbacks[filter]($return);
															}else{
																console.error("Unable to apply filter" +filter +": Missing filter method");
															}
														
													}

													$impleEvent.dispatchReturns(el,$return);
												}	

										}, data[2]);
								

							//case 3: no callback is define
							}else{
								console.error("Can't Found Method:"+a+" ,Please Register event handler using '$impleEvent.add()' method?");
								return false;

							}	

					}//

				}//
		// -------end---------------------------------------Interval and Time out--------------//
				/*
				 el->current element
				 data=>event datas which contain eventname, callbackname,optional arguments
				 data.slice(2)->returns new array without eventname and methodname, only has args
				 data[0]->eventname
				 data[1]->methodname
				 rest data [contents] are arguments
				*/
				if($impleEvent.core.hasOwnProperty(data[1])){
					this.addEventListener(el,data[0],$impleEvent.core[data[1]],data);
				//case 2: check in callbacks library ,
				}else if($impleEvent.callbacks.hasOwnProperty(data[1])){
					
					this.addEventListener(el,data[0],$impleEvent.callbacks[data[1]],data);

				//case 3: no callback is define
				}else{
					console.error("Can't Found Method:"+data[1]+" ,Please Register event handler using '$impleEvent.add()' method?");
					return false;

				}			 
							
							
		}
	};
	