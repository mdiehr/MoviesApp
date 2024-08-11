import { Component } from '@angular/core';
import { MovieExtendedDetail } from '../services/models';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.less'
})
export class MovieDetailsComponent {

  movie?: MovieExtendedDetail;

  constructor() {
    this.movie = {
      "id": "26X8iGmy3B4hgIBmUl99On",
      "title": "Jurassic Park",
      "posterUrl": "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
      "rating": "PG",
      "summary": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
      "duration": "PT2H7M",
      "directors": [
        "Steven Spielberg"
      ],
      "mainActors": [
        "Sam Neill",
        "Laura Dern",
        "Jeff Goldblum"
      ],
      "datePublished": "1993-06-11",
      "ratingValue": 8.2,
      "bestRating": 10,
      "worstRating": 1,
      "writers": [
        "Michael Crichton",
        "David Koepp"
      ],
      "genres": [
        {
          "id": "5qNaMXRbfQIK00NFmEQLwD",
          "title": "Action"
        },
        {
          "id": "3zmetciwx7pGdpqCjRWiSW",
          "title": "Adventure"
        },
        {
          "id": "5jNOcSxoHk4j38KXiwNy3i",
          "title": "Sci-Fi"
        }
      ]
    };
  }
}
