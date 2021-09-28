import React, { Component } from 'react'
import './Filter.css'

export default class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <div className='filter-result'>{this.props.count} Products</div>
                {/* <div className='filter-sort'>
                    Order {' '}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                    <option>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    </select>
                </div> */}
                <div className='filter-size'>
                    Filter {' '}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value='All'>All</option>
                        <option value='Food'>Food</option>
                        <option value='Drinks'>Drinks</option>
                        <option value='Alcohol'>Alcohol</option>
                        <option value='Desserts'>Desserts</option>
                    </select>
                </div>
            </div>
        )
    }
}