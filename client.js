const wss = require('ws'),
readline = require('readline'),
os = require('os'),
request = require('sync-request'),
chalk = require('chalk'),
cryptr = require('cryptr'),
server = 'speakjs.herokuapp.com'

var r = JSON.parse(request("GET", 'https://'+  server + "/message").body),
nickname = (request("GET", 'https://pastebin.com/raw/WucBfSyW').body).toString().replace(/\r|\"/gi, '').split("\n")
console.log(`
   ( (                 \x1b[36m Speakjs \x1b[0m
    ) )            author: \x1b[36mpunchnox\x1b[0m
  ........
  |      |]        server: [${request("GET", 'https://' + server + '/message').statusCode === 203 ? '\x1b[32mONLINE\x1b[0m]': '\x1b[31mOFFLINE\x1b[0m]'}
  \\      /         messages: [\x1b[32m${r.number}\x1b[0m]
   \`----'          user: [\x1b[32m${os.userInfo().username}\x1b[0m]


  [\x1b[36m1\x1b[0m]: server Speak.js (default)
  [\x1b[36m2\x1b[0m]: custom server

  `)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question('server: ', (serv) => {
  if (serv !== String(1) && serv !== String(2)) return new Error('Invalid Argument!')
  if (serv === String(2)) return rl.question('gateway url: ', (serv2) => start(serv2))
  if (serv === String(1)) return start(server)
  function start(server) {
    console.clear()
    console.log(`
      ( (                 \x1b[36m Speakjs \x1b[0m
      ) )            author: \x1b[36mpunchnox\x1b[0m
      ........
      |      |]        server: [${request("GET", 'https://' + server + '/message').statusCode === 200 ? '\x1b[32mONLINE\x1b[0m': '\x1b[34mOFFLINE\x1b[0m]'}
      \\      /         messages: [\x1b[32m${r.number}\x1b[0m]
      \`----'          user: [\x1b[32m${os.userInfo().username}\x1b[0m]


      [\x1b[36m1\x1b[0m]: hostname: ${os.userInfo().username}
      [\x1b[36m2\x1b[0m]: random: (${nickname[Math.floor(Math.random()*nickname.length)]})
      [\x1b[36m3\x1b[0m]: custom username

      `)
    rl.question('option: ', (o) => {
      if (o !== String(1) && o !== String(2) && o !== String(3)) return new Error('Invalid Argument!')
      if (o === String(1)) return start2(os.userInfo().username)
      if (o === String(2)) return start2(nickname[Math.floor(Math.random()*nickname.length)])
      if (o === String(3)) return rl.question('Username: ', (u) => start2(u))
      function start2(username) {
        const ws = new wss('ws://' + server)
        ws.on('open', function open(m) {
          ws.send(JSON.stringify({
            username: username,
            event: 'new'
          }))
        })

        r.msg.forEach(a => {
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
              if (text.length > 0) return sendMessage(text)
            })
          } catch (err) {
            new Error(err)
            process.exit(1)
          }
        }
        main()
      }
    })
  }
})
