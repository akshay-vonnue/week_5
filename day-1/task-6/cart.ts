interface ProductItem{
    id: number,
    name: string,
    price:number
}

interface CartItem{
    id: number,
    productId: number,
    name: string,
    price: number,
    quantity:number
}

type observer = (state:CartItem[]) => void

let product:ProductItem[] = [
    {
        id:0,
        name:"Lenovo thinkpad plus",
        price:1000,
    },
    {
        id:1,
        name:"Lenovo thinkpad pro",
        price:1000,
    },
    {
        id:2,
        name:"Lenovo thinkpad air",
        price:2000,
    },
    {
        id:3,
        name:"Lenovo thinkpad max",
        price:3000,
    },
    {
        id:4,
        name:"Lenovo thinkpad nto",
        price:4000,
    },
]

let cart:CartItem[] = []

let cartHistory: Cart[] = []

let priceElement = document.querySelector(".price") as HTMLDivElement;
let productList = document.querySelector(".product-list") as HTMLUListElement;
let cartList = document.querySelector(".cart-list") as HTMLUListElement;

function saveToStorage():void{
    console.log("saved to storage")
    let stringifiedObject = JSON.stringify(cartHistory)
    localStorage.setItem('cartHistory',stringifiedObject);
}

function fetchHistory():void{
    let history = localStorage.getItem('cartHistory')
    if(!history) return
    let parsedObject = JSON.parse(history)
    cartHistory = parsedObject.map((item: any) => {
        return new Cart(item.product, item.cart);
    });
    console.log("init cart",cartHistory)
    renderCart(cartHistory[cartHistory.length-1])
}

// observer

// class DisplayDevice{
//     name: string;
//     overAllPrice: number;
//     constructor(name:string){
//         this.name = name
//         this.overAllPrice = 0
//     }

//     update(overAllPrice:number){
//         console.log(`This is total amount to pay : ${overAllPrice}`);
//     }
// }


// const display = new DisplayDevice("sony SM10");
// console.log(display)


// cart
class Cart{
    product: ProductItem[]
    cart: CartItem[]
    observers: Array<observer>
    constructor(product:ProductItem[],cart:CartItem[]){
        this.product = product
        this.cart = cart
        this.observers = []
        this.priceSum = 0
    }

    idDiscountApplied = false;
    priceSum = 0;

    addObserver(observer:observer){
        this.observers.push(observer)
    }

    notifyObservers(){

        console.log('called notify observers',this.observers);

        this.observers.forEach(observer =>{
            console.log('calling',observer,"with",this.priceSum)
            observer(this.cart)
        })
    }

    getTotal(): number {
        const initialPrice = 0;
        this.priceSum = this.cart.reduce(
            (accumulator, item) =>
                accumulator + item.price * item.quantity,
            initialPrice
        );
        if (priceElement) {
            priceElement.innerText =
                this.priceSum.toLocaleString();
        }
        return this.priceSum;
    }


    applyCoupon(): Cart {
        if (this.idDiscountApplied) {
            return this;
        }

        return new Cart(
            this.product,
            this.cart,
        );
    }


    addToCart(item:ProductItem){
        let isNew = true;
        console.log('addtoCart called')
        console.log(`history:`,cartHistory)

        const quantityUpdatedCart = this.cart.map(cartItem=>{
            console.log(cartItem)
            if(cartItem.productId === item.id){
                console.log('inside')
                isNew = false
                return {...cartItem,quantity:++cartItem.quantity}
            }else{
                return cartItem
            }
        })
        
        if(isNew){
            this.notifyObservers()
            return new Cart(product,[...this.cart,{
                id: this.cart.length === 0
                ? 0
                : this.cart[this.cart.length - 1].id + 1,
                productId:item.id,
                name:item.name,
                price:item.price,
                quantity:1,
            }])
        }else{
            this.notifyObservers()
            return new Cart(product,quantityUpdatedCart)
        }
    }

    removeFromCart(itemid:number){
        // let product = this.cart.find((item) => item.productId === itemid)
        // console.log('product:',product)
        // let productIndex = this.cart.indexOf(product)
        // console.log('product index :',productIndex);
        // console.log(cart)
        // this.cart.splice(productIndex,1)
        // console.log(`cart inside remove:`,cart)  
        // this.getTotal()
        // return new Cart(this.product,this.cart)
        console.log(`history:`,cartHistory)
        this.notifyObservers()
        console.log('breakpoint')
        console.log("filtered cart:",this.cart.filter((item)=> {
            if(item.productId !== itemid){
                console.log("remove ??",item.productId,":",itemid)
                return item;
            }
        }))
        console.log('breakpoint 2')


        return new Cart(
            this.product,
            this.cart.filter(
            item => item.productId !== itemid)
        );


    }

    increment(productId: number): Cart {
        const newCart = this.cart.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });

        return new Cart(
            this.product,
            newCart
        );
    }

    decrement(productId: number): Cart {
        const newCart = this.cart.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity - 1)
                };
            }

            return item;
        });

        return new Cart(
            this.product,
            newCart
        );
    }


}

fetchHistory()


// observer

// class DisplayDevice...


// class Product{
//     constructor(name,price){
//         this.name = name;
//         this.price = price;
//     }
// }

