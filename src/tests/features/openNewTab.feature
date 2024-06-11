Feature: Testing switching to tabs functionality

  Background:
    Given User navigates to OpenMrs page

@regression
  Scenario: Verify open a new tab functionality by clicking on TheOpenMRSEMR btn
    Given User clicks on Explore Our Emr button
    Then Verify user switched to a new tab "The OpenMRS EMR" title
