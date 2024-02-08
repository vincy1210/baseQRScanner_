import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { CommonService } from "src/service/common.service";
import * as moment from "moment";

@Component({
  selector: "app-pdf-export",
  templateUrl: "./pdf-export.component.html",
  styleUrls: ["./pdf-export.component.scss"],
})
export class PdfExportComponent implements OnInit {
  IsPdfContent: boolean = false;
  @Input() pdfPayload: any = {
    header1Data: {},
    header2Data: [],
    bodyHeaderData: "",
    bodyDataHeader: [],
    bodyData: [],
    footerData: {},
  };

  constructor(public common: CommonService) {}

  ngOnInit(): void {
    console.log("pdfPayload: ", this.pdfPayload);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["pdfPayload"]) {
      const pdfPayloaddata = changes["pdfPayload"].currentValue;
      // this.pdfPayload = { header2Data: pdfPayloaddata.header2Data };
      this.pdfPayload = pdfPayloaddata;
      this.pdfPayload.bodyDataHeader =
        this.pdfPayload.bodyData && this.pdfPayload.bodyData.length > 0
          ? Object.keys(this.pdfPayload.bodyData[0])
          : [];
      if (this.pdfPayload.bodyDataHeader.length > 0) {
        this.common.showLoading();
        this.IsPdfContent = true;
        setTimeout(() => {
          this.pdfExport();
        }, 2000);
      } else {
        this.IsPdfContent = false;
      }
    }
  }

  pdfExport() {
    const pdfContent = document.getElementById("pdfContent");

    if (pdfContent) {
      // Set the dimensions to A4 size (210mm x 297mm)
      const pdfWidth = 210;
      const pdfHeight = 297;

      html2canvas(pdfContent, { scale: 5 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF({
          orientation: "portrait", // or 'landscape'
          unit: "mm",
          format: "a4",
        });

        // Adjust the image dimensions to fill the entire A4 page
        const imgRatio = pdfHeight / canvas.height;
        const imgWidth = pdfWidth;
        const imgHeight = canvas.height * imgRatio;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const myDate = new Date();
        const formattedDate = moment(myDate).format("DDMMYYYY");
        pdf.save(`export_${formattedDate}.pdf`);
        setTimeout(() => {
          this.IsPdfContent = false;
          this.common.hideLoading();
        }, 2000);
      });
    }
  }
}
