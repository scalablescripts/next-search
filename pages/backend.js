import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Products from "../components/Products";

const Backend = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: '',
        page: 1
    });
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const arr = [];

                if (filters.s) {
                    arr.push(`s=${filters.s}`);
                }

                if (filters.sort) {
                    arr.push(`sort=${filters.sort}`);
                }

                if (filters.page) {
                    arr.push(`page=${filters.page}`);
                }

                const response = await fetch(`http://localhost:8000/api/products/backend?${arr.join('&')}`);

                const content = await response.json();

                setProducts(filters.page === 1 ? content.data : [...products, ...content.data]);
                setLastPage(content.last_page);
            }
        )()
    }, [filters]);

    return (
        <Layout>
            <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
        </Layout>
    );
};

export default Backend;
