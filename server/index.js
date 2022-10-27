const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'workoutSystem',
})

app.post('/create', (req, res) => {
    const workout = req.body.workout;
    const split = req.body.split;
    // console.log(workout+split);

    db.query('INSERT INTO workout (workout, split) VALUES (?,?)', [workout, split], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('values inserted')
        }
    })
})

app.get("/workout", (req, res) => {
    db.query("SELECT * FROM workouts", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const workout = req.body.workout;
    db.query(
        "UPDATE workouts SET workout = ? WHERE id = ?",
        [workout, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM workouts WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3060, ()=> {
    console.log("Server running on port 3060.");
})