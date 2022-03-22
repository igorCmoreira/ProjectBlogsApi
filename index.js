const express = require('express');

const app = express();
const user = require('./controller/userController');
const login = require('./controller/loginController');
const category = require('./controller/categoriesController');

app.use(express.json());
app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/', user);
app.use('/', login);
app.use('/', category);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
