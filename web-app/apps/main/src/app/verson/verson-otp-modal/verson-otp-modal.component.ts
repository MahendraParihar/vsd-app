import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { VersonService, SnackBarService } from '@vsd-web-app/core-lib';

export interface VersonOTPDialogData {
  mobile?: string;
}

@Component({
  selector: 'vsd-verson-otp-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule
  ],
  templateUrl: './verson-otp-modal.component.html',
  styleUrls: ['./verson-otp-modal.component.scss']
})
export class VersonOTPModalComponent {
  mobileForm: FormGroup;
  otpForm: FormGroup;
  profileForm: FormGroup;
  
  currentStep: 'mobile' | 'otp' | 'profile' = 'mobile';
  loading = false;
  otpSent = false;
  isNewMember = false;
  mobile = '';
  
  // Mock mandals data (replace with actual API call)
  mandals = [
    { id: 1, name: 'मुंबई मंडल' },
    { id: 2, name: 'दिल्ली मंडल' },
    { id: 3, name: 'अहमदाबाद मंडल' },
    { id: 4, name: 'पुणे मंडल' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VersonOTPModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VersonOTPDialogData,
    private versonService: VersonService,
    private snackBarService: SnackBarService
  ) {
    this.mobileForm = this.fb.group({
      mobile: [data?.mobile || '', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [
        Validators.required,
        Validators.pattern(/^\d{6}$/),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]]
    });

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      mandalId: ['', Validators.required],
      registrationNumber: ['']
    });
  }

  sendOTP(): void {
    if (this.mobileForm.invalid) {
      return;
    }

    this.loading = true;
    this.mobile = this.mobileForm.value.mobile;

    this.versonService.sendOTP(this.mobile).subscribe({
      next: (response) => {
        this.loading = false;
        this.otpSent = true;
        this.currentStep = 'otp';
        this.snackBarService.showSuccess('ओटीपी सफलतापूर्वक भेजा गया');
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.showError('ओटीपी भेजने में त्रुटि');
        console.error('OTP send error:', error);
      }
    });
  }

  verifyOTP(): void {
    if (this.otpForm.invalid) {
      return;
    }

    this.loading = true;
    const otp = this.otpForm.value.otp;

    this.versonService.verifyOTP(this.mobile, otp).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.data?.isNewMember) {
          // New member - show profile form
          this.isNewMember = true;
          this.currentStep = 'profile';
        } else {
          // Existing member - close dialog and navigate to dashboard
          this.snackBarService.showSuccess('सत्यापन सफल');
          this.dialogRef.close({ 
            success: true, 
            member: response.data?.member 
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.showError('अमान्य ओटीपी');
        console.error('OTP verify error:', error);
      }
    });
  }

  submitProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    const profileData = {
      mobile: this.mobile,
      ...this.profileForm.value
    };

    this.versonService.createMemberProfile(profileData).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBarService.showSuccess('प्रोफ़ाइल सफलतापूर्वक बनाई गई');
        this.dialogRef.close({ 
          success: true, 
          member: response.data,
          isNewMember: true
        });
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.showError('प्रोफ़ाइल बनाने में त्रुटि');
        console.error('Profile creation error:', error);
      }
    });
  }

  resendOTP(): void {
    this.sendOTP();
  }

  goBack(): void {
    if (this.currentStep === 'otp') {
      this.currentStep = 'mobile';
      this.otpForm.reset();
    } else if (this.currentStep === 'profile') {
      this.currentStep = 'otp';
    }
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }
}

