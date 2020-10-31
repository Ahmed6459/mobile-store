let regest = false;

// owl carosul set up :>>>
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 1,
        nav: true,
        stagePadding: 80,
        responsive: {
            0: {
                items: 1
            },

            800: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })

    // pop-up show data
    let productshow_img = $("#productshow img")[0],
        productshow_details = $("#productshow .i-details")[0],
        productshow_price = $("#productshow .i-price")[0],
        productshow_name = $("#productshow .i-name")[0];



    var cursol = document.getElementById("slider-owl-1");
    let request = new XMLHttpRequest();
    request.open("GET", "../Data.txt")
    request.onload = () => {
        content = JSON.parse(request.responseText)

        for (i = 0; i < content.length; i++) {
            //add the cards to the owl carosel from the jason data

            $('.owl-carousel').trigger('add.owl.carousel', [`
                             <div class="col">
                     <div class="card" data-loop="${i}">
                         <img src="./pic/products/${content[i].img}" alt="" class="card-img-top">
                         <div class="card-body text-center">
                             <div class="card-titel">
                                 <h6>${content[i].productName}</h6>
                             </div>
                             <p class="card-text text-muted"><strong>${content[i].price} EL</strong></p>
                             <span><i class="fa fa-star" aria-hidden="true"></i></span>
                             <span><i class="fa fa-star" aria-hidden="true"></i></span>
                             <span><i class="fa fa-star" aria-hidden="true"></i></span>
                             <span><i class="fa fa-star" aria-hidden="true"></i></span>
                             <span><i class="fa fa-star" aria-hidden="true"></i></span>
                             <button class="btn btn-success toCard">Add To Car</button>
                             <i class="fa fa-eye fa-1x" aria-hidden="true" data-toggle="modal" data-target="#product-show"></i>
                         </div>
                     </div>
                 </div>
                             `])
                .trigger('refresh.owl.carousel');
        }

        // the dialog of show products=>>>
        // on click on icon eye it takes all info from the card and take tha datafrom the json opject from loop
        $("#scroller").on("click", ".fa-eye", function () {
            //the product data
            let icon_loop = $(this).parents()[1].getAttribute("data-loop")
            productshow_details.innerText = content[icon_loop].data;

            //prouduct img
            productshow_img.src = `./pic/products/${content[icon_loop].img}`;

            //product price
            productshow_price.innerText = content[icon_loop].price;

            //prouduct 
            productshow_name.innerText = content[icon_loop].productName;

        })
    }
    request.send();

    // filter

    var $grid = $(".grid").isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });


    $(".button-group").on("click", "button", function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });


})

////////////////////////////////////////////////////////////////////////


// Login cintrole

//1-login impity form

let submitLogin = document.getElementById("submit-login"),

    email = document.getElementById("email"),
    pass = document.getElementById("pass");

$("#submit-login").on({
    click: prevent,
    click: alert,
    click: checklog,
})
function prevent(e) { e.preventDefault; return false }
function alert(e) {
    e.preventDefault()
    email.value ? email.classList.remove("alert-danger") : email.classList.add("alert-danger");
    pass.value ? pass.classList.remove("alert-danger") : pass.classList.add("alert-danger");

    console.log(pass.value)
    return false
}



////////////////////////////////////////////////////////////////////
//sgin in validation :-

let Sgin_in = document.getElementById("Sgin_in");
let sgin_inputs = document.querySelectorAll("#signin form input")

//1- check the empiy files
Sgin_in.addEventListener("click", sgininalert)


function sgininalert() {
    let p = document.createElement("p")
    p.innerText = "required filed";
    p.classList.add("alert")
    sgin_inputs.forEach(elem => {

        elem.value ? elem.classList.remove("alert-danger") : elem.classList.add("alert-danger");

    });
    return false
}

//2- validate the entered data:-

let username = document.getElementById("username"),
    s_email = document.getElementById("s-email"),
    s_pass = document.getElementById("s-pass"),
    phone = document.getElementById("phone");


$("#Sgin_in").on({
    click: validation,
    click: createUser,
})

