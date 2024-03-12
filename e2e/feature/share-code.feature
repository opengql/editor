Feature: Share Code
  As a user
  I would like to have ability to share provided code in the editor

  Scenario: clicking share button should copy link
    Given the user is on the application page
    When the editor's empty
    And the user provides valid large input
    And the previous clipboard value is known
    And the user clicks share button
    Then the link should be copied to clipboard


  Scenario: generated link should proceed to provided code
    Given the user is on the application page
    When the editor's empty
    And the user provides valid large input
    And the user clicks share button
    And the user moves to link in clipboard
    Then provided code by the user should be automatically provided to the editor

  Scenario: sharing code with link should work on already shared code link
    Given the user is on the application page
    When the editor's empty
    And the user provides valid large input
    And the user clicks share button
    And the user moves to link in clipboard
    And provided input by user should be in the editor
    And the user changes the editor value
    And the user clicks share button
    And the user moves to link in clipboard
    Then provided code by the user should be automatically provided to the editor
