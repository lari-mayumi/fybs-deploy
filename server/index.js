const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//cria a conexão com o banco de dados
const db = mysql.createConnection({ 
    user: "root",
    host: "localhost",
    password: "",
    database: "fybs",
});

//salva os dados de uma nova conta no banco
app.post("/createaccount", (req, res) => { 
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const foto = "/static/media/user.a6143582309785dca610.png"
    const descricao = "Cheguei no fybs!"

    db.query("INSERT INTO usuarios (nome, email, senha, foto, descricao) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, foto, descricao],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//alterar os dados de uma conta 
app.put("/alterardados", (req, res) => { 
    const user = req.body.user;
    const email = req.body.email;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const id = req.body.id;
    
    //console.log("Chegamos aqui no server: ", user, email, descricao);

    db.query("UPDATE usuarios SET nome=?, email=?, descricao=?, foto=? WHERE id=?",
        [user, email, descricao, imagem, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//envia os dados de uma postagem para o banco de dados
app.post("/createpost", (req, res) => { 
    //console.log(req.body);
    const user = req.body.user;
    const texto = req.body.texto;
    const imagem = req.body.imagem;
    const id = req.body.id;
    
    db.query("INSERT INTO posts VALUES (NULL, ?, ?, ?, ?, ?, 0, 0, 0)",
        [user, id, id, texto, imagem],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.post("/createpostgrupo", (req, res) => { 
    //console.log(req.body);
    const user = req.body.user;
    const texto = req.body.texto;
    const imagem = req.body.imagem;
    const id = req.body.id;
    const idGrupo = req.body.idgrupo;

    db.query("INSERT INTO posts VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, 0)",
        [user, id, id, texto, imagem, idGrupo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//seleciona os posts para mostrar no feed
app.get("/posts", (req, res) => {
    db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        //console.log(result);
        }
    });
});

//seleciona os dados de grupos
app.get("/grupos", (req, res) => {
    db.query("SELECT * FROM grupos ORDER BY id DESC", (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        //console.log(result);
        }
    });
});

//seleciona o user para mostrar np perfil
app.get("/followers", (req, res) => {
    db.query("SELECT * FROM followers", (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        //console.log(result);
        }
    });
});

//adiciona um seguidor
app.post("/addfollower", (req, res) => {
    const seguidor = req.body.seguidor;
    const seguindo = req.body.seguindo;
    db.query("INSERT INTO followers VALUES (NULL, ?, ?, 1)", 
    [seguidor, seguindo],
    (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });

});

//apaga um seguidor
app.delete("/erasefollower/:followID", (req, res) => {
    const followID = req.params.followID;
    db.query("DELETE FROM followers WHERE id = ?", 
    [followID],
    (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });

});


//seleciona os dados de usuários para validar login e exibir feed e perfil 
app.get("/users", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        //console.log(result);
      }
    });
  });

//seleciona todos os dados de likes
app.get("/likes", (req, res) => {
    db.query("SELECT * FROM likes", (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        //console.log(result);
        }
    });
});

app.post("/addlike", (req, res) => {
    const user = req.body.user;
    const post = req.body.post;
    db.query("INSERT INTO likes VALUES (NULL, ?, ?)", 
    [user, post],
    (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send("Values inserted");
        }
    });

});

app.delete("/dislike/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM likes WHERE id = ?", 
    [id],
    (err, result) => { 
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });

});


//cria o servidor na porta 3001
app.listen(3001, () => {
    console.log("Seu servido está rodando na porta 3001");
});

