// Description: JavaScript file for Tickets
//----------------------guest form------------------------------------//

const openform = document.getElementById("openform");
const myform = document.getElementById("myform");

openform.addEventListener("click", function(event){
    event.stopPropagation();
    myform.style.display = "block";
});
document.addEventListener("click", function(event){
    const clickedinsideform =myform.contains(event.target);
    if(!clickedinsideform){
        myform.style.display = "none";
    }
});
myform.addEventListener("click", function(event){
    event.stopPropagation();
})



//--------------------block to go details page if didnt give the inputs--------------------------------------//

document.addEventListener('DOMContentLoaded', function () {
    const carts = document.querySelectorAll('.opt');
    const continuebtn = document.getElementById("continuebtn");

    function iscartempty(){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        return !cartItems || Object.keys(cartItems).length === 0;
    }

    continuebtn.addEventListener('click', function(event){
        calendarInput = document.getElementById('calendar').value;
        guestInput = document.getElementById('openform').value;
        const selectedOptions = Array.from(slotinput.selectedOptions);

         if(! calendarInput || ! guestInput){
            alert('Please fill in all fields');
            event.preventDefault();
         }else if (iscartempty()){
            alert('Please select a ticket');
            event.preventDefault();
         }else if(selectedOptions.length == 0){
            alert('Please select a time slot');
            event.preventDefault();
         }else{
            window.location.href = "detailsnew.html";
        }  
    }); 
});


//-----------------------timeslot ----------------------------------//
const opentimeslot = document.getElementById("opentimeslot");
const timeslot = document.getElementById("slotinput");

opentimeslot.addEventListener("click", function(event){
    event.stopPropagation();
    timeslot.style.display = "block";
});
document.addEventListener("click", function(event){
    const clickedinsideform = timeslot.contains(event.target);
    if(!clickedinsideform){
        timeslot.style.display = "none";
    }
});
timeslot.addEventListener("click", function(event){
    event.stopPropagation();
})

//----------------------------okay open----------------------------------------//

const opentpkay = document.getElementById("opentimeslot");
const timeokay = document.getElementById("okay");

opentimeslot.addEventListener("click", function(event){
    event.stopPropagation();
    okay.style.display = "block";
});
document.addEventListener("click", function(event){
    const clickedinsideform = okay.contains(event.target);
    if(!clickedinsideform){
    okay.style.display = "none";
    }
});
okay.addEventListener("click", function(event){
    event.stopPropagation();
})

//---------------time - duration input to summary------------------//

document.addEventListener('DOMContentLoaded', function () {
const slotinput = document.getElementById("slotinput");

const okay = document.getElementById("okay");
const selectedHours = document.getElementById("selectedHours");


const savedNormalCount = localStorage.getItem('normalCount');
const savedPeakCount = localStorage.getItem('peakCount');
const savedHoursCount = localStorage.getItem('hoursCount');
const lastTime = localStorage.getItem('lastTime');
if(savedHoursCount && savedNormalCount && savedPeakCount){
    selectedHours.textContent = `${savedHoursCount} Hours ${savedNormalCount} Normal ${savedPeakCount} Peak`;
}
if(lastTime){
    selectedTime.textContent = lastTime;
}

okay.addEventListener('click', function () {
    const selectedOptions = Array.from(slotinput.selectedOptions);
    let selectedValues = selectedOptions.map(Option => Option.textContent);
    //selectedTime.textContent = selectedValues.join(', ');

    localStorage.setItem('selectedValues', selectedValues.join(', '));

    const normalCount = selectedOptions.filter(Option => Option.value === 'normal').length;
    const peakCount = selectedOptions.filter(Option => Option.value === 'peak').length;
    const hoursCount = normalCount + peakCount;

    selectedHours.textContent = `${hoursCount} Hours ${normalCount} Normal ${peakCount} Peak`


    const selectedTime = document.getElementById("selectedTime");
    const numericValues  = selectedValues.map(value => parseInt(value));

    const maxValue = Math.max(...numericValues);
    const minValue = Math.min(...numericValues);

    let StartTime, EndTime;

    if(minValue < 13){
        StartTime = minValue + ":00 AM";
    }else{
        StartTime = (minValue -12) + ":00 PM";
    }

    if(maxValue < 13){
        EndTime = maxValue + ":00 AM";
    }else{
        EndTime = (maxValue - 11) + ":00 PM";
    }
    const lastTime = StartTime + " - " + EndTime;
    selectedTime.textContent = lastTime;


    localStorage.setItem('normalCount', normalCount);
    localStorage.setItem('peakCount', peakCount);
    localStorage.setItem('hoursCount', hoursCount);

    localStorage.setItem('maxValue', maxValue);
    localStorage.setItem('minValue', minValue);
    localStorage.setItem('lastTime', lastTime);
});
});




//----------------------------------------------------------//



//----------calendar----------------------------------------//

document.addEventListener('DOMContentLoaded', function () {
    const calendarInput = document.getElementById('calendar');
    const result = document.getElementById('selectedDate');

    const savedValue = localStorage.getItem('selectedDate');
    if(savedValue){
        result.textContent = savedValue;
    }

    calendarInput.addEventListener('change', function () {
        const selectedDate = calendarInput.value;
        result.innerHTML =  selectedDate;

        localStorage.setItem('selectedDate', selectedDate);
    });
});






