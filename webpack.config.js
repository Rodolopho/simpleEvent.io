
const path=require('path');

module.exports={
	entry:'./app/src/index.js',
	devtool:'inline-source-map',
	output:{
		filename:"$impleEvent.js",
		path:path.resolve(__dirname,'app','dist'),
	},
	devServer:{
		contentBase:"./app/site/",
	},

};//EOModuleExports