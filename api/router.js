const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();
const port = 3000;
const router = express.Router();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

exports.router = router;