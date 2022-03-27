const {
	override,
	fixBabelImports,
	addLessLoader,
} = require("customize-cra");


module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { "@primary-color": "#222" } //#2db7f5 #00b5ad  #1DA57A #1DA57A
	})
);
