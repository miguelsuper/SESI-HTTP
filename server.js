const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

let alunos = [
    {
        id:1,
        nome: "Ana",
        email: "ana@email.com",
        turma: "TDS2026",
    },
    {
        id:2,
        nome: "pedro",
        email: "pedro123@gmail.com",
        turma: "TDS2026,"
    }
];

//GET - Listar todos os alunos 
app.get("/alunos",(req,res)=>{
    res.status(200).json(alunos);
})

// GET - Consultar aluno pelo id
app.get("/alunos/:id", (req, res)=>{
    const id = Number(req.params.id);

    const aluno = alunos.find(a => a.id === id);

    if(!aluno){
        return res.status(404).json({
          mensagem: "Aluno não encontrado."
        });
    }
})

//post - cadastrar aluno
app.post("/alunos", (req, res)=>{
    const{ nome, email, turma } = req.body;

    if(!nome || !email || !turma) {
        return res.status(400).json({
            mensagem: "informe nome, email e turma"
        });
    }

    const novoAluno = {
        //operador ternário
        id: alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
        nome,
        email,
        turma,
    }

    alunos.push(novoAluno);
    res.status(200).json(novoAluno);
})

//put - atualizar um aluno 
app.put("/aluno/:id", (req, res) =>{
    const id = Number(req.params.id);

    const indice = alunos.findIndex(a => a.id == id);

    if(indice === -1) {
        return res.status(404).json({
            mensagem: "aluno não encontrado"
        });
    }
    const { nome, email, turma } = req.body

    if(!nome || !email || !turma) {
        return res.status(400).json({
            mensagem: "informe nome, email e turma"
        });
    }

    alunos[indice] = {
     id,
     nome,
     email,
     turma 
    };

    res.status(200).json(alunos[indice]);
});

// Delete - Excluir aluno - Desafio montar estrtura
app.delete("/aluno/:id", (req, res) => {
    const id = Number(req.params.id);

    const existe = alunos.some(a => a.id === id);

    if(!existe) {
        res.status(404).json({
            aluno: "Aluno não encontrado"
        })
    }

    alunos = alunos.filter(a => a.id !== id);
    res.status(204).send();
});
