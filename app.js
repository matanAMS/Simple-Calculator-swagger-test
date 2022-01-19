const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const exp = require('constants');
const { request } = require('https');
const { Http2ServerRequest } = require('http2');
const { Add, Multiply, Minus, Divide } = require('./functions/myFunction.js')

const PORT = process.env.PORT || 4000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Calculator API",
            version: "1.0.0",
            description: "A simple Express Calculator API",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["app.js"],
};

const specs = swaggerJsDoc(options);

//parses incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// Routes
/**
 * @swagger
 * /calculator:
 *  get:
 *    description: Use to request all operations
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/calculator", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html");
})
/**
 * @swagger
 * /calculate:
 *  post:
 *    description: Add Oparetion of 2 numbers
 *    parameters:
 *       - name: number 1#
 *         type: integer      
 *    responses:
 *      '200':
 *        description: A successful response
 */

// exports.Add = Add

app.post('/calculate', (req, res) => {
    const n1 = Number(req.body.num1)
    console.log(Number(req.body.num1))
    const n2 = Number(req.body.num2)

    if (req.body.add) {
        const add = Add(n1, n2)
        res.send('the value of ' + n1 + "+" + n2 + ' is: ' + add);
    }
    if (req.body.multiply) {
        const multiply = Multiply(n1, n2);
        res.send('the value of ' + n1 + "*" + n2 + ' is: ' + multiply);
    }
    if (req.body.minus) {
        const minus = Minus(n1, n2);
        res.send('the value of ' + n1 + "-" + n2 + ' is: ' + minus);
    }
    if (req.body.divide) {
        const divide = Divide(n1, n2);
        res.send('the value of ' + n1 + "/" + n2 + ' is: ' + divide);
    }
})


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));




