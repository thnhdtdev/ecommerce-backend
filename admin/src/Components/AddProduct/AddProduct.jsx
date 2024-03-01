import { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    // Set image hien tren man hinh
    const [image, setImage] = useState(false);
    const [productDetails, setproductDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHanler = (e) => {
        setproductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        console.log(productDetails);

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });
        ///addproduct
        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed")
            })
        }
    }

    return (
        <div className='addProduct'>
            <div className="addProduct-itemField">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHanler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addProduct-Price">
                <div className="addProduct-itemField">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHanler} type="text" name='old_price' placeholder='Type Here' />
                </div>
                <div className="addProduct-itemField">
                    <p>Ofter Price</p>
                    <input value={productDetails.new_price} onChange={changeHanler} type="text" name='new_price' placeholder='Type Here' />
                </div>
            </div>
            <div className="addProduct-itemField">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHanler} name="category" className="add-product-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            {/* them file */}
            <div className="addProduct-itemField">
                <label htmlFor="file-input">
                    {/* hien hinh anh */}
                    <img className='addproduct-thumnail-img' src={image ? URL.createObjectURL(image) : upload_area} alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct