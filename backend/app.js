const express = require("express")
const cors = require("cors")
const router = require("./routes")
const AppError = require("./utils/appError")
const errorHandler = require("./utils/errorHandler")

const app = express()

const port = 8080;

app.use(cors({
    methods: "GET,POST",
    optionsSuccessStatus: 200,
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.all("*", (req, res, next) => {
    next(new AppError(`url ${req.originalUrl} are not exist`, 404))
})
app.use(errorHandler)

// app.get("/",(req,res)=>{
//     res.json({
//         username:"test1",
//         password:"123456"
//     })
// })

// app.post("/Login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     db.query(
//         " SELECT * FROM users WHERE username = ? AND password = ? ",
//         [username, password],
//         (err, result) => {
//             if (err) {
//                 res.send({ err: err })
//             }
//             if (result.length > 0) {
//                 res.send(result);
//             } else {
//                 res.send({ message: " Wrong username / password combination ! " });
//             }
//         }
//     )
// })

app.listen(port, () => {
    console.log(`server active on port ${port}`)
})

module.exports = app