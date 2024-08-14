# Moving Picture Interface
 
This is an angular application that integrates with a movies API.

It was written in Typescript with [Angular 18](https://angular.dev/) and uses [RXJS](https://rxjs.dev/) to handle
data stores and asynchronous logic.

Try it here: [Moving Picture Interface App](https://mdiehr.github.io/MoviesApp/)

- RXJS stores/selectors/pipes move async logic away from components
- If the service can't be reached, redirects user to an error handling page
- Images sources are optimized with a custom Image Loader
- Deep linking works on all pages
- Automatic build/deploy to GitHub pages via Github Actions

What I would like to improve:

- Loading spinners for components in-progress
- Less page layout re-flow when navigating
- More/better error handling for HTTP requests
- Unit testing that tests actual functionality instead of merely passing after constructing the component

