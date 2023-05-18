import {Component} from '@angular/core';

@Component({
  selector: 'pd-ratings',
  templateUrl: './ratings.component.html',
  styles: []
})
export class RatingsComponent {

  selectedRating: number = 0;

  rateStar(rating: number) {
    this.selectedRating = rating;
    console.log('Rating: ' + rating);
  }
}
