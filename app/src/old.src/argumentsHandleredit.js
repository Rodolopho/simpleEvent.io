
//--------------------------------------------------------------
	//Handle Arguments 




export default function argumentsHandler(el,args){
		//if there is args
	if(args){
		//mapping args 
		args=args.map(function(rawArg){
			let arg=rawArg.trim();
			//case 1--------------------------- digit and boolean
				//if argument is a digit
				//parse number input into number
				if(/^[\d]+[\.]?[\d]*$/.test(arg)) return parseFloat(arg);
				
				//parse string true to javascript true
				if(/^true$/.test(arg)) return true;
				//parse string false to javascript false;
				if(/^false$/.test(arg)) return false;
					  						
				//attribute & parent
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

					   	if($arg.search(/\./)!=-1){
								let split=$arg.split(/\./);
								if(ele.getAttribute(split[0])){
									if(split[1]=="value") return $impleEvent.parseJSON(ele.getAttribute(split[0]))
								}

							}else if(ele.hasAttribute($arg)){
								var attObj={};
								attObj.get=function(){ return $impleEvent.parseJSON(ele.getAttribute($arg));};
								 attObj.set=function(val){
								 	ele.setAttribute($arg, val);
								   this.value=this.get();
								};
								attObj.value=attObj.get();//ele.getAttribute($arg);
								return attObj;

							}else if(ele.getAttribute($impleEvent.init.$dataGet)===$arg){
									let value= ele.value?ele.value:ele.getAttribute("value");
									return $impleEvent.parseJSON(value);

							}else if(ele.getAttribute("name")===$arg){
								let value=ele.value?ele.value:ele.getAttribute("value");
								return $impleEvent.parseJSON(value);
							}else if($arg==="value"){
								
								return $impleEvent.parseJSON(ele.value);
							}else{
								console.log('unable to find attribute:'+$arg+ " in "+ ele.toString())
								return null;
							}


				    }
			//if argument is queryselector
			//Query selector All <> sign
			//case :-----query seletor
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
							return ele=ele.previousElementSibling
						}else if(selector[1]==='first'){
							ele=ele.parentElement.firstElementChild;
						}else if(selector[1]==='last'){
							ele=ele.parentElement.lastElementChild;
						}else if(selector[1]==='nth' &&  isFinite(selector[3])){

							ele=ele.parentElement.children;
							
							// if(parseInt(selector[3])<ele.parentNode.childElementCount){
							// 	ele=ele.parentNode.children[parseInt(selector[3])];
							// 	console.log(ele);
							// }else{
							// 	console.log('<nth>[n] : n is not valid index');

							// }

						}else{
							ele=document.querySelectorAll(selector[1]);
						 }
							if(isFinite(selector[3])){
								if(selector[4]){
									let $attr=selector[4].substr(1);
									 ele=ele[parseInt(selector[3])];
									if(ele && ele.hasAttribute($attr.replace(".value",""))){

									if(/(\.value)$/.test($attr)) return ele.getAttribute($attr.replace(".value",""));

									let attObj={element:ele};
									attObj.get=function(){ return ele.getAttribute($attr)};
									attObj.set=function(val){
									 ele.setAttribute($attr, val)
									 this.value=val;
									};
									attObj.value=ele.getAttribute($attr);
									return attObj;
								  }else{
								  	console.error("Not Found " + selector[3] + " child Node or  attribute "+$attr);
								  }
								  	return null;

								}
								return ele[parseInt(selector[3])];
							 }
								
						
						 return ele;
  							
  						} 
  					}

  						//if it has id selector
  						//if(/^#[a-zA-Z0-9-]+/.test(arg)) return document.getElementById(arg.replace("#",""));
					if(arg.match(/^#[a-zA-Z0-9-]+/)){
						//removing # tag
						let $arg=arg.replace(/^#/,"");
						//search for "."
						if($arg.search(/\./)!=-1){
							//split . notation into array
						let split=$arg.split(/\./);
						let $attr=split[1];
						// define element
						let ele=document.getElementById(split[0]);

						if(ele.hasAttribute($attr)){

							if(split.length===3 && split[2]=="value") return ele.getAttribute($attr);

							let attObj={element:ele};
							attObj.get=function(){ return ele.getAttribute($attr)};
							attObj.set=function(val){
								//we can check for invalid value
							 ele.setAttribute($attr, val)
							 this.value=val;
							};
							attObj.value=ele.getAttribute($attr);
							return attObj;
						}

						}else{
							return document.getElementById($arg);
						}


			
						
					 }//return as it is
						return arg.replace(/(^["'])|['"]$/g,"");
					});
					}//ENDIFARGS
					
					return args;
				}				
  						
  						