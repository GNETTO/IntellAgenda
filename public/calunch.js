let combos_input = document.getElementsByClassName("combos-input");
let combos_list_year = document.getElementById("combos-list-year");
let btn_right  = document.getElementById("btn-combos-rightyear");  
let btn_left  = document.getElementById("btn-combos-leftyear"); 
let close_list  = document.getElementById("close-list")
let input_year  = document.getElementById("selected-year"); 
let calendar_month  = document.getElementsByClassName('calendar-month');
let sub_event_bl  = document.getElementById("sub-event-bl"); 
let add_rdv  = document.getElementById("add-rdv"); 
let btn_add_event  = document.getElementById("btn-add-event"); 
let block_event  = document.getElementById("block-event");
let tous_lesrdv  = document.getElementById("tous-lesrdv"); // rdv list

let selMode     = document.getElementById("selMode"); 
let modeperiod  = document.getElementById("modeperiod"); 
let modeyear    = document.getElementById("modeyear");  
let btn_today    = document.getElementById("btn-today");  
let dte_of_today    = document.getElementById("dte-of-today");  
let btn_cancel_evt   = document.getElementById("btn-cancel-evt");  

let savedEventList = ""; // store all event of a2 year 

let YearZero = 1970 ;
let YearMax = 2100 ;
let currentFullYear = new Date(Date.now() ).getFullYear() ;
let currentMonth = new Date(Date.now() ).getMonth() ;
let currentDateIndice = new Date(Date.now() ).getDate() ;
let currentSelectedYear = currentFullYear;
let currentSelectedMonth = currentMonth;console.log("cur mont "+currentSelectedMonth )
let ml = new Calendar()._MonthList ;
let rangeLeft = true ;
let daylList = new Calendar()._DaysInLetter ;/*
["January","February","March","April","May","June","July","August","September","October","November","December"];*/
Array.prototype.map.call(combos_input,elt=>{
	elt.addEventListener("focus",event=>{
		/*event.target.parentNode.nextSibling.nextSibling.style.display ="block";*/
        event.target.parentNode.nextSibling.style.display ="block"
        close_list.style.display="inline-block";
        //console.log(event.target.parentNode.nextSibling)
	})
});
btn_right.addEventListener("click",event=>{
	// search_r_list.style.display ="none"; 
    
	if( input_year.value >=2100) { input_year.value = 2100 ; alert(input_year.value); return ;} 
    
	input_year.value = parseInt(input_year.value ) + 1 ;
    currentSelectedYear = input_year.value;
    highLightCurrentMonth();
	hilightSelectedYearCombo( currentSelectedYear);
    
      $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
             savedEventList = JSON.parse(d)[input_year.value] ;
            //console.log(JSON.parse(d)[input_year.value] );
            lunch(input_year.value ,JSON.parse(d)[input_year.value]);
            displayCurrentMonth();
            ListEvent(JSON.parse(d)[input_year.value]);
            document.getElementById("bl-currentmonth").innerHTML = "";
            selMode.value=100;
            rangeLeft =false ;
            countEvent(JSON.parse(d)[input_year.value])
        }
      });
	
 }) ;
 //RGBA(236, 240, 241)
  btn_left.addEventListener("click",event=>{
	if(  input_year.value <=1970)  { input_year.value = 1970 ; return ;} 
	input_year.value = parseInt(input_year.value ) - 1 ;
      currentSelectedYear = input_year.value;
      highLightCurrentMonth();
      hilightSelectedYearCombo( currentSelectedYear);
	 $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
            savedEventList = JSON.parse(d)[input_year.value] ;
            lunch(input_year.value ,JSON.parse(d)[input_year.value]);
            displayCurrentMonth();
            ListEvent(JSON.parse(d)[input_year.value]);
            document.getElementById("bl-currentmonth").innerHTML = "";
            selMode.value=100;
            rangeLeft =false ;
            countEvent(JSON.parse(d)[input_year.value])
        }
      });
 }) ; 
//to add new event
btn_add_event.addEventListener("click", event=>{
    

   //block_event.style.display="block";
   document.getElementById("block-adds").style.display="block";
});

