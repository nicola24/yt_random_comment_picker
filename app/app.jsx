import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './components/Dashboard';

const MOUNT_NODE = document.getElementById('app');

render(<Dashboard />, MOUNT_NODE);
