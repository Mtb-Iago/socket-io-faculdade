const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.on('handle-message', data => {
        console.log('=====================================')
        console.log(`Socket id remetente: ${socket.id}`)
        console.log(`A tecla pressionada foi: ${data.key}`)
        console.log(`O código da tecla é: ${data.code}`)
        console.log(`A mensagem atual é: ${data.message}`)
        console.log('=====================================')
        console.log('************************************')
    })
})

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})