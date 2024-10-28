const express = require('express');
require('dotenv').config()
const app = express();
const port = 3000;
const cors=require('cors');

app.use(express.json())
app.use(cors({

    origin:['http://localhost:5173']
}
));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@business-management.jnao5.mongodb.net/?retryWrites=true&w=majority&appName=Business-Management`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


const usersCollection = client.db("BusinessManagement").collection("users");
app.get("/",async (req,res)=>{
   res.send("server is crawlinggggg")
})

app.post("/login", async (req,res) => {
    const {username,password}=req.body;
    const query={username,password}
    const result=await usersCollection.find(query).toArray();
    if(result.length===0){
        res.send({userFound:false,message:"User not found"})
    }else{
        res.send({userFound:true,result})
    }
    
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})