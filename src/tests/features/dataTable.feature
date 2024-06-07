Feature: Testing scenarios with data table

  Background:
    Given User navigates to OpenMrs page

  @smoke
  Scenario: Verify data table functionality
    Given User clicks What We Do drop down
    Then User sees three available options
      | options            |
      | Academy            |
      | Conference 2023    |
      | Blog               |
    
