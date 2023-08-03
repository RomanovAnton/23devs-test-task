import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'src/app/enum/Button';
import { AuthFormService } from 'src/app/services/auth-form.service';
import { BaseFormService } from 'src/app/services/base-form.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-add-post-modal',
    templateUrl: './add-post-modal.component.html',
    styleUrls: ['./add-post-modal.component.scss'],
})
export class AddPostModalComponent {
    form!: FormGroup;
    buttonType = Button;

    constructor(
        private fb: FormBuilder,
        public auth: AuthFormService,
        public post: PostsService,
        public baseForm: BaseFormService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            userId: ['999'],
            title: ['', this.post.titleValidationRules],
            body: ['', this.post.bodyValidationRules],
        });
    }

    handleSubmit() {
        this.activeModal.dismiss();
        this.post.toggleLoading();
        this.post.create(this.form.value).subscribe({
            next: (res) => {
                this.post.posts.push(res);
                this.post.getPaginatedPosts();
                this.post.toggleLoading();
            },
            error: (err) => {
                this.post.toggleLoading();
            },
        });
    }
}
