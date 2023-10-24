const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session(
    {
        secret: 'secret',//a secret key use to encrypt the session cookie
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    }
))
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST, GET"],
        credentials: true
    }
))



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db-name"
})



app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`uname`,`email`,`password`) VALUES (?)"
    values = [
        req.body.uname,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({ Mesage: "error" });
        return res.json(data)
    })
})


app.post('/signin', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "server side error" });
        if (data.length > 0) {
            req.session.username = data[0].uname
            return res.json({ login: true, username: req.session.username })
        } else {
            return res.json({ login: false });
        }
    })
})





app.listen(8080, () => {
    console.log("listening")
})