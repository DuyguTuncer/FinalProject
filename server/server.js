const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("./bcrypt");
const db = require("./db");
const cookieSession = require("cookie-session");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always hungry for cookies.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register", (req, res) => {
    console.log("req.body in /register -post request", req.body);
    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.emailAddress ||
        !req.body.password
    ) {
        res.json({ success: false });
        return;
    }
    console.log("hasher:");
    bcrypt
        .hash(req.body.password)
        .then((hashedPassword) => {
            console.log("hashedPassword", hashedPassword);
            return db
                .addInfo(
                    req.body.first,
                    req.body.last,
                    req.body.emailAddress,
                    hashedPassword
                )
                .then((results) => {
                    req.session.userId = results.rows[0].id;
                    req.session.first = req.body.first;
                    req.session.last = req.body.last;
                    console.log(
                        "results.rows[0].id - userId",
                        results.rows[0].id
                    );
                    // console.log("req.session: ", req.session);
                    res.json({ success: true });
                })
                .catch((err) =>
                    console.log("Error in post request for register", err)
                );
        })
        .catch((err) => console.log("Error in hashingy", err));
});

app.post("/login", (req, res) => {
    console.log(req.body);
    if (!req.body.emailAddress || !req.body.password) {
        res.json({ success: false });
        return;
    }
    db.findEmail(req.body.emailAddress)
        .then(({ rows }) => {
            console.log("rows:", rows);
            rows[0].hashed_password;
            bcrypt
                .compare(req.body.password, rows[0].hashed_password)
                .then((check) => {
                    console.log("check", check);
                    if (!check) {
                        res.json({ success: false });
                    } else {
                        res.json({ success: true });
                    }
                })
                .catch((err) =>
                    console.log("Error when comparing bcrypt", err)
                );
        })
        .catch((err) => console.log("Error when finding email", err));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
