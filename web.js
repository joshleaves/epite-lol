const http        = require('http')
const url         = require('url')
const imagemagick = require('imagemagick')
const pictureData = require('./data.js')
const { routeIdx, route404, route500} = require('./routes')

const appCodeVersion = require('./package.json')['version']

const pictureRegex = /\/([a-z]+)(%1C(.*?)%1C(.*?))?\.png/i

function displayPicture (res, path) {
  const texts = path.match(pictureRegex)
  texts[1] = texts[1].toLowerCase()
  if (!pictureData[texts[1]]) return route404(res)

  try {
    texts[3] = (texts[3] ? decodeURIComponent(texts[3]) : pictureData[texts[1]]['t_top']).toUpperCase()
    texts[4] = (texts[4] ? decodeURIComponent(texts[4]) : pictureData[texts[1]]['t_bot']).toUpperCase()
  } catch (URIError) {
    return route404(res)
  }

  const args = [ `pictures/${pictureData[texts[1]]['t_pic']}`,
    '-font', './Impact.ttf',
    '-pointSize', '42',
    '-fill', 'white',
    '-stroke', 'black',
    '-strokewidth', '2',
    '-gravity', 'north', '-annotate', '0', texts[3],
    '-gravity', 'south', '-annotate', '0', texts[4],
    'PNG:-'
  ]
  return imagemagick.convert(args, (err, stdout, stderr) => {
    if (err) {
      console.dir(err)
      console.dir(stderr)
      return route500(res)
    }
    res.writeHead(200, { 'X-Application-Code-Version': appCodeVersion, 'Content-Type': 'image/png', 'Content-Length': stdout.length })
    return res.end(stdout, 'binary')
  })
}

const handleServer = (req, res) => {
  const pathname = url.parse(req.url).pathname
  if ((pathname.indexOf('/index') === 0) || (pathname === '/')) {
    return routeIdx(res)
  }
  if (pathname === '/favicon.ico') {
    return res.end('')
  }
  if (pictureRegex.test(pathname)) {
    return displayPicture(res, pathname)
  }
  return route404(res)
}

http.createServer(handleServer).listen(process.env.PORT || 5000)

