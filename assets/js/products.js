const menuToggle= document.querySelector("[data-menu-toggle]");
const nav= document.querySelector("[data-nav-category]");
menuToggle.addEventListener("click",()=>{
    nav.toggleAttribute("data-open");
});

async function getCategories(){
    const response= await axios.get("https://dummyjson.com/products/categories")
    console.log(response.data);
    const categoriesData= response.data;
    const result =categoriesData.map(category => {
            return `
                <div class="hover:shadow-2xl w-full cursor-pointer">
                    <button type="submit" class="text-md font-medium hover:font-bold hover:text-blue-700 hover:cursor-pointer transition-all w-full md:text-left shadow-lg">${category.slug}</button>
                </div>
            `
        }).join('');
        document.querySelector("[data-categories]").innerHTML = result;
}
async function getProducts(){
    const response= await axios.get("https://dummyjson.com/products")
    console.log(response.data.products);
    const productsData= response.data.products;
    
    const result =productsData.map(product => {
        const discount = Math.trunc(product.discountPercentage);
        const origPrice = product.price/(1-(discount/100));
        const discountPrice = Number(origPrice.toFixed(2));
            return `
            <div class="product overflow-hidden">
                <div class="relative bg-amber-50">
                    <img src=${product.thumbnail} class="w-full h-full" alt="">
                    <span class="bg-amber-500 px-1 rounded-4xl absolute z-20 top-2 left-2 text-sm">${discount}%</span>
                </div>
                <div class="details">
                    <div>
                        <p class="text-md text-gray-600 font-bold uppercase">${product.category}</p>
                        <h2>${product.title}</h2>
                    </div>
                    <div>
                        <p class="text-sm text-gray-400">${product.shippingInformation}</p>
                        <h3 class="font-bold">${product.price}$ <span class="text-sm font-medium text-gray-400 line-through">$${discountPrice}</></h3>
                    </div>
                </div>
            </div>
            `
        }).join('');
        document.querySelector("[data-products]").innerHTML = result;
}
async function getData() {
    await getCategories();
    await getProducts();
}
getData();