// import '@lynx-js/react/experimental/lazy/import';
import { Suspense, lazy,root } from '@lynx-js/react';

import { App } from './App.js'
// const App = lazy(() => import('./App.jsx'));

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
