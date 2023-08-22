// const paymentRoute = require("./routes/paymentRoutes.js");
const crypto = require("crypto");
var instance = require( './controller/Razorpay')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');


const userControler = require('./controller/user')
// const collection = require('./togglesign')
// const collection2 = require('./togglesignup')

require('./Confi')
const information = require('./Contactus')
const Reserv = require('./Reservation')


const cors=require('cors');
const { Collection } = require('mongoose')
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());


app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/build")))




app.listen(process.env.PORT || 5000);

// contact us  detail 
app.post('/contact', async(req, res) => {
  console.log('Hello World!')
let info = new information({
    name:req.body.name,
    email:req.body.email,
    text:req.body.text


  })
  info = await info.save()
console.log(info)
res.send('lets go')
})

// resevation 
app.post('/Reservation', async(req, res) => {
  console.log('Hello World!')
let info = new Reserv({
    name:req.body.name,
    mail:req.body.mail,
    checkin:req.body.checkin,
    checkout:req.body.checkout,
    guest:req.body.guest,
    yourmessage:req.body.yourmesssage
  })
  info = await info.save()
console.log(info)
res.send('lets go')
})


app.post('/signup' , userControler.signup)
app.post('/signin' , userControler.signin)


// app.post('/Authentication' , async(req,res)=>{

//   try{
//     const check=await collection.findOne({email:req.body.email})

//     if(check){
//       res.json("exist")
//     }
//     else{
//       res.json("notexist")
//       console.log("yess")
//     }
//   }
//   catch(e){
//     res.json("notexist")
//   }
// })


// app.post("/signup" , async(req,res)=>{

  

//     const check=await collection2.findOne({email:req.body.email})

//     if(check){
//       res.json("exist")
//       console.log("exist")
 
//     }
//     else{
      
//   var data=new collection2({
//     name:req.body.name,
//     email:req.body.email,
//     password:req.body.password
//   })
//   data= await data.save()
//   res.json("Notexist")
//   console.log("Notexist")
//     }
  
  
// })

// app.post("/signin",async(req,res)=>{
// const data= await collection2.findOne({email:req.body.email})
// if(data){
//   if(req.body.password==data.password){
//     res.json("sucess")
//     console.log("success")
    
//   }
//   else{
//     res.json("sorry")
//     console.log("sorry")
//   }
// }
// else{
//   res.json("nothing exist")
//   console.log("nothing exist")
 
// }
// })

app.post('/Order',async(req,resp)=>{
  const option={
      amount:5000,
      currency:"INR"
  };
  const order= await instance.orders.create(option)
  console.log(order)
  resp.status(200).json({
      success:true,
      order,
  })
})

app.get('/key',(req,resp)=>{
  resp.json({key:'rzp_test_OmCfFJhnp3Fztn'})

})
app.post('/verification', async (req, resp) => {
  const {razorpay_order_id , razorpay_payment_id , razorpay_signature} =
req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;
req.body;

const expectedSignature = crypto
.createHmac("sha256" , 'wyTuLIkM1pDzjPnYg9E3NV6E')
.update(body.toString())
.digest("hex")

const isAuthentic = expectedSignature === razorpay_signature;

if(isAuthentic){
  resp.redirect('http://localhost:3001')
}
else{
  resp.status(400).json({
    success:false,
      
    })
}


resp.status(200).json({
  success:true,
    
  })
});
