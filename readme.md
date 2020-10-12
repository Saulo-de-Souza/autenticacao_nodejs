# Autenticação no Node JS com JWT

### IMPORTAÇÃO E DECLARAÇÃO:

```JS
const jwt = require('jsonwebtoken');
let myToken = '';
```

```JS
router.post('/autenticar', async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, process.env.HAS_MD5, {
    expiresIn: 10,
  });
  myToken = token;
  res.json({ token: token });
});
```

### LOGAR:

```JS
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
```
