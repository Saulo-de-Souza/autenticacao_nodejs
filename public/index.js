window.onload = function (e) {
  var bt_autenticar = document.getElementById('bt_autenticar');
  var bt_logar = document.getElementById('bt_logar');
  var token;

  bt_autenticar.addEventListener('click', async function (e) {
    await fetch('/autenticar', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: 'saulomouradesouza@gmail.com', password: '123456' }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        token = json.token;
        console.log(token);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  bt_logar.addEventListener('click', async function (e) {
    await fetch('/logar', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({ email: 'saulomouradesouza@gmail.com', password: '123456' }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        console.log(json);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};
