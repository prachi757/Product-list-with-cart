let items=document.querySelector("#items");
let cart=document.querySelector("#cart");
let body=document.querySelector("body");

let cartItems = [];

let url='https://free-food-menus-api-two.vercel.app/desserts';
async function getProduct(){
    try{
        let res=await axios.get(url);
        return res.data;
    }
    catch(e){
        console.log(e);
        return [];
    }
}


window.addEventListener("load",async ()=>{
    let itemList=await getProduct();
    show(itemList);
})

let unit=document.querySelector('.unit');

function updateUnit(){
    let totalUnit=cartItems.reduce((acc, item) => acc +  item.qty, 0);
    unit.innerText = totalUnit;
}

function toggleEmptyCartUI() {
    let emptyCartImg = document.querySelector('.empty-cart');
    let emptyCartText = document.querySelector('.empty-cart-text');

    if (cartItems.length === 0) {
        if (!emptyCartImg) {
            let newEmptyImg = document.createElement("img");
            newEmptyImg.setAttribute("src","images/illustration-empty-cart.svg");
            newEmptyImg.setAttribute("class","empty-cart");

            let newEmptyText = document.createElement("p");
            newEmptyText.setAttribute("class","empty-cart-text");
            newEmptyText.innerText = "Your added items will appear here";

            cartItemsContainer.appendChild(newEmptyImg);
            cartItemsContainer.appendChild(newEmptyText);
        }
    } else {
        if (emptyCartImg) emptyCartImg.remove();
        if (emptyCartText) emptyCartText.remove();
    }
}

let cartItemsContainer = document.createElement("div");
cartItemsContainer.setAttribute("class","cart-items-container");
cart.appendChild(cartItemsContainer);
toggleEmptyCartUI();

let orderTotalContainer=document.createElement('div');
orderTotalContainer.setAttribute('class','order-total-container');
orderTotalContainer.style.display = "none";
let orderTotalText=document.createElement('p');
orderTotalText.innerText="Order Total";
orderTotalText.setAttribute('class','order-total-text')
let total=document.createElement('h2');
total.setAttribute('class','total');
total.innerText=`$0`;

let quoteBox=document.createElement('div');
quoteBox.setAttribute('class','quote-box');
quoteBox.style.display = "none";
let quoteImg=document.createElement('img');
quoteImg.setAttribute('src','images/icon-carbon-neutral.svg')
let quote=document.createElement('p');
quote.innerHTML=`This is <strong>carbon-neutral</strong> delivery`;
quoteBox.appendChild(quoteImg);
quoteBox.appendChild(quote);

function toggleQuoteBox() {
    if (cartItems.length > 0) {
        quoteBox.style.display = "flex";
    } else {
        quoteBox.style.display = "none";
    }
}

let confirmBtn=document.createElement('button');
confirmBtn.style.display = "none";
confirmBtn.innerText=`Confirm Order`;
confirmBtn.setAttribute('class','confirm-btn')

function confirmOrderBtn() {
    if (cartItems.length > 0) {
        confirmBtn.style.display = "flex";
    } else {
        confirmBtn.style.display = "none";
    }
}

let modal=document.createElement('div');
modal.setAttribute('class','modal');
modal.style.display="none";

let modalImg=document.createElement('img');
modalImg.setAttribute('src','images/icon-order-confirmed.svg');
modalImg.setAttribute('class','modalImg');

let modalTitle=document.createElement('h2');
modalTitle.innerText='Order Confirmed';
modalTitle.setAttribute('class','modal-title');

let modalSubtitle=document.createElement('p');
modalSubtitle.innerText='We hope you enjoy your food!';
modalSubtitle.setAttribute('class','modal-subtitle');

let ItemBox=document.createElement('div');
ItemBox.setAttribute('class','item-box');

let newOrderBtn=document.createElement('button');
newOrderBtn.innerText='Start New Order';
newOrderBtn.setAttribute('class','new-order-btn');

