export let init={
			
			$useArrow:true,
			$event:'event',//action
			$useVar:true,
			$seperatorArrow:/([a-z]+)[\s]*[=][>][\s]*([\w-\.]+)([(][^)]*[)])?/,
			$seperatorArrowGlobal:new RegExp(/([a-z]+)[\s]*[=][>][\s]*([\w-\.]+)([(][^)]*[)])?/,"g"),
			$reserveEventArgument:true,
			$seperator:/[:]/g,//[-|_] this is also good [:]/g, event="click_rotate_45deg"
			//HTML ELEMENT
			//callback has return it will first look for element with given classname the only process return
			$className:".return",//class name to disptach return
			//data-feed="name",  return {name:"My Name"}
			$dataFeed:"data-feed",//data-return aslo sounds great
			//gets data with key and value, data-get="name" value="my name"
			$dataGet:"data-get",//
			$dataComponent:'data-component',
			$dataFilter:'data-filter',
			$dataValidate:'data-validate',
			$dataSet:'data-set',
			$dataStore:'data-store',
			$dataAppend:"data-append",//APPENDS or replace 
			// $dataError:"data-error",//for error
			// $dataMessage:"data-message",
			// $dataNotification:'data-notification', 
		//APPLICATION
			// $notification:null,
			//return { returnTo:{el:document.getElementById('h1')}, data:{name:"myname"}}
			$returnTo:"el",//define your outer scope element holder
			$root:document,//by default
			$global:document,//by defau lt 
	
};

