let combos_input = document.getElementsByClassName("combos-input");
let combos_list_year = document.getElementById("combos-list-year");
let btn_right  = document.getElementById("btn-combos-rightyear");  
let btn_left  = document.getElementById("btn-combos-leftyear"); 
let input_year  = document.getElementById("selected-year"); 
let calendar_month  = document.getElementsByClassName('calendar-month');

let YearZero = 1970 ;
let YearMax = 2100 ;
let currentFullYear = new Date(Date.now() ).getFullYear() ;
let ml = new Calendar()._MonthList ;/*["January","February","March","April","May","June","July","August","September","October","November","December"];*/
Array.prototype.map.call(combos_input,elt=>{
	elt.addEventListener("focus",event=>{
		event.target.parentNode.nextSibling.nextSibling.style.display ="block"; 
        //console.log(event.target.parentNode.nextSibling.nextSibling)
	})
});
btn_right.addEventListener("click",event=>{
	// search_r_list.style.display ="none"; 
	if(  input_year.value >=2100) { input_year.value = 2100 ; return ;} 
	input_year.value = parseInt(input_year.value ) + 1 ;
	
      $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
    
            lunch(input_year.value ,JSON.parse(d)[input_year.value]);
            displayCurrentMonth();
        }
      });
	
 }) ;
 
  btn_left.addEventListener("click",event=>{
	if(  input_year.value <=1970)  { input_year.value = 1970 ; return ;} 
	input_year.value = parseInt(input_year.value ) - 1 ;
	 $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
    
            lunch(input_year.value ,JSON.parse(d)[input_year.value]);
            displayCurrentMonth();
        }
      });
 }) ; 
 
fill_combos_list();
ajaxCall();
//Fill data in bl-combos-list
function lunch(y, special_days){
    document.getElementById("calendar").innerHTML = "";
    document.getElementById("calendar").appendChild(elt("div",{class:"sub-calendar-block"},{},e=>{}, FirstSemester(y,special_days),SecondSemester(y, special_days)));
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
function builMonth(dateTime, special){
        return new Calendar(dateTime,special).Builds();
    }

function isSpecialDay(array,d){
    for(let special of array){
        if(special.day == d ){
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
            console.log("MONTH")
            let year = event.currentTarget.getAttribute("data-calyear") ;
            let month = event.currentTarget.getAttribute("data-calmonth") ;
            elt.style.backgroundColor="#34495E";
            elt.style.color="white";
            elt.style.fontSize="18px";
            let cmonth = CurrentMonthCalendar(year, ml[month] );
            let table = cmonth.childNodes[0].childNodes[2] ;
            table.style.backgroundColor=""
            let table_rows = table.childNodes ;
            
            table_rows.forEach( tr=>{ 
                console.log("MONTH")
                tr.childNodes.forEach(td=>{
                    td.addEventListener("click",event=>{
                        let td_val = event.currentTarget.children[0].innerHTML ;
                        console.log(td)
                        if(td_val !="" && td_val !="Sun" && td_val !="Mon" && td_val !="Tue" && td_val !="Wed" && td_val !="Thu" && td_val !="Fri" && td_val !="Sat"){
                            document.getElementById("cover-wind").style.display="block";
                            //display calendar
                            document.getElementById("edition_cal").appendChild(cmonth);
                            //console.log(cmonth);
                            fillDate(table_rows);
                            //put date in #recieve-dte
                            //document.getElementById("edition_cal").i
                        }
                        
                    })
                })
            })
            //console.log(table_rows );
            document.getElementById("bl-currentmonth").innerHTML = "";
            document.getElementById("bl-currentmonth").appendChild ( cmonth);
            
    });
});

}
//onload make ajax call to load calendar
function ajaxCall(){
    console.log("AJAX CALL")
    $.ajax({
        type:"get",
        url:"/ajax",
        data:{} ,
        dataType:'',
        success:function(d){
            //console.log(JSON.parse(d)[currentFullYear] );
            lunch(currentFullYear,JSON.parse(d)[currentFullYear]);
            displayCurrentMonth();
        }
    });
     
    
}

// fill combo with year + contain event click of #bl-currentmonth
function fill_combos_list(){
    for(let year = YearZero ; year <= YearMax ; year++){
      combos_list_year.appendChild(
        elt("div",{class:"search-year-block", "data-year": year},
            {onclick:function(e){

                let selectedYear  = e.currentTarget.getAttribute("data-year"); 
				document.getElementById("selected-year").value =selectedYear;
                    
                $.ajax({
                    type:"get",
                    url:"/ajax",
                    data:{} ,
                    dataType:'',
                    success:function(d){
                        //console.log(JSON.parse(d)[currentFullYear] );
                        lunch(selectedYear,JSON.parse(d)[selectedYear]);
                        displayCurrentMonth();
                    }
                });
    
				for(let i = 0 ; i< 120000000; i++){ }
                document.getElementById("combos-list-year").style.display ="none"; 
                 
             } 
            },e=>{},
            elt("span",{class:"opt-list"},{},e=>{},year) /*,elt("span",{class:"opt-op"},{},e=>{},eltNS("svg",{viewbox:'0 0 24 24',height:24,width:24,fill:"black"},{},
                    eltNS("path",{d:"M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"},{},"")
                   ))*/))
        
    }

}
function CurrentMonthCalendar(year, month , specialDays =[]){
        return elt("div",{class:"CurMonthCal", "data-CurMonthCal":1},{},e=>{},
                   builMonth(new Date(month +" 1 ,"+year).getTime(), specialDays)
                  )
}
function resetCalendarMonthBg(){
    Array.prototype.map.call(calendar_month, elt=>{
        elt.style.backgroundColor=""
        elt.style.color="";
        elt.style.fontSize="";
    });
}