btn_cancel_evt.addEventListener("click", event=>{
    

   //block_event.style.display="block";
   document.getElementById("block-adds").style.display="none";
});


add_rdv.addEventListener("click", event=>{
   // console.log("ADD EVENT")
    $.ajax({
        type:"post",
        url:"/validrdv",
        data:{
            dteevt:$("#dte_event").val(),
            typeevt:$("#type_event").val(),
            titleevt:$("#title_event").val(),
            cmtevt:$("#comment_event").val()} ,
        dataType:'',
        success:function(d){
            
        }
    });
    
});

close_list.addEventListener("click",event=>{
     for(let i = 0 ; i< 120000000; i++){ }
	document.getElementById("combos-list-year").style.display ="none"; 
    close_list.style.display="none";
	
 }) ;

selMode.addEventListener("input", event=>{
    //alert(event.currentTarget.value )
    if( rangeLeft == true ){
        event.currentTarget.value =100;
        rangeLeft = false ;
        ListEvent(savedEventList);
        document.getElementById("bl-currentmonth").innerHTML = "";
    }else {
        event.currentTarget.value =0;
        rangeLeft = true ;
        ListEvent(savedEventList, currentSelectedMonth);
        let SelMonth = CurrentMonthCalendar(currentSelectedYear, ml[currentSelectedMonth],savedEventList, currentSelectedMonth); 
    document.getElementById("bl-currentmonth").appendChild ( SelMonth);
    }
   
});

btn_today.addEventListener("click", event=>{
    
    currentFullYear = new Date(Date.now() ).getFullYear() ;
    currentMonth = new Date(Date.now() ).getMonth() ;
    currentSelectedYear = currentFullYear;
    currentSelectedMonth = currentMonth;
    document.getElementById("selected-year").value = currentFullYear;
    document.getElementById("bl-currentmonth").innerHTML = "";
    ajaxCall();
    //updateSelectedTable (SelMonth)
});



document.getElementById("selected-year").value = currentFullYear;
fill_combos_list();
let search_block_year = document.getElementsByClassName('search-year-block');
ajaxCall();
hilightSelectedYearCombo(currentSelectedYear);

 //createBtnToAddEvent();
//Fill data in bl-combos-list
function lunch(y, special_days){
    document.getElementById("calendar").innerHTML = "";
    document.getElementById("calendar").appendChild(elt("div",{class:"sub-calendar-block"},{},e=>{}, FirstSemester(y,special_days),SecondSemester(y, special_days)));
 }
let memoscrol = 0 ;
function highLightCurrentMonth(){
    /*if( currentSelectedYear == currentFullYear ){
        let today = new Date(Date.now() );
        let todayMonth = today.getMonth();
        let todayYear = today.getFullYear();
        let id = todayYear +""+todayMonth ; // id of the selected .calendar-month
        let idcalendar = document.getElementById(id); 
        
           let {bottom,height,left,right,top,width,x,y}=idcalendar.getBoundingClientRect();
           //+ window.scrollY
           let hisOffsetH =(y + height)  - innerHeight; console.log(hisOffsetH)
           if ( hisOffsetH == 0 ) { hisOffsetH = memoscrol } 
           scrollWin(0, hisOffsetH ) ;memoscrol = hisOffsetH ;
           console.log("scroll top " +  window.scrollY)
        
        console.log(idcalendar.getBoundingClientRect())
    }else {
        console.log("not onload")
    }*/
}

function scrollWin(x, y) {
  window.scrollTo(x, y);
}
function FirstSemester(year, rdv){
    
        return elt("div",{class:"semester1"},{},e=>{},
                   builMonth(new Date("January 1 ,"+year).getTime(), rdv[0]),
                   builMonth(new Date("February 1 ,"+year).getTime(), rdv[1]),
                   builMonth(new Date("March 1 ,"+year).getTime(),    rdv[2]),
                   builMonth(new Date("April 1 ,"+year).getTime(),    rdv[3]),
                   builMonth(new Date("May 1 ,"+year).getTime(),      rdv[4]),
                   builMonth(new Date("Jun 1 ,"+year).getTime() ,rdv[5]) )
    }

