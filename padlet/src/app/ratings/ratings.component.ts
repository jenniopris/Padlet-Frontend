import {Component, OnInit} from '@angular/core';
import {Rating} from "../shared/rating";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingFactory} from "../shared/rating-factory";

@Component({
  selector: 'pd-ratings',
  templateUrl: './ratings.component.html',
  styles: []
})
export class RatingsComponent implements OnInit{

  ratings: Rating[] = [];
  rating = RatingFactory.empty();
  selectedRating: number = 0;
  ratingForm: FormGroup;
  private entryId: number = 0;
  private userId: number = 1;

  constructor(
    private fb: FormBuilder,
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ratingForm = this.fb.group({
      id: this.rating.id,
      rating: [this.rating.rating ?? '', Validators.required],
      user_id: [this.rating.user_id ?? 1],
      entry_id: [this.rating.entry_id ?? 1],
    });
  }

  ngOnInit() {
    this.entryId = this.route.snapshot.params['entryId'];
    this.getRating();
  }

  rateStar(rating: number) {
    this.selectedRating = rating;
    this.submitRating();
  }

  submitRating() {
    const rating: Rating = RatingFactory.fromObject(this.ratingForm.value);
    rating.entry_id = this.entryId;
    rating.user_id = this.userId;
    rating.rating = this.selectedRating;

    console.log(rating);

    if(this.rating){
      rating.id = this.rating.id;
      this.ps.updateRating(rating).subscribe(() => {
        this.getRating();
      });
    } else {
      this.ps.saveRating(rating).subscribe(() => {
        this.getRating();
      });
    }
  }

  getRating() {
    this.ps.getRatingByEntryIdAndUserId(this.entryId, this.userId).subscribe(res => {
      this.rating = res;
      this.selectedRating = res.rating;
    });
  }

  deleteRating() {
    if(this.rating){
      this.ps.deleteRating(this.rating.id).subscribe(() => {
        this.rating = RatingFactory.empty();
        this.selectedRating = 0;
      });
    }
  }
}
