function eltNS(type,prop,methods,...children){
       let element = document.createElementNS("http://www.w3.org/2000/svg", type);
       let props = Object.keys(prop);
       for(let p of props){
           element.setAttributeNS(null,p,prop[p]);
       }
       if(methods) Object.assign(element,methods);
       for(let child of children){
           if(typeof child == "string" ||  typeof child == "number" || child ==null) {element.appendChild(document.createTextNode(child))}
           else {element.appendChild(child)}
           //console.log(element);
       }
       return element ;
   }
   function elt(type,prop  ,methods ,cb ,...children){
       let element = document.createElement(type);
       let props = Object.keys(prop);
       for(let p of props){
           element.setAttribute(p,prop[p]);
       }
       if(methods) Object.assign(element,methods);
       for(let child of children){
           if(typeof child == "string" ||  typeof child == "number" || child ==null) {element.appendChild(document.createTextNode(child))}
           else {element.appendChild(child)}
           //console.log(element);
       }
       cb(element);
       return element ;
   } 
    
