// const path=require('path');
// //const bootstrap=require('bootstrap');

// module.exports={
// 	entry:'./app/src/main.js',
// 	devtool:'inline-source-map',
// 	output:{
// 		filename:"$impleEvent.js",
// 		path:path.resolve(__dirname,'app','dist'),
// 	},
// 	devServer:{
// 		contentBase:"./app/site/",
// 	},

// };//EOModuleExports
const path=require('path');
//const bootstrap=require('bootstrap');

module.exports={
	entry:'./app/srcbeta/index.js',
	devtool:'inline-source-map',
	output:{
		filename:"$impleEventbeta.js",
		path:path.resolve(__dirname,'app','dist'),
	},
	devServer:{
		contentBase:"./app/site/",
	},

};//EOModuleExports