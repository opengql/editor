Feature: Autocomplete
  As a user
  I would like to have option to be informed about possible keywords and be able to insert them by few clicks

  Scenario: the user selects a suggestion with arrow up and enter keys
    Given the user is on the application page
    When the editor's empty
    And the user types "ta" in the editor
    And the user press the arrow up key
    And the user press the enter key
    Then selected suggestion should be inserted to the editor

  Scenario: the user selects a suggestion with arrow down and enter keys
    Given the user is on the application page
    When the editor's empty
    And the user types "ta" in the editor
    And the user press the arrow down key
    And the user press the enter key
    Then selected suggestion should be inserted to the editor

  Scenario: the user cancels the suggestion with the escape key
    Given the user is on the application page
    When the editor's empty
    And the user types "mat" in the editor
    And the user press escape key
    Then the autocomplete dialog should be closed

  Scenario: the user shows suggestions with ctrl + enter keys
    Given the user is on the application page
    When the editor's empty
    And the user types "mat" in the editor
    And the user press escape key to close dialog
    And the user press ctrl + enter keys
    Then the autocomplete dialog should be reopened

  Scenario: the user types word that is not in the list
    Given the user is on the application page
    When the editor's empty
    And the user types "dqewqsaczx" in the editor
    Then the autocomplete dialog should not be opened

  Scenario: the user types a keyword that partially matches suggestions
    Given the user is on the application page
    When the editor's empty
    And the user types "sel" in the editor
    Then the user should see suggestions that contains "sel"
