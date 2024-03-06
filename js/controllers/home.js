import { getAllGiayAPI } from "../models/callAPI.js";
import verifySoLuongGiay from "./validation.js";

let arrGiay = [];

function getAllGiay() {
    getAllGiayAPI()
        .then((res) => {
            console.log(res);
            // Shuffle all contents in Back-End returning Arrays
            arrGiay = res.data.content.sort(() => 0.5 - Math.random());
            getAttributeGiay(arrGiay);
        })
        .catch((err) => {
            console.log(err);
        });
}
getAllGiay();

function getAttributeGiay(arrGiay) {
    let arrProduct = document.querySelectorAll(".product-items > div");
    let currentURL = window.location.href;
    let slashIndex = currentURL.lastIndexOf("/");

    arrProduct = verifySoLuongGiay(arrGiay, arrProduct);

    arrProduct.forEach((item, index) => {
        let giay = arrGiay[index];

        Array.from(item.children).forEach((item,index) => {
            if(index == 0) {
                // Lấy chuỗi href từ thanh trình duyệt dạng gán cứng ( Static )
                // item.href = `http://127.0.0.1:5500/detail.html?idProduct=${giay[item.id.slice(0, -1)]}`;
                
                // Lấy chuỗi href từ thanh trình duyệt dạng động ( Dynamic )
                item.href = `${currentURL.substring(0, slashIndex)}/detail.html?idProduct=${giay[item.id.slice(0, -1)]}`;
                item.innerHTML = `<img src="${giay.image}" alt="Đây là ảnh Sản phẩm">`;
                return;
            }
            else if (index == 1){
                return;
            }
            else if (index == 3){
                let arrSize = giay[item.id.slice(0, -1)].slice(1,-1).split(",");
                item.innerHTML = `Size: ${arrSize[0]} - ${arrSize[arrSize.length - 1]}`;
            }
            else if (index == 4){
                item.innerHTML = `${giay[item.id.slice(0, -1)]},000 <sup>₫</sup>`
                return;
            }
            else{
                item.innerHTML = giay[item.id.slice(0, -1)];
            }
        });
    });
}

function redirectURL () {
    let anchorLink = document.querySelector(".product-items a:first-of-type");

    anchorLink.onclick = () => {
        window.location.href = anchorLink.href; 
    }
}
redirectURL();

function randomBanner(bannerObj ,bannerLen) {
    let arrProducts = document.querySelectorAll(".product-items a:first-of-type");
    arrProducts = Array.from(arrProducts).sort(() => {
        return 0.5 - Math.random();
    });

    let newArrProducts = arrProducts.slice(0, bannerLen);

    newArrProducts.forEach((item, index) => {
        bannerObj[index].href = item.getAttribute("href");
    });
}

window.onload = () => {
    let arrBanner = document.querySelectorAll(".bitasCarousel .carousel-item a");
    setTimeout(() => {
        randomBanner(arrBanner ,arrBanner.length);
    }, 500);
};
