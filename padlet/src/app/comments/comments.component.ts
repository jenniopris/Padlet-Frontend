import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentFormErrorMessages} from "./comment-form-error-messages";
import {Comment} from "../shared/comment";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'pd-comments',
  templateUrl: './comments.component.html',
  styles: [
  ]
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  comments: Comment[] = [];
  comment = CommentFactory.empty();
  errors: { [key: string]: string } = {};
  private entryId: number = 0;
  constructor(
    private fb: FormBuilder,
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
  ) {
    this.commentForm = this.fb.group({
      id: this.comment.id,
      comment: [this.comment.comment ?? '', Validators.required],
      user_id: [this.comment.user_id ?? 1],
      entry_id: [this.comment.entry_id ?? 1],
    });
  }

  ngOnInit() {
    this.commentForm.valueChanges.subscribe(() => this.updateErrorMessages());
    this.entryId = this.route.snapshot.params["entryId"];
    this.getComments();
  }

  getComments() {
    this.ps.getCommentsByEntryId(this.entryId).subscribe(res => this.comments = res);
  }
  submitForm() {
    const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
    comment.entry_id = this.entryId;
    comment.user_id = this.authService.getCurrentUserId();

    this.ps.createComment(comment).subscribe(() => {
      this.getComments();
    });
    this.commentForm.get('comment')?.reset();

    this.toastr.success("Comment submitted");
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.commentForm.invalid);
    this.errors = {};
    for (const message of CommentFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
