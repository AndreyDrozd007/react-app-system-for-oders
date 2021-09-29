import React, { Component } from 'react'
import './Cart.css' 
import Fade from 'react-reveal/Fade'
import axios from 'axios';
import {} from 'react-redux'

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            comments: "",
            table: "",
            showCheckout: false
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name] : [event.target.value]})
    }

    createOrder = (event) => {
        event.preventDefault();
        
        const order = {
            name: this.state.name,
            table: this.state.table,
            comments: this.state.comments,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order)
    }

    enterData = async (name, comments, table) => {
        try {
            const res = await axios.post('http://localhost:3002/posts', {
                name,
                comments,
                table,
            });

            this.setState({
                posts: res.data,
                name: "",
                comments:"",
                table:"",
            });
            

        } catch(error) {
            this.setState({error: error.res.data});
        }
    }
    
    render() {

        const {cartItems} = this.props

        return (
            <div>
                {cartItems.length === 0 ? (<div className='cart cart-header'>Product is empty</div>)
                :
                ( <div className='cart cart-header'> You have {cartItems.length} in the cart{' '} </div> )}
                
                <div>
                    <div className='cart'>
                        <Fade left cascade>
                            <ul className='cart-items'>
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                            <div>{item.title}</div>
                                            <div className='cart-button'>
                                                {item.price} rub x {item.count} {' '}
                                                <button className='button-primary' onClick={()=> this.props.removeFromCart(item)}>-</button>
                                            </div>
                                    </li> 
                                ))}
                            </ul>
                        </Fade>
                    </div>
                        {cartItems.length !== 0 && (
                            <div>
                                <div className='cart'>
                                    <div className='total'>
                                        Total: {' '}
                                        {cartItems.reduce((a, c) => a + c.price * c.count, 0)} rub
                                    </div>
                                    <button onClick={() => {this.setState({showCheckout: true})}} className="button-primary">Proceed</button>
                                </div>

                                {this.state.showCheckout && (
                                    <Fade right cascade>
                                        <div className='cart'>
                                            <form onSubmit={this.createOrder}>
                                                <ul className='form-container'>
                                                    <li>
                                                        <label value={this.state.comments}>Comments</label>
                                                        <textarea 
                                                            name='comments' 
                                                            required onChange={(event) => this.handleInput(event, 'comments')} 
                                                            value={this.state.comments}>
                                                        </textarea>
                                                    </li>
                                                    <li>
                                                    <label>Table</label>
                                                        <select 
                                                        name='table' 
                                                        required onChange={(event) => this.handleInput(event, 'table')}>
                                                            <option value={this.state.table}>№1</option>
                                                            <option value={this.state.table}>№2</option>
                                                            <option value={this.state.table}>№3</option>
                                                            <option value={this.state.table}>№4</option>
                                                            <option value={this.state.table}>№5</option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <label>User</label>
                                                        <input name='name' 
                                                            type='text' 
                                                            required onChange={(event) => this.handleInput(event, 'name')}
                                                            value={this.state.name}>
                                                        </input>    
                                                    </li>
                                                    <li>
                                                        <button className='button-primary' type='submit' onClick={this.enterData}>Checkout</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </Fade>
                                )}
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
