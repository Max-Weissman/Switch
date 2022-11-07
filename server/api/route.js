// apiRoutes/model.js
const puppeteer = require('puppeteer')
const db = require('../firebase')
const { collection, query, where, doc, addDoc, getDocs, updateDoc, getDoc} = require('firebase/firestore') 

const router = require('express').Router();

router.post('/add/owner', async function (req, res, next) { //Adds a new owner
    try{
        const name = req.body.name
        await addDoc(collection(db, 'owners'), req.body)
        let games = await getDocs(collection(db, 'games'))
        const newOwner = {}
        newOwner[name + 'Own'] = false
        newOwner[name + 'Complete'] = false
        games.forEach(async game => { //adds each owner to each game as potential owner and completer
            await updateDoc(doc(db, 'games', game.id), newOwner)
        })
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

router.get('/add/:search', async function (req, res, next){ //puppeteer tool that searches wikipedia and scrapes for info on a game
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

router.post('/add', async function (req, res, next) { //add game data onto the database
    try{
        await addDoc(collection(db, 'games'), req.body)
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

router.put('/own', async function (req, res, next) {
    try{
        const id = (await getDocs(query(collection(db, "games"), where("title", "==", req.body.info.title)))).docs[0]
        const game = id.data()
        await updateDoc(doc(db, 'games', id.id), {[req.body.owner + "Own"]: !game[req.body.owner + "Own"]})
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

router.put('/complete', async function (req, res, next) {
    try{
        const id = (await getDocs(query(collection(db, "games"), where("title", "==", req.body.info.title)))).docs[0]
        const game = id.data()
        await updateDoc(doc(db, 'games', id.id), {[req.body.owner + "Complete"]: !game[req.body.owner + "Complete"]})
        res.sendStatus(200)
    }
    catch (err){
        next(err)
    }
})

router.get('/', async function (req, res, next) { //grab games from database
    try{
        const games = (await getDocs(query(collection(db, 'games')))).docs.map(doc => doc.data())
        const owners = (await getDocs(query(collection(db, 'owners')))).docs.map(doc => doc.data())
        console.log(games)
        res.send({games, owners})
    }
    catch (err){
        next(err)
    }
})

module.exports = router;