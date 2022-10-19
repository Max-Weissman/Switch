// apiRoutes/model.js
const puppeteer = require('puppeteer')

const router = require('express').Router();


router.get('/add/:search', async function (req, res, next){
    try{
        console.log(req.params.search)
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://en.wikipedia.org/wiki/" + req.params.search)
        const result = await page.evaluate(() => {
            const parent = document.querySelector(".infobox-image")
            return parent.children[0].children[0].src
        })
        await page.screenshot({path: "picture.png"})
        await browser.close()
        console.log(result)
        res.send(result)
    }
    catch (err){
        next(err)
    }
})

module.exports = router;