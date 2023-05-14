import express from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Web scraper app")
})

app.post('/', (req, res) => {
    let {url, limit} = req.body

    try {

        (async () => {

            const browser = await puppeteer.launch()
            const page = await browser.newPage();
        
            await page.goto(url)
            const all = []
        
            const nav = await page.$('div.olx-pagination-wrapper ul li:last-of-type')
            const navEval = await nav.evaluate(el => el.textContent)
        
            const navTotalNumber = navEval.trim(" ")

            let totalNum = parseInt(navTotalNumber) + 2

            if (limit < totalNum && limit > 0) {
                totalNum = limit + 1;
            }
        
            for (let i = 2; i < totalNum; i++) {
        
                const products = await page.$$('.test-masonry')
        
                for (let product of products) {
                    
                    await page.waitForSelector(".smaller")
                    const priceItem = await page.evaluate(el => el.querySelector('.smaller').textContent, product)
                    await page.waitForSelector(".main-heading")
                    const nameItem = await page.evaluate(el => el.querySelector('.main-heading').textContent, product)
                    await page.waitForSelector(".listing-image-main")
                    const imageItem = await page.evaluate(el => el.querySelector('.listing-image-main').src, product)
        
                    const price = priceItem.trim(" ")
                    const name = nameItem.trim(" ")
                    
                    all.push({price, name, imageItem})
                }
        
                await page.goto(`${url}&page=${i}`)
            }

            await browser.close()
            res.status(200).json(all)
        })();

    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})