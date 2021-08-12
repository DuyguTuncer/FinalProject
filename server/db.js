const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addInfo = (first, last, emailAddress, password) => {
    return db.query(
        `INSERT INTO socialnetwork (first, last, email_address, hashed_password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, emailAddress, password]
    );
};

module.exports.findEmail = (emailAddress) => {
    return db.query(
        `SELECT * FROM socialnetwork
        WHERE email_address = ($1);`,
        [emailAddress]
    );
};

module.exports.uploadImage = (url, id) => {
    return db.query(
        `UPDATE users SET imageurl = $1 WHERE id = ${id} RETURNING imageurl`,
        [url]
    );
};
