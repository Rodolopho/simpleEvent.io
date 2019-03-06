
import {init} from './init.js';
import {render} from "./render.js";
import eventManager from "./event.js";
import  manageReturns from "./return.js";
import  getData from "./retrive.js";
import {core} from './core.js';
//------------------------------------------------------------------------------------------
	const $impleEvent={};
//Container or holders
	//conatiner to hold callback or event handlers supplied by user using $impleEvent.add(), method
	$impleEvent.callbacks={};
	//$imple Event native Collection of callbacks
	$impleEvent.core=core;
	//Application initilization and config data, can be modified using $impleEvent.config(), method
	$impleEvent.init=init;
	//to string identifier
	$impleEvent.toString=function(){return "Object $impleEvent";};
//------------------------------------------------------------------------------------------
//Helper Methods
	//Custom Add event listner to avoid asynchronus isss
	$impleEvent.addEventListener=function(element,event,callback,option){
		
		element.addEventListener(event,callback,option);
	};
	//Covert html string in html.
	$impleEvent.asHTML=function(string){
		var ele=this.createElement('div');
		ele.innerHTML=string;
		 return this.render.cloneElement(ele).firstElementChild;



	};
	$impleEvent.html=function(string){
		return this.asHTML(string);
	}
	//create element e.g $impleEvent.createElement("h1",{id:"h1", class:"one two ", text:"I am a title"});
	//used in render
	$impleEvent.createElement=function(tag, attr){
		var element=document.createElement(tag);
			for (var keys in attr){
				if(keys=="text"){
					element.innerText=attr[keys];
				}else{
					element.setAttribute(keys,attr[keys]);
				}
		        
		      }
		 return element;
	};
	// $impleEvent.notify=function(Message){
	// 	// var st=setTimeout(function(){
	// 	// 	if($impleEvent.init.$noti)
	// 	// },3000)

	// };
	// $impleEvent.alert=function(){

	// };
	// $impleEvent.error=function(el,$return){
	// 	return $impleEvent.manageReturns(el,$return);
	// };
	//------------------------------------------------------------------------------------------
	//Return {} with key and value, where key is name or data-get, and value is value="" or el.value
	$impleEvent.getData=getData;
	
	//Validation  check and reference check to callback provide by user 
	//this function is called by $impleEvent.getData(); which passes e, name, value to this function
	//only applicable to user input not applicable to getAttribute("value");
	$impleEvent.validate=function(e,name, value){//e=event, name=name attribute value e.g name, email
			let validate=e.getAttribute('data-validate');
				if($impleEvent.callbacks[validate]){
					return $impleEvent.callbacks[validate](e,name,value);
				}
			};
	//------------------------------------------------------------------------------------------	
	//--------------------------------------------------------------------
//End of Helper Methods

 $impleEvent.initiate=null;

//User accessors: User mostly user these method to interaction with application 

//It allow user to add callbacks, $impleEvent.add('methodname', function(){}).add({method1:function(){}, method2:function(){}})
	
	$impleEvent.add=function(a,b){
		

			if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={name:callabck}
				for ( var keys in a){
					if(Object.prototype.toString.call(a[keys]) === '[object Function]'){
						this.callbacks[keys]=a[keys];
					}else{
						console.error("Please provide valid callback function for :" + keys);
					}
				}
			}else if((Object.prototype.toString.call(a) === '[object String]') && (Object.prototype.toString.call(b) === '[object Function]')){
				//patern (name, method)	
				this.callbacks[a]=b;

			}else{
				console.error("Invalid argument supplied to add("+a+", "+b+") : Supply method name and callback");
			}

			// //Initialize query and event attachment
			if(!this.initiate){
			this.launch();

			this.initiate=true;
			}

			return this;
	};

	$impleEvent.register=function(a,b){
		return this.add(a,b);
	};



	//------------------------------------------------------------------------------------------
	
	//This will update $impleEvent or refresh $impleEvent on specified element.

	$impleEvent.update=function(el){ this.launch(el)};
	//------------------------------------------------------------------------------------------

	//Allows to congif the application e.g, $impleElement.config('$root', document.getElementById('app'));
	$impleEvent.config=function(a,b){
		//if {} is passed
		if(Object.prototype.toString.call(a) === '[object Object]'){
				//its object patter={name:callabck}
				for (var keys in a){
					if(this.init.hasOwnProperty(keys)){
						this.init[keys]=a[keys];
					}else{
						console.error("Unvalid Config Property :" + keys);
					}
				}
			}else{

				if(this.init.hasOwnProperty(a)){
						this.init[a]=b;
					}else{
						console.error("Unvalid Config Property :" + a);
					}
			} 
			return this;
	};
	//------------------------------------------------------------------------------------------

	//Lauched the Application
	$impleEvent.launch=function(el){
		//find the elements with event attribute and attach a handler and listener
			var element=el || this.init.$root;
			var elements=element.querySelectorAll('[event]');
			 for(var i=0; i<elements.length; i++){
			
				var eventList=elements[i].getAttribute('event').trim().split(/\s+/);
				if(eventList.length){
					this.eventManager(elements[i],eventList);
				}else{
					return false;
				}
					
			}
	};
	//------------------------------------------------------------------------------------------

//processors
	//Responisble for binding event to element with coressponding callbacks
	$impleEvent.eventManager=eventManager;
	//------------------------------------------------------------------------------------------

	//Handle the returns from callback when event occurs, if callback has a return
	 $impleEvent.manageReturns=manageReturns;
	
	//Responsible for rendering html to the document, with approppriate returns
	 $impleEvent.render=render;
	//------------------------------------------------------------------------------------------

	//attach $implEvent to Window after checking for namespace collision and duplicate implementation of library
	if(window.$impleEvent){
		if(window.$impleEvent.toString()==="Object $impleEvent"){
			console.warn("Duplicate $impleEvent libaray Found! Make sure you are not importing $impleEvent more than one time. ");
		}else{
			console.error("$impleEvent name is already used, Please Dont assign '$impleEvent' to any varibale, function or objects. Please free ' $impleEvent' namespace from global scope.");
		}
	}else{
		window.$impleEvent=$impleEvent;

			// window.addEventListener("load", function(event) {
   //  			window.$impleEvent.launch();
  	// 		});
	}

