import React, { Component } from 'react';
// import styles from './index.module.css';
import Table from '../../components/admin-table';
import AdminWrapper from '../../components/admin-wrapper';
import { getAllProducts } from '../../utils/requester';

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }
    componentDidMount = async () => {
        const products = await getAllProducts();
        this.setState({
            products
        });
    }
    render() {
        const { products } = this.state
        return (
            <AdminWrapper>
                <Table data={products} />
            </AdminWrapper>
        )
    }
}

export default Products;
