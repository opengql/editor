Feature: Formal Language Examples
  As a user
  I would like to have examples of given language to see how the formal language syntax look like

  Scenario: the user selects an example
    Given the user is on the application page
    Given the user moves to examples page
     When the examples are loaded
      And the user clicks on first example of provided language
     Then the example should be moved to the editor

  Scenario: selecting of example should move to upper part of page
    Given the user is on the application page
    Given the user moves to examples page
     When the examples are loaded
      And the user clicks no first example of provided language
      And the example is provided to the editor
     Then the page scroll position should be set to beginning of the page

  Scenario: providing search phrase should change list of examples
    Given the user is on the application page
    Given the user moves to examples page
     When the examples are loaded
      And the search input is empty
      And the default count of examples is known
      And the user provides an search phrase to examples
     Then the examples list should be altered to provide only examples that match

  Scenario: removing searching phrase should reset list of examples
    Given the user is on the application page
    Given the user moves to examples page
     When the examples are loaded
      And the search input is empty
      And the default count of examples is known
      And the user provides an search phrase to examples
      And the examples list is altered
      And the user removes search phrase
     Then the examples list should be at initial state before search
