//Handle returns from callback and deploy the data
//----scope---global, parent-grandparent-self
//------datatype-------

 function appendData(el,data){

 	if(!el.hasAttribute($impleEvent.init.$dataAppend)) el.innerHTML="";
 	
 	if(typeof data === 'string' || typeof data === 'number'){
 		
 		el.appendChild(document.createTextNode(data));
 	}else if(data.nodeName){
 		let html=$impleEvent.render.cloneElement(data);
 		//$impleEvent.beforeAppend()
 		el.appendChild(html);
 		//SimpleEvent.afterAppend()
 		$impleEvent.update(html);
  }else{
  	return false;
  }
}


  

// }
export default function manageReturns(el,$return,bool){

//if bool===true just sent return to self
//self can embed either string, number, html or array
 if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
  if(bool===true && el.classList.contains($impleEvent.init.$className.replace('.',""))){
 	  el.hasAttribute($impleEvent.init.$dataFeed)?false:appendData(el,$return);
 	return ;
 }
}
//-------------------------------------------------------------------------------------	
//case-1: Handle String/number/htmlelement
if(typeof $return === 'string' || typeof $return === 'number' || $return.nodeName ){
	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className),function(e){
					//has [data-feed], its there for other purpose, exit
					if(e.hasAttribute($impleEvent.init.$dataFeed) || e.hasAttribute($impleEvent.init.$dataComponent)){ return false};
								
							appendData(e,$return);
						 				
					});//EOFOR
	return true;

}
//-------------------------------------------------------------------------------------	
//case -2: Object {}
if(Object.prototype.toString.call($return) === '[object Object]'){
	//Scope1. global
	if($return.hasOwnProperty('global') && $return.global){
		//you can set the global scope by using $impleevent.config($global,document.body)
		$impleEvent.manageReturns($impleEvent.init.$global,$return.global);
	} 
	//Scope2:grand parent
	if($return.hasOwnProperty('grandParent') && $return.grandParent){
		$impleEvent.manageReturns(el.parentNode.parentNode,$return.grandParent);
		//delete $return.grandParent;
	}
	//Scope 3: parent
	if($return.hasOwnProperty('parent') && $return.parent){
		
		$impleEvent.manageReturns(el.parentNode,$return.parent);
	}
	//Scope 4:self
	if($return.hasOwnProperty('self') && $return.self){
		$impleEvent.manageReturns(el,$return.self);
		//delete $return.self;
	}


	//scope 5: self with {key:value}

	Array.prototype.forEach.call(el.querySelectorAll($impleEvent.init.$className+"["+$impleEvent.init.$dataFeed+"]"),function(e){
			
							let key=e.getAttribute($impleEvent.init.$dataFeed).trim();
							let value=null;
							if(key){
								//handle nested keys i.e data.person.name.firstname
								//------------------------------------------------------------------
									let feed=key.split('.');
									//if return has no key
									if(! $return.hasOwnProperty(feed[0])) return false;
									//
									if(feed.length){
										if(feed.length==1){
											value= $return[key];
										}else if(feed.length>1){
											let result=$return;
											for(var j=0; j<feed.length; j++){
												if(result[feed[j]]){
													result=result[feed[j]];
												}else{
													console.error("Cannot find:" + key + " in  the return " +JSON.stringify($return));
													break;
												}
											}
											
											value=result;

										}
									}
								//-------------------------------------------------------------------
							
								if(value){
									if(appendData(e,value)===false){
										console.error("Only String , Number and Html Element  can be embeded; Cannot embed "+value + "for "+key + "in : "+ e.nodeName.toLowerCase()+ " Html Element");
										console.log(e);
									}
									
								 }//End of Value
							}else{
								console.warn("Make sure you have :" + $impleEvent.init.$dataFeed + " attribute to handle given return" + $return )
							}//end of key
					//-------------------------------------------------------------------------------------	
		 });//ENDOFFOREACHLOOp

		//-----------------this is last because it need ot overwrite any other return
	//Scope 6:returnTo spedific element 
	if($return.hasOwnProperty('returnTo') && $return.returnTo){
		//returnTo bydefault "el" key is used to find element, but you can change by $impleEvent.config("$returnTo","element");
		if($return.returnTo[$impleEvent.init.$returnTo] &&  $return.returnTo[$impleEvent.init.$returnTo].nodeName){
			$impleEvent.manageReturns($return.returnTo[$impleEvent.init.$returnTo],$return.returnTo.data, true);
		}else{
			console.error("Error@returnTo : Element not found:Please give returnTo."+$impleEvent.init.$returnTo + " a valid html element");
		}	
	}
	//returnToMany 
	if($return.hasOwnProperty('returnToMany') && Object.prototype.toString.call($return.returnToMany) === '[object Array]'){

		$return.returnToMany.forEach((e,i)=>{
		 if(e[$impleEvent.init.$returnTo] &&  e[$impleEvent.init.$returnTo].nodeName){
		 	$impleEvent.manageReturns(e[$impleEvent.init.$returnTo],e.data,true);
		 }else{
			console.error("Error@returnToMany : Element not found @ array-index " +i+":Please give "+$impleEvent.init.$returnTo + " a valid html element at index "+ i);
			}	
		 
		})
	}

	return;

}//EOOBJECTCASE2
//-------------------------------------------------------------------------------------	


