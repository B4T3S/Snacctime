const { faker } = require('@faker-js/faker')
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')

// --== BASIC SETUP ==--
const USER_COUNT = 20
const ARTICLE_COUNT = 50

// --== CONNECT TO THE DATABASE ==--
let db = new sqlite3.Database('./docker/pb_data/data.db', err => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the SQlite database.')
})

// --== SEED USERS ==--
for (let i = 0; i < USER_COUNT; i++) {
  const person = [
    faker.string.alphanumeric(16),
    faker.person.fullName(),
    faker.internet.userName(),
    faker.internet.email(),
    bcrypt.hashSync(faker.internet.password(), 12),
    faker.string.alphanumeric(40),
    true,
  ]
  db.run(
    `INSERT INTO users(id,name,username,email,passwordHash,tokenKey,verified) VALUES(?,?,?,?,?,?,?)`,
    person,
    function (err) {
      if (err) {
        return console.log(err.message)
      }
      console.log(`ROW ${this.lastID} - NAME ${person[1]}`)
    }
  )
}

// --== SEED ARTICLES ==--
for (let i = 0; i < ARTICLE_COUNT; i++) {
  const article = [
    faker.string.alphanumeric(16),
    'Snack',
    faker.commerce.product(),
    faker.finance.amount({ min: 1, max: 20 }),
  ]
  db.run(
    `INSERT INTO articles(id,category,name,price) VALUES(?,?,?,?)`,
    article,
    function (err) {
      if (err) {
        return console.log(err.message)
      }
      console.log(`ROW ${this.lastID} - ART. NAME ${article[2]}`)
    }
  )
}

// --== DIUSCONNECT FROM THE DATABASE ==--
db.close(err => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Closed the database connection.')
})
