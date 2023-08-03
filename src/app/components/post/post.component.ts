import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Button } from 'src/app/enum/Button';
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

    constructor(private fb: FormBuilder, private post: PostsService) {}

    ngOnInit(): void {
        this.initForm();

        this.form.controls['title'].setValue(this.data.title);
        this.form.controls['body'].setValue(this.data.body);
    }

    initForm() {
        this.form = this.fb.group({
            title: [''],
            body: [''],
        });
    }

    handleEditClick() {
        this.isEdit = !this.isEdit;
    }

    handleDelete() {
        this.post.toggleLoading();
        this.post.delete(this.data.id).subscribe(() => {
            this.post.posts = [...this.post.posts].filter((el) => el.id !== this.data.id);
            this.post.getPaginatedPosts();
            this.post.toggleLoading();
        });
    }
}
