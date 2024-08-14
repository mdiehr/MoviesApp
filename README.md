# Moving Picture Interface
 
This is an angular application that integrates with a movies API.

It was written in Typescript with [Angular 18](https://angular.dev/) and uses [RXJS](https://rxjs.dev/) to handle
data stores and asynchronous logic. The build step is handled with Github Actions, which deploys the built applicationto
Github Pages.

Try it here: [Moving Picture Interface App](https://mdiehr.github.io/MoviesApp/)

Highlights:

- As much as possible, I used NGRX observables and async pipes for presenting data in the UI components. This avoids the need for many types of data handling, subscriptions, and so on in the components themselves.

What I'm most pleased with:

- Deep linking works from all pages, correctly handling authentication and setting up the application state to load the correct results.
- Image sources are optimized with a custom Image Loader

What I would like to improve, given more time:

- Loading spinners for components in-progress, such as the movie details
- Less page layout re-flow when navigating, especially for large paginated results
- More/better error handling for HTTP requests, especially for intermittent errors, retries, etc
- Unit testing that tests actual functionality instead of merely passing after constructing the component
- The handling of URL query parameters feels a little rough. I'd look for a better way to handle search params.

