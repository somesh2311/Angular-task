import {Component, Input, numberAttribute} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  imports: [
    MatIcon,
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input({transform: numberAttribute}) rating: number  = 0;
  stars = [...Array(5)].map((_, i) => i + 1);

  getStarFill(index: number): number {
    const diff = Math.ceil(this.rating) - index;
    if (diff >= 1) return 100;              // Full star
    else if (diff >= 0) return this.rating / 5 * 100;   // Partial star
    else return 0;                           // Empty star
  }
}
