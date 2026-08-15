const PRODUCTS = [

  {
    id:1,
    name:"VOID SIGNAL OVERSIZED TEE",
    category:"tees",
    price:999,
    color:"",
    tag:"BESTSELLER"
  },

  {
    id:2,
    name:"ECLIPSE HEAVYWEIGHT TEE",
    category:"tees",
    price:1099,
    color:"light",
    tag:"NEW"
  },

  {
    id:3,
    name:"ORBITAL CODE HOODIE",
    category:"hoodies",
    price:1899,
    color:"blue",
    tag:"LIMITED"
  },

  {
    id:4,
    name:"AFTER DARK OVERSIZED TEE",
    category:"tees",
    price:999,
    color:"green",
    tag:""
  },

  {
    id:5,
    name:"NO SIGNAL HEAVY HOODIE",
    category:"hoodies",
    price:1999,
    color:"",
    tag:"DROP 01"
  },

  {
    id:6,
    name:"LUNAR STATIC TEE",
    category:"tees",
    price:1049,
    color:"purple",
    tag:"NEW"
  },

  {
    id:7,
    name:"VOID ARCHIVE TEE",
    category:"tees",
    price:1199,
    color:"light",
    tag:""
  },

  {
    id:8,
    name:"VELCYRO FREQUENCY HOODIE",
    category:"hoodies",
    price:2099,
    color:"blue",
    tag:"LIMITED"
  }

];


let cart =
  JSON.parse(
    localStorage.getItem("velcyro_cart") || "[]"
  );

let activeFilter = "all";


const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  document.querySelectorAll(selector);


/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    $("#pageLoader").style.display = "none";

  },1500);

  initReveal();

  renderProducts();

  renderCart();

});


/* =========================
   SCROLL REVEAL
========================= */

function initReveal(){

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target.classList.add(
              "visible"
            );

          }

        });

      },
      {
        threshold:.12
      }
    );


  $$(".reveal").forEach(element => {

    observer.observe(element);

  });

}


/* =========================
   PRODUCT RENDERING
========================= */

function renderProducts(){

  const list =
    activeFilter === "all"

      ? PRODUCTS

      : PRODUCTS.filter(
          product =>
            product.category ===
            activeFilter
        );


  $("#productGrid").innerHTML =
    list.map(product => `

      <article class="product-card reveal visible">

        <div
          class="product-visual ${product.color}"
          onclick="quickAdd(${product.id})"
        >

          ${
            product.tag

              ? `
                <span class="product-tag">
                  ${product.tag}
                </span>
              `

              : ""
          }

          <div class="garment"></div>

        </div>


        <div class="product-info">

          <div>

            <h3>
              ${product.name}
            </h3>

            <p>
              ${
                product.category === "tees"

                ? "OVERSIZED T-SHIRT"

                : "HEAVYWEIGHT HOODIE"
              }
            </p>

          </div>


          <strong>
            ₹${product.price.toLocaleString("en-IN")}
          </strong>

        </div>


        <button
          class="add-btn"
          onclick="addToCart(${product.id})"
        >
          ADD TO BAG
        </button>

      </article>

    `).join("");

}


/* =========================
   FILTERS
========================= */

$$(".filter").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      $$(".filter")
        .forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


      button.classList.add("active");


      activeFilter =
        button.dataset.filter;


      renderProducts();

    }
  );

});


/* =========================
   COLLECTION FILTER
========================= */

$$(".collection-card")
.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      const category =
        card.dataset.category;


      activeFilter = category;


      $$(".filter").forEach(
        button => {

          button.classList.toggle(
            "active",

            button.dataset.filter ===
            category
          );

        }
      );

    }
  );

});


/* =========================
   ADD PRODUCT
========================= */

function addToCart(id){

  const product =
    PRODUCTS.find(
      product =>
        product.id === id
    );


  const existing =
    cart.find(
      item =>
        item.id === id
    );


  if(existing){

    existing.qty++;

  }

  else{

    cart.push({
      ...product,
      qty:1
    });

  }


  persist();

  openCart();

  toast("ADDED TO BAG");

}


function quickAdd(id){

  addToCart(id);

}


/* =========================
   REMOVE
========================= */

function removeFromCart(id){

  cart =
    cart.filter(
      item =>
        item.id !== id
    );

  persist();

}


/* =========================
   QUANTITY
========================= */

function changeQty(id,amount){

  const item =
    cart.find(
      item =>
        item.id === id
    );


  if(!item){

    return;

  }


  item.qty += amount;


  if(item.qty <= 0){

    removeFromCart(id);

  }


  persist();

}


/* =========================
   SAVE CART
========================= */

function persist(){

  localStorage.setItem(
    "velcyro_cart",
    JSON.stringify(cart)
  );


  renderCart();

}


/* =========================
   CART
========================= */

