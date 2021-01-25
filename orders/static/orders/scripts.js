



if (JSON.parse(localStorage.getItem('cart'))==null){
var cart = {}//empty cart object 
var itemNum=0;//counting the items  in cart object
var total=0;//total cost of items iin cart
}else{
     var cart = JSON.parse(localStorage.getItem('cart'));
     if (Object.keys(cart).length ){
     for(itemNum in cart){ //open up object contents
     item=cart[itemNum]; 
     meal(item) 
     itemNum++;
     }
     total=parseFloat(localStorage.getItem('total'));
 
     document.addEventListener('DOMContentLoaded', function (){
     document.querySelector("#totalprice").innerHTML=`Total: ${total}`;  
     document.querySelector("#reviewbutton").classList.remove("visibility");
     document.querySelector("#add").classList.remove("visibility");
     });
    }else{
        var itemNum=0;
        var  total=0;
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
       console.log("print");
        const ul=document.createElement("ul");
        li.appendChild(ul);
        const nestedli=document.createElement("li");
        nestedli.innerHTML=item[objectkeys[i]];
        ul.append(nestedli);
  }

  }         

}



var numToppings; // the number of toppings the pizza should have 
var num;
function addpizza() {
   var id=event.srcElement.id
   var all=document.querySelectorAll(`input[name=${id}]`);
   all.forEach(element => {
        if( element.checked === true){
              const pizza=element.value;
             // const pricePizza=price(pizza)  
              var pos = pizza.lastIndexOf(" ");
              price=pizza.slice(pos+1);
              total+=parseFloat(price); //calculate total price
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
              document.querySelector("#totalprice").innerHTML=`Total: ${total}`;
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
                    num=0;
                    let h3=document.createElement("h3");
                    h3.classList.add("warning");
                    h3.innerHTML=`add ${number} toppings before moving on!`;
                    document.querySelector("#itemList").append(h3);
                    let ul=document.createElement("ul");
                    li.appendChild(ul);
                    ul.classList.add("withtopping");
                    disablebuttons()
                  
              }
              document.querySelector("#reviewbutton").classList.remove("visibility");
              document.querySelector("#add").classList.remove("visibility");
          
        }   
      
   });

}


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
   enablebuttons()
   num=0;
   itemNum++;
   }
}

function subadd(){
let id=event.srcElement.id
let allSelected=document.querySelectorAll(`.${id}`)
for(let j=0; j<allSelected.length; j++){
     all=allSelected[j];
 for(let i=0; i<all.length; i++){
        element=all[i];
        if(element.selected === true){
              element.selected=false;
              let subadd=element.value;
              if (element.value != "" ){
               var pos =subadd.lastIndexOf(" "); //this is to split the name of sub and price 
               price=subadd.slice(pos+1);
               subadd=subadd.slice(0,pos);
               total+=parseFloat(price); 
              let ul=document.createElement('ul');
              let nestedLi=document.createElement('li')
              ul.append(nestedLi);
              nestedLi.innerHTML=subadd;
               let  count=document.querySelector("#itemList").childElementCount;
               let liElement= document.querySelector("#itemList").childNodes[count-1] //find the last li element which presumably is sub
               liElement.append(ul);
               document.querySelector("#totalprice").innerHTML=`Total: ${total}`; //change the price
               num=Math.floor(Math.random()*Math.random()* 100);
               cart[itemNum-1]["zzz"+num]=subadd //save the item and add zzz so that the adds be after subs which has name property(this is important when looping localstorage as objectkeys are sorted)
               console.log(cart);
               update()
              }
             
        }
    }
  }
}

/*function price(pizza){  //this function did not work and i have no idea why , so i had to put this code by hand in two places
     console.log("works here");
     var pos = pizza.lastIndexOf(" ");
     price=pizza.slice(pos+1);
  
     return price;
}
*/ 
function count(pizza){
     var pos = pizza.lastIndexOf(" ");
     pizzaVal=pizza.substring(0,pos);

 if (pizzaVal.includes("1")) {
   return 1;
 }else if ( pizzaVal.includes("2")) {
      return 2;
 }else{
      return 3;
 }
 
}

function update() {
localStorage.setItem("cart", JSON.stringify(cart));
localStorage.setItem("total", total);
}

document.addEventListener('DOMContentLoaded', function() { //listen to delete event
//document.querySelector('#itemList').addEventListener('click', function(event){
              document.querySelectorAll('.deletelink').forEach (function(link) {      
               link.onclick=function(){
                    number=link.getAttribute("data-number");
                    val=cart[number];
                    remove(val); //delete this val from front end
                    delete cart[number];
                    update()
                    if (Object.keys(cart).length === 0){ //delete graphics for cart if cart is empty
                          total = 0; //this should automaticly become 0 but we can also reassign the value just to be sure
                          document.querySelector("#reviewbutton").classList.add("visibility");
                          document.querySelector("#add").classList.add("visibility");
                    }
              
                    return false;

               }
    });

//});
});

