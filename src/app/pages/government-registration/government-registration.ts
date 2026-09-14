import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-government-registration',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './government-registration.html',
})
export class GovernmentRegistrationComponent {}
