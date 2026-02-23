import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { VsdBadgeComponent, VsdTableComponent, VsdTableColumn, VsdTableAction } from '@vsd-web-app/shared-ui-lib';
import { VersonService, SnackBarService, StorageService } from '@vsd-web-app/core-lib';
import { VersonPaymentModalComponent } from '../verson-payment-modal/verson-payment-modal.component';

interface MemberData {
  memberId: string;
  name: string;
  mobile: string;
  mandalName: string;
  status: 'सक्रिय' | 'लंबित' | 'समाप्त';
  nextDueDate?: string;
  pendingAmount: number;
}

interface PaymentHistory {
  invoiceNumber: string;
  year: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
}

@Component({
  selector: 'vsd-verson-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    VsdBadgeComponent,
    VsdTableComponent
  ],
  templateUrl: './verson-dashboard.component.html',
  styleUrls: ['./verson-dashboard.component.scss']
})
export class VersonDashboardComponent implements OnInit {
  memberData: MemberData | null = null;
  paymentHistory: PaymentHistory[] = [];
  loading = false;

  paymentColumns: VsdTableColumn[] = [
    { key: 'invoiceNumber', label: 'रसीद संख्या', sortable: true },
    { key: 'year', label: 'वर्ष', sortable: true },
    { key: 'amount', label: 'राशि', type: 'currency', sortable: true, align: 'right' },
    { key: 'paymentDate', label: 'भुगतान तिथि', type: 'date', sortable: true },
    { key: 'paymentMethod', label: 'भुगतान विधि', sortable: false },
    { key: 'status', label: 'स्थिति', type: 'badge', sortable: false }
  ];

  paymentActions: VsdTableAction[] = [
    {
      icon: 'download',
      label: 'Download Invoice',
      callback: (row) => this.downloadInvoice(row),
      color: 'primary'
    }
  ];

  constructor(
    private versonService: VersonService,
    private storageService: StorageService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMemberData();
    this.loadPaymentHistory();
  }

  loadMemberData(): void {
    this.loading = true;
    // Get member data from storage or API
    const storedMember = this.storageService.getItem('verson_member');
    
    if (storedMember) {
      this.memberData = JSON.parse(storedMember);
      this.loading = false;
    } else {
      // If no stored data, redirect to home
      this.router.navigate(['/']);
    }
  }

  loadPaymentHistory(): void {
    if (!this.memberData?.memberId) return;

    this.versonService.getPaymentHistory(this.memberData.memberId).subscribe({
      next: (response) => {
        this.paymentHistory = response.data || [];
      },
      error: (error) => {
        console.error('Error loading payment history:', error);
        // Mock data for demonstration
        this.paymentHistory = [
          {
            invoiceNumber: 'INV-2024-001',
            year: '2024',
            amount: 200,
            paymentDate: '2024-01-15',
            paymentMethod: 'UPI',
            transactionId: 'TXN123456789',
            status: 'सक्रिय'
          },
          {
            invoiceNumber: 'INV-2023-001',
            year: '2023',
            amount: 200,
            paymentDate: '2023-01-10',
            paymentMethod: 'Card',
            transactionId: 'TXN987654321',
            status: 'सक्रिय'
          }
        ];
      }
    });
  }

  openPaymentModal(): void {
    const dialogRef = this.dialog.open(VersonPaymentModalComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        memberId: this.memberData?.memberId,
        memberName: this.memberData?.name,
        defaultAmount: 200
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.snackBarService.showSuccess('भुगतान सफल रहा!');
        this.loadMemberData();
        this.loadPaymentHistory();
      }
    });
  }

  downloadInvoice(payment: PaymentHistory): void {
    this.snackBarService.showInfo('रसीद डाउनलोड हो रही है...');
    // Implement actual download logic
    console.log('Downloading invoice:', payment.invoiceNumber);
  }

  logout(): void {
    this.storageService.removeItem('verson_member');
    this.router.navigate(['/']);
  }

  getStatusBadgeType(status: string): 'active' | 'pending' | 'expired' {
    switch (status) {
      case 'सक्रिय': return 'active';
      case 'लंबित': return 'pending';
      case 'समाप्त': return 'expired';
      default: return 'pending';
    }
  }
}

