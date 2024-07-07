Feature: Code Editor
  As a user
  I would like to have ability to provide formal language and check is my input valid

  Scenario Outline: entering new text to the editor
    Given the user is on the application page
    When the editor's empty and the user inputs "<input>" into the editor
    Then the editor's value changes to "<input>" and provided input is valid
    Examples:
      | input                                                                                                                                                                                              |
      | INSERT (:Person { "firstname": "Keith", "lastname": "Hare", "joined": DATE "2022-08-23" })-[:LIVES_IN { "since": DATE "1980-07-15" }]->(:City { "name":"Granville","state":"OH","country":"USA" }) |
      | MATCH (p:Person)-[:LIVES_IN]->(c:City) RETURN p, c                                                                                                                                                 |
      | CREATE GRAPH mySocialNetwork OPEN_TYPE                                                                                                                                                             |
      | INSERT (:Pet { "name": "Winnifred", "type": "Dog" })                                                                                                                                               |
      | MATCH (a { "firstname": "Keith" }), (d { "name": "Winnifred" }) RETURN a, d                                                                                                                        |
      | INSERT (a)-[:HasPet]->(d)                                                                                                                                                                          |
      | MATCH (a)-[:HasPet]->(d) RETURN a, d                                                                                                                                                               |

  Scenario Outline: entering new invalid text to the editor
    Given the user is on the application page
    When the editor's empty and the user inputs "<input>" into the editor
    Then the editor's value changes to "<input>" and provided input is valid
    Examples:
      | input                                                                                                                                                                                            |
      | IN SERT (:Person { "firstname": "Keith", "lastname": "Hare", "joined": DATE "2022-08-23" })[:LIVES_IN { "since": DATE "1980-07-15" }]->(:City { "name":"Granville","state":"OH","country""USA" ) |
      | M ATCH (p:Person)-[:LIVES_IN]->(c:City)                                                                                                                                                          |
      | CREA TE GRA PH mySocialNetwork OPEN TYPE                                                                                                                                                         |
      | INS ERT (:Pet { "name""Winnifred", "type": "Dog" })                                                                                                                                              |
      | MAT CH (a { "firstname": "Keith" }), ( { "name": "Winnifred" })                                                                                                                                  |
      | INSE RT (a)-[:HasPet]->(d)                                                                                                                                                                       |

  Scenario: render errors for invalid input
    Given the user is on the application page
    When the editor's empty
    And the user provides invalid input
    And the input is parsed
    Then application should render errors in provided input

  Scenario: mark lines containing errors with red background
    Given the user is on the application page
    When the editor's empty
    And the user provides invalid input
    And the input is parsed
    Then should render lines which contains errors with red background

  Scenario: render no errors message on valid input
    Given the user is on the application page
    When the editor's empty
    And the user provides valid input
    And the input is parsed
    Then application should render success label
