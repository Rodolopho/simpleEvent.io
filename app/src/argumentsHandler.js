
//--------------------------------------------------------------
	//Handle Arguments 
export default function argumentsHandler(el,args){
	if(args){
		//mapping args 
		args=args.map(function(arg){

			if(typeof arg === 'string'){// i
				//Double qoutes if its single
				
				// JSON.parse for Number , Boolean,  string ,array and object 
				try	{
					let $arg=JSON.parse(arg.trim().replace(/^'/,'"').replace(/'$/,'"'));
					return $arg;
				} catch(e){
					// console.warn(e);
				}
		//-----------------attribute & parents
				if(arg.match(/^\$+/)){
					let ele=el;
					let $len=arg.match(/\$/g).length;

					if( $len > 1){
						for (var i =1 ; i <$len ; i++) {
							if(!ele["parentNode"] || ele.tagName==='HTML'){
									break;
							}
					   		ele=ele['parentNode'];
						}
					   }

					   let $arg=arg.replace(/^\$+/,"").trim();

					   if(!$arg) return ele;

					   return attributeHandler(ele,$arg);

				    }//ENDIF $ MATCH
//---------------------------if argument is queryselector
			//Query selector All <> sign
			//case :-----query seletor
			//---------------Element Proccer
				if(/^<.+>/.test(arg)){
					let ele=el;
					let selector=arg.match(/<(.+)>(\[(\d+)\])?(\..+)?/);
					if(selector[1]){
						//CHECK IF IT IS parent , next, prevous, first ,last, 
						if(selector[1]==='parent'){
							ele= ele.parentNode;

						}else if(selector[1]==='next'){
							 ele=ele.nextElementSibling

						}else if(selector[1]==='previous'){
							 ele=ele.previousElementSibling
						}else if(selector[1]==='first'){
							ele=ele.parentElement.firstElementChild;
						}else if(selector[1]==='last'){
							ele=ele.parentElement.lastElementChild;
						}else if(selector[1]==='nth' &&  isFinite(selector[3])){

							ele=ele.parentElement.children;//[parseInt(selector[3])];
						}else{
							ele=document.querySelectorAll(selector[1]);
						}
						//-------end element processor 
						//if it has index for child note <>[1]
						

						if(isFinite(selector[3])){
							ele=ele[parseInt(selector[3])];

							if(selector[4]){
								return attributeHandler(ele,selector[4].replace(/^\./,""));
							}
							return ele;
						//for <> with out [0] eg <parent>.dataStore	
						 }else if(selector[4]){
						 	return attributeHandler(ele,selector[4].replace(/^\./,""));
						 }
						 return ele;
						 }//endif selector[1]
  							
  						}//end if test<...> 
  					
  		            //return as it is
					 return $impleEvent.vars.hasOwnProperty(arg)?$impleEvent.vars[arg]:undefined;
					}else{ // IF its not string return as it is.
						return arg;
					} // End if Type check

				});// End of array map 
			}//ENDIFARGS
			// Finally return mapped argument array;
			return args;
		}

function attrObjectify(ele, attr,value){

		 if(value==='value') return $impleEvent.parseJSON(ele.getAttribute(attr));

		let obj={
			element:ele,
			attribute:attr,
			 value:$impleEvent.parseJSON(ele.getAttribute(attr)),
			get(){
				return this.value;
				//return $impleEvent.parseJSON(this.element.getAttribute(this.attribute));
			},
			set(value){
				this.element.setAttribute(this.attribute,JSON.stringify(value));
				// this.value=value;
			},
			save(){
				this.set(this.value);
			}
		}
		// console.log(obj)
		return obj;
;
	}	

	function attributeHandler(ele, $arg){
			if(ele.hasAttribute($arg.split('.')[0].replace(/([a-z])([A-Z])/g, (e,a,b)=> a+"-"+b.toLowerCase()))){
					   		return attrObjectify(ele,$arg.split('.')[0].replace(/([a-z])([A-Z])/g, (e,a,b)=> a+"-"+b.toLowerCase() ),$arg.split('.')[1])

					   	}else if(ele.getAttribute($impleEvent.init.$dataGet)===$arg){
									let value= ele.value?ele.value:ele.getAttribute("value");
									return $impleEvent.parseJSON(value);

							}else if(ele.getAttribute("name")===$arg){
								let value=ele.value?ele.value:ele.getAttribute("value");
								return $impleEvent.parseJSON(value);
							}else if($arg==="value"){
								
								return $impleEvent.parseJSON(ele.value);
							}else{
								console.log('unable to find attribute:'+$arg+ " in ")
								console.log( ele)
								return null;
							}
	}						
  						
  						