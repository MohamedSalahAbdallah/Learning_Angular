import { Component , inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
HousingLocationComponent
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
      <article>
        <img [src]="housingLocation?.photo" class="listing-photo" alt="">
        <section class="listing-description">
          <h2 class="listing-heading">{{housingLocation?.name}}</h2>
          <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading" >
            about this housing location
          </h2>
          <ul>
            <li>Units available: {{housingLocation?.availableUnits}}</li>
            <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
            <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply to live here</h2>
          <form action="" [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name"> first name</label>
            <input id="first-name" type="text" formControlName="firstName">
            <label for="last-name"> last name</label>
            <input id="last-name" type="text" formControlName="lastName">
            <label for="email"> email</label>
            <input id="email" type="email" formControlName="email">
            <button type="submit" class="primary">Apply now</button>
          </form>
        </section>
      </article>
    `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

 
  route:ActivatedRoute=inject(ActivatedRoute);
  housingService:HousingService=inject(HousingService)
  
  housingLocation:HousingLocation | undefined

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  

  constructor() { 
    const housingLocationId=Number(this.route.snapshot.paramMap.get('id'));

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation=>{
      this.housingLocation=housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName??'',
      this.applyForm.value.lastName??'',
      this.applyForm.value.email??''
    )
  }
}
