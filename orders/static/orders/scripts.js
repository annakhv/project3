



if (JSON.parse(localStorage.getItem('cart'))==null){
var cart = {}//empty cart object 
var itemNum=0;//counting the items  in cart object
}else{
     var cart = JSON.parse(localStorage.getItem('cart'));
     if (Object.keys(cart).length ){
     for(itemNum in cart){ //open up object contents
     item=cart[itemNum]; 
     meal(item) 
     itemNum++;
     }
     document.addEventListener('DOMContentLoaded', function (){
     document.querySelector("#orderbutton").classList.remove("visibility");
     document.querySelector("#add").classList.remove("visibility");
     });
    }else{
         itemNum=0;
    }
}




 function meal(item) {
  const li=document.createElement("li"); 
  const objectkeys=Object.keys(item);
  for( i=0; i< objectkeys.length; i++){
  if (objectkeys[i] === "name"){
              const a=document.createElement("a"); //create links for deletion for specific item
              const linktext=document.createTextNode("Delete"); 
              a.appendChild(linktext);
              a.href ="";
               a.setAttribute('data-number', itemNum);//to know which item to delete
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
              a.href ="";
              a.setAttribute('data-number', itemNum); //to know wich item to delete
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

document.addEventListener('DOMContentLoaded', function() { //listen to delete event
document.querySelector('#itemList').addEventListener('click', function(event){
          event.preventDefault();
          links= document.querySelectorAll('.deletelink');
          links.forEach (function(link) {
               link.onclick=function(){
                    num=link.getAttribute("data-number");
                    val=cart[num];
                    remove(val); //delete this val from front end
                    delete cart[num];
                    update()
                    if (Object.keys(cart).length === 0){ //delete graphics for cart if cart is empty
                    console.log("works");
                          document.querySelector("#orderbutton").classList.add("visibility");
                          document.querySelector("#add").classList.add("visibility");
                    }
              
              

               }
    });

});
});

function remove(value){
 vals=document.querySelector("#itemList");
 list=vals.childNodes;
 for(i=list.length-1; i>=0; i--){
      element=list[i].innerHTML;
      if (element.includes(value['name'])){
           vals.removeChild(list[i+1]);//delete delete link as well
           vals.removeChild(list[i]);
           break;
      }
      
 }

}


document.addEventListener('DOMContentLoaded', function() { //listen to review event
document.querySelector('#orderbutton').addEventListener('click', function(event){
          event.preventDefault();
          console.log("hellooo");

});

});

