# Implementation Plan

- [ ] 1. Create the HTML shell and basic CSS layout
  - Create `weather-app/index.html` with search input, search button, loading indicator, error message area, current conditions section, and forecast table placeholder
  - Add inline or embedded CSS for responsive layout (centered card, mobile-friendly single column)
  - Link `app.js` at the bottom of the body
  - _Requirements: 5.1, 5.2_

- [ ] 2. Implement city geocoding and NWS points lookup
  - Create `weather-app/app.js` with `geocodeCity(cityName)` calling the Census Geocoding API
  - Implement `getNWSPoints(lat, lon)` calling `api.weather.gov/points`
  - Wire the search button click to call both functions in sequence and log results to console
  - Implement `setLoading(bool)` and `showError(message)` for UI feedback
  - _Requirements: 1.1, 1.2, 1.3, 4.1, 4.2_

- [ ] 3. Implement forecast fetch and render current conditions
  - Implement `getForecast(forecastUrl)` to call the NWS daily forecast endpoint
  - Implement `renderCurrent(period, locationInfo)` to display city, temperature, conditions description, humidity, wind, and NWS icon in the current conditions section
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 4. Render the 5-day forecast table
  - Implement `renderForecast(periods)` to build and insert a table showing the next 5 daytime forecast periods with day name, NWS icon, temperature, and short forecast description
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5. Polish UI, error handling, and open prototype in browser
  - Refine CSS for weather icons, table styling, loading spinner, and error/retry button
  - Ensure all error scenarios from the design error-handling table are covered
  - Open `weather-app/index.html` in the default browser so the prototype can be tested
  - _Requirements: 2.2, 4.1, 4.2, 5.1, 5.2_
