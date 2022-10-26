// apiRoutes/model.js
const puppeteer = require('puppeteer')
const db = require('../firebase')
const { collection, onSnapshot, query, where, addDoc, updateDoc, getDocs} = require('firebase/firestore') 

const router = require('express').Router();

router.get('/add/:search', async function (req, res, next){
    try{
        console.log(req.params.search)
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://en.wikipedia.org/wiki/" + req.params.search)
        let result;
        try{
            result = await page.evaluate(() => {
                const parent = document.querySelector(".infobox").children[0]
                const length = parent.childElementCount
                let info = {}
                info.image = parent.children[1].children[0].children[0].children[0].src
                info.genre = parent.children[length - 2].children[1].children[0].innerHTML
                info.players = parent.children[length - 1].children[1].children[0].innerHTML
                return info
            })
        }
        catch (err){
            await page.goto("https://en.wikipedia.org/wiki/" + req.params.search + " (video game)")
            result = await page.evaluate(() => {
                const parent = document.querySelector(".infobox").children[0]
                const length = parent.childElementCount
                let info = {}
                info.image = parent.children[1].children[0].children[0].children[0].src
                info.genre = parent.children[length - 2].children[1].children[0].innerHTML
                info.players = parent.children[length - 1].children[1].children[0].innerHTML
                return info
            })
        }
        await page.screenshot({path: "picture.png"})
        await browser.close()
        console.log(result)
        res.send(result)
    }
    catch (err){
        next(err)
    }
})

router.post('/add', async function (req, res, next) {
    try{
        await addDoc(collection(db, 'games'), req.body)
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

router.get('/', async function (req, res, next) {
    try{
        const games = (await getDocs(query(collection(db, 'games')))).docs.map(doc => doc.data())
        console.log(games)
        res.send(games)
    }
    catch (err){
        next(err)
    }
})

module.exports = router;