function defaultRenameFn(name, index) {
  return `${name}_${index}`
}

function renameValue(node, renameFn) {
  if (node.kind === 'Variable') {
    return {
      ...node,
      name: {
        ...node.name,
        value: renameFn(node.name.value)
      }
    }
  } else if (node.kind === 'ObjectValue') {
    return {
      ...node,
      fields: node.fields.map(field => ({
        ...field,
        value: renameValue(field.value, renameFn)
      }))
    }
  } else if (node.kind === 'ListValue') {
    return {
      ...node,
      values: node.values.map(value => renameValue(value, renameFn))
    }
  }

  return node
}

function renameArgument(node, renameFn) {
  return {
    ...node,
    value: renameValue(node.value, renameFn)
  }
}

function renameDirectiveArguments(node, renameFn) {
  return {
    ...node,
    arguments: node.arguments?.map(arg => renameArgument(arg, renameFn)),
  }
}

function renameVariableDefinition(node, renameFn) {
  return {
    ...node,
    variable: {
      ...node.variable,
      name: {
        ...node.variable.name,
        value: renameFn(node.variable.name.value)
      },
    },
    directives: node.directives?.map(dir => renameDirectiveArguments(dir, renameFn))
  }
}

function renameSelectionSetArguments(selectionSet, renameFn) {
  return {
    ...selectionSet,
    selections: selectionSet.selections.map(sel => {
      switch (sel.kind) {
        case 'Field':
          return {
            ...sel,
            arguments: sel.arguments?.map(arg => renameArgument(arg, renameFn)),
            selectionSet: sel.selectionSet ? renameSelectionSetArguments(sel.selectionSet, renameFn) : undefined
          }
        case 'FragmentSpread':
          return {
            ...sel,
            directives: sel.directives?.map(dir => renameDirectiveArguments(dir, renameFn))
          }
        case 'InlineFragment':
          return {
            ...sel,
            directives: sel.directives?.map(dir => renameDirectiveArguments(dir, renameFn)),
            selectionSet: renameSelectionSetArguments(sel.selectionSet, renameFn)
          }
        }
    })
  }
}

function renameVariablesAndTopLevelFieldsOnOpDef(op, variableRenameFn, fieldRenameFn) {
  return {
    ...op,
    variableDefinitions: op.variableDefinitions?.map(vardef => renameVariableDefinition(vardef, variableRenameFn)),
    directives: op.directives?.map(dir => renameDirectiveArguments(dir, variableRenameFn)),
    selectionSet: renameSelectionSetArguments({
      ...op.selectionSet,
      selections: op.selectionSet.selections.map(sel => {
        switch (sel.kind) {
          case 'Field':
            return {
              ...sel,
              alias: {
                ...sel.name,
                value: fieldRenameFn(sel.alias?.value ?? sel.name.value)
              }
            }
          default:
            return sel
        }
      })
    }, variableRenameFn)
  }
}

function renameVariablesAndTopLevelFields(doc, variableRenameFn, fieldRenameFn) {
  return {
    ...doc,
    definitions: [
      ...doc.definitions.filter(def => def.kind !== 'OperationDefinition'),
      ...doc.definitions.filter((def) => def.kind === 'OperationDefinition').map(opDef=> {
        return renameVariablesAndTopLevelFieldsOnOpDef(opDef, variableRenameFn, fieldRenameFn)
      })
    ]
  }
}

function renameVariables(variables = {}, renameFn) {
  return Object.keys(variables).reduce((vars, key) => {
    return {
      ...vars,
      [renameFn(key)]: variables[key]
    }
  }, {})
}

function combine([document, variables = {}], [nextDocument, nextVariables = {}], operationName) {

  const opDefs = nextDocument.definitions.concat(document.definitions).filter((def) => def.kind === 'OperationDefinition')
  if (!opDefs.length) {
    throw new Error('Expected at least one OperationDefinition, but found none.')
  }

  // do some basic validation
  opDefs.forEach(def => {

    const otherOpDefs = opDefs.filter(_def => _def !== def)

    // all op defs must be of the same type
    otherOpDefs.forEach(_def => {
      if (_def.operation !== def.operation) {
        throw new Error(`expected all operations to be of the same type, but ${_def.name?.value} is ${_def.operation} and ${def.name?.value} is ${def.operation}`)
      }
    })

    // all top level fields mut be unique. doesn't drill down fragments tho. maybe someday
    def.selectionSet.selections?.filter((s) => s.kind === 'Field').forEach(sel => {
      otherOpDefs.forEach(_def => _def.selectionSet.selections?.filter((s) => s.kind === 'Field').forEach(_sel => {
        if ((sel.alias?.value || sel.name.value) === (_sel.alias?.value || _sel.name.value)) {
          throw new Error(`duplicate field definition ${_sel.name.value} for operations ${def.name?.value} and ${_def.name?.value}`)
        }
      }))
    })

    // finally all variables must be unique
    def.variableDefinitions?.forEach(variable => {
      otherOpDefs.forEach(_def => _def.variableDefinitions?.forEach(_variable => {
        if (variable.variable.name.value === _variable.variable.name.value) {
          throw new Error(`duplicate variable definition ${_variable.variable.name.value} for operations ${def.name?.value} and ${_def.name?.value}`)
        }
      }))
    })
  })

  const newVars = (() => {
    if (nextVariables && variables) {
      return {
        ...nextVariables,
        ...variables
      }
    }
    return (variables || nextVariables)
  })()

  let definitions = [{
    kind: 'OperationDefinition',
    directives: opDefs.flatMap(def => def.directives || []),
    name: { kind: 'Name', value: operationName },
    operation: opDefs[0].operation,
    selectionSet: {
      kind: 'SelectionSet',
      selections: opDefs.flatMap(def => def.selectionSet.selections)
    },
    variableDefinitions: opDefs.flatMap(def => def.variableDefinitions || [])
  }]
  const encounteredFragmentList = new Set()
  const combinedDocumentDefinitions = nextDocument.definitions.concat(document.definitions)
  for (const definition of combinedDocumentDefinitions) {
    if (definition.kind === 'OperationDefinition') {
      continue
    }
    if (definition.kind === 'FragmentDefinition') {
      if (encounteredFragmentList.has(definition.name.value)) {
        continue
      }
      encounteredFragmentList.add(definition.name.value)
    }
    definitions = [definition, ...definitions]
  }

  const newDoc = {
    kind: 'Document',
    definitions
  }

  return [newDoc, newVars]
}

function rename([document, variables, options = {}], index) {
  const { variableRenameFn, fieldRenameFn } = options

  return [
    renameVariablesAndTopLevelFields(document, name => variableRenameFn(name, index), name => fieldRenameFn(name, index)),
    renameVariables(variables, name => variableRenameFn(name, index))
  ]
}

export default (options = {}) => (operationName, ...queries) => {
  const { variableRenameFn = defaultRenameFn, fieldRenameFn = defaultRenameFn } = options

  const defaultQueryOptions = { variableRenameFn, fieldRenameFn }

  return queries.reduce((query, nextQuery, index) => {
    query = [query[0], query[1], { ...defaultQueryOptions, ...(query[2] || {}) }]
    nextQuery = [nextQuery[0], nextQuery[1], { ...defaultQueryOptions, ...(nextQuery[2] || {}) }]

    if (index === 1) return combine(rename(query, 0), rename(nextQuery, index), operationName)
    return combine(query, rename(nextQuery, index), operationName)
  })
}
