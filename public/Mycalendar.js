class Calendar {
      
      constructor(CurrentDateObject, special=[] ){
        this.specialDays =special;
        this.UseCurrentDateObject =   new Date(CurrentDateObject );
        this.CurrentDateObject    =   new Date(CurrentDateObject ); // this not affected by change
        //console.log(  this._DaysInLetter[this.CurrentDateObject.getDay()])
        this.CurrentMonthNumber =   this.CurrentDateObject.getMonth();   // Month number from 0 - 11 ex : 0 = january
        this.CurrentMonthLetter =   this._MonthList[this.CurrentMonthNumber]  // Month Name in letter ex : Mars
          
        this.MonthLastDate      =   this.GetLastDate(this.UseCurrentDateObject )  ;  //  current month last date 
          
        this.MonthFirstDate     =   this.GetFirstDate(this.UseCurrentDateObject );  // current month first date 
        
        this.MonthLastDateNumber    = this.MonthLastDate.getDate();  // day of the month from 1 - 31 
        this.MonthFirstDateWeekNumber   =    this.MonthFirstDate.getDay();  // beginning day of the week number in the current month from 0 - 6 
          
        this.lastDateNumberWeek     =this.MonthLastDate.getDay();
         
        this.MonthFirstDateWeekLetter   = this._DaysInLetter[this.MonthFirstDateWeekNumber];
      
      }
        
      FillData(Counter, MonthBeginWithNumber, MonthEndWithNumber, dateOject, calendarObj){
           // console.log(calendarObj.specialDays );
          let special = calendarObj.specialDays.length == 0 ? null: isSpecialDay(calendarObj.specialDays,Counter-6 - MonthBeginWithNumber+1) ;
          
            if( Counter >= 0 && Counter <= 6) {
                return elt("div",{style:"width:100%;height:100%;text-align:center;"},{},e=>{},this._DaysInLetter[Counter].substr(0,3)); 
            }
            if( Counter >= 7 && Counter <= 13) { 
               
                if( MonthBeginWithNumber <= (Counter - 6)) {
                   
                   return elt("div",
                        {style:"width:100%;height:100%;text-align:center;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter-6 - MonthBeginWithNumber+1,class:special != null ? special.class+ " cell-hover":"cell-hover",title:special? special.desc:"","data-desc":special? special.desc:""},
                        {},
                        e=>{},
                        Counter-6 - MonthBeginWithNumber+1
                       )
                } 
                return elt("div",{style:"width:100%;height:100%;"},{},e=>{},"") 
            }
        
            if( Counter >= 14 && Counter <= 20) { 
                
                return elt("div",
                           {style:"width:100%;height:100%;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter - 6 - MonthBeginWithNumber+1,class:special? special.class+ " cell-hover":"cell-hover",title:special? special.desc:"","data-desc":special? special.desc:""},
                           {},
                           e=>{},
                           Counter - 6 - MonthBeginWithNumber+1)
            }
          
            if( Counter >= 21 && Counter <= 27) { 
                return elt("div",
                           {style:"width:100%;height:100%;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter - 6 - MonthBeginWithNumber+1,class:special? special.class+ " cell-hover":"cell-hover",title:special? special.desc:"","data-desc":special? special.desc:""},
                           {}
                           ,e=>{},
                           Counter - 6 - MonthBeginWithNumber+1
                          )
            }
          
            if( Counter >= 28 && Counter <= 34) {
                return elt("div",
                           {style:"width:100%;height:100%;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter - 6 - MonthBeginWithNumber+1,class:special? special.class+ " cell-hover":"cell-hover",title:special? special.desc:"","data-desc":special? special.desc:""},
                           {},
                           e=>{},
                           Counter - 6 - MonthBeginWithNumber+1
                          )
            }
          
            if( Counter >= 35 && Counter <= 41) {
                if((Counter - 6- MonthBeginWithNumber+1) >MonthEndWithNumber){
                    return elt("div",{style:"width:100%;height:100%;"},{},e=>{},"")
                } 
                return elt("div",
                           {style:"width:100%;height:100%;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter - 6- MonthBeginWithNumber+1,class:special? special.class + " cell-hover":"cell-hover" ,title:special? special.desc:"","data-desc":special? special.desc:""},
                           {},
                           e=>{},
                           Counter - 6- MonthBeginWithNumber+1
                          )
            }
            if( Counter >= 42 && Counter <= 48) { 
                if((Counter - 6- MonthBeginWithNumber+1) >MonthEndWithNumber){
                    return elt("div",{style:"width:100%;height:100%;"},{},e=>{},"")
                }  
                return elt("div",
                           {style:"width:100%;height:100%;","data-year":dateOject.getFullYear(),"data-month":dateOject.getMonth(),"data-day":Counter - 6- MonthBeginWithNumber+1,class:special? special.class+ " cell-hover":"cell-hover",title:special? special.desc:"","data-desc":special? special.desc:""},
                           {},
                           e=>{},
                           Counter - 6- MonthBeginWithNumber+1
                          )
            }
        }
        
      Builds(){
          //console.log(this.CurrentDateObject)
         let CellCounter = 0 ; 
         let  calend  = elt("div",{class:"calendar-month",style:"z-index:1;box-shadow:0px 0px;max-width:;margin:5px 10px;height:;border:1px solid green","data-calYear":this.CurrentDateObject.getFullYear(), "data-calMonth":this.CurrentDateObject.getMonth()},{onclick:e=>{ /*console.log(e)*/}},e=>{}, 
          elt("div",{class:"title",style:"background-color:;"},{},e=>{},
            elt("span",{id:"hour"},{onclick:(e)=> { }},e=>{},this.MonthDisplayed(this.CurrentDateObject))),
          elt("div",{id:"today"},{},e=>{} /*this.LIB_today(this.CurrentDateObject)*/),
          elt("table",{style:"width:100%;background-color:gainsboro; height:240px; width:230p",class:"calendar updateColor"},{},e=>{},...[...Array(7).keys()].map( (n)=>{
                        return elt("tr",{},{},e=>{},...[...Array(7).keys()].map( ()=>{
                            return elt("td",{class:this.dayNum,style:"cursor:pointer;"},
                                {onclick:(e)=>{}},this.CellHightLight,this.FillData(CellCounter++,this.MonthFirstDateWeekNumber+1,this.MonthLastDateNumber, this.CurrentDateObject ,this)
                            ); 
                            })
                        );
								
                        })
                    )); 
          return calend ;
      }
      
      CellHightLight(elt){
          let monthL =["January","February","March","April","May","June","July","August","September","October","November","December"]; 
          let e = elt.children[0];
          if(e.innerHTML  =="Sun"){
              e.style.backgroundColor="yellow";
              return ;
          }
          
          if(e.innerHTML  =="Sat"){
              e.style.backgroundColor="blue";
              e.style.color="white";
              return ;
          }
          
          if(e.innerHTML  =="Mon" || e.innerHTML  =="Tue" || e.innerHTML  == "Wed" || e.innerHTML  =="Thu" || e.innerHTML  =="Fri"){
              e.style.backgroundColor="orange";
              return ;
          }
          
          if( e.innerHTML  ==""){
              return ;
          }
          //January 1 ,2021
          //console.log(e)
          let days = new Date(monthL[e.getAttribute("data-month")] + ","+ e.getAttribute("data-day")  + " " + e.getAttribute("data-year")).getDay();
          //console.log(this)
          if(days  == 6 ){
              if(e.getAttribute("data-desc") != "" ){
                 return ;
                 }
              e.style.backgroundColor = "pink";
          }
          
          if(days  == 0 ){
             if(e.getAttribute("data-desc") !="" ){
                 return ;
             }
              e.style.backgroundColor = "red";
          }
         
      }
        
        MonthDisplayed(obj){
            
            return this._MonthList[obj.getMonth()] + " - "+ obj.getFullYear();
        }
        
        updateH(){
            let h = document.getElementById("hour");
            let that = this ;
            setInterval(function(){
              h.innerHTML=that.LIB_title(new Date());
            },10000)
        }
        setToday(){
            let d = document.getElementsByClassName(this.dayNum) ;
          //  console.log(d)
            Array.prototype.map.call(d, (elt, ind)=>{
                if(elt.innerHTML== (new Date()).getDate()){
                    //console.log(elt)
                    elt.style.backgroundColor="lightblue";
                    elt.style.fontSize=25+"px";
                    elt.style.position="absolute";
                    elt.style.padding=3+"px"
                }
            })
        }
    }

    Calendar.prototype._DaysInLetter = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    Calendar.prototype._MonthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    Calendar.prototype.GetLastDate =function (dateObj){
        let fullYear = dateObj.getFullYear();
        let month = dateObj.getMonth();
        
        return new Date(fullYear,month + 1 ,0 );
    }
   
   Calendar.prototype.GetFirstDate = function(dateObj){
        dateObj.setDate(1);
        return dateObj;
    }
   
   Calendar.prototype.dayNum= "dayNum";
