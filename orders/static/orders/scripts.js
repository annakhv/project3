


function addpizza() {

   var all=document.querySelectorAll('input[name="regular"]');
   all.forEach(element => {
        if( element.checked === true){
              let pizza=element.value;
              let li=document.createElement("li");
              li.innerHTML=pizza;
              document.querySelector("#itemList").append(li);
              element.checked =false;
              console.log(pizza)
              document.querySelector("#orderbutton").classList.remove("visibility");
              document.querySelector("#add").classList.remove("visibility");
        }
          
       
      
   });

   


}