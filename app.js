const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

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
app.use(bodyparser.urlencoded({extended: true}));
app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(specs))


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
app.get("/calculator",(req, res) => {
    res.status(200).sendFile(__dirname +"/index.html");
})
/**
 * @swagger
 * /calculate:
 *  post:
 *    description: Add Oparetion of 2 numbers
 *    parameters: 
 *     - name: num1
 *       type: number
 *     - name: num2 
 *       type: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.post('/calculate',(req, res) => {
    const n1=parseInt(req.body.num1)
    console.log(parseInt(n1))
    // console.log(n1);
    const n2=parseInt(req.body.num2)
    console.log(n2)
    const add=n1 + n2;
    const multiply=n1 * n2;
    const minus = n1-n2;
    const divide = n1 / n2;
    // if( req.body.add)
    res.send('the value of '+n1 +"+"+n2+' is: '+add);
    //  if(req.body.multiply)
    // res.send('the value of '+n1 +"*"+n2+' is: '+multiply);
    // if( req.body.minus)
    // res.send('the value of '+n1 +"-"+n2+' is: '+minus);
    //  if(req.body.divide)
    // res.send('the value of '+n1 +"/"+n2+' is: '+divide);
})


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));