const express = require('express')
const server = express()

server.use(express.static(__dirname))

server.set('view engine','ejs')

server.get('/', (req, res) => res.status(200).render('index'))

server.listen(3000, () => console.log('O servidor está rodando na porta 3000'))