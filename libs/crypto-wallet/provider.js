import React from 'react'
import { BrowserProvider } from 'ethers'
import { Connectors, Web3ReactProvider } from 'pm-wallet'

export const WalletProvider = ({ children }) => {
  return (
  <Web3ReactProvider
    getLibrary={(p) => new BrowserProvider(p)}
    connectors={Connectors}
  >
    {children}
  </Web3ReactProvider>
  )
}
