import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter = 0;

  slides: { name: string, from: string, photo: string, comment: string, amenity: number, agility: number, reliability: number }[] = [
    {
      name: 'Juan Valencia',
      from: 'Bucaramanga, Colombia',
      photo: 'assets/img/avatar.png',
      comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
      amenity: 4,
      agility: 5,
      reliability: 3
    },
    {
      name: 'Maria Isabel López',
      from: 'Medellin, Colombia',
      photo: 'assets/img/avatar.png',
      comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      amenity: 5,
      agility: 3,
      reliability: 5
    },
    {
      name: 'Camila Bonilla',
      from: 'Bogotá, Colombia',
      photo: 'assets/img/avatar.png',
      comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
        ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      amenity: 5,
      agility: 4,
      reliability: 4
    }
  ];

  images = [
    'assets/img/img1.jpg',
    'assets/img/img2.jpg',
    'assets/img/img3.jpg',
    'assets/img/img4.jpg',
    'assets/img/img5.jpg',
    'assets/img/img6.jpg',
    'assets/img/img7.jpg',
    'assets/img/img8.jpg',
    'assets/img/img9.jpg',
  ];
}
