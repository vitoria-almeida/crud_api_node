//dotenv
require('dotenv').config()

//configurando conexão com mongoDB utilizando mongoose
const mongoose = require('mongoose')
const url = `mongodb+srv://vitoriadevv:${process.env.PASSWORD}@cluster0.s5uxpof.mongodb.net/cadastro?retryWrites=true&w=majority`

async function connect() {
    try {
        await mongoose.connect(url)
        console.log('connect to mongodb')
    } catch(error) {
        console.error(error)       
    }
}
connect()

//configurando express.js
const express = require('express')
const app = express()
const port = 3000

//middleware
app.use(express.json())

//declarar rotas p/ acessar pelo browser
app.get('/', (req, res) => {
    res.send('hello')
})

//iniciando o servidor
app.listen(port, () => {
    console.log('servidor funcionando')
})

const Aluno = require('./models/alunoModel')

//GET
//o "?" faz com que o id não seja obrigatório, sendo assim você pode filtrar todos os alunos ou um aluno específico
app.get('/alunos', async(req, res) => {
    try {
        const alunos = await Aluno.find({})
        res.status(200).json(alunos)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/alunos/:nome', async(req, res) => {
    try {
        const {nome} = req.params
        const aluno = await Aluno.find({nome})
        res.status(200).json(aluno)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//POST
app.post('/aluno', async(req, res) => {
    try {
        const aluno = await Aluno.create(req.body)
        res.status(200).json(aluno)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//PUT
app.put('/alunos/:nome', async(req, res) => {
    try {
        const {nome} = req.params
        const aluno = await Aluno.findOneAndUpdate({nome}, req.body)

        if(!aluno) {
            return res.status(404).json({message: `não encontramos nenhum aluno com o nome ${nome}`})
        }
        const updatedAluno = await Aluno.findOne({nome})
        res.status(200).json(updatedAluno)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE
app.delete('/alunos/:nome', async(req, res) => {
    try {
        const {nome} = req.params
        const aluno = await Aluno.findOneAndDelete({nome})
        if(!aluno) {
            return res.status(404).json({message: `não encontramos nenhum aluno com o nome ${nome}`})
        }
        res.status(200).json(aluno)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})