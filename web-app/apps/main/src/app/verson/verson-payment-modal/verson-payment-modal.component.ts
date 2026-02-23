import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { VersonService, SnackBarService } from '@vsd-web-app/core-lib';

export interface PaymentDialogData {
  memberId: string;
  memberName: string;
  defaultAmount: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
}

@Component({
  selector: 'vsd-verson-payment-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './verson-payment-modal.component.html',
  styleUrls: ['./verson-payment-modal.component.scss']
})
export class VersonPaymentModalComponent implements OnInit {
  amountForm: FormGroup;
  paymentMethodForm: FormGroup;
  
  currentStep: 'amount' | 'method' | 'confirm' | 'success' = 'amount';
  loading = false;
  
  yearOptions = [1, 2, 3, 5];
  amountPerYear = 200;
  totalAmount = 200;
  transactionId = '';

  paymentMethods: PaymentMethod[] = [
    { id: 'upi', name: 'UPI', nameHi: 'UPI', icon: 'smartphone' },
    { id: 'card', name: 'Credit/Debit Card', nameHi: 'कार्ड', icon: 'credit_card' },
    { id: 'netbanking', name: 'Net Banking', nameHi: 'नेट बैंकिंग', icon: 'account_balance' },
    { id: 'wallet', name: 'Wallet', nameHi: 'वॉलेट', icon: 'account_balance_wallet' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VersonPaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData,
    private versonService: VersonService,
    private snackBarService: SnackBarService
  ) {
    this.amountForm = this.fb.group({
      years: [1, [Validators.required, Validators.min(1)]]
    });

    this.paymentMethodForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.calculateTotal();
    
    this.amountForm.get('years')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    const years = this.amountForm.get('years')?.value || 1;
    this.totalAmount = this.amountPerYear * years;
  }

  proceedToPaymentMethod(): void {
    if (this.amountForm.invalid) {
      return;
    }
    this.currentStep = 'method';
  }

  proceedToConfirm(): void {
    if (this.paymentMethodForm.invalid) {
      return;
    }
    this.currentStep = 'confirm';
  }

  processPayment(): void {
    this.loading = true;
    
    const paymentData = {
      memberId: this.data.memberId,
      years: this.amountForm.value.years,
      amount: this.totalAmount,
      paymentMethod: this.paymentMethodForm.value.paymentMethod
    };

    this.versonService.processPayment(paymentData).subscribe({
      next: (response) => {
        this.loading = false;
        this.transactionId = response.data?.transactionId || this.generateMockTransactionId();
        this.currentStep = 'success';
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.showError('भुगतान विफल रहा। कृपया पुनः प्रयास करें।');
        console.error('Payment error:', error);
      }
    });
  }

  generateMockTransactionId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  getSelectedMethodName(): string {
    const methodId = this.paymentMethodForm.value.paymentMethod;
    return this.paymentMethods.find(m => m.id === methodId)?.nameHi || '';
  }

  downloadReceipt(): void {
    this.snackBarService.showInfo('रसीद डाउनलोड हो रही है...');
    // Implement actual download logic
  }

  close(): void {
    if (this.currentStep === 'success') {
      this.dialogRef.close({ success: true, transactionId: this.transactionId });
    } else {
      this.dialogRef.close({ success: false });
    }
  }

  goBack(): void {
    if (this.currentStep === 'method') {
      this.currentStep = 'amount';
    } else if (this.currentStep === 'confirm') {
      this.currentStep = 'method';
    }
  }
}

