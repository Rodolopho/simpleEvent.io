//Event Handler

export default function eventManager(el,eventList,invoke){
	
//---------------------------------FOR EACH EVENT DATA--------------------------					// 
//event list is the list of events like [click_somefunc,dbl_someOtherfunc]
	//for each events in eventList
		for(let i=0; i<eventList.length;i++){

			if(!eventList[i].trim()) return false;
			//wraping in self invoking function to solve event async issue
			(function(){
				let [event,args,callback]=[null, [], null];
				//
				if($impleEvent.init.$useArrow===true){
					if($impleEvent.init.$seperatorArrow.test(eventList[i])){
						 [,event,callback,args]=$impleEvent.init.$seperatorArrow.exec(eventList[i]);
						if(args && args.replace(/^[(]|[)]$/g,"").trim() ){
							args=args.replace(/^[(]|[)]$/g,"").trim().split(/[,]/);
							//if frist arugent is reserved for event object,
							// if($impleEvent.init.$reserveEventArgument===true) args.shift();
						} else{
							args=[];
						}
						

						if(!event || !callback){
							console.warn("Insufficient Agruments:'"+ +"' Must provided atleast eventname and callback  or event attribute format is not understood:used seperator is "+$impleEvent.init.$seperatorArrow);
							return false;
						}
					}else{
						console.warn("Insufficient Agruments:'"+ +"' Must provided atleast eventname and callback  or event attribute format is not understood:used seperator is "+$impleEvent.init.$seperatorArrow);
						return false;
					}

				}else{
					  data=eventList[i].split($impleEvent.init.$seperator);

				//check event data has atleast eventname and callback
					if(data.length<2){
						console.warn("Insufficient Agruments: Must provided atleast eventname and callback  or event attribute format is not understood:used seperator is "+$impleEvent.init.$seperator);
						return false;
					}
					 event=data[0];
					 callback=data[1];
					args=data.slice(2);	
				}
//-----------------incase of invoke call---------------------
				if(invoke){
					if(event===invoke){
						$impleEvent.callbackHandler(el,callback,args,invoke);
					}

					return;
				}				

//-------------Finally Handle Events---------------------------------------	// 
				//-----------custon event 'call'-----------------------------//
				   if (event==='invoke') return;
					if(event=='call'){
						window.addEventListener("load", function(e) {
								$impleEvent.callbackHandler(el,callback,args,e)
							});//end of window load event		
						return ;
					}//ENDOF-DATA==call

				// --------------------------------------Interval and Time out--------------//
					if(event.match(/timeout|interval/)){
						//handle set interval and Timeout
				  		//e.g event="timeout_callback_t_arg2_arg3"//time will be agr1
				  		if(isFinite(args[0])){
				  			let time=args[0];
									console.log(args.shift());
				  			if(event=="interval"){
				  				
				  				var interval=setInterval(function(){
				  					//It check every time bad for performance..but still
				
				  					$impleEvent.callbackHandler(el,callback,args,interval)
								}, time);


				  			}else {//timeout
				  				var timeout=setTimeout(function(){

				  					
				  					$impleEvent.callbackHandler(el,callback,args,timeout)

								}, time);
				  			}


				  		}else{
				  			console.error("please Provide Time in ms; for interval/timeout event");
							return false;
				  		}
				//ADDEVENTLISTENER
					}else{

		  			el.addEventListener(event,function f(e){
		  				//The code below will execute every time , event is triggered
		  				//store callback reference so that we can detach listener
		  					
		  						 
		  					e.removeEventListener=function(){

			  					el.removeEventListener(this.type, f);
			  				};
			  				
		  				
			  				
			  				//------------Add event object to begining of arugumnet------
									// args.unshift("DKFDSHFKHSDFK");
							//------------------------------------------------------------
			  				

			  				 $impleEvent.callbackHandler(el,callback,args,e);
			  				// $impleEvent.callbackHandler(el,callback,$impleEvent.argumentsHandler(el,args).push(e),e);

		  			},//EndOFAddEventHandler
		  			false);





				  }//eoelse	

		// 		  if(el.hasAttribute($impleEvent.init.$eventOnce)){
		// 	el.removeAttribute('event');
		// 	console.log(el);
		// }
			})();//ENDCOlusure	  
		};//eo for loop

		

}//EOMAIN		
				  			
	