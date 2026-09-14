import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './certifications.html',
})
export class CertificationsComponent {}
