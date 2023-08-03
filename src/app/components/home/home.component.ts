import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'src/app/enum/Button';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/types/Post';
import { Subscription, delay, interval } from 'rxjs';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    buttonType = Button;
    private updateSub!: Subscription;
    constructor(public post: PostsService, private modal: NgbModal) {}

    ngOnInit() {
        this.updatePosts();

        this.updateSub = interval(120000).subscribe(() => {
            this.updatePosts();
        });
    }

    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }

    updatePosts() {
        this.post.toggleLoading();
        this.post
            .getAll()
            .pipe(delay(1500))
            .subscribe({
                next: (res: Post[]) => {
                    this.post.posts = res;
                    this.post.getPaginatedPosts();
                    this.post.toggleLoading();
                },
                error: () => {
                    this.post.toggleLoading();
                },
            });
    }

    onPageChange(page: number) {
        this.post.currentPage = page;
        this.post.getPaginatedPosts();
        window.scroll(0, 0);
    }

    handleAddBtn() {
        this.modal.open(AddPostModalComponent, { size: 'lg' });
    }
}