// ------------------------------------------------------------------------//

let carts = document.querySelectorAll('.opt');

let products = [
    {
        name: 'Sl Adult',
        tag: 'sladult',
        price: 0,
        inCart: 0
    },
    {
        name: 'Sl Child',
        tag: 'slchild',
        price: 0,
        inCart: 0
    },
    {
        name: ' Foreign Adult',
        tag: 'foreignadult',
        price: 0,
        inCart: 0
    },
    {
        name: 'Foreign Child',
        tag: 'foreignchild',
        price: 0,
        inCart: 0
    },
    {
        name: 'Infant',
        tag: 'infant',
        price: 0,
        inCart: 0
    },
]

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.getElementById("count").textContent = productNumbers;
    }
}

 
function cartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers'); 
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById("count").textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.getElementById("count").textContent = 1;
    }
    setItems(product);
    displayCart ();
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems ={
        [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
}


function totalCost(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let peakCount = localStorage.getItem('peakCount');
    let normalCount = localStorage.getItem('normalCount');

    console.log(cartItems);
    console.log(peakCount);
    console.log(normalCount);
    let totalCost = 0;
    let totalCost1 = 0;
    let totalCost2 = 0;
    let totalCost3 = 0;
    let totalCost4 = 0;
    let totalCost5 = 0;

    if(cartItems && peakCount && normalCount){
      if(cartItems['sladult']){
        totalCost1 = cartItems['sladult'].inCart * 6 * peakCount + 4 * normalCount;
      }else{
        return;
    }
    if(cartItems['slchild']){
        totalCost2 = cartItems['slchild'].inCart * 3 * peakCount + 2 * normalCount;
    }else{
        return;
    }
    if(cartItems['foreignadult']){
        totalCost3 = cartItems['foreignadult'].inCart * 12 * peakCount + 8 * normalCount;
    }else{
        return;
    }
    if(cartItems['foreignchild']){
        totalCost4 = cartItems['foreignchild'].inCart * 6 * peakCount + 4 * normalCount;
    }else{
        return;
    }
    if(cartItems['infant']){
        totalCost5 = cartItems['infant'].inCart * 0 * peakCount + 0 * normalCount;
    }else{
        return;
    }
    totalCost = totalCost1 + totalCost2 + totalCost3 + totalCost4 + totalCost5;
    localStorage.setItem('totalCost', totalCost);
    }
}
    


    

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    const selectedTickets = document.getElementById("selectedTickets");
    const selectedCount = document.getElementById("selectedCount");
    const selectedPrice = document.getElementById("selectedPrice");

    if(cartItems && selectedTickets){
    selectedTickets.innerHTML = "";
    Object.values(cartItems).map(item => {
        selectedTickets.innerHTML += `<span class=delete><img src="images/delete.png" onclinc='deElement("+(j++) +")'></span>   ${item.name} <br><br>`;
    })};
    if(cartItems && selectedCount){
    selectedCount.innerHTML = "";
    Object.values(cartItems).map(item => {
        selectedCount.innerHTML += `${item.inCart} <br><br>`;
    })};
    if(cartItems && selectedPrice){
    selectedPrice.innerHTML = "";
    Object.values(cartItems).map(item => {
        selectedPrice.innerHTML += `$${item.inCart * item.price} <br><br>`;
    })};
    }
    

    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    document.getElementById("totalall").textContent = "Rs." +cartCost + ".00";

onLoadCartNumbers();
displayCart();
totalCost();

//-----------------------------clear cart---------------------------------//


window.onload = function(){
    clearCart();
};
function clearCart(){
    localStorage.clear();
    document.getElementById("count").textContent = 0;
    document.getElementById("totalall").textContent = "Rs.0.00";
    document.getElementById("listresult").innerHTML = "";
displayCart();
}


//-----------------------------remove item---------------------------------//   

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    totalCost();

    const deleteIcons = document.querySelectorAll(".delete");
    deleteIcons.forEach((icon) => {
        icon.addEventListener('click',() => {
            removeCartItem(index);
    });
});
});

function removeCartItem(index){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    const itemKey = Object.keys(cartItems)[index];

    if(itemKey){
        const item = cartItems[itemKey];
    const cartCost = localStorage.getItem('totalCost');
    }
     localStorage.setItem('totalCost', cartCost - (item.inCart * item.price));

     item.inCart = 0;
        delete cartItems[itemKey];

        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        localStorage.setItem('cartNumbers', productNumbers - item.inCart);
        displayCart();
        totalCost();
        onLoadCartNumbers();
}

//--------------------------------------------------------Details page--------------------------------------------------------------------------//

//------------------------save to local storage--------------------------//
function saveToLocalStorage(){
    const firstname = document.getElementById('firstname').value;
    localStorage.setItem('firstname', firstname);

    const lastname = document.getElementById('lastname').value;
    localStorage.setItem('lastname', lastname);

    const email = document.getElementById('email').value;
    localStorage.setItem('email', email);

    const phone = document.getElementById('phone').value;
    localStorage.setItem('phone', phone);

    const gender = document.getElementById('gender').value;
    localStorage.setItem('gender', gender);
}

//-------------------------------------------------------//


   

