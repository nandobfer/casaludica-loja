import React from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { Collections } from "../Home/Collections"
import "./style.scss"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    return (
        <div className="Checkout-Component">
            <Background />
            <Header />

            <SearchField />
            <Collections />

            <p className="finish">Finalizar Pedido</p>
            <div className="order">
                <p>Produto 1</p>
            </div>
        </div>
    )
}
