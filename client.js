const wss = require('ws'),
readline = require('readline'),
os = require('os'),
request = require('sync-request'),
chalk = require('chalk'),
cryptr = require('cryptr')

var r = JSON.parse(request("GET", 'https://'+  server + "/message").body)
console.log(`
   ( (                 \x1b[36m Speakjs \x1b[0m
    ) )            author: \x1b[36mpunchnox\x1b[0m
  ........            
  |      |]        hours: [\x1b[32m${new Date().getUTCHours() + ':' + new Date().getUTCMinutes() + ":" + new Date().getUTCSeconds()}\x1b[0m]
  \\      /         messages: [\x1b[32m${r.number}\x1b[0m]
   \`----'          user: [\x1b[32m${os.userInfo().username}\x1b[0m]
                
  `)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Username: ', (username) => {

  const ws = new wss('ws://' + server)
  ws.on('open', function open(m) {
    ws.send(JSON.stringify({
      username: username,
      event: 'new'
    }))
  })

r.msg.forEach(a =>{
  console.log(`\n(${chalk.hex(a.color)(a.username)}) : \x1b[32m${a.CreatedAt}\x1b[0m:\n>${chalk.hex(a.color)(new cryptr(String(a.expire)).decrypt(a.content))}\n`)
})

  ws.on('message', function incoming(data) {
    let m = JSON.parse(data)
     console.log(`\n(${chalk.hex(m.color)(m.username)}) : \x1b[32m${m.date}\x1b[0m:\n>${chalk.hex(m.color)(m.content)}\n`)
  })

  sendMessage = function(t) {
    ws.send(JSON.stringify({
      username: username,
      content: t,
      date: Date.now(),
      event: 'msg'
    }))
  }
  rll = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  const main = async () => {
    try {
      rll.on("line", text => {
        if(text.length > 0) return sendMessage(text)
      })
    } catch (err) {
      new Error(err)
      process.exit(1)
    }
  }
  main()
})
