const AppError = require("../utils/appError")
const con = require("../services/db")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./image/")
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const upload = multer({
    storage: storage
})

exports.getalluser = (req, res, next) => {
    con.query("SELECT * FROM user", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data.length,
            data: data
        })

    })
}

exports.postuser = (req, res, next) => {
    if (!req.body) return next(new AppError("no data found", 404))
    const username = req.body.username
    const password = req.body.password

    con.query("INSERT INTO user (username, password) VALUES (?,?)", [username, password], (err, data, fields) => {
        if (err) return next(new AppError(err))
        res.status(201).json({
            status: "success",
            message: "user created"
        })
    })
}

exports.postlogin = (req, res, next) => {
    if (!req.body) return next(new AppError("no data found", 404))
    const username = req.body.username
    const password = req.body.password

    con.query("SELECT * FROM user WHERE username = ? AND password = ? ",
        [username, password],
        (err, data, fields) => {
            if (err) return next(new AppError(err))
            res.status(201).json({
                status: "success",
                count: data.length
            }
            )

        })
}

exports.uploadimg = (upload.single("image")), (req, res, next) => {
    next()
}

exports.addimg = (req, res, next) => {
    const submitdate = new Date()
    const path = req.file.path

    con.query("INSERT INTO imagelog (submitdate, path) VALUES (?,?)", [submitdate, path], (err, data, fields) => {
        if (err) return next(new AppError(err))
        res.status(201).json({
            status: "success",
            message: "Upload success"
        })
    })
}

// exports.postLogin = (req, res) => {
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
// }