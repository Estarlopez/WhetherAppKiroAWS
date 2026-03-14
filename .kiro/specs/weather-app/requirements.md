# Requirements Document

## Introduction

A simple web-based weather application that allows users to look up current weather conditions and a 5-day forecast for US cities. The app uses the National Weather Service (NWS) public API (api.weather.gov) as its data source — free, official, no API key required.

## Requirements

### Requirement 1: City Search

**User Story:** As a user, I want to enter a US city name and retrieve weather data, so that I can quickly check the weather for any US location.

#### Acceptance Criteria

1. WHEN the user submits a city name THEN the system SHALL geocode it using the US Census Bureau Geocoding API to obtain coordinates.
2. WHEN the city is not found or the input is empty THEN the system SHALL display a clear error message.
3. WHEN coordinates are resolved THEN the system SHALL query the NWS API (api.weather.gov) for weather data at that location.

### Requirement 2: Current Conditions Display

**User Story:** As a user, I want to see the current weather conditions for my selected city, so that I know what the weather is like right now.

#### Acceptance Criteria

1. WHEN weather data is retrieved THEN the system SHALL display the city name, current temperature (°F), a short conditions description, humidity, and wind speed/direction.
2. WHEN weather data is retrieved THEN the system SHALL display a weather condition graphic (icon) appropriate to the current conditions (e.g., sunny, cloudy, rainy, snowy).
3. WHEN the NWS API or geocoding service is unavailable THEN the system SHALL display a user-friendly error message.

### Requirement 3: 5-Day Forecast Display

**User Story:** As a user, I want to see a 5-day weather forecast in a table, so that I can plan ahead.

#### Acceptance Criteria

1. WHEN weather data is retrieved THEN the system SHALL display a forecast table showing the next 5 days.
2. WHEN rendering the forecast table THEN each row SHALL include the day name, high/low temperatures (°F), a conditions description, and a weather condition graphic.
3. WHEN forecast data is loading THEN the system SHALL display a loading indicator.

### Requirement 4: Loading and Error States

**User Story:** As a user, I want clear feedback during loading and errors, so that I always know the state of the app.

#### Acceptance Criteria

1. WHEN a request is in progress THEN the system SHALL display a loading indicator.
2. WHEN an API or network error occurs THEN the system SHALL display a descriptive message and allow the user to retry without refreshing the page.

### Requirement 5: Responsive UI

**User Story:** As a user, I want the app to work on both desktop and mobile, so that I can use it from any device.

#### Acceptance Criteria

1. WHEN viewed on mobile (width < 768px) THEN the system SHALL display a usable single-column layout.
2. WHEN viewed on desktop THEN the system SHALL display a centered, readable layout with appropriate spacing.
