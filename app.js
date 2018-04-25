var express = require('express');
var mysql      = require('mysql');
var app = express();


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@@',
  database : 'emmoweb'
});
connection.connect();



/** Essa parte aqui cria as tabelas caso elas não existam */
connection.query("CREATE TABLE IF NOT EXISTS HEADERS (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id Varchar(20), movie_name Varchar(20), start_time Varchar(20), session_id Varchar(20))");
connection.query("CREATE TABLE IF NOT EXISTS FACS (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id Varchar(20), movie_name Varchar(20), start_time Varchar(20), session_id Varchar(20), alegria Varchar(20), tristeza Varchar(20), desgosto Varchar(20), desprezo Varchar(20), raiva Varchar(20), medo Varchar(20), surpresa Varchar(20), valencia Varchar(20), engajamento Varchar(20))");
connection.query("CREATE TABLE IF NOT EXISTS SENSORS (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id Varchar(20), movie_name Varchar(20), start_time Varchar(20), session_id Varchar(20), attention Varchar(20), meditation Varchar(20), rawValue Varchar(20), delta Varchar(20), theta Varchar(20), lowAlpha Varchar(20), highAlpha Varchar(20), lowBeta Varchar(20), highBeta Varchar(20), lowGamma Varchar(20), midGamma Varchar(20), poorSignal Varchar(20), blinkStrength Varchar(20))");

/** Isso habilita o CORS */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/** Essa é a roda para os dados do sensor */
app.post("/sensors/v1",function(req,res){
    var dados = req.body;    

    if(!dados){
        res.send("Dados inexistentes");
        return;

    }

    connection.query("INSERT INTO SENSOR ?",dados,function(err,result,fields){
        if(err){
            res.send("Aconteceu algo");
            return;
        }
        res.send("inserido com sucesso");
    })    

})

app.get("/sensors/v1",function(req,res){    
    res.send("RECEBIDO");
})


/** Essa é rota para o headers */
app.post('/headers/v1',function(req,res){    

    var dados = req.body;    
    
    if(!dados){
        res.send("Dados inexistentes");
        return;

    }

    connection.query("INSERT INTO HEADERS ?",dados,function(err,result,fields){
        if(err){
            res.send("Aconteceu algo");
            return;
        }
        res.send("inserido com sucesso");
    });

});

/** Essa é rota para o facs */
app.post('/facs/v1',function(req,res){    

    var dados = req.body;    
    
    if(!dados){
        res.send("Dados inexistentes");
        return;

    }

    connection.query("INSERT INTO FACS ?",dados,function(err,result,fields){
        if(err){
            res.send("Aconteceu algo");
            return;
        }
        res.send("inserido com sucesso");
    });

});


/** Aqui é onde start o server local */
app.listen(3000, function () {  
    console.log("Listener on port 3000");
});