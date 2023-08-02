import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

    constructor(private fb: FormBuilder) {}

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

    handleClick() {
        this.isEdit = !this.isEdit;
    }

    handleBlur() {
        this.handleClick();
    }
}
