// apiRoutes/model.js
const puppeteer = require('puppeteer')

const router = require('express').Router();


router.get('/add/:search', async function (req, res, next){
    try{
        console.log(req.params.search)
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://en.wikipedia.org/wiki/" + req.params.search)
        await page.screenshot({path: "picture.png"})
        await browser.close()
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

module.exports = router;