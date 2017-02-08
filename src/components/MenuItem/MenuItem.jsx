import React, { Component } from 'react';
import css from './MenuItem.css';
import styles from './MenuItem.js.css';

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const style = Object.assign({}, this.props.active && styles.active);
        return (
            <li className={css.base} >
                <span className={css.caption} style={style}>
                    {this.props.caption}
                </span>
            </li>
        );
    }
}


export default MenuItem;
