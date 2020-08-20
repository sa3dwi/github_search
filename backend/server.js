require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs/openApiDocumentation');


const apiRoutes = require('./routes/api');

//setup port constants
const PORT = process.env.PORT || 5000;

//configure express server
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});