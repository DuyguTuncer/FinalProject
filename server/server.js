const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("./bcrypt");
const db = require("./db");
const cookieSession = require("cookie-session");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
// socket.io boiler plate code
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
// ++++++++++++++

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4097152,
    },
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

// app.use(
//     cookieSession({
//         secret: `I'm always hungry for cookies.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//         sameSite: true,
//     })
// );

// ++++++++++++++
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry for cookies.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// ++++++++++++++

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
            // rows[0].hashed_password;
            bcrypt
                .compare(req.body.password, rows[0].hashed_password)
                .then((check) => {
                    console.log("check", check);
                    if (!check) {
                        res.json({ success: false });
                    } else {
                        req.session.userId = rows[0].id;
                        console.log("req.session.userId", rows[0].id);
                        res.json({ success: true });
                    }
                })
                .catch((err) =>
                    console.log("Error when comparing bcrypt", err)
                );
        })
        .catch((err) => console.log("Error when finding email", err));
});

app.get("/user", (req, res) => {
    console.log("userId is:", req.session.userId);
    db.getUser(req.session.userId)
        .then((result) => {
            console.log("result for app.js get user", result.rows[0]);
            res.json({
                success: true,
                userInfo: result.rows[0],
            });
        })
        .catch((err) => {
            console.log("eroro in user route:", err);
            res.json({
                success: false,
            });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("req.body", req.body);
    // console.log("req.file", req.file);

    const fullUrl =
        "https://s3.amazonaws.com/duygusocialnetwork/" + req.file.filename;
    console.log("fullUrl:", fullUrl);
    console.log("req.file:", req.file);

    if (req.file) {
        db.uploadImage(fullUrl, req.session.userId)
            .then(({ rows }) => {
                console.log("results", rows);
                res.json({
                    success: true,
                    imgUrl: fullUrl,
                });
            })
            .catch((err) => console.log("Error when uploading image", err));
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/updatebio", async (req, res) => {
    console.log("I am in updatebio: ", req.body);

    db.updateBio(req.session.userId, req.body.draftBio).then(({ rows }) => {
        console.log("results.rows", rows);
        res.json({
            success: true,
            bio: rows[0].bio,
        });
    });
});

app.get("/api/user/:id", (req, res) => {
    console.log("req.query in /api/user/:id", req.query);
    console.log("req.params in /api/user/:id:", req.params);
    db.getUser(req.params.id)
        .then(({ rows }) => {
            console.log("result.rows[0] in user/:id/: ", rows[0]);
            res.json(
                // success: true,
                rows[0]
            );
        })
        .catch((err) => console.log("Error in /api/user/:id", err));
});

app.get("/api/findpeople", (req, res) => {
    db.findPeople()
        .then(({ rows }) => {
            console.log("rows in /api/findpeople: ", rows);
            res.json(
                // success: true,
                rows
            );
        })
        .catch((err) => console.log("Error iin /api/findpeople", err));
});

app.get("/api/findpeople/:name", (req, res) => {
    console.log("req.params in /api/findpeople/:name:", req.params);
    db.findPeopleWithSearchTerm(req.params.name)
        .then(({ rows }) => {
            console.log("rows in /api/findpeople:name: ", rows);
            res.json(
                // success: true,
                rows
            );
        })
        .catch((err) => console.log("Error iin /api/findpeople", err));
});

app.get("/checkFriendship/:friendsId", async (req, res) => {
    console.log(
        "/checkFriends/:friendsId route req.params",
        req.params.friendsId
    );
    const { rows } = await db
        .checkFriendship(req.session.userId, req.params.friendsId)
        .catch((err) => {
            console.log("Errorororor in /checkFriends/:friendsId", err);
        });
    console.log("rows in /checkFriends/:friendsId ", rows);
    res.json(rows);
});

app.post("/checkFriendship", async (req, res) => {
    console.log("post request in /checkFriendship in response to click");
    console.log("req.body in /checkFriendship post request", req.body);
    const { buttonText, friendsId } = req.body;

    if (
        buttonText === "Unfriend / End Friendship" ||
        buttonText === "Cancel Friend Request"
    ) {
        await db
            .deleteFriendship(req.session.userId, friendsId)
            .catch((err) => {
                console.log("Erroror in deleteFriendship", err);
            });

        return res.json("Send a Friend Request");
    } else if (buttonText === "Send a Friend Request") {
        console.log("Send a friend request");
        await db.addFriendship(req.session.userId, friendsId).catch((err) => {
            console.log("Erroror in updateFriendship", err);
        });
        return res.json("Cancel Friend Request");
    } else {
        console.log("Request accepted");
        await db
            .updateFriendship(req.session.userId, friendsId)
            .catch((err) => {
                console.log("Erroror in  updateFriendship", err);
            });
        return res.json("Unfriend / End Friendship");
    }
});

// GET /friends-and-wannabees - gets the friends and wannabees array
// POST /friendship/accept for accepting a friend request. You probably already have one from the friend button that will work perfectly well.
// POST /friendship/end for ending a friendship. You probably already have one from the friend button that will work pefectly well.

// use traditional way
app.get("/api/friends", (req, res) => {
    console.log("I am in server.js /api/friends route");
    console.log("req.sess.id", req.session.userId);
    db.receiveFriendsAndWannabees(req.session.userId)
        .then(({ rows }) => {
            console.log("rows in friends and wannabees", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("eroror in /server.js /api/friends routes", err);
        });
});

app.post("/checkButton/:buttonText", (req, res) => {
    console.log("/checkButton/:buttonText", req.params.buttonText);
    let senderId = req.session.userId;
    let recipientId = req.session.recipient_id;
    if (req.params.buttonText == "Send a Friend Request") {
        let request = false;
        console.log(
            "Send request in : /checkButton/:buttonText",
            senderId,
            recipientId
        );
        db.addFriendship(senderId, recipientId, request).then((result) => {
            console.log(
                "/checkButton/db Send a Friend Request result.rows[0]: ",
                result.rows[0]
            );
            res.json({
                accepted: result.rows[0].accepted,
                recipient: recipientId,
            });
        });
    } else if (req.params.buttonText == "Accept FriendRequest") {
        let request = true;
        console.log(
            " else if in /checkButton/update ",
            senderId,
            recipientId,
            "status: ",
            request
        );
        db.updateFriendship(recipientId, senderId, request)
            .then((result) => {
                console.log(
                    "req.session.userId; req.session.recipient_id",
                    req.session.userId,
                    req.session.recipient_id
                );
                console.log(
                    "/checkButton/db.updateFriendship:  RESULT: ",
                    result.rows[0]
                );
                res.json({
                    accepted: result.rows[0].accepted,
                    recipient: recipientId,
                });
            })
            .catch((err) => {
                console.log(
                    "ERROR: post/checkButton/buttontext/ updateFriendship",
                    err
                );
            });
    } else if (
        req.params.buttonText == "Cancel friend request" ||
        req.params.buttonText == "End friendship"
    ) {
        db.deleteRequest(senderId, recipientId)
            .then(() => {
                console.log("Friendship deleted");
                res.json({});
            })
            .catch((err) => {
                console.log(
                    "ERROR: post/checkButton/buttontext/ deleteRequest",
                    err
                );
            });
    }
});

app.post("/button/:text", (req, res) => {
    let senderId = req.session.userId;
    let recipientId = req.body.otherId;
    if (req.params.text == "cancel") {
        db.deleteRequest(senderId, recipientId)
            .then(() => {
                console.log("Friendship deleted");
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("ERROR: post/Button/cancel", err);
            });
    } else if (req.params.text == "accept") {
        let request = true;
        db.updateFriendship(recipientId, senderId, request)
            .then((result) => {
                console.log(
                    "/button/db.updateFriendship:  RESULT: ",
                    result.rows[0]
                );
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("ERROR: post/button/ updateFriendship", err);
            });
    }
});

app.post("/api/map", function (req, res) {
    console.log("req.body in /api/map/", req.body);
    db.insertLike(
        req.body.trailId,
        req.session.userId,
        req.body.address,
        req.body.title
    )
        .then((result) => {
            console.log("result in /api/map/", result.rows[0]);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error: /api/map/", err);
            res.json({ success: false });
        });
});

app.get("/api/map/:trailId", function (req, res) {
    console.log("req.params in /api/map/:trailId", req.params);
    db.getLikes(req.params.trailId)
        .then((result) => {
            console.log("result in /api/map/:trailId", result.rows[0]);
            res.json({ count: result.rows[0].count });
        })
        .catch((err) => {
            console.log("error: /api/map/", err);
            res.json({ success: false });
        });
});

app.get("/api/topThree", function (req, res) {
    db.getTopThree()
        .then((result) => {
            console.log("result in /api/topThree", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error: /api/topThree", err);
            res.json({ success: false });
        });
});

app.post("/api/comment", function (req, res) {
    console.log("req.body in /api/comment", req.body);
    db.insertComment(req.body.trailId, req.session.userId, req.body.comment)
        .then((result) => {
            db.getComments(req.body.trailId).then((result) => {
                console.log("result in /api/comment/:trailId", result.rows[0]);
                res.json(result.rows);
            });
        })
        .catch((err) => {
            console.log("error: /api/comment", err);
            res.json({ success: false });
        });
});

app.get("/api/comment/:trailId", function (req, res) {
    console.log("req.params in /api/comment/:trailId", req.params);
    db.getComments(req.params.trailId)
        .then((result) => {
            console.log("result in /api/comment/:trailId", result.rows[0]);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error: /api/map/", err);
            res.json({ success: false });
        });
});

app.get("/api/logout", function (req, res) {
    console.log("I am in api/logout");
    req.session.userId = null;
    req.session.first = null;
    req.session.last = null;
    res.redirect("/");
    
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async function (socket) {
    const userId = socket.request.session.userId;

    try {
        const { rows } = await db.getMessages();
        console.log("rows in Socket: ", rows);

        socket.emit("last-10-messages", rows);
    } catch (error) {
        console.log("error in Socket Connection: ", error);
    }

    socket.on("new-message", async (data) => {
        console.log("data - New message from Chat: ", data);
        try {
            const { rows: message } = await db.getNewMessage(data, userId);
            console.log("new message in the chat: ", message);

            // const { rows: newMessage } = await db.getNewMessage();
            // console.log("newMessage: ", newMessage);

            io.emit("new-message-back", message);
        } catch (error) {
            console.log("error in New Message: ", error);
        }
    });

    console.log("userId in Socket connection: ", userId);
});
