import React, { useEffect, useState } from 'react'
import "./MainPage.css"
import Card from '../components/Card'
import CryptoJS from 'crypto-js';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const API = 'https://api.valantis.store:41000/';

export default function Component() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [fiftyIds, setFiftyIds] = useState([]);
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const password = "Valantis";

    const hashedAuthString = CryptoJS.MD5(`${password}_${timestamp}`).toString();

    const xAuthHeader = hashedAuthString;

    const brands = ['Baraka', 'Piaget', 'Jacob & Co', 'Cartier', 'Bibigi', 'ЭПЛ Якутские бриллианты', 'Bvlgari', 'Chopard', 'Van Cleef & Arpels', 'Pasquale Bruni', 'Pomellato', 'Casato', 'Imma', 'Faberge', "Roberto Coin", "Damiani", "Carrera y Carrera", "De Beers", 
    "Audemars Piguet", "Mikimoto", "Giorgio Visconti", "Stephen Webster", "Chaumet", "Tiffany & Co", "Faberge"]

    useEffect(() => {
        get50ids();
    }, [page]);

    useEffect(() => {
        if (fiftyIds.length > 0) {
            get50products();
        }
    }, [fiftyIds]);

    useEffect(() => {
        const newProducts = removeDuplicates([...products]);
        if(newProducts.toString() == products.toString()) {
            return;
        }
        setProducts(newProducts);
    }, [products]);

    const removeDuplicates = (arr) => {
        const uniqueIds = new Set();

        const uniqueArray = arr.filter(obj => {
            if (!uniqueIds.has(obj.id)) {
                uniqueIds.add(obj.id);
                return true;
            }
            return false;
        });

        return uniqueArray;
    }

    const get50ids = async () => {
        setLoading(true);
        const requestBody = {
            "action": "get_ids",
            "params": {"offset": page * 50, "limit": 50}
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': xAuthHeader
            },
            body: JSON.stringify(requestBody)
        };

        await fetch(API, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then(data =>  {
            setFiftyIds(data.result);
            setLoading(false);
        })
        .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
        });
    };

    const getFilteredProducts = async () => {
        setLoading(true);

        let requestBody;

        const isSearchNum = Number(search);

        if(isNaN(isSearchNum)) {
            if(brands.includes(search)) {
                requestBody = {
                    "action": "filter",
                    "params": {"brand": search}
                };
            } else {
                requestBody = {
                    "action": "filter",
                    "params": {"product": search}
                };
            }
        } else {
            requestBody = {
                "action": "filter",
                "params": {"price": Number(search)}
            };
        }


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': xAuthHeader
            },
            body: JSON.stringify(requestBody)
        };

        await fetch(API, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            if(data.result.length != 0) {
                setFiftyIds(data.result);
                setLoading(false);
            }
            setProducts([]);
            setLoading(false);
        })
        .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
        });
    }

    const handleSearch = () => {
        getFilteredProducts();
        setSearch('');
    }

    const get50products = async () => {
        setLoading(true);
        const requestBody = {
            "action": "get_items",
            "params": {"ids": fiftyIds}
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': xAuthHeader
            },
            body: JSON.stringify(requestBody)
        };

        await fetch(API, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <Header search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <main className="main">
                <section className="cards-container">
                    {loading ? <Loader /> : products.map((item, index) => (
                        <Card
                            key={index}
                            productName={item.product}
                            price={item.price}
                            brand={item?.brand}
                            id={item.id}
                        />
                    ))}                </section>
                {(products?.length > 0 && !loading) ? <Pagination page={page} setPage={setPage} products={products} /> : null}
            </main>
        </div>
    )
}

