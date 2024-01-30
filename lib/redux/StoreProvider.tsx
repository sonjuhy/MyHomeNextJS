'use client' // store 컴포넌트가 client-side에 있어야 한다는 것을 표시
import { useRef } from 'react'
import { Provider } from 'react-redux'

import store, {persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}