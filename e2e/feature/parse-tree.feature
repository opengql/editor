Feature: Parse Tree Preview
  As a user
  I would like to verify how parsing algorithm interpreted my input

  Scenario: render indicator for parse result processing while ongoing processing
    Given the user is on the application page
    When the editor's empty
    And the user provides valid large input
    And the user switches to parse tree view
    Then should render spinner when processing

  Scenario: render parse tree after parse result is processed
    Given the user is on the application page
    When the editor's empty
    And the user provides valid large input
    And the user switches to parse tree view
    And rendering spinner when processing
    Then parse tree should be rendered properly


