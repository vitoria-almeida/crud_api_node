const mongoose = require('mongoose');
const alunoSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Por favor, adicione o nome"]
        },
        email: {
            type: String,
            required: [true, "Por favor, adicione o email"]
        },
        nascimento: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Aluno = mongoose.model('Aluno', alunoSchema);
module.exports = Aluno;