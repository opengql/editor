export const gqlExamples = [
  {
    name: 'create_closed_graph_from_graph_type_(double_colon)',
    code: 'CREATE GRAPH mySocialNetwork ::socialNetworkGraphType\n\n',
  },
  {
    name: 'create_closed_graph_from_graph_type_(lexical)',
    code: 'CREATE GRAPH mySocialNetwork TYPED socialNetworkGraphType\n\n',
  },
  {
    name: 'create_closed_graph_from_nested_graph_type_(double_colon)',
    code: 'CREATE GRAPH mySocialNetwork ::{(City :City {name STRING, state STRING, country STRING})}\n\n',
  },
  {
    name: 'create_graph',
    code: 'CREATE GRAPH mygraph ANY\n\nCREATE GRAPH mygraph {\n  (Person :Person {lastname STRING, firstname STRING,joined DATE})\n}\n\nCREATE GRAPH mygraph mygraphtype\n\nCREATE GRAPH /mygraph LIKE /mysrcgraph\n\nCREATE GRAPH mygraph ANY AS COPY OF mysrcgraph\n\nCREATE GRAPH mygraph {\n  (Person :Person {lastname STRING, firstname STRING,joined DATE})\n} AS COPY OF mysrcgraph\n\n',
  },
  {
    name: 'create_schema',
    code: 'CREATE SCHEMA /myschema\n\nCREATE SCHEMA /foo/myschema\n\nCREATE SCHEMA /foo\nNEXT CREATE SCHEMA /fee\n\n',
  },
  {
    name: 'insert_statement',
    code: "INSERT (:Person { firstname: 'Firstname', lastname: 'Lastname', joined: DATE '2023-01-01' })\n        -[:MEMBER_SINCE { since: \"2023-03-20\" }]->\n        (:Team { name: 'Teamname' })\n\n",
  },
  {
    name: 'match_and_insert_example',
    code: "MATCH (a { firstname: 'Robert' }), (b { lastname: 'Kowalski' })\nINSERT (a)-[:GRADUATED]->(b)\n\n",
  },
  {
    name: 'match_with_exists_predicate_(match_block_statement_in_braces)',
    code: 'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\nWHERE EXISTS (MATCH (p)-[:WORKS_FOR]->(:Company {name: "GQL, Inc."}))\nRETURN p, r, friend\n\n',
  },
  {
    name: 'match_with_exists_predicate_(match_block_statement_in_parentheses)',
    code: 'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\nWHERE EXISTS (MATCH (p)-[:WORKS_FOR]->(:Company { name: "GQL, Inc."}) )\nRETURN p, r, friend\n\n',
  },
  {
    name: 'match_with_exists_predicate_(nested_match_statement)',
    code: 'MATCH (p:Person)-[r:IS_FRIENDS_WITH]->(friend:Person)\nWHERE EXISTS { MATCH (p)-[:WORKS_FOR]->(:Company { name: "GQL, Inc." }) RETURN p }\nRETURN p, r, friend\n\n',
  },
  {
    name: 'session_set_graph_to_current_graph',
    code: 'SESSION SET GRAPH CURRENT_GRAPH\n\n',
  },
  {
    name: 'session_set_graph_to_current_property_graph',
    code: 'SESSION SET GRAPH CURRENT_PROPERTY_GRAPH\n\n',
  },
  {
    name: 'session_set_property_as_value',
    code: "SESSION SET VALUE IF NOT EXISTS $exampleProperty = DATE '2022-10-10'\n\n",
  },
  {
    name: 'session_set_time_zone',
    code: 'SESSION SET TIME ZONE "utc"\n\n',
  },
];
