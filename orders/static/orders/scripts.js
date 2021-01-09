



if (JSON.parse(localStorage.getItem('cart'))==null){
var cart = {}//empty cart object 
var itemNum=0;//counting the items  in cart object
}else{
     var cart = JSON.parse(localStorage.getItem('cart'));
     for(itemNum in cart){ //open up object contents
     item=cart[itemNum]; 
     meal(item) 
     itemNum++;
     }
     document.addEventListener('DOMContentLoaded', function (){
     document.querySelector("#orderbutton").classList.remove("visibility");
     document.querySelector("#add").classList.remove("visibility");
     });
    
}




 function meal(item) {
  const li=document.createElement("li"); 
  const objectkeys=Object.keys(item);
  for( i=0; i< objectkeys.length; i++){
  if (objectkeys[i] === "name"){
              const a=document.createElement("a"); //create links for deletion for specific item
              const linktext=document.createTextNode("Delete"); 
              a.appendChild(linktext);
              a.href =itemNum; //to know wich item to delete
               a.setAttribute('data-number', itemNum);
               a.setAttribute('class', 'deletelink');
              li.innerHTML=item[objectkeys[i]];
              li.appendChild(a);
              document.addEventListener('DOMContentLoaded', function (){
              document.querySelector("#itemList").append(li);
              document.querySelector("#itemList").append(a); 
              });
  } else {
        const ul=document.createElement("ul");
        li.appendChild(ul);
        const nestedli=document.createElement("li");
        nestedli.innerHTML=item[objectkeys[i]];
        ul.append(nestedli);
  }

  }         

}


var numToppings; // the number of toppings the pizza should have 
function addpizza() {
   let id=event.srcElement.id
   var all=document.querySelectorAll(`input[name=${id}]`);
   all.forEach(element => {
        if( element.checked === true){
              const pizza=element.value;
             const li=document.createElement("li");
              const a=document.createElement("a"); //create links for deletion for specific item
              const linktext=document.createTextNode("Delete"); 
              a.appendChild(linktext);
              a.href =itemNum; //to know wich item to delete
              a.setAttribute('data-number', itemNum);
              a.setAttribute('class', 'deletelink');
              li.innerHTML=pizza;
              li.appendChild(a);
              document.querySelector("#itemList").append(li);
              document.querySelector("#itemList").append(a); 
              element.checked =false;
              item ={};
              item['name']=pizza;
              cart[itemNum]=item;
              itemNum++;
              update()
              console.log(cart);
              if (pizza.includes("topping")){
                    itemNum-- //we have to add toppings so we need to stay at the same pizza number
                    const number= count(pizza);
                    numToppings=number;
                    let h3=document.createElement("h3");
                    h3.classList.add("warning");
                    h3.innerHTML=`add ${number} toppings before moving on!`;
                    document.querySelector("#itemList").append(h3);
                    let ul=document.createElement("ul");
                    li.appendChild(ul);
                    ul.classList.add("withtopping");
                    document.getElementById("regular").disabled = true; //disable alll buttons until correct numbe rof toppings were added
                    document.getElementById("sicilian").disabled = true;  // above comment
                  
              }
              document.querySelector("#orderbutton").classList.remove("visibility");
              document.querySelector("#add").classList.remove("visibility");
          
        }   
      
   });

}

var num=0;
function addtopping() {
 let id=event.srcElement.id
 const all=document.querySelectorAll(`input[name=${id}]`);
   all.forEach(element => {
        if( element.checked === true){
              element.checked =false;
              let topping=element.value;
              let li=document.createElement("li");
              li.innerHTML=topping;
              document.querySelector(".withtopping").appendChild(li); 
              let varName="topping"+num;
              cart[itemNum][varName]=topping;
              num++;
          
        }   
   });
   if (num === numToppings) { // check if right number of toppings were added
   update()
   document.querySelector(".warning").innerHTML="";
   document.querySelector(".warning").classList.remove("warning");
   document.querySelector(".withtopping").classList.remove("withtopping");
   document.getElementById("regular").disabled= false; 
   document.getElementById("sicilian").disabled= false;
   console.log(cart);
   num =0;
   itemNum++;
   }
}







function count(pizza){

 if (pizza.includes("one")) {
   return 1;
 }else if ( pizza.includes("two")) {
      return 2;
 }else{
      return 3;
 }
 
}

function update() {
localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', function() {
document.querySelector('#itemList').addEventListener('click', function(event){
                          event.preventDefault();
                          links= document.querySelectorAll('.deletelink')
                          console.log(links);
    });

});


function ReviewOrder(){


}


