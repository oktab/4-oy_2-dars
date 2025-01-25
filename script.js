// const apiUrl = 'https://67665085410f84999657549a.mockapi.io/students';

// let inputName = document.querySelector('#InputName');
// let inputNumber = document.querySelector('#InputNumber');
// let block = document.querySelector('#block');
// let editID = null
// let saveBtn = document.querySelector('#save')

// function loading() {
//     let get = new XMLHttpRequest();
//     get.open('GET', apiUrl);

//     get.onload = function () {
//         if (get.status == 200) {
//             let data = JSON.parse(get.responseText);
//             console.log(data);

//             block.innerHTML = '';

//             data.forEach((item) => {
//                 block.innerHTML += `
//                     <div class="flex w-[1000px] justify-between p-2 items-center border-b-2 mx-auto mt-[50px]" data-id="${item.id}">
//                         <div class="flex gap-[10px] items-center">
//                             <img src="./Group 232.png" alt="">
//                             <div class="ms-6">
//                                 <h1 class="font-bold">${item.firstName}</h1>
//                                 <p class="text-[#8A8A8D]">${item.telNumber}</p>
//                             </div>
//                         </div>
//                         <div>
//                             <button class="ms-6" onclick="deleteData('${item.id}')"><img src="./Vector (3).png" alt=""></button>
//                             <button class="ms-6"><img src="./Group.png" alt=""></button>
//                         </div>
//                     </div>
//                 `;
//             });
//         } else {
//             console.error('Xatolik:', get.status);
//         }
//     };

//     get.send();
// }

// function sendData(event) {
//     event.preventDefault();

//     let name = inputName.value;
//     let number = inputNumber.value;

//     if (name === '' || number === '') {
//         alert('Iltimos, barcha maydonlarni to\'ldiring!');
//         return;
//     }

//     let post = new XMLHttpRequest();
//     post.open('POST', apiUrl, true);
//     post.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//     const pushData = JSON.stringify({
//         firstName: name,
//         telNumber: number,
//     });

//     post.onload = function () {
//         if (post.status == 201) {
//             const newItem = JSON.parse(post.responseText);
//             block.innerHTML += `
//                 <div class="flex w-[1000px] justify-between p-2 items-center border-b-2 mx-auto mt-[50px]" data-id="${newItem.id}">
//                     <div class="flex gap-[10px] items-center">
//                         <img src="./user.png" alt="">
//                         <div class="ms-6">
//                             <h1 class="font-bold">${newItem.firstName}</h1>
//                             <p class="text-[#8A8A8D]">${newItem.telNumber}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <button class="ms-6" onclick="deleteData('${newItem.id}')"><img src="./delete.svg" alt=""></button>
//                         <button class="ms-6"><img src="./edit.svg" alt=""></button>
//                     </div>
//                 </div>
//             `;
//             loading();
//         } else {
//             console.error('Xatolik:', post.status);
//         }
//     };

//     post.send(pushData);
// }
// loading();
// document.querySelector('#form').addEventListener('submit', sendData);

// function deleteData(id) {
//     console.log('Deleting item with ID:', id);

//     let del = new XMLHttpRequest();
//     del.open('DELETE', apiUrl + '/' + id, true); 

//     del.onload = function () {
//         if (del.status == 200) {
//             console.log('Ma\'lumot o\'chirildi');

//             let element = document.querySelector(`[data-id="${id}"]`);
//             if (element) {
//                 element.remove();
//             }
//         } else {
//             console.error('Xatolik:', del.status); 
//         }
//     };

//     del.send();
// }
// saveBtn.addEventListener('click', () =>{
//     function editData(id) {
    
//         let update = new XMLHttpRequest();
//         update.DONE.open("PUT",`${apiUrl}/${id}`)
    
//         update.onload = function(){
//             if(update.status === 200){
//                 console.log("asasasasa");
                
//                 let data = JSON.parse(update.responseText)
//                 inputName.value = data.firstName
//                 inputNumber.value = data.telNumber
//                 saveBtn.textContent = "Save"
//                 editID = id
//             }
//         }
//         update.send()
//     }
// })
// loading()

const apiUrl = 'https://67665085410f84999657549a.mockapi.io/students';

