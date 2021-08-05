const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

//  ../ --> if secrets.json file is one level up



exports.sendEmail = functtion(recipient, message, subject) {

return ses.sendEmail({
    Source: "Funky <funky.chicken@spiced.academy>", // this needs to be updated to a verified email
    // duygu tuncer  duygu_tuncer1@hotmail.com
    Destination: {
        ToAddresses: [recipient],
    },
    Message: {
        Body: {
            Text: {
                Data: message,
            },
        },
        Subject: {
            Data: "Your Application Has Been Accepted!",
        },
    },
})
    .promise()
    .then(() => console.log("ses.sendEmail say: horrrooaayyy it worked!"))
    .catch((err) => console.log("err in ses.sendEmail", err));

}