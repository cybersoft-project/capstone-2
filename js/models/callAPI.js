export function getAllGiayAPI() {
    let promise = axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
    
    });
    return promise;
}