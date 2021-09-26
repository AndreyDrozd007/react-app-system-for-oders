import React, { Component } from 'react'
import './Cart.css' 
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            comments: "",
            table: "",
            showCheckout: false}
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
                                                        <label>Comments</label>
                                                        <textarea name='comments' required onChange={this.handleInput}></textarea>
                                                    </li>
                                                    <li>
                                                    <label>Table</label>
                                                        <select name='table' required onChange={this.handleInput}>
                                                            <option value='1'>№1</option>
                                                            <option value='2'>№2</option>
                                                            <option value='3'>№3</option>
                                                            <option value='4'>№4</option>
                                                            <option value='5'>№5</option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <label>Waiter</label>
                                                        <input name='name' type='text' required onChange={this.handleInput}></input>    
                                                    </li>
                                                    <li>
                                                        <button className='button-primary' type='submit'>Checkout</button>
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
