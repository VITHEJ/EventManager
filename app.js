require('dotenv').config();

const  express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const ejs=require("ejs");
const Event=require('./schema/event.js');
const Host=require('./schema/host.js');
const User=require('./schema/user.js');
const uuid  = require('uuid');

const wrapAsync= require("./views/utils/wrapAsync.js");
const ExpressError=require("./views/utils/expressError.js");
const signup_hostSchemma=require("./schema.js");
const signup_userSchemma=require("./schema.js");
const eventSchemma=require("./schema.js");
const session=require('express-session');
const methodOverride = require('method-override')
const logincheck=require("./views/utils/logincheck.js");
const flash=require('connect-flash');
const cookieparser=require("cookie-parser");
var engine = require('ejs-mate');
const dbUrl=process.env.DB_URL;
const secret=process.env.SECRET;
app=express();
const multer  = require('multer');
const { multerStorage, uploadBufferToCloudinary } = require('./cloudconfig.js');
const upload = multer({ storage: multerStorage });
const MongoStore=require("connect-mongo").default;
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
  mongoose.connect(dbUrl)
  .then(() => console.log('Connected!'));


 

  const store=MongoStore.create({
      mongoUrl:dbUrl,
      crypto:{
          secret:secret,
      },
      touchAfter:24*60*60
  });
  store.on('error',()=>{
  console.log('session store error');
  });
const sessionOptions={
    store,
    secret:secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now+7*24*60*1000,
        maxAge:7*24*60*1000,
        httpOnly:true,
    }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(cookieparser('vithejkumar'));
app.use(async(req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUserEmail=req.signedCookies.email;
    next();    
});
app.use((req, res, next) => {
    if (req.session) {
        req.session.previousPage = req.headers.referer || req.session.previousPage;
    }
    next();
});


let port=3000;
//vadiation 

let validateEvent=(req,res,next)=>{
    let {error}=eventSchemma.validate(req.body);
    if(error){
         let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errmsg);
    }else{
        next();
    }
   

}
//home route

app.get("/",(req,res)=>{
    res.render("../views/home.ejs");
})
//signup
app.get("/signup",(req,res)=>{
    res.render("../views/signup.ejs");
})
//signup user
app.get("/signup_user",(req,res)=>{
    res.render("../views/signup_user.ejs");
})
//post route of signup user
app.post("/signup_user",wrapAsync(async(req,res)=>{
 console.log(req.body);
 let id=uuid.v4();
 console.log(id);
 let {name,college,branch,year,rollno,phone,email,password}=req.body;
 let details= await User.insertMany([{
   
    name:name,
    college:college,
    branch:branch,
    year:year,
    rollno:rollno,
    phone:phone,
    email:email,
    password:password
 }]);
 console.log(details);
 
 
 let userid=details[0]._id.toString();
 res.cookie("email",details[0].email,{signed:true});
      
req.flash("success",`Welcome  ${details[0].name} to Event Manager as Participant`);
    res.redirect(`/participant/${userid}`);

 

}))
//signup host
app.get("/signup_host",wrapAsync(async(req,res)=>{

    res.render("../views/signup_host.ejs");
}))
//post route of signup host
app.post("/signup_host",wrapAsync(async(req,res)=>{
 console.log(req.body);
     let {name,college,phone,email,password}=req.body;
    let details= await Host.insertMany([{
        name:name,
        college:college,
        phone:phone,
        email:email,
        password:password

    }]);
    console.log(details[0]);
    let hostid=details[0]._id.toString();
    res.cookie("email",details[0].email,{signed:true});
      
req.flash("success",`Welcome  ${details[0].name} to Event Manager as Coordinator`);
    res.redirect(`/coordinator/${hostid}`);
    
   
 

}))
//add event by coordinator
app.get("/addevent",logincheck,(req,res)=>{
    res.render("../views/eventForm.ejs");
})
//post the event db
app.post("/addevent",logincheck, upload.single("image"),wrapAsync(async(req,res)=>{
 if (!req.file) return res.status(400).send('Image required');

    // upload buffer to Cloudinary
    const filename = `event_${Date.now()}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, filename);

    let event = new Event(req.body);
    let { prize1, prize2 } = req.body;
    event.image = { url: result.secure_url || result.url, filename: result.public_id };
    event.prize = [prize1 || '', prize2 || ''];
    let emailHost=req.signedCookies.email;
 console.log(emailHost);
 
 let detail=await Host.findOne({email:emailHost});
 let id=detail._id.toString();
 console.log(id);
 event.hostedBy=id;
    await event.save();
    console.log(event);
    
  res.redirect(`/coordinator/${id}`);

}));
//edit event
app.get("/participants/:id/edit",logincheck,wrapAsync(async(req,res)=>{
    
    let id=req.params;
     let eventDetails=await Event.findById(id.id);
    res.render("../views/editEvent.ejs",{eventDetails});
 
}));
//update the event
app.patch("/addevent/:id/",logincheck, upload.single("image"),wrapAsync(async(req,res)=>{
  let {id} = req.params;
    let event = await Event.findByIdAndUpdate(id, {...req.body});

    if(typeof req.file !== "undefined") {
        const filename = `event_${Date.now()}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, filename);
       event.image = { url: result.secure_url || result.url, filename: result.public_id };
        await event.save();
    }

 console.log(req.body);
 req.flash("success",'Updated the Event Successfully')
res.redirect(`/coordinator/${event.hostedBy}`);


}))
//delete event
app.delete('/participants/:id',logincheck,wrapAsync(async(req,res)=>{
let {id}=req.params;
 let event = await Event.findByIdAndDelete(id);
 console.log(event);
 req.flash("success",'Deleted the Event Successfully')
res.redirect(req.session.previousPage);

}))
//register to event
app.get('/registerEvent/:id',logincheck,async(req,res)=>{
    let {id}=req.params;
   
    let event=await Event.findById(id);
    let emailHost=req.signedCookies.email;
 console.log(emailHost);
 
 let detail=await User.findOne({email:emailHost});
 console.log(detail);
 let iduser=detail._id.toString();
 console.log(iduser);

  
    await detail.save();
    console.log(detail);
    if(!event.registeredParticipants.includes(detail._id)){
        event.registeredParticipants.push(iduser);
    await event.save();
    }
 
 console.log(event);
 

 req.flash("success",`Registered to ${event.name} Successfully `)
 res.redirect(`/participant/${iduser}`);
 

})

