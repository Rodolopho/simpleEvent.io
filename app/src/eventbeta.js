//Event Handler

export default function eventManager(el,eventList){
	
//---------------------------------FOR EACH EVENT DATA--------------------------					// 
//event list is the list of events like [click_somefunc,dbl_someOtherfunc]
	//for each events in eventList
		for(var i=0; i<eventList.length;i++){

			if(!eventList[i].trim()) return false;
			//wraping in self invoking function to solve event async issue
			(function(){
				let [event,args,callback]=[null, [], null];
				//
				if($impleEvent.init.$useArrow===true){
					if($impleEvent.init.$seperatorArrow.test(eventList[i])){
						 [,event,callback,args]=$impleEvent.init.$seperatorArrow.exec(eventList[i]);
						if(args){
							args=args.replace(/[()]/g,"").split(/[,]/);
							if($impleEvent.init.$reserveEventArgument===true) args.shift();
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
				

//-------------Finally Handle Events---------------------------------------	// 
				//-----------custon event 'call'-----------------------------//
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
									// args.shift();
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
		  				//store callback reference so that we can detach liste
			  				e.removeEventListener=function(){
			  					el.removeEventListener(this.type, f);
			  				};
			  				//------------Add event object to begining of arugumnet------
									// args.unshift("DKFDSHFKHSDFK");
							//------------------------------------------------------------
			  				

			  				$impleEvent.callbackHandler(el,callback,args,e);

		  			},//EndOFAddEventHandler
		  			false);





				  }//eoelse	
			})();//ENDCOlusure	  
		};//eo for loop

}//EOMAIN		
				  			
	