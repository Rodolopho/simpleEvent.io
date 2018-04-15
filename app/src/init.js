export  var init={
		//HTML ELEMENT
			$seperator:/[-|_]/g,// this is also good [:]/g, event="click_rotate_45deg"

			//callback has return it will first look for element with given classname the only process return
			$className:".return",//class name to disptach return
			//data-feed="name",  return {name:"My Name"}
			$dataFeed:"data-feed",//data-return aslo sounds great
			//gets data with key and value, data-get="name" value="my name"
			$dataGet:"data-get",//
			$dataAppend:"data-append",//APPENDS or replace 
		//APPLICATION
			$notification:null,
			//return { returnTo:{el:document.getElementById('h1')}, data:{name:"myname"}}
			$returnTo:"el",//define your outer scope element holder
			$root:document,//by default
			$global:document,//by default
	
};