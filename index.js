const express = require('express')
const app = express()
const mysql = require('mysql')

const PORT = 3000
//const HOST = '127.0.0.1'
const HOST = '0.0.0.0'

function getMySQLConnection() {

    return mysql.createConnection({
        host: 'mysql1',
        //host: '192.168.99.100',
        port: '3306',
        user: 'root',
        password: 'kevin667',
        database: 'cinepolis'
    })
}


app.set('view engine', 'pug');

app.get('/funciones', (req, res) => {
    var funcionesList = []

    var connection = getMySQLConnection()
    connection.connect()
    var funcQuery = 'select funciones.id, peliculas.nombre, funciones.hora, funciones.sala, peliculas.descripcion from peliculas join funciones on peliculas.id = funciones.pelicula_id'

    connection.query(funcQuery, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {
            for (var i = 0; i < rows.length; i++) {

                var funciones = {
                    'id': rows[i].id,
                    'pelicula': rows[i].nombre,
                    'hora': rows[i].hora,
                    'sala': rows[i].sala,
                    'descripcion': rows[i].descripcion                 
                }

                console.log(funciones)
                funcionesList.push(funciones);
            }

            res.render('index', { "funcionesList": funcionesList });
        }
    });

    connection.end();

});

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`);