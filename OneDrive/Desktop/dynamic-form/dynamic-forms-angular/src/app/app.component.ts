import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Company, LocationDto } from './company';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  submit() {
    console.log(this.company);
  }

  deletePhone(location: LocationDto, index: number) {
    location.phoneNumbers.splice(index, 1);
  }
  deleteLocation(index: number) {
    this.company.locations.splice(index, 1);
  }
  addPhone(location: LocationDto) {
    location.phoneNumbers.push({ code: '', number: '' });
  }
  addLocation() {
    this.company.locations.push({ city: '', country: '', streetAddress: '', phoneNumbers: [] });
  }
  company: Company =
    {
      name: 'ABC',
      locations: [
        {
          country: 'Tonga',
          city: 'Pangai',
          streetAddress: '8555 Moland Road',
          phoneNumbers: [
            { code: '+1', number: '572-385-5549' }
          ]
        }
      ]
    };
}