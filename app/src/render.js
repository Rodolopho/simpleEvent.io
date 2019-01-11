export var  render={
	//IT will convert html to obj and obj to Html
		id:0,//
		list:{},
		cloneElement:function(el){
			//return clone or clone new element every time its called
			return this.obj2Html(this.html2Obj(el,{},1));
		},
		
		html2Obj:function(el,obj,i){

				obj[i]={};
				if(el.nodeType==3){
					if(el.nodeValue.trim()){
						
						obj[i].isText=true;
						obj[i].text=el.nodeValue;
					}
				}else{

					obj[i].tagName=el.nodeName.toLowerCase();
					obj[i].attributes={};
					for(var j=0;j<el.attributes.length;j++){
						el.attributes.length
						//console.log(j);
						obj[i].attributes[el.attributes[j].name]=el.attributes[j].value;
					}

					if(el.hasChildNodes){
						obj[i].hasChild=true;
						obj[i].childCount=el.childNodes.length;
						for (var k=0; k<obj[i].childCount; k++){
							if(el.childNodes[k])
							this.html2Obj(el.childNodes[k],obj[i],k+1);

						}
					}

				}

				 return obj;

		},
		obj2Html:function(obj,el){
			if(el){

				
				for(var i=1;i<=obj.childCount;i++){
					
					if(obj[i].isText){
						var ele=document.createTextNode(obj[i].text);
						el.appendChild(ele);

					}else if(obj[i].tagName){
						var ele=$impleEvent.createElement(obj[i].tagName, obj[i].attributes);
						if(ele.id){ele.id=ele.id+i};
						el.appendChild(ele);

						this.obj2Html(obj[i],ele);
					}
				}


			}else{
				el=$impleEvent.createElement(obj[1].tagName, obj[1].attributes);
				if(el.id){el.id=el.id+1};
				this.obj2Html(obj[1],el);
				
			}
			return el;
			
		},
		
		to:function(el,component,$return){

			if(!el.hasAttribute('render-id')){
				
		 		this.id=this.id+1;
				el.setAttribute('render-id',this.id);
				this.list[this.id]={obj:this.html2Obj(component,{},1)};
		 	}
		 	var renderId=el.getAttribute('render-id');
		 	var obj=this.list[renderId].obj;
		 	var ele=this.obj2Html(obj,false);
		 	// for each item in array
		 	Array.prototype.forEach.call($return,function(e){
		 		var ele=$impleEvent.render.obj2Html(obj,false);
		 		el.appendChild(ele);
		 		$impleEvent.manageReturns(ele, e);
		 		$impleEvent.update(ele);
		 	});
		 	
		},
		
		
		
	};