function SecondSemester(year,rdv){
        return elt("div",{class:"semester2"},{},e=>{},
              builMonth(new Date("July 1 ,"+year).getTime(),rdv[6]),
              builMonth(new Date("August 1 ,"+year).getTime(),rdv[7]),
              builMonth(new Date("September 1 ,"+year).getTime(),rdv[8]),
              builMonth(new Date("October 1 ,"+year).getTime(),rdv[9]),
              builMonth(new Date("November 1 ,"+year).getTime(),rdv[10]),
              builMonth( new Date("December 1 ,"+year).getTime(), rdv[11])
            );
   }

// return a single a month 
function builMonth(dateTime, special, MarkId = true){
  
   return new Calendar(dateTime,special).Builds(MarkId);
}

function isSpecialDay(array,d){
    for(let special of array){
        if(special.day == d ){
            //console.log("special");
            //console.log(special);
            return Object.assign({}, special , {class:"special"} );
        }
       
    }
    return {day:"", desc:"",class:""}
}

function displayCurrentMonth(){
    
    
    //console.log(calendar_month)
    Array.prototype.map.call(calendar_month, elt=>{
    
        elt.addEventListener("click",event=>{
            resetCalendarMonthBg();
            
            console.log(elt)
            let year = event.currentTarget.getAttribute("data-calyear") ;
            let month = event.currentTarget.getAttribute("data-calmonth") ;
            
            elt.childNodes[0].style.backgroundColor="#3498DB" ; //"#34495E";
            elt.style.color="white";
            elt.style.fontSize="18px";
            currentSelectedYear=year;
            currentSelectedMonth = month ;
            modeperiod.innerHTML = ml[month] + " "+ year;
            selMode.value=0;
            rangeLeft = true ;
            
            let cmonth = CurrentMonthCalendar(year, ml[month],savedEventList, month); // Create div month
            cmonth.childNodes[0].childNodes[0].childNodes[1].innerHTML = elt.childNodes[0].childNodes[1].innerHTML
            let table = cmonth.childNodes[0].childNodes[2] ;
            table.style.backgroundColor=""
            let table_rows = table.childNodes ;
            
            ListEvent(savedEventList , month);
            
            table_rows.forEach( tr=>{ 
                //console.log("MONTH")
                tr.childNodes.forEach(td=>{
                    td.addEventListener("click",event=>{
                        let td_val = event.currentTarget.children[0].innerHTML ;
                       // console.log(td)
                        if(td_val !="" && td_val !="Sun" && td_val !="Mon" && td_val !="Tue" && td_val !="Wed" && td_val !="Thu" && td_val !="Fri" && td_val !="Sat"){
      
                        }
                        
                    })
                })
            })
            console.log(cmonth );
            updateSelectedTable (cmonth)
        
            
            // ici on envoye la table du moins selectionner
            //console.log( selectedTable );
            cmonth.style.width=""
            document.getElementById("bl-currentmonth").innerHTML = "";
            document.getElementById("bl-currentmonth").appendChild ( cmonth);
            
    });
});

}
//onload make ajax call to load calendar
function ajaxCall(){
    console.log("AJAX CALLf")
    $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
           
            //console.log(JSON.parse(d)[currentFullYear] );
            savedEventList = JSON.parse(d)[input_year.value];
            lunch(input_year.value ,JSON.parse(d)[input_year.value]);
            displayCurrentMonth();
            ListEvent(JSON.parse(d)[input_year.value], currentMonth);
            initSelectedMonth();
            selMode.value=0;
            modeperiod.innerHTML = ml[currentMonth] + " "+ input_year.value;
            
           // console.log( document.getElementById(input_year.value+ ""+currentMonth));
            
            let todayBlock =  document.getElementById(input_year.value+ ""+currentMonth) ;
            document.getElementById(input_year.value+ ""+currentMonth).childNodes[0].style.backgroundColor="#3498DB";
            
           dte_of_today.innerHTML = new Date(Date.now() );
            Array.from(todayBlock.childNodes[2].childNodes).map( (tr, x )=>{
                tr.childNodes.forEach( (td,y)=>{
                    if(td.childNodes[0].innerHTML == currentDateIndice) {
                       HilightCurrentDate(td.childNodes[0])

                    }
                })
            });
            countEvent(JSON.parse(d)[input_year.value], currentMonth);
           
             console.log(  Array.from(todayBlock.childNodes[2].childNodes) )
            
        }
    });
    
}

