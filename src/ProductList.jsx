import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import { useSelector } from 'react-redux';

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const CartItems = useSelector((state) => state.cart.items);

const calculateTotalQuantity = () => {
  return CartItems
    ? CartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
};

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        }
    ];

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // 🔥 FINAL ADD TO CART FUNCTION
    const handleAddToCart = (product) => {
        dispatch(addItem(product));

        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>

            {/* NAVBAR */}
            <div className="navbar">
                <a href="/" onClick={handleHomeClick}>Home</a>
                <a href="#" onClick={handlePlantsClick}>Plants</a>
                <a href="#" onClick={handleCartClick}>
  Cart 🛒 ({calculateTotalQuantity()})
</a>
            </div>

            {!showCart ? (
                <div className="product-grid">

                    {plantsArray.map((category, index) => (
                        <div key={index}>

                            <h2>{category.category}</h2>

                            <div className="product-list">

                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>

                                        <img
                                            className="product-image"
                                            src={plant.image}
                                            alt={plant.name}
                                        />

                                        <div className="product-title">
                                            {plant.name}
                                        </div>

                                        <div className="product-description">
                                            {plant.description}
                                        </div>

                                        <div className="product-cost">
                                            {plant.cost}
                                        </div>

                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>

                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}

        </div>
    );
}

export default ProductList;