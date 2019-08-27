// var ele=new XElement('div',{class:"fs34px", style:'border:1px solid black;paddding:20px'}, 'body');

$impleEvent.add('array',function(e,a,b){
	//return ["one", "two", "three"];
	return {
		returnTo:{
			el:document.getElementById("ul"),
			data:[{name:"two"}, {name:"three"}, {name:"four"}]
		}
	}
	return [{name:"two"}, {name:"three"}, {name:"four"}];
}).add("reverswe",function(a){return a.reverse()}).add("myFunction", function(e,a){return a; console.log(a)});


$impleEvent.add("update",function(e,a,b){
	//var re=a;
	
	var a= document.createElement("h1");
	a.innerText="HTMLCODOOD";
	 //return {global:"global"};

	return {
		
		name:"huglinjo",
		self:" bikram thapa",
		global:{name:"global Bikram thapa"},
		parent:{self:"Parent Bikram Thapa",name:"parentHuglinjo"},
		grandParent:{
			self:$impleEvent.createElement("h1",{text:"i am self eleme", style:"color:red;"}),
			name:{
				first:$impleEvent.createElement("h1",{text:"i am name Element", style:"color:blue;"})
			},
		},
		 returnTo:{el:document.getElementById('iid'),
		 	data:{
		 		lastname:"johny",
		 		self:"doing",
		 	}
		}
	 }
	// return [{name:"two"}, {name:"three"}, {name:"four"}]
	// $return ={
	// 	returnTo:{
	// 		el:document.getElementById(a),
	// 		data:[{name:"two"}, {name:"three"}, {name:"four"}]
	// 	}
	// }
}).add("hhe",function(){alert()});
