import React from 'react';
import ReactDOM from 'react-dom';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<Fabric><AppRouter /></Fabric>, document.getElementById('root'));
registerServiceWorker();
