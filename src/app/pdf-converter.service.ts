import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfConverterService {

  constructor() { }

  savePdf(blob: Blob, fileName: string) {
    fileSaver.saveAs(blob, fileName);
  }

  convertBase64ToBlob(base64Data: string): Blob {
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uintArray = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < binaryData.length; i++) {
      uintArray[i] = binaryData.charCodeAt(i);
    }
  
    return new Blob([uintArray], { type: 'application/pdf' });
  }
  
}
