/*
[ '/usr/local/Cellar/node/6.8.1/bin/node',
  '/usr/local/bin/inspect',
  'fe',
  'env',
  '-h',
  '--',
  '--node' ]
*/

import detect from 'detect-port'
import which from 'which'
// import chalk from 'chalk'
import { spawn, execSync } from 'child_process'
// import execa from 'execa'
const openBrowser = url => {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"')
      execSync(
        'osascript ../bin/openChrome.applescript ' + url,
        {cwd: __dirname, stdio: 'ignore'}
      )
      return true
    } catch (err) {
      // Ignore errors.
    }
  }
}

;(async (cmd, nodeArgs = [], childArgs = [], path) => {
  const argv = process.argv.slice(2)
  const divIndex = argv.indexOf('--')
  if (divIndex === -1) {
    cmd = argv[0]
    nodeArgs = []
    childArgs = argv.slice(1)
  } else {
    cmd = argv[divIndex + 1]
    nodeArgs = argv.slice(0, divIndex)
    childArgs = argv.slice(divIndex + 2)
  }
  const port = await detect(9229)
  try {
    path = which.sync(cmd)
  } catch (err) {
    return console.error(`Not found command: ${cmd}`)
  }
  const inspectArgs = ['--inspect=' + port, '--debug-brk']
  const args = inspectArgs.concat(nodeArgs, [path], childArgs)
  const proc = spawn('node', args)

  proc.stdout.on('data', (data) => {
    process.stdout.write(data)
  })
  proc.stderr.on('data', (data) => {
    const str = data.toString()
    let url = ((str).match(/(chrome-devtools:\/\/[^\s]*)/) || [])[0]

    // TODO: BUG
    // only copy-paste work
    url && openBrowser(url)

    // console.log(`${chalk.red.underline('hi')}`)
    process.stderr.write(str.replace('Warning: This is an experimental feature and could change at any time.', ''))
  })

  const exitHandle = () => {
    console.log('exit')
  }
  proc.once('exit', exitHandle)
  proc.once('SIGINT', exitHandle)
  proc.once('SIGTERM', exitHandle)
})()
