const jwt = require("jsonwebtoken");
const readlineSync = require("readline-sync");

console.log("Welcome to the JWT Certificate Generator Tool");
const email = readlineSync.question("What's the email for your target user: ");
const project = readlineSync.question(
  "Which project config info you want to access ? "
);
const env = readlineSync.question(
  "Which enviroment info you want to access (dev, uat or prod)? "
);
const days = readlineSync.question(
  "How much days would you need for this certificate ? "
);
const path = readlineSync.question(
  "We will use path as the token signature, What's the confg file path (e.g. gothom.dev.json) ? "
);

const jwtPayload = {
  exp: Math.floor(Date.now() / 1000) + parseInt(days) * 60 * 60,
  data: {
    email: email,
    project: project,
    path: path,
    env: env
  }
};

console.log("Thanks for your input:");
console.log("\x1b[36m%s\x1b[34m%s\x1b[0m", "payload =>", JSON.stringify(jwtPayload));
console.log("\x1b[36m%s\x1b[34m%s\x1b[0m", "signature => ", path);
const confirm = readlineSync.question(
  "Can you confirm above info before generating the token(y/n)? "
);

if ("y" === confirm.toLowerCase()) {
  var token = jwt.sign(jwtPayload, path);
  var result = jwt.verify(token, path, function(err, decoded) {
    console.log(decoded);
  });
  console.log('Your JWT Token is:');
  console.log(token);
}
