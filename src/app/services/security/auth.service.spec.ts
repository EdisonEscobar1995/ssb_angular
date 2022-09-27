import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'oidc-client';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let user: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should be return is logged in user true', () => {
  //   user = {
  //     id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4QTZEODY0ODNDQzU2RTEzOTgyRkJFRTZBODY5OTBDQUNBQzJBRDYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhS2JZWklQTVZ1RTVndnZ1YW9hWkRLeXNLdFkifQ.eyJuYmYiOjE2NjQyMTU0OTIsImV4cCI6MTY2NDIxNTc5MiwiaXNzIjoiaHR0cHM6Ly9wcmUtaWRlbnRpdHkuc2FudGlsbGFuYWNvbm5lY3QuY29tIiwiYXVkIjoic3NiX21vbml0b3JpbmdfZnJvbnRlbmRfdGVzdF9wcmUiLCJpYXQiOjE2NjQyMTU0OTIsImF0X2hhc2giOiJUQW5MVFFQX0pEejBzbHpUcTJZVjVnIiwic2lkIjoiYzI5MDEzNzg1OGIyZDg0OGJkOTViZWIwZjljZTgxOTUiLCJzdWIiOiI2MzY0MDkiLCJhdXRoX3RpbWUiOjE2NjQyMDI2NDcsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHZpc3VhbGl6YWRvcnNzYiIsImVtYWlsIjoidGVzdHZpc3VhbGl6YWRvcnNzYkBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhbXIiOlsicHdkIl19.l1CcXhZVeaNRJnTqQfx_8x9idm4ZgP8B74iuwKNFMqGNTsrnp_HhYqSzHs67NYDw3i-qqByOV0IELCeeRNGu9ZzejSl3gCY1vYVqhBp7599ygPfslrAK90u4ZkOD0tBWYqsHEjkAAFd1QojxPRjgFTmyVXTLQYXX3hjuTAh2PoC_vYX99uA7CXSJYw-6CT2FxI-Lc05SumcmLuyu4EotJA12IlC_qsAWw8OQcFr2VEWhQZrfrFEqi1_BiOgANxOSxkFmWLcuOofSAmFm9qX5XkBfmqnc8CUZtPi3rvfE3XzlYRQ3Pl8AV1E5PwixfCBf44JVF66xXeLVs-VJQETIuQ",
  //     session_state: "eQfrH9isGCsSI63bS1btegVuiNqx6rX8Jt-qdUshYCk.0d3de5cddf4d4326cfb272078fa7dc68",
  //     access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4QTZEODY0ODNDQzU2RTEzOTgyRkJFRTZBODY5OTBDQUNBQzJBRDYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhS2JZWklQTVZ1RTVndnZ1YW9hWkRLeXNLdFkifQ.eyJuYmYiOjE2NjQyMTU0OTIsImV4cCI6MTY2NDIxOTA5MiwiaXNzIjoiaHR0cHM6Ly9wcmUtaWRlbnRpdHkuc2FudGlsbGFuYWNvbm5lY3QuY29tIiwiYXVkIjpbImh0dHBzOi8vcHJlLWlkZW50aXR5LnNhbnRpbGxhbmFjb25uZWN0LmNvbS9yZXNvdXJjZXMiLCJhcGlTc2IiXSwiY2xpZW50X2lkIjoic3NiX21vbml0b3JpbmdfZnJvbnRlbmRfdGVzdF9wcmUiLCJzdWIiOiI2MzY0MDkiLCJhdXRoX3RpbWUiOjE2NjQyMDI2NDcsImlkcCI6ImxvY2FsIiwic2NvcGUiOlsib3BlbmlkIiwiZW1haWwiLCJleHRlcm5hbC5pbmZvIiwiYXBpU3NiL2Z1bGxfYWNjZXNzIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.a3MJBF5fjj1WMkE8mBV0G4kPAkW6ZtB7Kc7i28xnp-760-D2XzPpdhhB3XOOMsbm6ACVP8r6mLnrhKeLpkyV4eGgl5v2gvgBdj6eel7QzqY6kSbVKtpBHQEeiWJ7sNmawGWIqARaS5iZRlVcLxBXlOtkITKeD1hJx59RfU_SVjqCCMNqyc83bh0WOwUyg1H2B21g23mBkfukUrFVjdNLnkWX3x3uRsVVHv5lRFkME_wDDl_8oUDCqO0oewceyOwYI2rUw6zRp2J1jWUyUVCAZOLZxAcMNzFUY0szdx2pmBgfhZwQ4IouxPclvpgi2rwdViSYEkefdtK-02obNZPBtg",
  //     refresh_token: "9b1857a3c4d73ac3229179d27bbbfa609520e020042c9fd74cadd4778c7e3e50",
  //     token_type: "Bearer",
  //     scope: "openid email external.info apiSsb/full_access offline_access",
  //     profile: {
  //       sid: "c290137858b2d848bd95beb0f9ce8195",
  //       sub: "636409",
  //       iss: '',
  //       aud: '',
  //       exp: 0,
  //       iat: 0,
  //       auth_time: 1664202647,
  //       idp: "local",
  //       preferred_username: "testvisualizadorssb",
  //       email: "testvisualizadorssb@example.com",
  //       email_verified: true,
  //       amr: [
  //         "pwd"
  //       ]
  //     }
  //   }
  //   const login = service.isLoggedIn();
  //   expect(login).toBe(true);
  // });

});
