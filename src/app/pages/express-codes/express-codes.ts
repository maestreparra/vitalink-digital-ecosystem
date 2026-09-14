import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Certification {
  key: string;
  details: string[];
}

@Component({
  selector: 'app-express-codes',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './express-codes.html'
})
export class ExpressCodesComponent {
  certifications: Certification[] = [
    {
      key: 'dot',
      details: [
        'express.codes.details.dot.1',
        'express.codes.details.dot.2',
        'express.codes.details.dot.3',
        'express.codes.details.dot.4'
      ]
    },
    {
      key: 'ifta',
      details: [
        'express.codes.details.ifta.1',
        'express.codes.details.ifta.2',
        'express.codes.details.ifta.3',
        'express.codes.details.ifta.4'
      ]
    },
    {
      key: 'insurance',
      details: [
        'express.codes.details.insurance.1',
        'express.codes.details.insurance.2',
        'express.codes.details.insurance.3',
        'express.codes.details.insurance.4'
      ]
    },
    {
      key: 'safety',
      details: [
        'express.codes.details.safety.1',
        'express.codes.details.safety.2',
        'express.codes.details.safety.3',
        'express.codes.details.safety.4'
      ]
    }
  ];
}
