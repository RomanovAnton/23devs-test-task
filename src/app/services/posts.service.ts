import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Post } from '../types/Post';
import { Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class PostsService extends BaseService<Post> {
    protected override entityUrlName = 'posts';

    posts: Post[] = [];
    currentPage: number = 1;
    lastPage!: number;
    postsPerPage: number = 10;
    isLoading = false;
    paginatedPosts: Post[] = [];

    validationMessages: any = {
        title: {
            minlength: 'Минимальная длина 3',
            required: 'Это обязательное поле',
        },

        body: {
            minlength: 'Минимальная длина 15',
            required: 'Это обязательное поле',
        },
    };

    titleValidationRules = [Validators.required, Validators.minLength(3)];
    bodyValidationRules = [Validators.required, Validators.minLength(15)];

    getPaginatedPosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        this.lastPage = Math.ceil(this.posts.length / this.postsPerPage);
        this.paginatedPosts = this.posts.sort((a, b) => b.id - a.id).slice(startIndex, endIndex);
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
