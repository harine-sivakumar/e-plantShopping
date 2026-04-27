import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {

    const dispatch = useDispatch();

    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const CartItems = useSelector((state) => state.cart.items);

    const calculateTotalQuantity = () => {
        return CartItems
            ? CartItems.reduce((total, item) => total + item.quantity, 0)
            : 0;
    };

    // 🔥 FIXED: 3 categories + 6 plants each
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters toxins.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Removes toxins.", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Healing plant.", cost: "$14" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Tulsi", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Boosts immunity.", cost: "$10" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing herb.", cost: "$12" },
                { name: "Neem", image: "https://cdn.pixabay.com/photo/2016/06/22/19/46/neem-1470062_1280.jpg", description: "Medicinal uses.", cost: "$14" },
                { name: "Ashwagandha", image: "https://cdn.pixabay.com/photo/2020/05/09/19/48/herb-5147249_1280.jpg", description: "Stress relief.", cost: "$18" },
                { name: "Ginger", image: "https://cdn.pixabay.com/photo/2017/06/02/18/24/ginger-2364847_1280.jpg", description: "Digestive aid.", cost: "$11" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Skin care.", cost: "$14" }
            ]
        },
        {
            category: "Indoor Plants",
            plants: [
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Easy to grow.", cost: "$10" },
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", description: "Low maintenance.", cost: "$25" },
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Resilient plant.", cost: "$15" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Indoor beauty.", cost: "$18" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Air purifier.", cost: "$12" },
                { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Colorful leaves.", cost: "$22" }
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

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));

        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true,
        }));
    };

    return (
        <div>

            {/* NAVBAR */}
            <div className="navbar">
                <a href="/" onClick={handleHomeClick}>Home</a>
                <a href="#">Plants</a>
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

                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>

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