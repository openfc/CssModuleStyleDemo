import React, { Component } from 'react';
import css from './Menu.css';

import colors from '../../styleguide/colors.css';

const inlineStyles = {
    backgroundColor: colors.primary,
    color: colors.light1,
};

class Menu extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <div style={inlineStyles} className={css.caption}>Подпись к списку</div>

                <ul className={css.base} >
                    {this.props.children}
                </ul>

                <div>
                    LOOK AT ME!!!
                </div>
            </div>
        );
    }
}


export default Menu;
