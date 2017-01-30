import React from 'react';
import ReactDOM from 'react-dom';

import Menu from 'components/Menu';
import MenuItem from 'components/MenuItem';


const App = () => (
    <Menu>
        <MenuItem caption="Item 1" />
        <MenuItem caption="Item 2" />
        <MenuItem caption="Item 3" />
    </Menu>
);


ReactDOM.render(
    <App />,
    document.getElementById('root') // eslint-disable-line
);
