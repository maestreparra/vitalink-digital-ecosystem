import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-general-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './general-services.html',
})
export class GeneralServicesComponent {}
