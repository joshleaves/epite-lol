const appCodeVersion = require('./package.json')['version']

const routeReply = (res, code, html) => {
  return res.writeHead(code, { 'X-Application-Code-Version': appCodeVersion, 'Content-Type': 'text/html' }).end(html)
}

const routeIdxHtml = `
  <h1>epiLOL macro generator <span style="font-size:30%;"> by <a href="http://twitter.com/JoshLeaves">JoshLeaves</a> (with auto-deploy)</h1>
  <hr />
  <br />
  Url scheme:<br / >
  - /{face}.png<br />
  - /{face}%1C{text_top}%1C{text_bot}.png<br />
  Reminder: ? = %3F<br />
  <br />
  Url scheme (for promo 2017):<br />
  - <a href="/kwame.png">/kwame.png</a><br />
  - <a href="/roxan%1Cfoo%20bar%20%3F%1CCa%20donne%20soif%20dis%20donc%20!.png">/roxan%1Cfoo%20bar%20%3F%1CCa%20donne%20soif%20dis%20donc%20!.png</a><br />
  - <a href="/sadirac%1Ccinq%20ans%20pour%1Cdevenir%20un%20robot%20reconnu.png">/sadirac%1Ccinq%20ans%20pour%1Cdevenir%20un%20robot%20reconnu.png</a><br />
  - <a href="/shawan%1Cmiaou%1Cje%20suis%20un%20chat.png">/shawan%1Cmiaou%1Cje%20suis%20un%20chat.png</a><br />
  - <a href="/pintade.png">/pintade.png</a><br />
  - <a href="/jog%1CJ\'ai%20perdu%20mon%20oeil%1CEn%20voyant%20l\'intra%20up%20!.png">/jog%1CJ\'ai%20perdu%20mon%20oeil%1CEn%20voyant%20l\'intra%20up%20!.png</a><br />
  - [NEW!] <a href="/cyril%1CJ\'aimerais%1CDejeuner en paix%20!.png">/cyril%1CJ\'aimerais%1CDejeuner en paix%20!.png</a><br />
  <br />
  Un service <a href="http://epite.ch/">{Epite.ch}</a> &copy; 2011-2013 <b> --- </b> Projet &agrave; but collaboratif. <a href="https://github.com/epite-ch/lol.epite.ch">Fork us!</a>`
const routeIdx = (res) => { return routeReply(res, 200, routeIdxHtml) }

const route404Html = `
  <h1>404! This shit is hosted on the intranet, bitch!</h1>
  <hr />
  Seriously dude, I don\'t have what you want here.<br />
  <br />
  Just go back to the <a href="/">index</a>, bro!<br />`
const route404 = (res) => { return routeReply(res, 404, route404Html) }

const route500Html = `
  <h1>500! It\'s not over 9000 but I failed all the way!</h1><br />
  <br />
  Best bet is the server failed. Just hit "retry" or w/ever.<br />
  <br />
  If this happens way too much, just contact me: josh DOT guthrie AT gmail DOT com<br />`
const route500 = (res) => { return routeReply(res, 500, route500Html) }

module.exports = { routeIdx, route404, route500 }

