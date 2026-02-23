import { Component } from '@angular/core';

@Component({
  selector: 'app-hindi-demo',
  template: `
    <div class="demo-section">
      <h3>Font Demo - English & Hindi (हिंदी)</h3>
      
      <div class="demo-card">
        <h4>English Text</h4>
        <p>The quick brown fox jumps over the lazy dog.</p>
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </div>

      <div class="demo-card">
        <h4>Hindi Text (हिंदी पाठ)</h4>
        <p>नमस्ते! यह एक परीक्षण है।</p>
        <p>अ आ इ ई उ ऊ ऋ ए ऐ ओ औ</p>
        <p>क ख ग घ ङ च छ ज झ ञ</p>
        <p>०१२३४५६७८९</p>
      </div>

      <div class="demo-card">
        <h4>Mixed Content (मिश्रित सामग्री)</h4>
        <p>Welcome स्वागत है</p>
        <p>Hello नमस्ते</p>
        <p>Numbers: 123 संख्या: १२३</p>
      </div>
    </div>
  `,
  styles: [`
    .demo-section {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .demo-card {
      background: white;
      padding: 1.5rem;
      margin: 1rem 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: #1976d2;
    }

    h4 {
      color: #333;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e41b1b;
      padding-bottom: 0.5rem;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0.5rem 0;
    }
  `],
  standalone: false
})
export class HindiDemoComponent {}

