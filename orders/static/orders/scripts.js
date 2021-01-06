


function addpizza() {

   let id=event.srcElement.id
   var all=document.querySelectorAll(`input[name=${id}]`);
   all.forEach(element => {
        if( element.checked === true){
              let pizza=element.value;
              let li=document.createElement("li");
              li.innerHTML=pizza;
              document.querySelector("#itemList").append(li);
              element.checked =false;
              if (pizza.includes("topping")){
                   let h3=document.createElement("h3");
                    h3.innerHTML=" add toppings before moving on!";
                   document.querySelector("#itemList").append(h3);
                  
              }
              document.querySelector("#orderbutton").classList.remove("visibility");
              document.querySelector("#add").classList.remove("visibility");
          
        }   
      
   });

}

function addtopping() {

      
}