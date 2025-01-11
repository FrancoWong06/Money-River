const express = require('express');
const userController = require('../Controller/userController');
const router = express.Router();
const jwt = require('jsonwebtoken'); 

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


router.post('/register', userController.createUser);

router.post('/login', userController.loginUser)

router.get('/home', authenticateToken, userController.userDetails)

router.post('/addIncome', authenticateToken, userController.addIncome)

router.post('/addExpense', authenticateToken, userController.addExpense)

router.get('/incomesexpenses', authenticateToken, userController.getIncomesExpenses)

router.post('/deleteIncome', authenticateToken, userController.deleteIncomeItem)

router.post('/deleteExpense', authenticateToken, userController.deleteExpenseItem)

module.exports = router;