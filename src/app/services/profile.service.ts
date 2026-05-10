import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileFormValue, StoredProfile } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiBaseUrl = 'http://localhost:8080/api';
  private readonly http = inject(HttpClient);

  createProfile(profile: ProfileFormValue) {
    return this.http.post<StoredProfile>(`${this.apiBaseUrl}/profiles`, profile);
  }

  getProfiles() {
    return this.http.get<StoredProfile[]>(`${this.apiBaseUrl}/profiles`);
  }
}
