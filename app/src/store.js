//Data-base in Json format


export default function datastore(el, _default){ 
	let store={};
	if(el && el.nodeName){
			//if its has data-store
			if(el.hasAttribute($impleEvent.init.$dataStore)){
				let data=el.getAttribute($impleEvent.init.$dataStore).trim();
				try{
					store=JSON.parse(data)
				} catch(e){
					console.error("Please Provide Valid JSON data: Provided "+data);
					return null;
				}
			}else{
				if(_default) store=_default;
			}

		}else{
			console.error("Please Provide  HTML element as an arguments");

		}

	return {
		store:store,
		get:function(){ return this.store;},
		set:function(){ el.setAttribute($impleEvent.init.$dataStore, JSON.stringify(this.store))},
	}
};

	