//cancel registation for an event
app.get("/cancelRegisteration/:id",logincheck,async(req,res)=>{
    let {id}=req.params;
    let event=await Event.findById(id);
    console.log(event);
    let useremail=req.signedCookies.email;
    let user=await User.find({email:useremail});
        event.registeredParticipants.pop( user[0]._id);
    await event.save();
    console.log(event);
    req.flash("success",`Cancelled Registration for ${event.name} Successfully `)
    res.redirect(`/participant/${user[0]._id.toString()}`);
})


//participant registered for an  specific event
app.get("/participants/:id",logincheck,async(req,res)=>{
let id=req.params;
let details=await Event.findById(id.id);

let participants=details.registeredParticipants;
console.log(participants);
let result=[];
for(let i=0;i<participants.length;i++){
    let userid=participants[i];
    let userdetails=await User.findById(userid.toString());
    result.push(userdetails);
}


res.render("../views/details.ejs",{result});
});

//coordinator
app.get("/coordinator/:id",logincheck,async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let details=await Host.findById(id);
     let events= await Event.find({hostedBy:id});
res.render("../views/coordinator.ejs",{details,events});
})
//partcipant
app.get("/participant/:id",logincheck,async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let details=await User.findById(id);
     let events= await Event.find();
res.render("../views/participant.ejs",{details,events});
})

//login
app.get("/login",(req,res)=>{
    res.render("../views/login.ejs");
})
//authenticate the user/host
app.post("/login",wrapAsync(async(req,res)=>{
    let {email,password,person}=req.body;
    console.log(req.body);
    if(person==="Coordinator"){
         let details=await Host.find({email:email});
         
    console.log(details);
    if(details[0].email==email&&details[0].password==password){
         res.cookie("email",details[0].email,{signed:true});
      

         res.redirect(`/coordinator/${details[0]._id}`);

    }else{
        
        req.flash('error','Enter Valid Details')
        res.redirect("/login");
    }
    }
    if(person==="Participant"){
        let details= await User.find({email:email});
    console.log(details);
    if(details[0].email==email&&details[0].password==password){
         res.cookie("email",details[0].email,{signed:true});
        
         res.redirect(`/participant/${details[0]._id}`);
    }else{
        req.flash('error','Enter Valid Details')
        res.redirect("/login");
    }
   
    }
   
    
}));
//logout
app.get('/logOut',(req,res)=>{
    res.clearCookie("email");
    req.flash("success",'LogOut Successfully');
    res.redirect('/');
})
/*app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'page not found'));

})
*/
app.use((err,req,res,next)=>{
    let {status=404,message='page not found'}=err;
    res.status(status).render("../views/error.ejs",{message});
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});