import React from "react";
import data from './db.json'
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            products: data.products,
            cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
            type:'',
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
            <Provider store={store}>
                <div className='container-app'>
                    <header>
                        <a href='/'>System for oders</a>
                    </header>
                    <main>
                        <div className='content-app'>
                            <div className='main-content-app'>
                                <Filter count={this.state.products.length} 
                                    type={this.state.type}
                                    filterProducts={this.filterProducts}>
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
            </Provider>
        )
    }
}

export default App