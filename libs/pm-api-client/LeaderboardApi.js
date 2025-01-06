import { omitBy } from 'lodash'
import { ApiClient } from './ApiClient'

export class LeaderboardApi extends ApiClient {

  constructor(baseUrl) {
    super(LeaderboardApi.baseUrl)
  }

  getPayouts({ erc20, version = '0', schedule = '0' }) {
    return this.get(`/payouts/${erc20}/${schedule}/${version}`)
  }

  getTournament(tournamentid) {
    return this.get(`/tournaments/${tournamentid}`)
  }

  getTournaments({ synced, name, gameid, order, orderby, offset, limit }) {
    const params = omitBy({ synced, name, gameid, order, orderby, offset, limit }, (v) => v === undefined)
    return this.get('/tournaments', params)
  }

  getTournamentPayouts(tournamentid) {
    return this.get(`/tournaments/${tournamentid}/payouts`)
  }

}
