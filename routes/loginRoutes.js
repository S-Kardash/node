const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('admin', { error: '' })
})

router.post('/', (req, res) => {
  const { login, password } = req.body
  if (login === "savkabakery@gmail.com" && password === "Savka2023") {
    req.session.user = login

    res.redirect('/deshychi_admin')
  } else {
    res.render('admin', { error: 'Невірний логін або пароль' })
  }
})

module.exports = router
