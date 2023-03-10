import{ createContext } from 'react'

const LoaderContext=createContext();

export const LoaderProvider = LoaderContext.Provider;
export const LoaderConsumer = LoaderContext.Consumer;