


const cors = require("cors")
const express = require('express');
const axios = require('axios');
require("dotenv").config()

const {OpenAIApi,Configuration} = require("openai")

const configuration = new Configuration({
  apiKey:process.env.API_KEY
});

const openai = new OpenAIApi(configuration)






const app = express();
app.use(cors())
// const port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Page is working')
})

app.post("/send",(req,res)=>{
  let {data} = req.body
  // console.log(req.body)
  // console.log(data)
  try {
    async function runComplate(data){
      const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:data,
        max_tokens:2048,
        temperature:1,
      });
      res.send(completion.data.choices[0].text);
    }
    runComplate(data)
  } catch (error) {
    res.send(
      'error'
    )
  }
})






app.listen(8080, () => {
  console.log(`Server running on port ${8080}`);
});
