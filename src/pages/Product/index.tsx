import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { Category, Product as ProductType } from "../../definitions/products"
import { useApi } from "../../hooks/useApi"
import { useCategories } from "../../hooks/useCategories"
import { useProducts } from "../../hooks/useProducts"
import { Skeleton, Paper, IconButton } from "@mui/material"
import "./style.scss"
import { Carousel } from "react-responsive-carousel"
import { CurrencyText } from "../../components/CurrencyText"
import { ReactComponent as ArrowIcon } from "../../images/arrow.svg"
import { useColors } from "../../hooks/useColors"
import Button from "@mui/material/Button"
import { useCart } from "../../hooks/useCart"
import { Footer } from "../../components/Footer"
import { ButtonComponent } from "../../components/ButtonComponent"

interface ProductProps {}

export const Product: React.FC<ProductProps> = ({}) => {
    const id = Number(useParams().id)
    const { products } = useProducts()
    const { categories } = useCategories()
    const api = useApi()
    const navigate = useNavigate()
    const colors = useColors()
    const cart = useCart()

    const [product, setProduct] = useState<ProductType>({} as ProductType)
    const [category, setCategory] = useState<Category>()
    const [galery, setGalery] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    const onCategoryClick = () => {
        navigate(`/search/category/${category?.id}`)
    }

    const changeQuantity = (value: number) => {
        if (value == -1 && quantity == 1) return

        setQuantity(quantity + value)
    }

    useEffect(() => {
        if (product.id) {
            setCategory(product?.categories)
            setLoading(false)
            const images = product.images?.split(",")
            console.log(images)
            setGalery(images as string[])
        }
    }, [product])

    useEffect(() => {
        if (products.length == 0) {
            api.products.id({
                data: { id },
                callback: (response: { data: ProductType }) => {
                    setProduct(response.data)
                },
            })
        } else {
            setProduct(products.filter((product) => product.id == id)[0])
        }
    }, [])
    return (
        <div className="Product-Page">
            <Background />
            <Header />
            <SearchField />

            {loading ? (
                <>
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "10vw" }} />
                </>
            ) : (
                <>
                    <div className="navigation">
                        <h3 className="link" onClick={() => navigate("/")}>
                            Início
                        </h3>
                        <h3>/</h3>
                        <h3 className="link" onClick={() => onCategoryClick()}>
                            {category?.name}
                        </h3>
                        <h3>/</h3>
                        <h3 className="link">{product?.name}</h3>
                    </div>

                    <Paper elevation={1} className="title">
                        <h2>{product.name}</h2>
                    </Paper>

                    <Paper className="galery">
                        <Carousel
                            showThumbs={false}
                            // autoPlay
                            infiniteLoop
                            interval={5000}
                            transitionTime={1000}
                        >
                            {galery.map((image) => (
                                <div key={galery.indexOf(image)}>
                                    <img src={image} alt="" />
                                </div>
                            ))}
                        </Carousel>
                    </Paper>

                    <p className="description">{product.description}</p>

                    <div className="numbers">
                        <div className="quantity-container">
                            <IconButton onClick={() => changeQuantity(-1)}>
                                <ArrowIcon />
                            </IconButton>

                            <div className="quantity">
                                <p>{quantity}</p>
                            </div>

                            <IconButton onClick={() => changeQuantity(1)}>
                                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
                            </IconButton>
                        </div>
                        <CurrencyText
                            value={product.price * quantity}
                            style={{
                                width: "50vw",
                                color: colors.primary,
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                                fontSize: "8vw",
                                fontWeight: "bold",
                            }}
                        />
                    </div>
                    <ButtonComponent onClick={() => cart.add({ ...product, quantity })}>
                        Adicionar ao carrinho
                    </ButtonComponent>
                    <h2 style={{ color: colors.primary }}>Detalhes</h2>
                    <ul style={{ padding: "0 4vw", color: colors.primary }}>
                        <li>Lorem Ipsum</li>
                        <li>Daenys</li>
                    </ul>

                    <div></div>
                    <div></div>
                </>
            )}

            <Footer />
        </div>
    )
}
