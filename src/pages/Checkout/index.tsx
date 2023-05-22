import React from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../Home/Collections"
import { Product } from "./Product"
import "./style.scss"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const cart = useCart()

    return (
        <div className="Checkout-Component">
            <Background />
            <Header />

            <SearchField />
            <Collections />

            <p className="finish">Finalizar Pedido</p>
            <div className="order">
                {cart.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
