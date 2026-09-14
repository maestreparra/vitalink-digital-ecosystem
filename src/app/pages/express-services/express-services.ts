import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Service {
  key: string;
}

@Component({
  selector: 'app-express-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './express-services.html'
})
export class ExpressServicesComponent {
  services: Service[] = [
    { key: 'sameDay' },
    { key: 'regional' },
    { key: 'specialized' },
    { key: 'documents' },
    { key: 'ecommerce' }
    // 'refrigerated' temporarily hidden — service not offered yet
  ];
}
