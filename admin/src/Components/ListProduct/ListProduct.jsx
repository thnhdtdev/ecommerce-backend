import { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allProduct, setAllProduct] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allProducts')
            .then((res) => res.json())
            .then((data) => { setAllProduct(data) });
    }
    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeProduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }



    return (
        <div className='listProduct'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listproduct-allproduct'>
                <hr />
                {allProduct.map((product, index) => {
                    return <><div key={index} className="listproduct-format-main listproduct-fomart">
                        <img className='listproduct-product-icon' src={product.image} alt="" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                        <hr /></>
                })}
            </div>

        </div>
    )
}

export default ListProduct