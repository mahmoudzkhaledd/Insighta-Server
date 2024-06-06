const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');

exports.editWebsite = asyncHandeler(async (req, res, next) => {
    
    
    const { name, available, userId } = req.body;
    let parsedUrl = (new URL(`${req.body.url}`)).origin;
  
    try {
        const website = await Website.findOneAndUpdate({
            _id: req.params.id,
            userId: userId,
        }, {
            name,
            url: parsedUrl,
            available,
        }, { new: true });
        console.log(website);
        return res.status(200).json({ website });
    } catch (ex) {
        return res.sendStatus(500);
    }
});