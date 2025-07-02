import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-bucket',
  imports: [
    MatButton
  ],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.scss'
})
export class BucketComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
