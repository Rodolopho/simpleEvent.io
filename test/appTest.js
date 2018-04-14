//var $impleEvent=require("../app/app");
var expect=require("chai").expect;
var  sinon=require("sinon");
var rewire=require("rewire");
var $impleEvent=rewire("../app/app");


describe('App', function(){
	//before(function(){
		
		// let document={
		// 	getElementById:function(id){
		// 		if(testElementWithId.indexOf(id)==1){
		// 			return true;
		// 		}else{
		// 			return false;
		// 		}
		// 	},
		// 	querySelectorAll:function(selector){
		// 		testElementQuery.map(function(e){
		// 			if(e.hasOwnProperty(selector.replace('[').replace(']'))){
		// 				return e.id;
		// 			}
					
		// 		})
		// 	},

		// }
		// $impleEvent.__set__("document",document);
	//});
	it('queryElementsHavingEventAttribute should return Html element with event attribute',function(){
		expect($impleEvent.queryElementsHavingEventAttribute()).to.be.an('object').to.have.property('event');

	});
});