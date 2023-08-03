import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'src/app/enum/Button';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/Post';
import { AddModalComponent } from '../add-modal/add-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    buttonType = Button;
    constructor(public post: PostsService, private modal: NgbModal) {}

    ngOnInit(): void {
        this.post.getAll().subscribe((res: Post[]) => {
            this.post.posts = res;
            this.post.getPaginatedPosts();
        });
    }

    onPageChange(page: number) {
        this.post.currentPage = page;
        this.post.getPaginatedPosts();
        window.scroll(0, 0);
    }

    handleAddBtn() {
        this.modal.open(AddModalComponent, { size: 'lg' });
    }
}
