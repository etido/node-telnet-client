module.exports = function(req, res, next) {

    var Randomkeyidgenerator = require('./uuid.js');
    var randomkeyidgenerator = new Randomkeyidgenerator();
    req.randomkeyid = randomkeyidgenerator.generateTimeBased();
    req.starttime = process.hrtime(); // reset the timer
    next();
}