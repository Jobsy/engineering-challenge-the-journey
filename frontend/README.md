
Table of Contents
-----------------
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
5. [Spreadsheet Application Checklist](#spreadsheet-application-checklist)
   - [General Requirements](#general-requirements)
   - [Auto-saving User Input](#auto-saving-user-input)
   - [Reactive UI](#reactive-ui)
   - [Spreadsheet Expression Language](#spreadsheet-expression-language)
   - [Technology](#technology)
   - [Server](#server)
   - [Additional Notes](#additional-notes)
6. [Spreadsheet TODOs (If I had more time) Checklist](#spreadsheet-todos-if-i-had-more-time-checklist)
   - [Cell Component - Potential Improvements Checklist](#cell-component-potential-improvements-checklist)
   - [CellInput Component - Potential Improvements Checklist](#cellinput-component-potential-improvements-checklist)
   - [Grid Component - Potential Improvements Checklist](#grid-component-potential-improvements-checklist)
   - [SearchBar Component - Potential Improvements Checklist](#searchbar-component-potential-improvements-checklist)
   - [evaluateFormula Function - Potential Improvements Checklist](#evaluateformula-function-potential-improvements-checklist)


## Introduction

The Spreadsheet App is a web application that allows users to create and manage spreadsheets. It provides a grid-like interface where users can input values, perform calculations using formulas, and save the data to a backend server.

## Features

- Create and manage spreadsheets with custom rows and columns.
- Input values in cells and perform calculations using formulas.
- Save and load spreadsheet data to/from a backend server.
- Search for specific values in the spreadsheet.

## Technologies Used

- React: Frontend library for building user interfaces.
- TypeScript: A superset of JavaScript that provides static typing for better code integrity.
- Math.js: A library for performing mathematical operations and evaluating formulas.
- Axios: A library for making HTTP requests to the backend server.
- Docker: A containerization platform for packaging applications with their dependencies.
- Docker Compose: A tool for defining and running multi-container Docker applications.

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jobsy/engineering-challenge-the-journey
```

2. Change to the project directory:

```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode

To run the application in development mode with hot-reloading, use the following command:
```bash
npm start
```

This will start the development server, and you can access the app at `http://localhost:3000`.

#### Production Mode

To build the application for production and serve it, use the following commands:
```bash
# Build the frontend assets using webpack
npm run build
```

# Spreadsheet Application Checklist

## General Requirements
- [X] Implement a simple spreadsheet application based on the provided design in Figma.
- [X] Create a reactive grid of inputs that auto-saves user inputs over time.
- [X] Design the UI as close to the provided design as possible.
- [X] Ensure the UI is performant and provides a friendly user experience.
- [X] Handle potential performance issues with the server, which is slow and buggy.

## Auto-saving User Input
- [X] Implement auto-saving functionality to save user inputs periodically.
- [X] Utilize the server's ability to save spreadsheet data as a CSV blob.
- [X] Handle server errors and random latencies gracefully in the UI.

## Reactive UI
- [X] Ensure the UI reacts responsively to user interactions and updates.
- [X] Compute spreadsheet formulas on the client side to provide real-time updates.
- [X] Computation of expressions in cells should trigger onblur events.
- [X] Handle expressions that reference cells with changing values and recompute relevant expressions accordingly.

## Spreadsheet Expression Language
- [X] Support a simple expression language where computable expressions must be prefixed with '='.
- [X] Enable basic arithmetic expressions, with optional support for floats.
- [X] Allow value references in expressions using column labels (A to Z) and row numbers (n+).
- [ ] Support multiple-digit row numbers for value references (e.g., A10, A100).

## Technology
- [X] Implement the solution using React.
- [X] Use either JavaScript or TypeScript for the project, based on your preference.
- [X] Ensure code implementation follows best practices and makes good design decisions.

## Server
- [X] Work with the provided server, which is slow, buggy, and designed to test UI performance.
- [X] Handle server errors and random latencies while still aiming for an exceptional user experience.
- [X] Use the server's API to save spreadsheet data in CSV format for auto-saving functionality.

## Additional Notes
- [X] Don't confuse users with missing design elements; add elements to enhance user understanding and experience.
- [X] Feel free to improve the design and functionality as needed to create a seamless spreadsheet application.
- [X] Make good design and code implementation choices to provide an outstanding solution.

---
*Note: The checklist outlines the key requirements for the spreadsheet application based on the provided instructions.*


# Spreadsheet TODOs (If I had more time) Checklist

## Cell Component - Potential Improvements Checklist
- [ ] **Input Validation**: Add input validation for the cell value to ensure valid formula expressions and numerical values are entered.
- [ ] **Keyboard Navigation**: Implement keyboard navigation to allow users to navigate through cells using arrow keys.
- [ ] **Undo/Redo**: Add undo/redo functionality to allow users to revert changes made to cells.
- [ ] **Cell Formatting**: Implement cell formatting options, such as text formatting (bold, italic, etc.) and cell background color.
- [ ] **Formula Suggestion**: Add formula suggestions or auto-completion to assist users while entering formulas.
- [ ] **Rich Text Editing**: Allow users to enter rich text in cells, including hyperlinks and images.
- [ ] **Formula Previews**: Provide formula previews to show users the result of a formula before applying it.
- [ ] **Optimization**: Optimize the cell rendering and evaluation process for better performance.
- [ ] **Data Persistence**: Add functionality to save and load spreadsheets from a server or local storage.
- [ ] **Localization**: Add support for localization and translations for different languages.
- [ ] **Accessibility**: Ensure the component meets accessibility standards, including proper labeling and ARIA attributes.
- [ ] **Animation**: Implement smooth animations for cell editing and updates.
- [ ] **Error Boundary**: Wrap the Cell component with an error boundary to gracefully handle unexpected errors.
- [ ] **Theming**: Provide theming support to allow users to customize the appearance of the spreadsheet.
- [ ] **Virtualization**: Implement virtualization techniques to render only visible cells, improving performance for large grids.
- [ ] **Collaboration**: Explore adding real-time collaboration features to allow multiple users to edit the spreadsheet simultaneously.
- [ ] **Offline Support**: Consider adding offline support, allowing users to continue editing the spreadsheet when offline and syncing changes when online.
- [ ] **Responsive Design**: Ensure the Cell component and the entire spreadsheet application are fully responsive for different screen sizes.

## CellInput Component - Potential Improvements Checklist
- [ ] **Input Validation**: Implement input validation to ensure user input is in the expected format.
- [ ] **Error Handling**: Add error handling to provide feedback on errors during input handling or evaluation.
- [ ] **Accessibility**: Enhance accessibility by adding proper labels or aria-label attributes.
- [ ] **Debouncing**: Add debouncing to the onChange event to improve performance.
- [ ] **Auto-sizing**: Implement auto-sizing of the input element based on content.
- [ ] **Character Limit**: Add a character limit for each cell's input.
- [ ] **Controlled Input**: Support a controlled input component for easier state management.
- [ ] **Event Handlers**: Add more event handlers (e.g., onFocus, onKeyPress).
- [ ] **Clear Input Button**: Add a clear button within the input field to clear cell value.
- [ ] **Rich Text Support**: Implement support for rich text editing if required.
- [ ] **Performance Optimization**: Optimize rendering for large grids and smooth interactions.

## Grid Component - Potential Improvements Checklist
- [ ] **Code Modularity**: Refactor the Grid component to adhere to SOLID principles and improve its readability and maintainability.
- [ ] **Error Handling**: Improve error messages for formula evaluation and API calls.
- [ ] **Optimization**: Optimize the recursive update of dependent cells for better performance.
- [ ] **Caching**: Implement caching to store evaluated formula results and reduce redundant computations.
- [ ] **Lazy Evaluation**: Implement lazy evaluation of cell values to optimize performance.
- [ ] **Debouncing**: Add debouncing to the search input to improve filtering efficiency.
- [ ] **Error Boundary**: Wrap critical parts of the Grid component with an error boundary.
- [ ] **Input Validation**: Validate user input to ensure valid formula expressions and numerical values.
- [ ] **Formula Suggestions**: Add formula suggestion feature to assist users while entering formulas.
- [ ] **UI/UX Enhancements**: Implement additional UI/UX improvements for better usability.
- [ ] **Keyboard Shortcuts**: Provide keyboard shortcuts for common actions to improve accessibility.
- [ ] **Responsive Design**: Ensure the application is fully responsive for different screen sizes.
- [ ] **State Management**: Consider using Redux or React Context API for complex state management.
- [ ] **Localization**: Add support for localization and translations for different languages.

## SearchBar Component - Potential Improvements Checklist
- [ ] **Accessibility**: Add appropriate labels or aria-label attributes to improve accessibility for screen readers.
- [ ] **Styling**: Enhance the styling of the search bar to make it visually appealing and consistent with the application design.
- [ ] **Debouncing**: Implement debouncing on the onChange callback to reduce the number of search queries fired during rapid input changes.
- [ ] **Input Validation**: Add input validation to handle edge cases and prevent unexpected behavior.
- [ ] **Clear Button**: Consider adding a clear button to the search bar to allow users to easily clear the input field.
- [ ] **Keyboard Navigation**: Improve keyboard navigation support for better accessibility and user experience.
- [ ] **Internationalization (i18n)**: If the application supports multiple languages, ensure that the search bar text is properly localized.
- [ ] **Error Handling**: Add error handling to handle any unexpected errors that may occur during search query changes.

## evaluateFormula Function - Potential Improvements Checklist
- [ ] **Input Validation**: Add input validation to ensure that the formula and gridData parameters are valid before attempting evaluation.
- [ ] **Performance Optimization**: Evaluate the possibility of optimizing the formula evaluation process, especially for large grids, to improve performance.
- [ ] **Code Modularity**: Evaluate whether there are opportunities to break down the evaluateFormula function into smaller, more manageable functions to improve code maintainability and readability.
- [ ] **Currency Handling**: Consider supporting a wider range of currency symbols or accounting for currency conversion in the formula evaluation process.
- [ ] **Handling Circular Dependencies**: Address the possibility of circular dependencies in the grid data, which may cause infinite loops during formula evaluation.