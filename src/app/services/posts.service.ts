import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Post } from '../types/Post';

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

    getPaginatedPosts() {
        this.lastPage = Math.ceil(this.posts.length / this.postsPerPage);
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        this.paginatedPosts = this.posts.sort((a, b) => b.id - a.id).slice(startIndex, endIndex);
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