function renderCart(){

  const count =
    cart.reduce(
      (total,item) =>
        total + item.qty,
      0
    );


  $("#bagCount").textContent =
    count;


  $("#drawerCount").textContent =
    `(${count})`;


  const subtotal =
    cart.reduce(
      (total,item) =>
        total +
        item.price *
        item.qty,

      0
    );


  $("#subtotal").textContent =
    "₹" +
    subtotal.toLocaleString(
      "en-IN"
    );


  if(!cart.length){

    $("#cartBody").innerHTML = `

      <div
        style="
          padding:70px 0;
          text-align:center;
          color:#777;
          font-size:12px;
        "
      >

        YOUR BAG IS CURRENTLY EMPTY.

        <br><br>

        <a
          href="#shop"
          onclick="closeCart()"
          style="
            text-decoration:underline;
            color:#111;
          "
        >
          EXPLORE THE DROP →
        </a>

      </div>

    `;

    return;

  }


  $("#cartBody").innerHTML =

    cart.map(item => `

      <div class="cart-item">

        <div class="cart-thumb"></div>


        <div>

          <h4>
            ${item.name}
          </h4>

          <p>
            ₹${item.price.toLocaleString("en-IN")}
          </p>


          <div
            style="
              display:flex;
              gap:10px;
              align-items:center;
              margin-top:12px;
            "
          >

            <button
              class="remove-item"
              onclick="
                changeQty(${item.id},-1)
              "
            >
              −
            </button>

            <span
              style="font-size:10px"
            >
              ${item.qty}
            </span>

            <button
              class="remove-item"
              onclick="
                changeQty(${item.id},1)
              "
            >
              +
            </button>

          </div>

        </div>


        <button
          class="remove-item"
          onclick="
            removeFromCart(${item.id})
          "
        >
          REMOVE
        </button>

      </div>

    `).join("");

}


/* =========================
   OPEN CART
========================= */

function openCart(){

  $("#cartDrawer")
    .classList
    .add("open");


  $("#drawerOverlay")
    .classList
    .add("open");


  document.body
    .classList
    .add("lock");

}


function closeCart(){

  $("#cartDrawer")
    .classList
    .remove("open");


  $("#drawerOverlay")
    .classList
    .remove("open");


  document.body
    .classList
    .remove("lock");

}


$("#bagOpen").onclick =
  openCart;


$("#cartClose").onclick =
  closeCart;


$("#drawerOverlay").onclick =
  closeCart;


/* =========================
   CHECKOUT
========================= */

$("#checkout").onclick = () => {

  if(!cart.length){

    toast("YOUR BAG IS EMPTY");

    return;

  }


  alert(
`DEMO CHECKOUT

Connect Razorpay/Stripe + your backend here for real payments and orders.`
  );

};


/* =========================
   SEARCH
========================= */

$("#searchOpen").onclick = () => {

  $("#searchPanel")
    .classList
    .add("open");


  $("#searchInput")
    .focus();


  document.body
    .classList
    .add("lock");

};


$("#searchClose").onclick = () => {

  $("#searchPanel")
    .classList
    .remove("open");


  document.body
    .classList
    .remove("lock");

};


$("#searchInput")
.addEventListener(
  "input",
  event => {

    const query =
      event.target.value
        .toLowerCase()
        .trim();


    const results =
      PRODUCTS.filter(
        product =>

          product.name
            .toLowerCase()
            .includes(query)

          ||

          product.category
            .includes(query)
      );


    $("#searchResults")
      .innerHTML =

      query

        ? results.map(product => `

            <div class="search-result">

              <span>
                ${product.name}
              </span>

              <strong>
                ₹${product.price}
              </strong>

            </div>

          `).join("")

        : "";

  }
);


/* =========================
   MOBILE MENU
========================= */

$("#menuBtn").onclick = () => {

  $("#mobileNav")
    .classList
    .toggle("open");

};


$$(".mobile-nav a")
.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      $("#mobileNav")
        .classList
        .remove("open");

    }
  );

});


/* =========================
   NEWSLETTER
========================= */

$("#newsletterForm")
.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    event.target.reset();

    toast(
      "YOU'RE ON THE LIST"
    );

  }
);


/* =========================
   TOAST
========================= */

function toast(message){

  const toastElement =
    $("#toast");


  toastElement.textContent =
    message;


  toastElement
    .classList
    .add("show");


  setTimeout(
    () => {

      toastElement
        .classList
        .remove("show");

    },

    1800
  );

}


/* =========================
   LOAD MORE
========================= */

let allVisible = false;


$("#loadMore").onclick = () => {

  allVisible = !allVisible;


  if(allVisible){

    $("#loadMore").textContent =
      "ALL PIECES LOADED";


    $("#loadMore").disabled =
      true;


    toast(
      "ALL PIECES ARE VISIBLE"
    );

  }

};


/* =========================
   HEADER SCROLL
========================= */

window.addEventListener(
  "scroll",
  () => {

    const current =
      window.scrollY;


    if(current > 50){

      $("#header")
        .classList
        .add("scrolled");

    }

    else{

      $("#header")
        .classList
        .remove("scrolled");

    }

  }
);