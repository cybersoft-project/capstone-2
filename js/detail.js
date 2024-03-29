import Product from "./models/Product.js";

const getIdProducts = () => {
    let url = window.location.search;
    let searchParams = new URLSearchParams(url);
    let id = searchParams.get(`idProduct`);
    return id;
}
const getProductsDetail = async (id) => {

    let promise = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        method: "GET",
        responseType: "json",
    });
    return promise.data.content;

}

const renderData = async () => {
    let product = new Product();
    let idProduct = getIdProducts();
    let detail = await getProductsDetail(idProduct);
    for (let index in detail) {
        product[index] = detail[index];
    }
    renderName(product.alias);
    renderSize(product.size);
    renderImage([product.image]);
    renderPrice(product.price * 1000);
    renderDesc(product.description)
    renderRelative(product.relatedProducts);
    sizeHandle();
}

const renderRelative = arrProduct => {
    let content = '';
    let relativeContent = ''
    let index = 1;

    arrProduct.forEach(product => {

      
        relativeContent += `
        <div class="col-12 col-md-4" >
            <a style="text-decoration: none" class="bg-white link-underline-none" href="${getURL()}?idProduct=${product.id}">
            <div class="w-100 imgBx">
                <img class="w-100" src="${product.image}">
            </div>
       
            <div class="product-colors item${index}">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p id="name1" class="product-name">${product.name}</p>
            <p id="size1" class="product-size">Size: 36 - 42</p>
            <p id="price1">${formatPrice(product.price * 1000)}</p>
            </a>
       
    </div>
        `
        index++;
    })
    let relativeEle = document.querySelector('.product-items');
    relativeEle.innerHTML = relativeContent;
}

const getURL = () => {
    let url = window.location.href;

    // Tách phần tên miền và đường dẫn
    const parsedUrl = new URL(url);

    // Lấy URL không bao gồm param
    const origin = parsedUrl.origin;
    const pathname = parsedUrl.pathname;
    const urlWithoutParams = origin + pathname;
    return urlWithoutParams;
}
const renderName = (name) => {
    let nameEle = document.getElementById('txt-id');
    nameEle.innerHTML = name
}
const renderPrice = (price) => {
    let priceEle = document.getElementById('txt-gia');
    priceEle.innerHTML = price.toLocaleString('vi',
        {
            style: 'currency',
            currency: 'VND'
        }
    )
        ;

}
const formatPrice = (price) => {
    return price.toLocaleString('vi',
        {
            style: 'currency',
            currency: 'VND'
        }
    )
}
const renderSize = (arrSize) => {
    let sizeEle = document.getElementById('txt-size');
    let content = '';
    arrSize.forEach(size => {

        content += `
       <li class="mx-2"><label class=" p-2 d-block w-100 pointer-event border rounded sizeBox" for="size-${size}"><input type="radio" name="size"
       value="${size}" id="size-${size}" class="visually-hidden">${size}</label></li>
       `
    });
    sizeEle.innerHTML = content;
}
const renderImage = (arrImg) => {
    console.log(arrImg, `img`);

    let indicatorEle = document.getElementById('txt-img-indicators');
    let indicatorContent = '';
    let imgEle = document.getElementById('txt-img');
    let imgContent = '';
    arrImg.forEach((img, index) => {
        indicatorContent += `
        <img type="button" data-bs-target="#productCaraousel" data-bs-slide-to="0" class="active border rounded h-100 m-3"
        src="${img}" aria-current="true" aria-label="Slide ${index}">
        `
        imgContent += `
        <img type="button" data-bs-target="#productCaraousel" data-bs-slide-to="0" class="active h-100 w-100 m-3"
              src="${img}" aria-current="true" aria-label="Slide ${index}">
        `
    })
    indicatorEle.innerHTML = indicatorContent;
    imgEle.innerHTML = imgContent
}
const renderDesc = (desc) => {
    let descEle = document.getElementById('desc');
    descEle.innerHTML = desc;
}
const sizeHandle = () => {
    let sizeBox = document.querySelectorAll('.sizeBox');
    sizeBox.forEach(box => {
        window.addEventListener('click', e => {
            removeActive('.sizeBox');
            e.target.parentNode.classList.add('active');
            const radios = document.getElementsByName('size');

            // Lặp qua từng radio button và kiểm tra nếu được chọn
            for (const radio of radios) {
                if (radio.checked) {
                    console.log(radio.value); // In ra value của radio button đang được chọn
                    break; // Thoát vòng lặp sau khi tìm thấy radio button được chọn
                }
            }
            // e.preventDefault();
        })
    })
    // Lấy tất cả radio button với name "gender"


}
const removeActive = selector => {
    let elements = document.querySelectorAll(selector);
    elements.forEach(ele => {
        ele.parentNode.classList.remove('active');
    })
}
renderData();