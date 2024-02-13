class ProductManager {
    constructor() {
        this.products = []
        this.code = 1
    }

    addProduct = (title, description, price, thumbnail, stock) => {
        const product = {
            title, // Es lo mismo que -> title: this.title
            description,
            price,
            thumbnail,
            stock,
            code: this.code++
        }

        this.products.push(product)
    }

    getProducts = () => console.log(this.products) // Actua como return y no requiere '{}'

    getProductByCode = code => {
        let searchProd = this.products.find(p  => p.code === code)
        if (searchProd) {
            console.log(searchProd)
        } else {
            console.log('CODE not found')
        }
    }
}


const prod = new ProductManager()

prod.addProduct("a","a","a","a","a")
prod.addProduct("b","b","b","b","b")
prod.addProduct("c","c","c","c","c")

// prod.getProducts()
prod.getProductByCode(1)