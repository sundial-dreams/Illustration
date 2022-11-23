import {createContext} from 'react';
import RootState from './index';

export const defaultValue = new RootState();

export const RootContext = createContext<RootState>(defaultValue);
