

var cart = {

}



var itemNum=0;//counting the items  in order object
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
              li.innerHTML=pizza;
              li.appendChild(a);
              document.querySelector("#itemList").append(li);
              document.querySelector("#itemList").append(a);
              element.checked =false;
              item ={};
              item['name']=pizza;
              cart[itemNum]=item;
              itemNum++;
              console.log(cart);
              if (pizza.includes("topping")){
                    itemNum-- //we have to add toppings so we need to stay at the same order number
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


function placeOrder(){


}