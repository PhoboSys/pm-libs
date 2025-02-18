import { ApiClient } from './ApiClient'

export class ChatApi extends ApiClient {

  constructor() {
    super(ChatApi.baseUrl)
  }

  getChannels = () => this.get('/channels')

  getChannelOnline = (channel) => this.get(`/channels/${channel}/online`)

  getChannelsOnline = (channels) => this.get(`/channels/online`, { ch: channels })

}
