Feature: Add a column to a existing board

  @acceptance
  Scenario: Column is added to a board
    When a user adds a column to a board
    Then a column should exist on that board

  @acceptance
  Scenario: Column that already exists is added to a board
    Given a column already exists on a board
    When a user adds a column with the same name to that board
    Then the user should get an error