confirmBtn.addEventListener('click',()=>{

                let modalOverlay=document.createElement('div');
                modalOverlay.classList.add("modal-overlay");
                
                document.body.appendChild(modal);
                document.body.appendChild(modalOverlay);
                modal.style.display="flex";

                // Clear previous modal content
                modal.innerHTML = "";
                // Add header elements
                modal.appendChild(modalImg); 
                modal.appendChild(modalTitle);
                modal.appendChild(modalSubtitle);
                // Clear previous ItemBox content
                ItemBox.innerHTML = "";
                cartItems.forEach(ci=>{
             let confirmTotalBox = document.createElement('div');
             confirmTotalBox.setAttribute('class', 'confirm-total-box');

             let confirmBox = document.createElement('div');
             confirmBox.setAttribute('class', 'confirm-box');

             let confirmImg = document.createElement("img");
             confirmImg.src = ci.img;
             confirmImg.setAttribute('class', 'confirm-img');

             let confirmTitle = document.createElement('span');
             confirmTitle.innerText = ci.name;
             confirmTitle.setAttribute('class', 'confirm-title');

             let confirmTitleBox = document.createElement('div');
             confirmTitleBox.setAttribute('class', 'confirm-title-box');
             confirmTitleBox.appendChild(confirmImg);
             confirmTitleBox.appendChild(confirmTitle);
             
             let confirmQty = document.createElement('span');
             confirmQty.innerText = `${parseInt(ci.qty)}x`;
             confirmQty.setAttribute('class', 'confirm-qty');
             
             let confirmPrice = document.createElement('span');
             confirmPrice.innerText = `@ $${parseFloat(ci.price)}`;
             confirmPrice.setAttribute('class', 'confirm-price');
             
             let confirmQtyBox = document.createElement('div');
             confirmQtyBox.setAttribute('class', 'confirm-qty-box');
             confirmQtyBox.appendChild(confirmQty);
             confirmQtyBox.appendChild(confirmPrice);
             
             let leftBox = document.createElement('div');
             leftBox.setAttribute('class', 'confirm-left');
             leftBox.appendChild(confirmTitleBox);
             leftBox.appendChild(confirmQtyBox);
             
             let itemTotal = document.createElement('span');
             itemTotal.innerText = `$${(parseInt(ci.qty) * parseFloat(ci.price)).toFixed(2)}`;
             itemTotal.setAttribute('class', 'item-total');

            let confirmRow = document.createElement('div');
            confirmRow.classList.add('confirm-row');
            confirmRow.appendChild(leftBox);   // left side = img + title + qty+price
            confirmRow.appendChild(itemTotal); // right side = total amount
            
            let BreakLine = document.createElement('hr');
            BreakLine.setAttribute('class', 'break-line');
            
            // final structure
            confirmBox.appendChild(confirmRow);
            confirmBox.appendChild(BreakLine);
            confirmTotalBox.appendChild(confirmBox);
            ItemBox.appendChild(confirmTotalBox);

                })
                let confirmOrderTotalBox=document.createElement('div');
                confirmOrderTotalBox.setAttribute('class','confirm-order-total-box');

                let confirmOrderTotalTitle=document.createElement('p');
                confirmOrderTotalTitle.innerText='Order Total'
                confirmOrderTotalTitle.setAttribute('class','confirm-order-total-title');

                let confirmOrderTotal=document.createElement('h3');
                confirmOrderTotal.setAttribute('class','confirm-order-total');
                let result = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
                confirmOrderTotal.innerText = `$${result.toFixed(2)}`;

                confirmOrderTotalBox.appendChild(confirmOrderTotalTitle);
                confirmOrderTotalBox.appendChild(confirmOrderTotal);
                ItemBox.appendChild(confirmOrderTotalBox);
                modal.appendChild(ItemBox);
                modal.appendChild(newOrderBtn);
            })



orderTotalContainer.appendChild(orderTotalText);
orderTotalContainer.appendChild(total);
cart.appendChild(orderTotalContainer);
cart.appendChild(quoteBox);
cart.appendChild(confirmBtn);



function updateOrderTotal(){
    if(cartItems.length===0){
        orderTotalContainer.style.display = "none";
        return;
    }

    orderTotalContainer.style.display = "flex";
    let sum = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    total.innerText = `$${sum.toFixed(2)}`;
}

