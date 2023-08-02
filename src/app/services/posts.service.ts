import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Post } from '../types/Post';

@Injectable({
    providedIn: 'root',
})
export class PostsService extends BaseService<Post[]> {
    protected override entityUrlName = 'posts';
}