function validation() {

    //user name contian only numbers and letter min 3 max 10

    (/^[a-zA-Z0-9]{3,10}$/).test(username.value) ? "" : $(`<p class="text-danger small p-0 m-0">user name must be more that 3 chart and only letters and num </p>`).insertAfter("#username");

    //validate the Email adress
    (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(s_email.value) ? "" : $(`<p class="text-danger small m-0">Enter Valid Email</p>`).insertAfter("#s-email");

    //validate the password

    (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(s_pass.value) ? "" : $(`<p class="text-danger small m-0">must contain cabital and smal letter and num</p>`).insertAfter("#s-pass")
    return false
}

//////////////////////////////////////////////////////

//create new users

let allusers = JSON.parse(localStorage.getItem("allusers"));

function createUser() {

    let rEmail = s_email.value
    let rPassword = s_pass.value

    let newUser = {
        userName: rEmail,
        password: rPassword,
    }

    if (allusers == null) allusers = [];

    allusers.push(newUser)

    localStorage.setItem("allusers", JSON.stringify(allusers));


    return false

}

/// check if log in and valide

function checklog() {
    loginDetails = {
        userName: email.value,
        password: pass.value,
    }

    for (i = 0; i < allusers.length; i++) {
        if (loginDetails.userName === allusers[i].userName && loginDetails.password === allusers[i].password) {
            document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success alert-dismissible fade show fixed-top rounded-pill text-center" role="alert">
            Welcom<strong> ${loginDetails.userName}</strong> you are login now
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`)
            regest = true;
            run()
            console.log(regest);
            break
        } else {
            document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-danger alert-dismissible fade show fixed-top rounded-pill text-center" role="alert">
            <strong>Wrong user name or password</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`)
            console.log(regest);

            break
        }
    }
    return false
}//end of the checklog function





////////////////////////////////////////////

function run() {
    //cart show =>> 

    let cart = document.querySelector(".fa-shopping-cart");
    let popCart = document.getElementById("cart-list")

    //show the pop-up cart==>>>

    cart.onclick = () => {
        popCart.classList.toggle("d-none")
        var popper = new Popper(cart, popCart, {
            placement: 'buttom',
        });
    }

    // add to cart=>>
    // on ckick on the buttton take the info of parent and append it to the cartr
    $("body").on("click", ".toCard", addToCart)
    let cart_list = document.getElementById("cart-list");
    var existingEntries = JSON.parse(localStorage.getItem("allitems")) // we use it in the below function

    var numberOfChildren = cart_list.childElementCount;

    document.querySelector(".badge").innerHTML = numberOfChildren

    function addToCart() {
        debugger

        document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success alert-dismissible fade show fixed-top rounded-pill text-center" role="alert">
    Item added to cart successfuly
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`)
        var productImg = $(this).offsetParent()[0].getElementsByTagName("img")[0].src,
            productName = $(this).offsetParent()[0].getElementsByTagName("h6")[0].innerText,
            productPrice = $(this).offsetParent()[0].getElementsByTagName("p")[0].innerText,
            items = {};

        items.img = productImg;
        items.name = productName;
        items.price = productPrice;


        // Parse any JSON previously stored in allEntries
        if (existingEntries == null) existingEntries = [];

        // Save allEntries back to local storage
        existingEntries.push(items); //???
        localStorage.setItem("allitems", JSON.stringify(existingEntries));///?????



        let content = `
    <div class="card mb-3">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${items.img}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${items.name}</h5>
                <p class="card-text d-inline"><small class="text-muted">${items.price}</small></p>
                <i class="far fa-trash-alt fa-lg ml-3"></i>
            </div>
        </div>
    </div>
    </div>
    `;
        cart_list.insertAdjacentHTML("beforeend", content) //insert the content elememnt as a text after the first chiled 


    }


    /// remmber the data after refrish no issues 

    if (existingEntries !== null) {
        addcontent()
    } else {
        cart_list.insertAdjacentHTML("beforeend", `<p class="text-white text-center font-weight-bold">No Items to show</p>`)
    }




    // delete the item from the cart

    $("body").on("click", ".fa-trash-alt", function () {

        //remove from local storage
        let storageVal = this.getAttribute("data-srorage")
        existingEntries.splice(storageVal, 1)
        localStorage.setItem("allitems", JSON.stringify(existingEntries))
        //remove from the dom
        console.log($(this).parents()[3].remove())
    })

    function addcontent() {

        for (i = 0; i < existingEntries.length; i++) {
            console.log(existingEntries[i])
            let content = `
        <div class="card mb-3">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${existingEntries[i].img}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${existingEntries[i].name}</h5>
                <p class="card-text d-inline"><small class="text-muted">${existingEntries[i].price}</small></p>
                <i class="far fa-trash-alt fa-lg ml-3" data-srorage="${i}"></i>
            </div>
        </div>
        </div>
        </div>
        `;
            cart_list.insertAdjacentHTML("beforeend", content) //insert the content elememnt as a text after the first chiled
        }
    }
}