function show(itemList){
    items.innerHTML = "";
    for(let item of itemList){
        console.log(item);
        //create card
        let card=document.createElement('div');
        card.setAttribute('class','card');
        //add image
        let link=item.img;
        let img=document.createElement("img");
        img.setAttribute("src",link);
        img.setAttribute('class','img');
        //if any error occur =>remove card
        img.addEventListener("error",()=>{
            card.remove();
        })
        //create btn
        let btn=document.createElement('button');
        btn.setAttribute('class','btn');
        //add icon
        let icon=document.createElement('img');
        icon.setAttribute('src','images/icon-add-to-cart.svg');
        icon.setAttribute('class','icon');
        //add span
        let span = document.createElement('span');
        span.innerText = 'Add to cart';
        //add name
        let name=document.createElement('p');
        name.setAttribute('class','name');
        name.innerText=item.name;
        //add price
        let price=document.createElement('p');
        price.setAttribute('class','price');
        price.innerText=`$ ${item.price}`;

        card.appendChild(img);
        btn.appendChild(icon);
        btn.appendChild(span);
        card.appendChild(btn);
        card.appendChild(name);
        card.appendChild(price);
        items.appendChild(card);

        btn.addEventListener("click",()=>{
            addToCart(btn);

        })
        function resetUI(btn){
            console.log(btn);
            btn.innerHTML = "";
            let icon = document.createElement('img');
            icon.setAttribute('src','images/icon-add-to-cart.svg');
            icon.setAttribute('class','icon');
            let span = document.createElement('span');
            span.innerText = 'Add to cart';
            btn.removeAttribute("id");
            img.removeAttribute('id');
            btn.appendChild(icon);
            btn.appendChild(span);
        }
        

        function addToCart(btn){
            let existing = cartItems.find(ci => ci.id === item.id);
            if (existing) {
                return;  
            }
            
            btn.innerHTML="";
            let count = document.createElement('span');
            count.setAttribute('class','count');
            count.innerText = 1;
            let incItem=document.createElement('img');
            incItem.setAttribute('src','images/icon-increment-quantity.svg');
            incItem.setAttribute('class','inc-icon');
            let decItem=document.createElement('img');
            decItem.setAttribute('src','images/icon-decrement-quantity.svg');
            decItem.setAttribute('class','dec-icon');
            btn.appendChild(incItem);
            btn.appendChild(count);
            btn.appendChild(decItem);
            btn.setAttribute("id","after");
            img.setAttribute('id',"after-img");
            

            let qty = 1;
            let quantity=document.createElement('span');
            quantity.innerText=qty;
            quantity.setAttribute('class','quantity');
            let quanTotal=document.createElement('span');
            quanTotal.setAttribute('class','quantity-total');
            let priceOfItem = parseFloat(item.price);
            quanTotal.innerText=`$${(parseInt(quantity.innerText)*priceOfItem).toFixed(2)}`;
            let box=document.createElement('div');
            let cartItem=document.createElement('div');
            cartItem.setAttribute('class','cart-item');
            let DessertName=btn.nextElementSibling.innerText;
            let title = document.createElement('span');
            title.innerText = DessertName;
            let removeBtn=document.createElement('img');
            removeBtn.setAttribute('src','images/icon-remove-item.svg');
            removeBtn.setAttribute('class','remove');
            let quantityBox= document.createElement('div');
            let value=document.createElement('span');
            value.innerText = 'x';
            value.setAttribute('class','value');
            let itemPrice=document.createElement('span');
            itemPrice.innerText=`@  $${item.price}`;
            itemPrice.setAttribute('class','item-price');
            let line=document.createElement('hr');
    
            function updateQuantity(qty){
                let ci = cartItems.find(ci => ci.id === item.id);
                if(ci) ci.qty = qty;
                console.log(ci);
            }

            
            incItem.addEventListener("click", (e) => {
                e.stopPropagation();
                qty++;
                quantity.innerText=qty;
                count.innerText = qty;
                quanTotal.innerText=`$${(parseInt(quantity.innerText)*priceOfItem).toFixed(2)}`;

                updateQuantity(qty);
                updateUnit();
                updateOrderTotal();
                toggleQuoteBox();
                confirmOrderBtn();


            });
            decItem.addEventListener("click", (e) => {
                e.stopPropagation();
                if (qty > 1) {
                    qty--;
                    quantity.innerText=qty;
                    count.innerText = qty;
                    quanTotal.innerText=`$${(parseInt(quantity.innerText)*priceOfItem).toFixed(2)}`;

                    updateQuantity(qty);
                    updateUnit();
                    updateOrderTotal();
                    toggleQuoteBox();
                    confirmOrderBtn();



                } else {
                    box.remove();
                    resetUI(btn);
                    cartItems = cartItems.filter(ci => ci.id !== item.id);
                    updateUnit();
                    updateOrderTotal();
                    toggleEmptyCartUI();
                    toggleQuoteBox();
                    confirmOrderBtn();
                    
                        
                }
                    
                    
            });

            
            cartItems.push({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                qty: 1,
                img:item.img
            });
            updateUnit();
            updateOrderTotal();
            toggleEmptyCartUI();
            toggleQuoteBox();
            confirmOrderBtn();

            cartItem.appendChild(title);
            cartItem.appendChild(removeBtn);
            quantityBox.appendChild(quantity);
            quantityBox.appendChild(value);
            quantityBox.appendChild(itemPrice);
            quantityBox.appendChild(quanTotal);
            box.appendChild(cartItem);
            box.appendChild(quantityBox);
            box.appendChild(line);
            cartItemsContainer.appendChild(box);


            removeBtn.addEventListener('click',()=>{
                box.remove();
                resetUI(btn);
                cartItems = cartItems.filter(ci => ci.id !== item.id);
                updateUnit();
               updateOrderTotal();
               toggleEmptyCartUI();
               toggleQuoteBox();
               confirmOrderBtn();
            
            })
        }
    }
}





newOrderBtn.addEventListener('click',()=>{
     //  cart data reset
    cartItems=[];

      // cart UI reset
    cartItemsContainer.innerHTML = "";
    updateUnit();
    updateOrderTotal();
    toggleEmptyCartUI();
    toggleQuoteBox();
    confirmOrderBtn();

    modal.style.display = "none";
    document.querySelector(".modal-overlay").remove();

    document.querySelectorAll(".btn").forEach(btn => {
        btn.innerHTML = "";
        let icon = document.createElement('img');
        icon.setAttribute('src','images/icon-add-to-cart.svg');
        icon.setAttribute('class','icon');
        let span = document.createElement('span');
        span.innerText = 'Add to cart';
        btn.removeAttribute("id");
        btn.appendChild(icon);
        btn.appendChild(span);
    });

    document.querySelectorAll(".img").forEach(img => {
        img.removeAttribute("id");
    });

})