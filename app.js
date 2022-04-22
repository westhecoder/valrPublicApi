const express = require('express')
const pool = require('./db')

const app = express()
//app.use(express.json())



//Get all currencies
app.get('/currency', async(req, res) => {
    
    try {
        const currencies = await pool.query('SELECT * FROM currencies')
        res.status(200).json(currencies.rows)
       
    } catch (err) {
        console.log(err.message)
    }
})

//Get active currencies
app.get('/currency/active', async(req, res) => {
    
    try {
        const currencies = await pool.query(
            'SELECT * FROM currencies WHERE isactive = true')
        res.status(200).json(currencies.rows)
       
    } catch (err) {
        console.log(err.message)
    }
})

//Get all currency pairs
app.get('/currency/pairs', async(req, res) => {
    try {
        const currencyPairs = await pool.query(
            'SELECT symbol, basecurrency, quotecurrency, shortname, active FROM currencypairs')
        res.status(200).json(currencyPairs.rows)
    } catch (err) {
        console.log(err.message)
    }
})


//Get all available order types
app.get('/currency/ordertypes', async(req, res) =>{
    
    try {
        const orderTypes = await pool.query('SELECT * FROM ordertypes')
        res.status(200).json(orderTypes.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//Get order types of a pair
app.get('/currency/:pair/ordertypes', async(req, res) =>{
    const { pair } = req.params

    try {
        const orderTypes = await pool.query(
            'SELECT * FROM ordertypes WHERE currencyPair = ($1)', [pair])

        res.status(200).json(orderTypes.rows)
    } catch (err) {
        console.log(err.message) 
    }
})

//Get market summary
app.get('/currency/marketsummary', async(req, res) => {
    try {
        const marketSummary = await pool.query('SELECT * FROM marketsummary')
        res.status(200).json(marketSummary.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//Get market Summary of a pair
app.get('/currency/:pair/marketsummary', async(req, res) => {

    const {pair} = req.params

    console.log(req.params)
    
    try {

        const pairSummary = await pool.query(
            'SELECT * FROM marketsummary WHERE currencypair = ($1)', [pair])

        res.json(pairSummary.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.use((req, res) => {
    res.status(404).send('Request Unknown')
})

const port = 3000
const time = new Date().toLocaleTimeString()

app.listen(port, () => {
    console.log(`Public API Server Started at port ${port} at ${time}`)
})