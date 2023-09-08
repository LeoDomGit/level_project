import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/detail.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductRelate from "../components/ProductRelate";
import 'swiper/css';
function Detail() {
    const { id } = useParams();
    const baseURL = "https://students.trungthanhweb.com/api/single";
    const token = localStorage.getItem('token');
    const [product, setProduct] = useState({});
    const [brandProducts, setBrandProducts] = useState([]);
    const [cateProducts, setCateProducts] = useState([]);
    const [gallery, setGallery] = useState([]);
    const image = `https://students.trungthanhweb.com/images/`;

    const getData = () => {
        axios.get(`${baseURL}?apitoken=${token}&id=${id}`).then((res) => {
            if (res.data) {
                setBrandProducts(res.data.brandproducts);
                setCateProducts(res.data.cateproducts);
                setProduct(res.data.products[0]);
                setGallery(res.data.gallery)
            }
        });
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <Navbar />

            <div className="mainProduct">
                <div className="row w-100 mt-3">
                    <div className="ps-3 col-md-4">
                        <Carousel showStatus={false} showArrows={true}>
                            {gallery && gallery.map((item) =>
                                <div key={item.id}>
                                    <img  src={item} />
                                </div>
                            )}
                        </Carousel>
                    </div>
                    <div className="col-md-8 pt-5">
                        <div className="row w-50">
                            <div className="table-responsive">
                                <table className="table table-primary">
                                    <tbody>
                                        <tr className="">
                                            <td scope="row">Tên sản phẩm </td>
                                            <td>{product.name}</td>
                                        </tr>
                                        <tr className="">
                                            <td scope="row">Giá</td>
                                            <td>{Intl.NumberFormat('en-US').format(Number(product.price))}</td>
                                        </tr>
                                        <tr className="">
                                            <td scope="row">Giảm giá</td>
                                            <td><b>{product.discount}%</b></td>
                                        </tr>
                                        <tr className="">
                                            <td scope="row">Thương hiệu</td>
                                            <td><b>{product.brandname}</b></td>
                                        </tr>
                                        <tr className="">
                                            <td scope="row">Loại sản phẩm</td>
                                            <td><b>{product.catename}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className="row ms-0 mb-5">
                                <div className="col-md">
                                    <button className='btn btn-success w-100'>Thêm vào giỏ hàng</button>
                                </div>
                                <div className="col-md">
                                    <button className='btn btn-warning  w-100 '>Trả góp</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Sản phẩm cùng thương hiệu</h4>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {brandProducts && brandProducts.length>0 && brandProducts.map((item)=>
                                    <SwiperSlide>
                                        <ProductRelate key={item.id} name={item.name} image={image+item.image} id={item.id} price={item.price}/>
                                    </SwiperSlide>
                                )}
                                
                            
                            </Swiper>
                            </div>
                            <div className="col-md-6">
                                <h4>Sản phẩm cùng loại</h4>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {cateProducts && cateProducts.length>0 && cateProducts.map((item)=>
                                    <SwiperSlide>
                                        <ProductRelate key={item.id} name={item.name} image={image+item.image} id={item.id} price={item.price}/>
                                    </SwiperSlide>
                                )}
                                
                            
                            </Swiper>
                            </div>      
                        </div>
                        <div className="row mt-2 w-100">
                                    
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detail