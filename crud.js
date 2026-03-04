

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let total = document.getElementById('total');


//console.log(title, price, taxes, discount, count, category, submit);
let mood = 'create';
let tmp;
let search = 'title';


function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value) - ((+discount.value / 100) * (+price.value + +taxes.value));
        total.innerHTML = result;

    }
    else {
        total.innerHTML = '';

    }
};
let dataproduct;
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product)
} else {
    dataproduct = [];

};


function CreatProduct() {

    let newproduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != '' && price.value != 0 && category.value != 0) {
        if (mood === 'create') {
            if (newproduct.count > 1 && newproduct.count < 99) {
                for (let i = 0; i < newproduct.count; i++) {

                    dataproduct.push(newproduct);
                    // console.log(newproduct.count);
                }
            }
            else {
                dataproduct.push(newproduct);
            }
        }
        else {
            dataproduct[tmp] = newproduct;
            mood = 'create';
            submit.innerHTML = 'create';
        }
    }


    localStorage.setItem('product', JSON.stringify(dataproduct));  //JSON.stringify علشان localstorage مبتقبلش غير stقing  وانا ببعت array
    //console.log(newproduct.count);
};

function ClearData() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

};

function DisplayData() {
    let table = '';
    for (let i = 1; i < dataproduct.length; i++) {
        table += `   <tr>
                            <td>${i}</td>
                            <td>${dataproduct[i].title}</td>
                            <td>${dataproduct[i].price}</td>
                            <td>${dataproduct[i].taxes}</td>
                            <td>${dataproduct[i].discount}</td>
                            <td>${dataproduct[i].category}</td>
                            <td>${dataproduct[i].total}</td>
                            <td><button onclick="updateproduct(${i})" id="update"> Update</button></td>
                            <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
                        </tr>
        `;
        document.getElementById('tbody').innerHTML = table;

    }


};

function DeleteProduct(i) {
    dataproduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataproduct);
    DisplayData();
    console.log(i);

};

function updateproduct(i) {
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    discount.value = dataproduct[i].discount;
    category.value = dataproduct[i].category;
    getTotal();
    //count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });

};

// function getsearchmood(id){
//    if(id == 'searchtitle')
//    { 
//      search ='title';   
//       }
//    else {
//     search='category';
//     }
// }

function searchdata(value) {
    let table = '';
    if (search == 'title') {
        for (let i = 0; i < dataproduct.length; i++) {
            if (dataproduct[i].title.includes(value) || dataproduct[i].category.includes(value)) {
                table += `   <tr>
                            <td>${i}</td>
                            <td>${dataproduct[i].title}</td>
                            <td>${dataproduct[i].price}</td>
                            <td>${dataproduct[i].taxes}</td>
                            <td>${dataproduct[i].discount}</td>
                            <td>${dataproduct[i].category}</td>
                            <td>${dataproduct[i].total}</td>
                            <td><button onclick="updateproduct(${i})" id="update"> Update</button></td>
                            <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
                        </tr>
        `;

            }
        }

    } else {

    }
    document.getElementById('tbody').innerHTML = table;

}

DisplayData();