//case -3: Array//$impleEvent.init.$dataComponent holds query selector e.g #li 

if(Object.prototype.toString.call($return) === '[object Array]'){

	if(bool==true){
		
		let templateElement=null;//template
		if(el.hasAttribute($impleEvent.init.$dataTemplate)){
			let htmlTemplate=el.getAttribute($impleEvent.init.$dataTemplate);
			templateElement=$impleEvent.html(htmlTemplate);

		}else if(el.hasAttribute($impleEvent.init.$dataComponent)){
			let templateSource=el.getAttribute($impleEvent.init.$dataComponent);
			templateElement=document.querySelector(templateSource);	
		}

		if(templateElement && templateElement.nodeName){
			if(!el.hasAttribute($impleEvent.init.$dataAppend)){
					el.innerHTML="";
			}

			appendArray(el,$return,templateElement);
			return;
		}

		
	}
	//-------------------------------old------
	//if element has component as temlate
	//case if elemt have data-template
	let templateElement=null;//template
	let e=null;
	if(el.querySelector('['+$impleEvent.init.$dataTemplate+']')){
		let htmlTemplate=el.querySelector('['+$impleEvent.init.$dataTemplate+']').getAttribute($impleEvent.init.$dataTemplate);
		templateElement=$impleEvent.html(htmlTemplate);
		if(!templateElement){
			console.error("Please provide valid html Element e.g <li></li>;  Provided :-" +htmlTemplate );
			return false;
		}
		e=el.querySelector('['+$impleEvent.init.$dataTemplate+']');
	}else if(el.querySelector('['+$impleEvent.init.$dataComponent+']')){
		let templateSource=el.querySelector('['+$impleEvent.init.$dataComponent+']').getAttribute($impleEvent.init.$dataComponent);
		templateElement=document.querySelector(templateSource);
		if(!templateElement){
			console.error("Please provide valid querySelector:  Provided :-" +templateSource );
			return false;
		}

		e=el.querySelector('['+$impleEvent.init.$dataComponent+']');
	}else{
		//Need data-template or data-component
		console.info("Array returns need ["+$impleEvent.init.$dataTemplate+"] or ["+$impleEvent.init.$dataComponent+"] holder: No such holder found ");
		return false;
	}

	
				if(!e.hasAttribute($impleEvent.init.$dataAppend)){
					e.innerHTML="";
				}
				//loops item and appends
				appendArray(e,$return,templateElement);

				
		
	}//ENDOF-Object-type-Array

	

}//EOmanageRETURNS



function appendArray(el,$return,template){
		  for(var i=0; i<$return.length;i++){
					let cloneComponent=$impleEvent.render.cloneElement(template);
					//giving clone element unique id
					if(cloneComponent.id) cloneComponent.id=cloneComponent.id+"_"+i;
					cloneComponent.setAttribute("index", i);
					el.appendChild(cloneComponent);
					//check if its standlone i.e single element without childs e.g <li id="li" class="return"></li>
					if(!cloneComponent.childElementCount){
						//--------------------------------------------------
						if(typeof $return[i] === 'string' || typeof $return[i] === 'number' || $return[i].nodeName ){
							if(cloneComponent.hasAttribute($impleEvent.init.$dataFeed)){ return false};

							appendData(cloneComponent,$return[i]);	

							}
						
						//-----------------------------------------------------
					}else{
						$impleEvent.manageReturns(cloneComponent,$return[i]);
					}

					$impleEvent.update(cloneComponent);
				}//end of for loop
}
















