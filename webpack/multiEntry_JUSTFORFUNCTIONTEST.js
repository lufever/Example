var fs = require('fs')
var path = require("path")
var glob = require("glob")

var root = './src'
var rootArr = root.split('/');
var rootFolder = rootArr[rootArr.length - 1]

 

var moduleList = [];

function readDirSync(path) {

	var module = {
		moduleID: '',
		moduleHTML: '',
		moduleJS: ''
	}

	pathArr = path.split('/')
	module.moduleID = pathArr[pathArr.length - 1]

	var pa = fs.readdirSync(path);
	pa.forEach(function (ele, index) {
		var fileName = path + "/" + ele;
		var info = fs.statSync(fileName)
		if (info.isDirectory()) {
			// console.log("dir: "+ele)
			// dirs.push("dir: "+ele)
			readDirSync(path + "/" + ele);

		} else {

			if (ele === 'index.js') {
				module.moduleJS = fileName
			}
			if (ele === 'index.html') {
				module.moduleHTML = fileName
			}

		}
	})

	moduleList.push(module)
}




readDirSync(root)

var files = glob.sync('./src/**/index.js');

var newEntries = files.reduce(function(memo, file) {
	var name = /.*\/(.*?)\/(.+)\.js/.exec(file)[1];	
  memo[name] = file;
  return memo;
}, {});


moduleList.forEach(function (mod) {
    // 生成配置
    var conf = {
      filename: mod.moduleID + '.html',
      template: mod.moduleHTML,
      chunks: [mod.moduleID],
      inject: true
		}

})

exports.getEntries =  function getEntries () {
  // 缓存js入口数组
  var entries = {}
  // 初始化模块列表
  this.getModuleList()
  // 变量模块列表
  moduleList.forEach(function (module) {
    if (module.moduleID !== '' && module.moduleJS !== '') {
      entries[ module.moduleID ] = module.moduleJS
    }
  })
  console.log('*********************************** entries ***********************************')
  console.log(entries)
  return entries
}
