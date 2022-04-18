const Customer = require('./models/customer-model.js')

const seedData = require('./customerSeed.json')

Customer.deleteMany({})
.then( () => {
    return Customer.insertMany(seedData)
})
.then(console.log)
.catch(console.error)
.finally(() => {process.exit()})

