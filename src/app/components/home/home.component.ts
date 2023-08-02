import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/Post';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public posts: Post[] = [];
    constructor( public postService: PostsService) {}

    ngOnInit(): void {
        this.postService.getAll().subscribe((res: Post[]) => (this.posts = res));
    }

}
