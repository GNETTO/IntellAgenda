let mongoose   = require("mongoose");
let express    = require("express");
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let template = require("handlebars");
let cookieParser = require("cookie-Parser") ;
let fs = require("fs");
let rdv = require("./model/calModel");
let test= require("./model/testModel");
var mongoDB  ='mongodb://127.0.0.1/calendar';


mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  } );
var db = mongoose.connection;
db.on('open', ()=>{console.log("Connected successfully to database ")});
db.on('error', (e)=>{console.log( e)}) ;

let app=express();
app.use(express.static("public"));
app.set("views",__dirname +"/views/");
app.set("view engine","hbs");
app.engine("hbs",handlebars({
    extname:"hbs",
    defaultLayout :"template",
    layoutsDir:__dirname +"/views/",
    partialsDir : __dirname+"/views/partials/"
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("calendar");
});


let calendar_event  = {};
for(let y = 1970 ; y <= 2100 ; y ++){
    calendar_event[y]=[ [],[],[],[],[],[],[],[],[],[],[],[]];
}


app.get("/ajax", (req, res)=>{
    for(let y = 1970 ; y <= 2100 ; y++){
        calendar_event[y]=[ [],[],[],[],[],[],[],[],[],[],[],[]];
    }
    console.log("Ajax");
    rdv.find().then(data=>{
        //console.log(data);
        
        for(let rdv of data){
            //console.log(rdv)
            let rdv_info ={};
            if(rdv.dte_event == null ){
                continue ;
            }
           let utcDate   = rdv.dte_event.getUTCDate() ;
           let utcDay    = rdv.dte_event.getUTCDay();
           let utcMonth  = rdv.dte_event.getUTCMonth() ;
          let utcYear   = rdv.dte_event.getUTCFullYear() ;
            rdv_info.day = utcDate ;
            rdv_info.desc = rdv.title_event;
            rdv_info.type_event = rdv.type_event;
            rdv_info.dte_event = rdv.dte_event;
            rdv_info.comment_event = rdv.comment_event;
            rdv_info.title_event = rdv.title_event
            calendar_event[utcYear][utcMonth].push(rdv_info);
        }
       // console.log( calendar_event[1985])
        res.end(JSON.stringify(calendar_event)); 
    }) .catch(error=>{
        console.log(error)
    })
    //res.end("end");
});

app.post("/validrdv", (req, res)=>{
   //console.log(req.body);
   let new_rdv = new rdv({
       dte_event: req.body.dteevt,
       type_event:req.body.typeevt ,
       title_event:req.body.titleevt,
       comment_event :req.body.cmtevt
   });
    
    new_rdv.save().then(rdv=>{
       // console.log(rdv)
    }).then(failure=>{
        return console.log(failure)
    });
    

    res.end("end")
});

app.get("/newcalendar", (req, res)=>{
   rdv.find({dte_event:{$lte:new Date()} }).
       sort({dte_event:-1}).
        then(sortedEvent=>{
          let customrdv = sortedEvent.map(d=>{
            return {
                dte: d.dte_event,
                type : d.type_event ,
                title:d.title_event,
                comment:d.comment_event
                }
            });
            res.render("newcalendar", {tous_rdv:customrdv}); 
        })
      
     
    /*}) .catch(error=>{
        return console.log(error)
    })*/
  
});


app.get("/icon",(req,res)=>{
    res.render("svg-icons");
});

app.get("/test",(req,res)=>{
    res.render("test");
});

app.get("/test2",(req,res)=>{
    res.render("test2");
});
app.listen(5000,()=>{
    console.log("Server is running in port 5000 ....");
});

/*{ "_id" : ObjectId("6046492c36ea4c358c7e448e"),
    "dte_event" : ISODate("1985-05-02T00:00:00Z"),
    "type_event" : "Fete", 
    "title_event" : "Mon anniversaire",
    "comment_event" : "Je me sens tres bien dans cette vie",
    "__v" : 0 }*/
