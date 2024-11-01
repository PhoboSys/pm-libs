import { ApiClient } from './ApiClient'
import gql from 'graphql-tag'
import { print } from 'graphql'
import { identity } from 'lodash'

import createCombineQueries from '../graphql-combine-queries'

import { renameQuery } from './utils'

const combineQueries = createCombineQueries({ fieldRenameFn: identity })

export class GraphClient extends ApiClient {

  constructor() {
    super(GraphClient.baseUrl)
  }

  request(operationName, ...requests) {

    requests = requests.filter(i => i)

    if (requests.length === 1) {

      const [query, variables] = requests[0]

      return this.post({
        query: renameQuery(query, operationName),
        variables,
        operationName,
        extensions: { headers: null }
      })

    } else {
      const [document, variables] = combineQueries(
        operationName,
        ...(requests.map(([query, variables, options]) => [gql(query), variables, options]))
      )

      return this.post({
        query: print(document),
        variables,
        operationName,
      })
    }
  }
}
