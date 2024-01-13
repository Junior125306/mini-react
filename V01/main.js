import React from './core/React.js';

import ReactDom from './core/ReactDom.js';

const App = React.createElement('div', { id: 'app' }, 'Hello World', 'niubi');

ReactDom.createToot(document.querySelector('#root')).render(App);
