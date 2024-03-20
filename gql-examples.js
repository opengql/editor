export const GqlExamples = [
  {
    name: 'Example with any graph type',
    code:
      'CREATE GRAPH mySocialNetwork OPEN TYPE\n' +
      'INSERT (:Person { "firstname": "Keith", "lastname": "Hare", \n' +
      '         "joined": DATE "2022-08-23" })\n' +
      '       -[:LIVES_IN { "since": DATE "1980-07-15" }]->\n' +
      '       (:City { "name":"Granville", "state":"OH",\n' +
      '         "country": "USA" })\n' +
      'INSERT (:Pet { "name": "Winnifred", "type": "Dog" })\n' +
      '/*\n' +
      '   The following INSERT succeeds because there are\n' +
      '   no restrictions on the contents of the graph.\n' +
      '*/\n' +
      'MATCH (a { "firstname": "Keith" }), (d { "name": "Winnifred" })\n' +
      'INSERT (a)-[:HasPet]->(d) \n',
  },
  {
    name: 'Example with closed graph type',
    code:
      'CREATE GRAPH TYPE IF NOT EXISTS socialNetworkGraphType\n' +
      '   AS {\n' +
      '        /* Node types */\n' +
      '        (Person :Person { "lastname" STRING, "firstname" STRING, "joined" DATE}),\n' +
      '        (City :City { "name" STRING, "state" STRING, "country" STRING}),\n' +
      '        (Pet :Pet { "name" STRING, "type" STRING}),\n' +
      '        /* Edge types */\n' +
      '        (Person)-[LivesIn :LIVES_IN { "since" DATE }]->(City),\n' +
      '        (Person)-[Knows :KNOWS]->(Person)\n' +
      '   }\n' +
      '\n' +
      'CREATE GRAPH mySocialNetwork LIKE socialNetworkGraphType\n' +
      '\n' +
      'INSERT (:Person { "firstname":"Keith", "lastname":"Hare", "joined": DATE "2022-08-23" })\n' +
      '       -[:LIVES_IN { "since": DATE "1980-07-15" }]->\n' +
      '       (:City { "name": "Granville", "state": "OH", "country": "USA" })\n' +
      '\n' +
      'INSERT (:Pet { "name": "Winnifred", "type": "Dog" })\n' +
      '/*\n' +
      '   The following insert fails because graph type\n' +
      '   does not include a HasPet relationship\n' +
      '*/\n' +
      'MATCH (a { "firstname": "Keith" }), (d { "name": "Winnifred" })\n' +
      'INSERT (a)-[:HasPet]->(d)',
  },
  {
    name: 'Match with exists predicate (match block statement in parentheses)',
    code:
      'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\n' +
      'WHERE EXISTS (MATCH (p)-[:WORKS_FOR]->(:Company { name: "GQL, Inc."}) )\n' +
      'RETURN p, r, friend\n',
  },
  {
    name: 'Match with exists predicate (match block statement in braces)',
    code:
      'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\n' +
      'WHERE EXISTS (MATCH (p)-[:WORKS_FOR]->(:Company {name: "GQL, Inc."}))\n' +
      'RETURN p, r, friend\n',
  },
  {
    name: 'Match with exists predicate (nested match statement)',
    code:
      'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\n' +
      'WHERE EXISTS { MATCH (p)-[:WORKS_FOR]->(:Company { name: "GQL, Inc." }) RETURN p }\n' +
      'RETURN p, r, friend\n',
  },
  {
    name: 'Create graph type',
    code:
      'CREATE GRAPH TYPE IF NOT EXISTS socialNetworkGraphType\n' +
      'AS {\n' +
      '    (Person :Person { "lastname" STRING, "firstname"  STRING, "joined" DATE }),\n' +
      '    (City :City { "name" STRING, "state" STRING, "country" STRING}),\n' +
      '    (Pet :Pet { "name" STRING, "type" STRING}),\n' +
      '    (Person)-[LivesIn:LIVES_IN {"since" DATE}]->(City),\n' +
      '    (Person)-[Knows :KNOWS]->(Person)\n' +
      '}\n',
  },
  {
    name: 'Create closed graph from graph type (lexical)',
    code: 'CREATE GRAPH mySocialNetwork TYPED socialNetworkGraphType\n',
  },
  {
    name: 'Create closed graph from graph type (double colon)',
    code: 'CREATE GRAPH mySocialNetwork ::socialNetworkGraphType\n',
  },
  {
    name: 'Create closed graph from nested graph type (double colon)',
    code: 'CREATE GRAPH mySocialNetwork ::{(City :City {name STRING, state STRING, country STRING})}\n',
  },
  {
    name: 'Insert statement',
    code:
      "INSERT (:Person { firstname: 'Firstname', lastname: 'Lastname', joined: DATE '2023-01-01' })\n" +
      '        -[:MEMBER_SINCE { since: "2023-03-20" }]->\n' +
      "        (:Team { name: 'Teamname' })\n",
  },
  {
    name: 'Match and Insert example',
    code: "MATCH (a { firstname: 'Robert' }), (b { lastname: 'Kowalski' })\n" + 'INSERT (a)-[:GRADUATED]->(b)\n',
  },
  {
    name: 'Example return statement',
    code: 'SESSION SET VALUE $a=10\n' + 'SESSION SET VALUE $b=12\n' + 'RETURN mod($a, $b) * $a\n',
  },
  {
    name: 'Session set schema',
    code: 'SESSION SET SCHEMA ../SCHEMAS/CITY_SCHEMA\n',
  },
  {
    name: 'Session set graph to current graph',
    code: 'SESSION SET GRAPH CURRENT_GRAPH\n',
  },
  {
    name: 'Session set graph to current property graph',
    code: 'SESSION SET GRAPH CURRENT_PROPERTY_GRAPH\n',
  },
  {
    name: 'Session set graph',
    code: 'SESSION SET GRAPH {MATCH (p: Person)}\n',
  },
  {
    name: 'Session set time zone',
    code: 'SESSION SET TIME ZONE "utc"\n',
  },
  {
    name: 'Session set property as graph reference',
    code: 'SESSION SET GRAPH IF NOT EXISTS $exampleProperty = /GRAPHS/ GRAPH_EXAMPLE\n',
  },
  {
    name: 'Session set property as binding table reference',
    code: 'SESSION SET BINDING TABLE IF NOT EXISTS $exampleProperty = /BINDING_TABLES/ EXAMPLE_TABLE\n',
  },
  {
    name: 'Session set property as value',
    code: "SESSION SET VALUE IF NOT EXISTS $exampleProperty = DATE '2022-10-10'\n",
  },
];
