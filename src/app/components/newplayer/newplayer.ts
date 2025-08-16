import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICountry } from '../../model/country';
import { PlayerService } from '../../services/playerService';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-newplayer',
  imports: [ReactiveFormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './newplayer.html',
  styleUrl: './newplayer.css',
})
export class Newplayer {
  private readonly fb = inject(FormBuilder);
  private readonly playerService = inject(PlayerService);
  protected playerForm: FormGroup;
  protected createSuccess!: boolean;
  protected email!: string;
  protected countryList: ICountry[] = [
    { id: 1, countryName: 'Cameroun' },
    { id: 2, countryName: 'France' },
    { id: 3, countryName: 'Brésil' },
    { id: 4, countryName: 'Argentine' },
  ];

  constructor() {
    this.playerForm = this.fb.group({
      playerName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      gender: new FormControl('', Validators.required),
      selected: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
    });
  }

  onCreatePlayer(playerForm: FormGroup) {
    const selectedCountryId = Number(playerForm.get('countryId')?.value);
    const country = this.countryList.find((c) => c.id === selectedCountryId);
    const countryName = country?.countryName;

    if (playerForm.valid) {
      const formValue = playerForm.value;

      // Find the selected country name
      const selectedCountry = this.countryList.find(
        (c) => c.id === formValue.country
      );

      const newPlayer = {
        playerName: formValue.playerName,
        email: formValue.email,
        gender: formValue.gender,
        selected: formValue.selected,
        countryId: formValue.country,
        countryName: countryName || '',
      };

      this.playerService.createPlayer(newPlayer).subscribe({
        next: () => {
          this.createSuccess = true;
          playerForm.reset();
          console.log('Player data to be created:', newPlayer);
        },
        error: (error) => {
          console.log('Error while creating a player !', error);
          this.createSuccess = false;
        },
      });
    } else {
      this.createSuccess = false;
      // Mark all fields as touched to show validation errors
      Object.keys(playerForm.controls).forEach((key) => {
        const control = playerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
