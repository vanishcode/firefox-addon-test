import React from 'react';
import { createRoot } from 'react-dom/client';

import VConsole from 'vconsole';

import Test from './test';

new VConsole();

const container = document.getElementById('container');
const root = createRoot(container);

root.render(<Test />);
