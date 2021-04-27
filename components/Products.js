import React from 'react';

const Products = (props) => {
    const search = (s) => {
        props.setFilters({
            ...props.filters,
            s,
            page: 1
        });
    }

    const sort = (sort) => {
        props.setFilters({
            ...props.filters,
            sort,
            page: 1
        });
    }

    const loadMore = () => {
        props.setFilters({
            ...props.filters,
            page: props.filters.page + 1
        });
    }

    let button;

    if (props.filters.page !== props.lastPage) {
        button = (
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={loadMore}>Load More</button>
            </div>
        )
    }

    return (
        <>
            <div className="col-md-12 mb-4 input-group">
                <input className="form-control" placeholder="Search" onKeyUp={e => search(e.target.value)}/>
                <div className="input-group-append">
                    <select className="form-select" onChange={e => sort(e.target.value)}>
                        <option>Select</option>
                        <option value="asc">Price Ascending</option>
                        <option value="desc">Price Descending</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {props.products.map(product => {
                    return (
                        <div className="col" key={product.id}>
                            <div className="card shadow-sm">
                                <img src={product.image} height={200}/>

                                <div className="card-body">
                                    <p className="card-text">{product.title}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">${product.price}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {button}
        </>
    );
};

export default Products;
