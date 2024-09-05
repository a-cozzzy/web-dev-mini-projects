import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,  // Convert price to a number
        }));
    };

    console.log(book);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/books/" + bookId, book);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form">
            <h1>Update this Book</h1>
            <input
                type="text"
                placeholder="title"
                onChange={handleChange}
                name="title"
            />
            <input
                type="text"
                placeholder="desc"
                onChange={handleChange}
                name="desc"
            />
            <input
                type="number"
                placeholder="price"
                onChange={handleChange}
                name="price"
            />
            <input
                type="text"
                placeholder="cover"
                onChange={handleChange}
                name="cover"
            />
            <button className="formButton" onClick={handleClick}>
                UPDATE
            </button>
        </div>
    );
};

export default Update;
