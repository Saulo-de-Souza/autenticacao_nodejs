//#region IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
//#endregion

//#region  DEFINIÇÕES
router.use(express.static(path.join(__dirname, '..', 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
let myToken = '';
//#endregion

//#region ROTA AUTENTICAR
router.post('/autenticar', async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, process.env.HAS_MD5, {
    expiresIn: 10,
  });
  myToken = token;
  res.json({ token: token });
});
//#endregion

//#region ROTA LOGAR
router.post('/logar', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    jwt.verify(myToken, process.env.HAS_MD5, async (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token inválido' });
      console.log(decoded.email);
      res.json({ result: 'ok' });
    });
  } catch (err) {
    console.log('==>', err);
  }
});
//#endregion

//#region EXPORTANDO
module.exports = router;
//#endregion
