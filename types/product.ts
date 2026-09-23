export interface Product {
    id : number
    title : string
    description : string
    category : string
    price : number
    rating : string
    stock : string
    brand? : string
    thumbnail : string
    images : string[]
}

export interface ProductResponse {
    products : Product[]
    total : number
    skip : number
    limit : number
}


export interface Review {
    rating : number
    comment : string
    date : string
    reviewerName : string
    reviewerEmail : string
}


export interface ProductDetails extends Product {
    reviews : Review[]
}

export interface Category {
    slug : string
    name : string
    url : string
}