import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PasswordReuseCheck, ProfileFormValue, StoredProfile } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiBaseUrl = 'http://localhost:8080/api';
  private readonly http = inject(HttpClient);

  createProfile(profile: ProfileFormValue) {
    return this.http.post<StoredProfile>(`${this.apiBaseUrl}/profiles`, profile);
  }

  checkPasswordReuse(profile: Pick<ProfileFormValue, 'name' | 'password'>) {
    return this.http.post<PasswordReuseCheck>(`${this.apiBaseUrl}/profiles/password-check`, profile);
  }

  getProfiles() {
    return this.http.get<StoredProfile[]>(`${this.apiBaseUrl}/profiles`);
  }
}
