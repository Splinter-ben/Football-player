import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/playerService';
import { IPlayer } from '../../model/players';
import { CommonModule } from '@angular/common';
import { ICountry } from '../../model/country';

@Component({
  selector: 'app-editplayer',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editplayer.html',
  styleUrl: './editplayer.css',
})
export class Editplayer implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly playerService = inject(PlayerService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected playerId!: number;
  protected player!: IPlayer[];
  protected updateSuccess: boolean | undefined;
  protected playerForm: FormGroup;
  protected countryList: ICountry[] = [
    { id: 1, countryName: 'Cameroun' },
    { id: 2, countryName: 'France' },
    { id: 3, countryName: 'Brésil' },
    { id: 4, countryName: 'Argentine' },
  ];

  constructor(private route: ActivatedRoute) {
    this.playerForm = this.fb.group({
      playerName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      gender: new FormControl('', Validators.required),
      selected: new FormControl(false, Validators.required),
      countryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.params['id'];
    this.getPlayerInfo();
  }

  getPlayerInfo() {
    this.playerService.getPlayer(this.playerId).subscribe({
      next: (data) => {
        this.player = data;
        // Set form values when player data is loaded
        if (this.player && this.player.length > 0) {
          this.playerForm.patchValue({
            playerName: this.player[0].playerName,
            email: this.player[0].email,
            gender: this.player[0].gender,
            selected: this.player[0].selected,
            countryId: this.player[0].countryId,
          });
        }
      },
    });
  }

  onUpdatePlayer(playerForm: FormGroup) {
    if (playerForm.valid && this.player && this.player.length > 0) {
      const updatedPlayer: IPlayer = {
        ...this.player[0],
        playerName: playerForm.value.playerName,
        email: playerForm.value.email,
        gender: playerForm.value.gender,
        selected: playerForm.value.selected,
        countryId: playerForm.value.countryId,
      };

      this.playerService.updatePlayer(updatedPlayer).subscribe({
        next: (response) => {
          this.updateSuccess = true;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.updateSuccess = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.updateSuccess = false;
      console.log('Form invalid or no player data');
    }
  }
}
