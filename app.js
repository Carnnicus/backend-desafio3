import express from 'express'

import ProductManager from './productManager.js'

const app = express()

const prods = new ProductManager();

app.get('/products', (req, res) => {
    const { limit } = req.query
    prods.getProducts().then(products => {
        const limitProducts = products.slice(0, limit)
        res.send(limitProducts)})
        .catch(err => res.status(500).send(err))
})

app.get('/products/:id', (req, res) => {
    prods.getProductsById(req.params.id).then(product => {
        res.send(product)
    })
    .catch(err => res.status(500).send(err))
})



app.listen(8081, () => {
    console.log('Im Listening........')
})