function HilightCurrentDate(td){
    td.style.backgroundColor="black";
    td.style.color="white";
    td.style.borderRadius="10px";
    td.style.fontSize="20px";
}
// fill combo with year + contain event click of #bl-currentmonth
function fill_combos_list(){
    for(let year = YearZero ; year <= YearMax ; year++){
      combos_list_year.appendChild(
        elt("div",{class:"search-year-block", "data-year": year,id:"_"+year},
            {onclick:function(e){

                let selectedYear  = e.currentTarget.getAttribute("data-year"); 
				document.getElementById("selected-year").value =selectedYear;
                currentSelectedYear = selectedYear;
                highLightCurrentMonth(); 
                selMode.value=100;
                rangeLeft =false ;
                $.ajax({
                    type:"get",
                    url:"/ajax",
                    data:{} ,
                    dataType:'',
                    success:function(d){
                        //console.log(JSON.parse(d)[currentFullYear] );
                        savedEventList = JSON.parse(d)[selectedYear] ;
                        lunch(selectedYear,JSON.parse(d)[selectedYear]);
                        displayCurrentMonth();
                        hilightSelectedYearCombo(selectedYear)
                        ListEvent(JSON.parse(d)[selectedYear]);
                        document.getElementById("bl-currentmonth").innerHTML = "";
                        countEvent(JSON.parse(d)[selectedYear])
                    }
                });
    
				for(let i = 0 ; i< 120000000; i++){ }
                document.getElementById("combos-list-year").style.display ="none"; 
                 close_list.style.display="none";
             } 
            },e=>{},
            elt("span",{class:"opt-list"},{},e=>{},year) /*,elt("span",{class:"opt-op"},{},e=>{},eltNS("svg",{viewbox:'0 0 24 24',height:24,width:24,fill:"black"},{},
                    eltNS("path",{d:"M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"},{},"")
                   ))*/))
        
    }

}
function CurrentMonthCalendar(year, month , specialDays =[] , monthNo){
   // console.log(specialDays)
        return elt("div",{class:"CurMonthCal", "data-CurMonthCal":1,id:year+"_"+ monthNo},{},e=>{},
                   builMonth(new Date(month +" 1 ,"+year).getTime(), specialDays[monthNo],false)
                  )
}
function resetCalendarMonthBg(){
    Array.prototype.map.call(calendar_month, elt=>{
        elt.childNodes[0].style.backgroundColor=""
        elt.childNodes[0].style.color="";
        elt.childNodes[0].style.fontSize="";
		elt.style.color="";
        elt.style.fontSize="";
    });
}

function hilightSelectedYearCombo(id){
    Array.prototype.map.call(search_block_year,elt=>{
	   elt.style.backgroundColor="";
    });
    let yearID = document.getElementById("_"+id) ;
    yearID.style.backgroundColor ="green"
}


function createBtnToAddEvent(){
   sub_event_bl.appendChild (elt("div", {style:"position:relative; bottom:0px;"},{},e=>{},elt("button", {},{onclick:e=>{add_event.style.display="block" }},e=>{},"New event")));
}

