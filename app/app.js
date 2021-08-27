
var fs = require('fs')
var http = require('http')
var url = require('url')



http.
    createServer(function (req, res) {
        console.log('request get! url:', req.url)
        var parseObj = url.parse(req.url, true)
        var pathName = parseObj.pathname
        console.log('pathName:', pathName)
        if (parseObj.pathname === '/' || parseObj.pathname.indexOf('/index') == 0) {
            pathName = '/index'
        }

        if (pathName === '/index') {
            res.statusCode = 302
            res.setHeader('Location', '../views/index.html')
            res.end()
            // fread('../views/index.html', res)

        } else if (pathName.indexOf('/public') == 0) {
            fread('..' + pathName, res)
        } else if (pathName.indexOf('/views') == 0) {
            fread('..' + pathName, res)
        } else if (pathName.indexOf('/node_modules') == 0) {
            fread('..' + pathName, res)
        } else {
            res.statusCode = 302
            res.setHeader('Location', '../views/404.html')
            res.end()
        }
        console.log('--------------------')
    })
    .listen(8080, function () {
        console.log('server is running...')
    })

function fread(pathName, res) {
    fs.readFile(pathName, function (err, data) {
        if (err) {
            // return res.end('404 Not Found...')
            res.statusCode = 302
            res.setHeader('Location', '../views/404.html')
            res.end()
        }
        res.end(data)
    })

}
