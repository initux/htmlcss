import React, { useEffect, useState } from 'react';
import './MoreToLove.css';
import { Container, Spinner, Button } from 'react-bootstrap';
import MoreToLoveSummery from './MoreToLoveSummery';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const MoreToLove = () => {
    const {handleClearAllProductsPage} = useAuth();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    // localStorage
    const getStarting = JSON.parse(localStorage.getItem('starting'));

    let limit = 12;
    const loadData = () => {
        if(limit <= 60){
            setLoader(true);
        }
        fetch(`${process.env.REACT_APP_BASE_URL}api/products?page=1&&limit=${limit}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${getStarting.token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data.data);
            setLoader(false)
        })
        .catch((error) => {
            console.log(error)
        });
        limit = limit + 12;
    };

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadData();
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scroll", handleScroll);
  }, []);

 
    return (
        <div>
           {    products.length === 0 ?
                ''
                :
                <Container>
                    <div className="tmp18-more-love-container" style={{marginTop: '40px'}}>
                        <h3>
                            <div style={{height: '1px', width: '123px', borderTop: '1px solid hsla(0,0%,59.2%,.3)'}}></div>
                            <div style={{margin: '0px 18px', fontWeight: '700'}}>More To Love</div>
                            <div style={{height: '1px', width: '123px', borderTop: '1px solid hsla(0,0%,59.2%,.3)'}}></div>
                        </h3>
                        <div className="tmp18-foryou">
                            {
                                products?.slice(0, 60)?.map( product => <MoreToLoveSummery product={product} key={product._id}></MoreToLoveSummery>)
                            }
                        </div>
                        {
                            loader === true && 
                            <div className="text-center mt-5">
                                <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none', outline: 'none'}} disabled>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                    {/* Loading... */}
                                </Button>
                            </div>
                        }
                        {   
                            products?.length > 60 &&
                            <div className="text-center">
                                <Link to="/products" onClick={handleClearAllProductsPage}>
                                    <button style={{width: '50%', backgroundColor: `${getStarting?.primaryColor}`, color: '#fff', padding: '10px 0px', border: 'none', borderRadius: '20px', marginTop: '40px'}}>View More</button>
                                </Link>
                            </div>
                        }
                    </div>
                </Container>
            }
        </div>
    );
};

export default MoreToLove;


