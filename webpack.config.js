const path=require('path');

module.exports={
	entry:'./app/src/main.js',
	devtool:'inline-source-map',
	output:{
		filename:"$impleEvent.js",
		path:path.resolve(__dirname,'app','dist'),
	}

};//EOModuleExports