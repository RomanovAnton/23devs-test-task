import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'src/app/enum/Button';
import { AuthFormService } from 'src/app/services/auth-form.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent {
    form!: FormGroup;
    buttonType = Button;

    constructor(
        private fb: FormBuilder,
        public auth: AuthFormService,
        public post: PostsService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            userId: ['999'],
            title: ['', Validators.required],
            body: ['', Validators.required],
        });
    }

    handleSubmit() {
        this.post.toggleLoading();
        this.post.create(this.form.value).subscribe((res) => {
            this.post.posts.push(res);
            this.post.getPaginatedPosts();
            this.activeModal.dismiss();
            this.post.toggleLoading();
        });
    }
}
