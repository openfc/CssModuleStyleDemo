import React, { Component } from 'react';
import css from './MenuItem.css';

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <li className={css.base} >
                <span className={css.caption} >
                    {this.props.caption}
                </span>
            </li>
        );
    }
}


export default MenuItem;
