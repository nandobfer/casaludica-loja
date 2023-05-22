import React from "react"
import { ReactComponent as CloseIcon } from "../../images/x.svg"

interface ProductProps {}

export const Product: React.FC<ProductProps> = ({}) => {
    return (
        <div className="product-container">
            <img src="/product-image.png" alt="product" className="img-product" />
            <div className="right-container">
                <p className="name-product">
                    Produto: <span>Lorem Ipsum Dolor</span>
                </p>
                <p className="quantity">
                    Quantidade: <input type="number" className="number" />
                </p>
                <p className="price-product">
                    Preço: <span className="price">R$29,90</span>
                </p>
            </div>
            <CloseIcon className="close" />
        </div>
    )
}
