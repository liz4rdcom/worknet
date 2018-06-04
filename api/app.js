const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const umpack = require('./umpack')

const app = express()

const umpackPlus = require('./routes/umpack.plus')
const vacancies = require('./routes/vacancies')
const users = require('./routes/users')
const skills = require('./routes/skills')
const occupations = require('./routes/occupations')
const desirableTrainings = require('./routes/desirable.trainings')
const libs = require('./routes/libs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(express.static('../public/dist'))

app.use(umpackPlus.baseUrl, umpackPlus.router)

app.use('/um', umpack.router)

app.use(vacancies.baseUrl, vacancies.router)
app.use(users.baseUrl, users.router)
app.use(skills.baseUrl, skills.router)
app.use(occupations.baseUrl, occupations.router)
app.use(desirableTrainings.baseUrl, desirableTrainings.router)
app.use(libs.baseUrl, libs.router)

app.use((response, req, res, next) => {
  // TODO logs
  if (response.error) {
    console.error(response.error)
    let statusCode = response.error.statusCode || 500
    let errorMessage = response.error.message || 'დაფიქსირდა შეცდომა'
    return res.status(statusCode).send({ message: errorMessage, error: response.error })
  }
  res.send(response.result)
})

app.get('*', (req, res) => res.redirect('/'))

app.listen(config.get('port'), () => console.log('started'))
