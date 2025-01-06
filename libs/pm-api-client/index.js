export * from './ApiClient'
export * from './GraphClient'

import { PriceFeedApi as _PriceFeedApi } from './PriceFeedApi'
import { LeaderboardApi as _LeaderboardApi } from './LeaderboardApi'
import { ChatApi as _ChatApi } from './ChatApi'
import { UserApi as _UserApi } from './UserApi'

export const PriceFeedApi = new _PriceFeedApi()
export const LeaderboardApi = new _LeaderboardApi()
export const UserApi = new _UserApi()
export const ChatApi = new _ChatApi()