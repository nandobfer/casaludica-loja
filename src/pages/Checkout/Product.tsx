import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product as ProductType } from "../../definitions/products"
import { useCart } from "../../hooks/useCart"
import { ReactComponent as CloseIcon } from "../../images/x.svg"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const cart = useCart()
    const navigate = useNavigate()

    const [productQuantity, setProductQuantity] = useState(product.quantity)

    const deleteProduct = () => {
        if (cart.products.length > 1) {
            cart.remove(product)
        } else {
            cart.remove(product)
            navigate("/")
        }
    }
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
                        value={productQuantity}
                        onChange={(event) => setProductQuantity(Number(event.target.value))}
                    />
                </p>
                <p className="price-product">
                    Preço: <span className="price">R${product.price}</span>
                </p>
            </div>
            <CloseIcon className="close" onClick={deleteProduct} />
        </div>
    )
}
