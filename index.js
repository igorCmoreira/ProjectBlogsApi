const express = require('express');

const app = express();
const user = require('./controller/userController');

app.use(express.json());
app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/', user);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
