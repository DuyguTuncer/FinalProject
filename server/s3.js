const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; 
} else {
    secrets = require("../secrets"); 
}
// console.log("secrets", secrets.AWS_KEY, secrets.AWS_SECRET);

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});



exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
 
    const { filename, mimetype, size, path } = req.file;
    console.log(
        "filename, mimetype, size, path",
        filename,
        mimetype,
        size,
        path
    );

    const promise = s3
        .putObject({
            Bucket: "duygusocialnetwork",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("this is from s3.js -> amazon upload complete");
            next();
        })
        .catch((err) => {
            console.log("err in s3 upload put object: ", err);
            res.sendStatus(404);
        });
};
