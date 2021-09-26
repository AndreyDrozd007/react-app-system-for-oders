import React from "react";
import data from './data.json'
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            products: data.products,
            cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
            type:'',
            // sort:'',
        };
    }

    createOrder = (order) => {
        alert('Need to save order for ' + order.name)
    }

    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter((x) => x._id !== product._id),
        })
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((x) => x._id !== product._id)))
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item._id === product._id) {
                item.count++;
                alreadyInCart = true;
            }
        })
        if(!alreadyInCart){
            cartItems.push({...product, count: 1})
        }
        this.setState({cartItems})
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } 

    // sortProducts = (event) => {
    //     const sort = event.target.value;
    //     this.setState((state) => ({
    //         sort: sort,
    //         products: this.state.products.slice().sort((a,b) =>
    //             sort === '2' ? a.price > b.price ? 1: -1:
    //             sort === '3' ? a.price < b.price ? 1: -1:
    //             a._id < b._id ? 1: -1,
    //         )
    //     }))
    // }
    
    filterProducts = (event) => {
        if(event.target.value === '') {
            this.setState({type: event.target.value, products:data.products})
        } else {
            this.setState({
                type: event.target.value,
                products: data.products.filter((product) => product.typeOfFood.indexOf(event.target.value) >= 0),
            })
        }

    }

    render() {
        return (
            <div className='container-app'>
                <header>
                    <a href='/'>System for oders</a>
                </header>
                <main>
                    <div className='content-app'>
                        <div className='main-content-app'>
                            <Filter count={this.state.products.length} 
                                type={this.state.type}
                                // {/* sort={this.state.sort} */}
                                filterProducts={this.filterProducts}
                                // {/* sortProducts={this.sortProducts} */}
                                >
                            </Filter>
                            <Products 
                                products={this.state.products} 
                                addToCart={this.addToCart}>
                            </Products>
                        </div>
                        <div className='sidebar-app'>
                            <Cart 
                                cartItems={this.state.cartItems} 
                                removeFromCart={this.removeFromCart}
                                createOrder={this.createOrder}
                            />
                        </div>
                    </div>
                </main>
                <footer>All right is reser</footer>
            </div>
        )
    }
}

export default App