Feature: Testing switching to tabs functionality

  Background:
    Given User navigates to OpenMrs page

  @only
  Scenario: Verify open a new tab functionality by clicking on TheOpenMRSEMR btn
    Given User clicks on Explore Our Emr button
    Then Verify user switched to a new tab "The OpenMRS EMR" title
    And User switches back to first page
    Then User sees three available buttons on OpenMRS main page
      | options              |
      | Explore Our EMR      |
      | Join Our Community   |
      | Learn in Our Academy |
