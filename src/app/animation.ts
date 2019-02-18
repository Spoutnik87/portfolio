import { animate, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(':leave', [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0, top: -2000, position: 'absolute' }))], { optional: true }),
    query(':enter', [style({ opacity: 0, position: 'relative' }), animate('0.3s', style({ opacity: 1 }))], { optional: true }),
  ]),
]);
