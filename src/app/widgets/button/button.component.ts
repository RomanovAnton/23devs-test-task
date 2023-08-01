import { Component, HostBinding, Input } from '@angular/core';
import { Button } from 'src/app/enum/Button';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() type!: Button;
    buttonType = Button;

    @HostBinding('style.pointer-events')
    pointerEvents = '';

    ngOnChanges() {
        if (this.type === this.buttonType.DISABLED) {
            this.pointerEvents = 'none';
        } else {
            this.pointerEvents = 'auto';
        }
    }
}
