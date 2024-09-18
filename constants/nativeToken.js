import { ERC20, WMATIC } from './erc20'

export const NATIVE = {
  CHAIN: 137,
  DECIMALS: 18,
  SYMBOL: 'MATIC',
  NAME: 'Matic Token',

  WRAPPED: {
    ADDRESS: ERC20.ADDRESS[WMATIC],
    DECIMALS: ERC20.DECIMALS[WMATIC],
    SYMBOL: ERC20.SYMBOL[WMATIC],
    DESCRIPTION: ERC20.DESCRIPTION[WMATIC],
  }
}
