import React, { Component } from 'react'
import './Products.css'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'



export default class Products extends Component {
    constructor(props){
        super(props)
        this.state={
            pdosuct:null,
        }
    }

    openModal = (product) => {
        this.setState({product})
    }

    closeModal = () => {
        this.setState({product: null})
    }

    render() {
        const {product} = this.state
        return (
            <div>
                <Fade bottom cascade={true}>
                    <ul className='products'>
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className='product'>
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                        <img src={product.image} alt={product.title}></img>
                                        <p className='product-title'>{product.title}</p>
                                    </a>
                                    <div className='product-price'>
                                        <div>{product.price} rub</div>
                                        <button onClick={() => this.props.addToCart(product)} className='button-primary'>+</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {
                    product && 
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className='close-modal' onClick={this.closeModal}>x</button>
                                <div className='product-details'>
                                    <img src={product.image} alt={product.title}></img>
                                    <div className='product-details-description'>
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p> Size: {' '}
                                           {product.avaiableSize
                                           
                                           /* {product.avaiableSize.map( (x) => (
                                                <span> 
                                                    {' '} 
                                                    <button className='button-primary'>{x}</button>
                                                </span>
                                            ))} */}
                                        </p>
                                        <div className='product-price'>
                                            <div>{product.price} rub</div>
                                            <button className='button-primary' onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeModal()
                                            }}> Add</button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                }
            </div>
        )
    }
}