// let product = [
//     new Product("Lenovo Thinkpad pro",2000),
//     new Product("Lenovo Thinkpad air",3000),
//     new Product("Lenovo Thinkpad max",4000),
//     new Product("Lenovo Thinkpad note",1000),
// ]

// product rendering


// console.log(productList)
let localHistory = localStorage.getItem('cartHistory')
let parsedObject;
if (localHistory) {
    parsedObject = JSON.parse(localHistory)
}

let cartInstance: Cart;

if (parsedObject) {
    cartInstance =
        cartHistory[cartHistory.length - 1];
} else {
    cartInstance =
        new Cart(product, []);

    cartHistory.push(cartInstance);

    saveToStorage();
}


console.log("first:",cartHistory)

cartInstance.addObserver((cart: CartItem[]) => {
    console.log("observer triggered with cart:",cart);
})

product.forEach((item)=>{
    let d = document.createElement("div");
    d.innerText = `$ ${item.price}`;
    let button = document.createElement('button')
    button.innerText="add to cart"
    let li = document.createElement("li")
    li.innerText = `${item.name}`
    li.setAttribute("id",`${item.id}`)

    li.appendChild(d)
    li.appendChild(button)

    console.log(item)

    // add button
    button.addEventListener('click',()=>{
        console.log("cart 1",cartInstance)
        console.log(`history:`,cartHistory)


        let cartInstance2 = cartInstance.addToCart(item)
        cartHistory.push(cartInstance2)
        saveToStorage()

        renderCart(cartInstance2)
        cartInstance2.getTotal()

        cartInstance = cartInstance2
        

        console.log("cart 1",cartInstance)
        console.log(cartInstance === cartInstance2)
        console.log("cart 2",cartInstance2)
    })

    productList.appendChild(li)
})

let applyButton = document.querySelector(".apply-button") as HTMLButtonElement
applyButton.addEventListener('click', () => {
    let carInstance = cartInstance.applyCoupon()
})

// console.log(cartList)

// function rendercart(){
//     console.log(`render cart`)
//     cart.forEach((item) => {
//     let d = document.createElement('div');
//     let incrementButton = document.createElement("button");
//     incrementButton.textContent = `&uparrow;`

//     let decrementButton = document.createElement("button");
//     decrementButton.textContent = `&downarrow;`

//     let cancelButton = document.createElement('button')
//     cancelButton.innerText = 'cancel'

//     let li = document.createElement("li")
//     li.innerText = `${item.name}`
//     li.setAttribute("id",item.id)

//     li.appendChild(incrementButton)
//     li.appendChild(d)
//     li.appendChild(decrementButton)
//     li.appendChild(cancelButton)

//     cartList.appendChild(li)
// })
// }

function renderCart(cartObject:Cart):void{
    console.log('renderobject:',cartObject)
    console.log('card-object',cartObject.cart)



    let cartList = document.querySelector(".cart-list") as HTMLUListElement
    cartList.replaceChildren()

    cartObject.cart.forEach((cartItem)=>{

        console.log("hi,",cartItem)
        let d = document.createElement('div');
        d.innerText = String(cartItem.quantity);

        let incrementButton = document.createElement("button");
        incrementButton.innerText = `&uparrow;`
        let decrementButton = document.createElement("button");
        decrementButton.textContent = `&downarrow;`
        let cancelButton = document.createElement('button')
        cancelButton.innerText = 'cancel'


        cancelButton.addEventListener('click',(e)=>{
            console.log('clicked cancel button',cartObject.cart);
            console.log(cartObject)

            cartInstance = cartObject.removeFromCart(cartItem.productId)
            cartHistory.push(cartInstance)
            saveToStorage()
            renderCart(cartInstance)
            console.log('going to call newcart.gettotal() with cart:',cartInstance.cart)
            cartInstance.getTotal()


            // console.log("inside cancel button:",cartObject === cartInstance)


            // const listitem =  e.target.parentElement;
            // cartList.removeChild(listitem)
            // // cartObject.getTotal()
        })


        let li = document.createElement("li")
        li.innerText = `${cartItem.name}`
        li.setAttribute("id",cartItem.id.toLocaleString())
        li.appendChild(incrementButton)

        incrementButton.addEventListener('click', () => {
            const newCart = cartObject.increment(
                cartItem.productId
            );
            cartHistory.push(newCart);
            saveToStorage();
            cartInstance = newCart;
            renderCart(newCart);
            newCart.getTotal();
        })

        li.appendChild(d)
        li.appendChild(decrementButton)
        decrementButton.addEventListener('click',()=>{
            const newCart = cartObject.decrement(
                cartItem.productId
            );

            cartHistory.push(newCart);
            saveToStorage();

            cartInstance = newCart;

            renderCart(newCart);
            newCart.getTotal();
        })
        li.appendChild(cancelButton)
        cartList.appendChild(li)
    })    
}

let i = cartHistory.length;
let undoButton = document.querySelector(".undo-button") as HTMLButtonElement;
undoButton.addEventListener('click',()=>{
    undoButton.addEventListener("click", () => {

    if (cartHistory.length <= 1) {
        return;
    }
    cartHistory.pop();
    cartInstance =
        cartHistory[cartHistory.length - 1];
    renderCart(cartInstance);
    cartInstance.getTotal();
    saveToStorage();
});

})