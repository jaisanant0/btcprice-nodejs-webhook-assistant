'use strict'; 

process.env.DEBUG='actions-on-google:*'; 

// We need the Assistant client for all the magic here 
const Assistant = require('actions-on-google').ApiAiAssistant; 
// To make our http request a bit nicer) 
const request = require('request');
//Some variables we will use in this example 
const ACTION_PRICE='price';
const ACTION_TOTAL='total'; 
const EXT_BITCOIN_API_URL = "https://blockchain.info"; 
const EXT_PRICE ="/q/24hrprice";
const EXT_TOTAL ="/q/totalbc";
//[START bitcoin info] 
exports.dialogflowFirebaseFulfillment = (req, res) => {
    const assistant=new Assistant({request: req, response:res});
    console.log('bitcoinInfoAction Request headers: ' + JSON.stringify(req.headers));
    console.log('bitcoinInfoAction Request body: ' + JSON.stringify(req.body));
    // Fulfill price action business logic 
    function pricehandler(assistant) { 
        request(EXT_BITCOIN_API_URL + EXT_PRICE, function(error,response,body) {
            //The fulfitlment logic for returning the bitcoin c DLL
            console.log("priceHandler response: " + JSON.stringify(response) + "Body :" + body);
            const msg =  "Right now the price of bitcoin " + body + "USD";
            assistant.tell(msg);
        });
    }
        const actionMap=new Map();
        actionMap.set(ACTION_PRICE,pricehandler);
        
        assistant.handleRequest(actionMap)
}

            
            
