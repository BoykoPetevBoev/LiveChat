import React from 'react';
import Footer from '../../components/footer';
import Products from '../../components/products';
import Banner from '../../components/banner';
import Wrapper from '../../components/wrapper';


function HomePage({ filter }) {
    
    return (
        <div>
            <Wrapper>
                <Banner />
                <Products filter={filter} />
            </Wrapper>
            <Footer />
        </div>
    )
}

export default HomePage