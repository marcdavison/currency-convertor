# CurrencyConvertor

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Download and Intall
In order to down load this project you have already visit this url:
https://github.com/marcdavison/currency-convertor

Simple run the following Git command to clone repository

```bash
git clone https://github.com/marcdavison/currency-convertor
```

Then install with

```bash
npm install
```

## Development server
To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building
To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests
To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running code coverage
To view code coverage statistics run the following command:

```bash
ng test --coverage
```

## Developer notes
Early in the development process I considered the project to be part of a wider application and therefore choose to keep the key elements of the application as separate components, placing these in a common folder.

common/ui/header
common/ui/footer

Then the form elements themselves.

common/form/button
common/form/input
common/form/select

In taking this decision I could then ensure that the form element components would be both reusable and styled consistently. Adding to this if there were extra form elements to be introduced there would be a common area for these to be contained. Another benefit of this approach is that I can consider the elements to be dumb and without any business logic.

From a coding standpoint this does come with some level of scaffolding as I would be using @Input and @Output to keep form elements aligned with the model declared in the parent handling any validation requirements. If I hadn't considered the project to be part of a wider application then these steps would not have been required as the currency-convertor component would contain form elements rather than importing them.

## Further improvments
There are a number of areas that I would consider for improvement from both a technical and feature standpoint.

# Technical
Introduction of e2e tests using playwright
API_KEY should be consumed as a secrete within the repo rather
Ci/Cd pipelines have not bee developed
Fallback values of the currencies could be created within the app
To save on the number of requests the available currencies could be stored in local storage after 1 request
Again to save on the number of requests the conversion rate could be reverse engineered, stored in state and used for later value requests of the same currencues during that particular page load.

# Feature
A switch button to swop the To and From values around
The returned currency list could be altered with the most common currencies, USD, EUR and GPB being found at the top of the list.