function remove(value){
 //  pr=price(value['name'])
   var pos =value['name'].lastIndexOf(" ");
   price=value['name'].slice(pos+1);
   total-=parseFloat(price);
   document.querySelector("#totalprice").innerHTML=`Total: ${total}`;  
   if ( value['name'].includes("topping") & document.querySelector(".warning") != null ){   // when you are deleting pizza for which no toppings were added
            console.log("deleting pizaa");
            document.querySelector(".warning").innerHTML="";
            document.querySelector(".warning").classList.remove("warning");
            enablebuttons() 
           }   
           
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
document.querySelector('#reviewbutton').addEventListener('click', function(event){
             const objectkeys=Object.keys(item);
             for( i=0; i< objectkeys.length; i++){
                  meal(cart[objectkeys[i]]);

             }

});

});

document.addEventListener('DOMContentLoaded', function() { //listen to review event
document.querySelector('#orderbutton').addEventListener('click', function(event){
           event.preventDefault();
           orderNumber=Math.floor(Math.random()* 1000000);
           document.querySelector("#ordercomplete").innerHTML=`Order with order-number: #${orderNumber} has been placed`
          sendToServer()
});
});

function disablebuttons(){
      document.getElementById("regular").disabled = true; //disable alll buttons until correct numbe rof toppings were added
     document.getElementById("sicilian").disabled = true; 
     document.getElementById("sub").disabled = true; 
     document.getElementById("platter").disabled = true; 
      document.getElementById("pasta").disabled = true; 
       document.getElementById("salad").disabled = true; 

}


function enablebuttons(){
      document.getElementById("regular").disabled = false; //disable alll buttons until correct numbe rof toppings were added
     document.getElementById("sicilian").disabled = false; 
     document.getElementById("sub").disabled = false; 
     document.getElementById("platter").disabled = false; 
      document.getElementById("pasta").disabled = false; 
       document.getElementById("salad").disabled = false; 

}

function sendToServer()   { //sendng order details to server and empty the cart
     var token=document.querySelector('input[name="csrfToken"]').value;
    
     const request=new XMLHttpRequest();
      request.open("POST", "/sendOrder");
      console.log("before");
        request.setRequestHeader("csrfToken", token);//doesnt work
        console.log("after");
       request.onload= function(){
        const response=request.responseText; // here we get if order has been submitted
      };
      console.log("here");
      const data=new FormData();
     order=JSON.stringify(cart);
     if(request.Headers["csrfToken"] != null){
       data.append('order', order);
      request.send(data);
     console.log("datasend");
     }

};



document.addEventListener("DOMContentLoaded", function(event) { 
// Create a Stripe client.
// Note: this merchant has been set up for demo purposes.
var stripe = Stripe('pk_test_51IBkC8J1fe6rYWd51rlp3fnB9c4wfbjgle2jQiKtnQ2wBYOlYvMO4yIrO1EcT8cm7Dp9FjKLTEUACEfbcZEGWu5n003lFwJuT2');
// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
    ':-webkit-autofill': {
      color: '#fa755a',
    },
  }
};

// Create an instance of the iban Element.
var iban = elements.create('iban', {
  style: style,
  supportedCountries: ['SEPA'],
});


// Add an instance of the iban Element into the `iban-element` <div>.

iban.mount('#iban-element');
console.log("goeshere");
var errorMessage = document.getElementById('error-message');
var bankName = document.getElementById('bank-name');



iban.on('change', function(event) {
  // Handle real-time validation errors from the iban Element.
  if (event.error) {
    errorMessage.textContent = event.error.message;
    errorMessage.classList.add('visible');
  } else {
    errorMessage.classList.remove('visible');
  }

  // Display bank name corresponding to IBAN, if available.
  if (event.bankName) {
    bankName.textContent = event.bankName;
    bankName.classList.add('visible');
  } else {
    bankName.classList.remove('visible');
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
 

  var sourceData = {
    type: 'sepa_debit',
    currency: 'eur',
    owner: {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
    },
    mandate: {
      // Automatically send a mandate notification email to your customer
      // once the source is charged.
      notification_method: 'email',
    }
  };

  console.log(sourceData)

  // Call `stripe.createSource` with the iban Element and additional options.
  stripe.createSource(iban, sourceData).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      errorMessage.textContent = result.error.message;
      errorMessage.classList.add('visible');
     
    } else {
      // Send the Source to your server to create a charge.
      errorMessage.classList.remove('visible');
      console.log(result);
      stripeSourceHandler(result.source);
    }
  });
});
});


function stripeSourceHandler(source) {
  // Insert the source ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeSource');
  hiddenInput.setAttribute('value', source.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}

/*
console.log("sofarworks")
 var checkoutButton = document.getElementById('checkout-button');

      checkoutButton.addEventListener('click', function() {
        // Create a new Checkout Session using the server-side endpoint you
        // created in step 3.
        fetch('/create-checkout-session', {
          method: 'POST',
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function(result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using `error.message`.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
      });
      */