let inputName = document.querySelector('#InputName');
let inputNumber = document.querySelector('#InputNumber');
let block = document.querySelector('#block');
let saveBtn = document.querySelector('#save');
let editID = null;

// Ma'lumotlarni yuklash funksiyasi
function loading() {
    let get = new XMLHttpRequest();
    get.open('GET', apiUrl);

    get.onload = function () {
        if (get.status == 200) {
            let data = JSON.parse(get.responseText);

            block.innerHTML = ''; // Blokni tozalash

            data.forEach((item) => {
                block.innerHTML += `
                    <div class="flex w-[1000px] justify-between p-2 items-center border-b-2 mx-auto mt-[50px]" data-id="${item.id}">
                        <div class="flex gap-[10px] items-center">
                            <img src="./Group 232.png" alt="User" width="50">
                            <div class="ms-6">
                                <h1 class="font-bold">${item.firstName}</h1>
                                <p class="text-[#8A8A8D]">${item.telNumber}</p>
                            </div>
                        </div>
                        <div>
                            <button class="ms-6" onclick="deleteData('${item.id}')">
                                <img src="./delete.svg" alt="Delete" width="20">
                            </button>
                            <button class="ms-6" onclick="editData('${item.id}')">
                                <img src="./edit.svg" alt="Edit" width="20">
                            </button>
                        </div>
                    </div>
                `;
            });
        } else {
            console.error('Xatolik:', get.status);
        }
    };

    get.send();
}

// Qo'shish yoki yangilash funksiyasi
function sendData(event) {
    event.preventDefault();

    let name = inputName.value;
    let number = inputNumber.value;

    if (name === '' || number === '') {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }

    if (editID) {
        // Ma'lumotni yangilash (PUT)
        let update = new XMLHttpRequest();
        update.open("PUT", `${apiUrl}/${editID}`, true);
        update.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        const updatedData = JSON.stringify({
            firstName: name,
            telNumber: number,
        });

        update.onload = function () {
            if (update.status == 200) {
                console.log("Ma'lumot yangilandi");
                editID = null; // ID ni qayta o'rnatish
                saveBtn.textContent = "Save"; // Tugmani qayta "Save" qilish
                inputName.value = '';
                inputNumber.value = '';
                loading(); // Yangi ma'lumotlarni yuklash
            } else {
                console.error('Xatolik:', update.status);
            }
        };

        update.send(updatedData);
    } else {
        // Ma'lumotni qo'shish (POST)
        let post = new XMLHttpRequest();
        post.open('POST', apiUrl, true);
        post.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        const pushData = JSON.stringify({
            firstName: name,
            telNumber: number,
        });

        post.onload = function () {
            if (post.status == 201) {
                console.log("Ma'lumot qo'shildi");
                inputName.value = '';
                inputNumber.value = '';
                loading(); // Yangi ma'lumotlarni yuklash
            } else {
                console.error('Xatolik:', post.status);
            }
        };

        post.send(pushData);
    }
}

// Ma'lumotni tahrirlash funksiyasi
function editData(id) {
    let get = new XMLHttpRequest();
    get.open("GET", `${apiUrl}/${id}`, true);

    get.onload = function () {
        if (get.status == 200) {
            let data = JSON.parse(get.responseText);

            inputName.value = data.firstName;
            inputNumber.value = data.telNumber;
            saveBtn.textContent = "Update"; // Tugma matnini o'zgartirish
            editID = id; // Tahrirlanayotgan ID ni saqlash
        } else {
            console.error('Xatolik:', get.status);
        }
    };

    get.send();
}

// Ma'lumotni o'chirish funksiyasi
function deleteData(id) {
    let del = new XMLHttpRequest();
    del.open('DELETE', `${apiUrl}/${id}`, true);

    del.onload = function () {
        if (del.status == 200) {
            console.log('Ma\'lumot o\'chirildi');
            loading(); // O'chirilgandan so'ng yangilash
        } else {
            console.error('Xatolik:', del.status);
        }
    };

    del.send();
}

// DOM yuklangandan so'ng boshlash
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form').addEventListener('submit', sendData);
    loading(); // Dastlabki ma'lumotlarni yuklash
});