//Ici on list tous les evenements selon le mois selected ou l' année
 function ListEvent(EventArray, selMonth ="" ){
    document.getElementById("tous-lesrdv").innerHTML = "";  
    if(selMonth  == "" ){
         //alors les events de tous les années
       for(let monthNo = 0 ; monthNo <= 11 ; monthNo++){
        for(let currentMonthItem  of EventArray[monthNo]) {
          document.getElementById("tous-lesrdv").appendChild( elt("div",{class:"card-event"},{},e=>{},
                elt("div",{},{},e=>{},currentMonthItem.dte_event),
                elt("div",{},{},e=>{},
                    elt("div",{},{},e=>{},currentMonthItem.type_event),
                    elt("div",{},{},e=>{},currentMonthItem.title_event),
                    elt("div",{},{},e=>{},currentMonthItem.comment_event)
                )
               )
             )
            } 
        }   
    }else {
       let theCurrentEvent = EventArray[selMonth]
        //console.log( theCurrentEvent)
        for(let currentMonthItem  of theCurrentEvent) {
            document.getElementById("tous-lesrdv").appendChild( elt("div", {class:"card-event"},{},e=>{},
                elt("div",{},{},e=>{},currentMonthItem.dte_event),
                elt("div",{},{},e=>{},
                    elt("div",{},{},e=>{},currentMonthItem.type_event),
                    elt("div",{},{},e=>{},currentMonthItem.title_event),
                    elt("div",{},{},e=>{},currentMonthItem.comment_event)
                )
               )
             )
        }     
    }
}

function initSelectedMonth(){
    //let selMonth = document.getElementById(currentSelectedYear +""+currentSelectedMonth) ;
    let SelMonth = CurrentMonthCalendar(currentSelectedYear, ml[currentSelectedMonth],savedEventList, currentSelectedMonth); 
    updateSelectedTable (SelMonth)
    document.getElementById("bl-currentmonth").appendChild ( SelMonth);
}

function updateSelectedTable (divTab){
  let selectedTable = divTab.childNodes[0].childNodes[2].childNodes;
  selectedTable.forEach( tr=>{ 
                
    tr.childNodes.forEach(td=>{
        if(td.childNodes[0].innerHTML == currentDateIndice && td.childNodes[0].getAttribute("data-year") == currentFullYear && td.childNodes[0].getAttribute("data-month") == currentMonth ) {
             HilightCurrentDate(td.childNodes[0]);

         }
      td.addEventListener("click",event=>{
        let td_val = event.currentTarget.children[0].innerHTML ;
        if(td_val !="" && td_val !="Sun" && td_val !="Mon" && td_val !="Tue" && td_val !="Wed" && td_val !="Thu" && td_val !="Fri" && td_val !="Sat"){
            let tddata  = event.currentTarget.childNodes[0] ;
            let isodate =tddata.getAttribute("data-isodate");
            // console.log(isodate);
            let month = ml[tddata.getAttribute("data-month")] ;
            //let dte = ml[tddata.getAttribute("data-month")] ;
            let dte = tddata.getAttribute("data-day") ;
            let year =tddata.getAttribute("data-year") ;
            let newDate = new Date(month + " "+ dte +", "+ year);
            document.getElementById("dte_event").value = isodate ;
            document.getElementById("dte_string").innerHTML=newDate.toDateString();
            
            td.style.backgroundColor="black";
            td.childNodes[0].style.backgroundColor="black";
        }                
      })
    })
  })
}

function countEvent(EventArray,selMonth=""){
   let AllEventCounter = 0 ;
   
   let event_counter = document.getElementsByClassName("event-counter"); 
    //all event 
   for(let monthNo = 0 ; monthNo <= 11 ; monthNo++){
       let counter = 0 ;
       for(let currentMonthItem  of EventArray[monthNo]) {
            AllEventCounter++ ;
            counter++;
           
       } 
       if(currentSelectedMonth == monthNo ){
          //document.getElementsByClassName("single-evt-counter")[0].innerHTML = counter  + " event";
       }
       event_counter[monthNo].innerHTML = counter  + " event";
   } 
    //
   document.getElementById("all-event-counter").innerHTML =  AllEventCounter
}
elt("div", {},{},e=>{},
    elt("div",{},{},e=>{},/* date*/),
    elt("div",{},{},e=>{},
       elt("div",{},{},e=>{},/*type*/),
       elt("div",{},{},e=>{},/*title*/),
      elt("div",{},{},e=>{},/*desc*/)
       )
   );
