const puppeteer = require('puppeteer')



    async function pic() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://en.wikipedia.org/wiki/Fire_Emblem:_Three_Houses")
        await page.screenshot({path: "picture.png"})
        await browser.close()
    }

    pic()