import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Button } from 'src/app/enum/Button';
import { BaseFormService } from 'src/app/services/base-form.service';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/Post';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
    @Input() data!: Post;

    form!: FormGroup;
    isEdit = false;
    buttonType = Button;

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        const clickedElement = event.target as HTMLElement;
        if (
            !clickedElement.classList.contains('post__input') &&
            !clickedElement.classList.contains('button') &&
            this.form.valid
        ) {
            this.isEdit = false;
        }
    }

    constructor(
        private fb: FormBuilder,
        private post: PostsService,
        public posts: PostsService,
        public baseForm: BaseFormService
    ) {}

    ngOnInit(): void {
        this.initForm();

        this.form.controls['title'].setValue(this.data.title);
        this.form.controls['body'].setValue(this.data.body);
    }

    initForm() {
        this.form = this.fb.group({
            title: ['', this.post.titleValidationRules],
            body: ['', this.post.bodyValidationRules],
        });
    }

    handleEditClick() {
        this.isEdit = !this.isEdit;
        if (!this.isEdit) {
            this.post.toggleLoading();
            this.post.update(this.data.id, this.form.value).subscribe({
                next: () => {
                    this.post.posts = [...this.post.posts].map((el) => {
                        if (el.id == this.data.id) {
                            return { ...el, title: this.form.value.title, body: this.form.value.body };
                        }
                        return el;
                    });
                    this.post.getPaginatedPosts();
                    this.post.toggleLoading();
                },
                error: () => {
                    this.post.toggleLoading();
                },
            });
        }
    }

    handleDelete() {
        this.post.toggleLoading();
        this.post.delete(this.data.id).subscribe({
            next: () => {
                this.post.posts = [...this.post.posts].filter((el) => el.id !== this.data.id);
                this.post.getPaginatedPosts();
                this.post.toggleLoading();
            },
            error: () => {
                this.post.toggleLoading();
            },
        });
    }

    checkInputValidity(inputName: string) {
        const input = this.form.get(inputName);
        if (input!.invalid && (input!.dirty || input!.touched)) {
            return true;
        }
        return false;
    }
}
