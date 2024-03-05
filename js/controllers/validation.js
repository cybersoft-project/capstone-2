export default function verifySoLuongGiay(arrGiay, arrProduct) {
    if(arrGiay.length < arrProduct.length) {
        return arrProduct.slice(arrGiay.length - 1);
    }
    else {
        return arrProduct;
    }
}