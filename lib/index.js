'use strict';var _detectPort=require('detect-port');var _detectPort2=_interopRequireDefault(_detectPort);var _which=require('which');var _which2=_interopRequireDefault(_which);var _child_process=require('child_process');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return Promise.resolve(value).then(function(value){step("next",value);},function(err){step("throw",err);});}}return step("next");});};}/*
[ '/usr/local/Cellar/node/6.8.1/bin/node',
  '/usr/local/bin/inspect',
  'fe',
  'env',
  '-h',
  '--',
  '--node' ]
*/// import chalk from 'chalk'
// import execa from 'execa'
var openBrowser=function openBrowser(url){if(process.platform==='darwin'){try{// Try our best to reuse existing tab
// on OS X Google Chrome with AppleScript
(0,_child_process.execSync)('ps cax | grep "Google Chrome"');(0,_child_process.execSync)('osascript ../bin/openChrome.applescript '+url,{cwd:__dirname,stdio:'ignore'});return true;}catch(err){// Ignore errors.
}}};(function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(cmd){var nodeArgs=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var childArgs=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var path=arguments[3];var argv,divIndex,port,inspectArgs,args,proc,exitHandle;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:argv=process.argv.slice(2);divIndex=argv.indexOf('--');if(divIndex===-1){cmd=argv[0];nodeArgs=[];childArgs=argv.slice(1);}else{cmd=argv[divIndex+1];nodeArgs=argv.slice(0,divIndex);childArgs=argv.slice(divIndex+2);}_context.next=5;return(0,_detectPort2.default)(9229);case 5:port=_context.sent;_context.prev=6;path=_which2.default.sync(cmd);_context.next=13;break;case 10:_context.prev=10;_context.t0=_context['catch'](6);return _context.abrupt('return',console.error('Not found command: '+cmd));case 13:inspectArgs=['--inspect='+port,'--debug-brk'];args=inspectArgs.concat(nodeArgs,[path],childArgs);proc=(0,_child_process.spawn)('node',args);proc.stdout.on('data',function(data){process.stdout.write(data);});proc.stderr.on('data',function(data){var str=data.toString();var url=(str.match(/(chrome-devtools:\/\/[^\s]*)/)||[])[0];// TODO: BUG
// only copy-paste work
url&&openBrowser(url);// console.log(`${chalk.red.underline('hi')}`)
process.stderr.write(str.replace('Warning: This is an experimental feature and could change at any time.',''));});exitHandle=function exitHandle(){console.log('exit');};proc.once('exit',exitHandle);proc.once('SIGINT',exitHandle);proc.once('SIGTERM',exitHandle);case 22:case'end':return _context.stop();}}},_callee,undefined,[[6,10]]);}));return function(_x3){return _ref.apply(this,arguments);};})()();