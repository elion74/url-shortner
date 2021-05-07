const router = require('express').Router();
const Url = require('../models/url_model.js');

const validUrl = require('valid-url');
const { nanoid } = require('nanoid')

router.post('/longurl', async (req, res) => {
    
    let url = req.body.longurl;
    if(url ==""){
        return;
    }
     
    console.log("longurl:" + url);

    if (validUrl.isUri(url)){
        console.log('Looks like an URI');

        let hash = nanoid(10)
        let shorturl = `${process.env.DOMAIN_NAME}/${hash}`;    
        console.log(shorturl)

        const urls = new Url({
            longurl:url, 
            shorturl:shorturl, 
            created: new Date()
        })

        try{
        
            let result = await urls.save();
             
            res.status(201).send({'results':result});

        }catch(e){
            res.status(500).send({'error': e});
        }


    } else {
        res.status(400).send({ 'message':"please enter a valid url"});
    }

});



module.exports = router;