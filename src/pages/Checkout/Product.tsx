import React, { useState } from "react"
import { Product as ProductType } from "../../definitions/products"
import { ReactComponent as CloseIcon } from "../../images/x.svg"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [productQuantity, setProductQuantity] = useState(product.quantity)
    return (
        <div className="product-container">
            <img src={product.cover} alt="product" className="img-product" />
            <div className="right-container">
                <p className="name-product">
                    Produto: <span>{product.name}</span>
                </p>
                <p className="quantity">
                    Quantidade:{" "}
                    <input
                        type="number"
                        className="number"
                        value={product.quantity}
                        onChange={(event) => setProductQuantity(Number(event.target.value))}
                    />
                </p>
                <p className="price-product">
                    Preço: <span className="price">R${product.price}</span>
                </p>
            </div>
            <CloseIcon className="close" />
        </div>
    )
}
