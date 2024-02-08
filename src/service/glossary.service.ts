// glossary.service.ts

import { Injectable } from '@angular/core';
import { GlossaryEntry } from "src/app/shared/models/filetype-model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlossaryService {

  private languageSubject = new BehaviorSubject<string>(sessionStorage.getItem('language') || 'en');
  languageChange = this.languageSubject.asObservable();

  private glossaryContent: GlossaryEntry[] = [
    {
      title: '1. What is eDAS system and what it does',
      title_ar:'المتعامل يسأل عن ما هو برنامج إيداس وما الغرض من استخدامه؟',
      content: [
        { type: 'paragraph', value: 'The Ministry have launched a new program for attestation of document of imported goods to UAE electronically with digital stamp, the attestation will be restricted to the following documents;' },
        {
          type: 'list',
          value: ['Commercial Invoices for imported goods into the United Arab Emirates local market', 'Certificates of Origin'],
        },
        {
          type: 'paragraph',
          value: 'The system will be fully automated which allows the majority of the documents to be attested seamlessly and no human intervention. In return, the system will be able to offer electronic attestation with digital stamp in a significant attestation in a much shorter time, effort, and expense comparing to the current process.  Therefore, the documents should be scanned with high resolution in PDF format and upload it to the portal along with the correct data entry and proceed with the transaction. Within some time, the transaction will provide a valid status of the transaction and then you can download the attested documents.',
        },
        {
          type: 'paragraph',
          value: 'In addition, we also provide a 24/7 Business Relation Support Team. Any difficulties or support is required, you can contact us on 06 506 8888 and we will support you moving forward. ',
        },
      ],
      content_ar: [
        { type: 'paragraph', value: 'أطلقت وزارة الخارجية والتعاون الدولي نظام التصديق الإلكتروني المخصص للتصديق على:' },
        {
          type: 'list',
          value: ['فواتير البضائع المستوردة إلى دولة الإمارات العربية المتحدة.', 'شهادات بلد المنشأ.'],
        },
        {
          type: 'paragraph',
          value: 'النظام مؤتمتً بالكامل مما يسمح بالتصديق على غالبية المستندات بسهولة وبدون تدخل بشري. إضافة إلى ذلك، سيكون النظام قادرًا على تقديم شهادة إلكترونية مع ختم رقمي للمتعامل في وقت وجهد وتكلفة أقل بكثير مقارنة بعملية التصديق الحالية. لذلك، يجب مسح المستندات ضوئيًا بدقة عالية بصيغة PDF وتحميلها على برنامج التصديق الإلكتروني مع إدخال البيانات الصحيحة والمضي قدمًا في المعاملة. بعد انتهاء عملية التصديق يمكنك تنزيل المستندات المصدقة عن طريق البرنامج او عن طريق الاتصال بمركز الاتصال',
        },
        {
          type: 'paragraph',
          value: 'بالإضافة إلى ذلك، نقدم أيضًا فريق دعم علاقات العمل على مدار الساعة طوال أيام الأسبوع في حالة وجود أي صعوبات أو دعم مطلوب, يمكنك التواصل بنا على 8888 506 06 وسنساعدك على المضي قدمًا.',
        },
      ],
    },
    //2. Add more entries as needed
    {
      title: '2. How to Open an eDAS Account',
      title_ar: 'يسأل المتعامل عن كيفية فتح حساب eDAS والبدء في استخدامه',
      content: [
        { type: 'paragraph', value: 'Step 1: Go to MoFAIC website or type this link in your browser: https://www.mofaic.gov.ae/' },
        { type: 'paragraph', value: 'Kindly make sure to register under a company account and complete the account activation process. Once the account is successfully registered and activated, make sure to log out from your account.' },
        { type: 'paragraph', value: 'Step 2: Type this link in your browser: https://attest.mofaic.gov.ae/mofaic' },
        { type: 'paragraph', value: 'Under Company Login, enter the same username and password then click on Login. You will be redirected to the second phase of account registration. Kindly fill in the details and upload the trade license. Upon successful authentication, the system will allow you to log in, and you can officially start uploading the documents for attestation.' },
        { type: 'paragraph', value: 'Kindly find the attached eDAS user guides in English and Arabic.' }
      ],
      content_ar: [
        { type: 'paragraph', value: 'الخطوة الأولى: اذهب إلى موقع وزارة الخارجية والتعاون الدولي واكتب هذا الرابط:   https://www.mofaic.gov.ae/' },
        { type: 'paragraph', value: 'يرجى التأكد من التسجيل تحت حساب شركة وإتمام عملية تفعيل الحساب. بمجرد تسجيل الحساب وتنشيطه بنجاح ، تأكد من تسجيل الخروج من حسابك.' },
        { type: 'paragraph', value: 'الخطوة الثانية: اكتب هذا الرابط في متصفحك   https://attest.mofaic.gov.ae/mofaic' },
        { type: 'paragraph', value: 'ضمن تسجيل دخول شركتك، أدخل نفس اسم المستخدم وكلمة المرور ثم انقر فوق تسجيل الدخول. ستتم إعادة توجيهك إلى المرحلة الثانية من تسجيل الحساب. يرجى استكمال تعبئة البيانات وتحميل الرخصة التجارية. عند نجاح المصادقة من قبل الوزارة، سيسمح لك النظام بتسجيل الدخول ويمكنك البدء رسميًا في تحميل المستندات للتصديق.' },
        { type: 'paragraph', value: 'يرجى الاطلاع على أدلة مستخدمي برنامج التصديق الإلكتروني eDAS المرفقة باللغتين الإنجليزية والعربية.' }
      ]
    }, //3. Add more entries as needed
    {
      title: '3. The Customer is saying that when using MOIAT website to get Duty exemption, the program is requesting for AEC number when they choose that they attested the documents and they can’t find it in their attested documents',
      title_ar: 'يقول المتعامل أنه عند استخدام موقع وزارة الصناعة والتكنولوجيا المتقدمة للحصول على إعفاء من الرسوم الجمركية، يطلب البرنامج منهم رقم AEC عند اختيارهم بأن مستنداتهم مصدقة، ولا يمكنهم العثور على رقم AEC في مستنداتهم المصدقة',
      content: [
      
        {
          type: 'list',
          value: ['AEC number is the serial number of eDAS barcode which appears on the attested document',
           'It will not appear on manually attested documents or in the bank receipts, but only on documents attested through eDAS', 
           'Kindly request the client to provide the proof of the payment or attestation via Eattestation.CSD@mofaic.gov.ae or through CRM along with the documents the client wants to attest and the Concerned department will contact him',
          'Kindly request customer to use EDAS in the future and not use the manual attestation'],
        }
      ],
      content_ar: [
      
        {
          type: 'list',
          value: ['رقم AEC هو الرقم التسلسلي لختم التصديق في برنامج التصديق الإلكتروني إيداس ويكون ظاهرا على المستند المصدق تحت الختم',
           '	لن تظهر على المستندات المصدقة يدويًا أو في الإيصالات المصرفية، وتظهر فقط في المستندات المصدق عليها من خلال برنامج التصديق الإلكتروني إيداس', 
           '	يرجى الطلب من المتعامل تقديم إيصال الدفع أو التصديق عبر Eattestation.CSD@mofaic.gov.ae أو من خلال برنامج علاقات المتعاملين CRM مع المستندات التي يريد المتعامل تصديقها وسيتم التواصل معه من قبل الإدارة المعنية',
          '	يرجى الطلب من المتعامل باستخدام برنامج التصديق الإلكتروني في المستقبل وعدم استخدام التصديق اليدوي'],
        }
      ],
    }, // Add more entries as needed
    {
      title: '4. Customer is asking How to choose chamber of commerce in MOIAT if it doesn’t show in the list',
      title_ar:'يسأل المتعامل عن كيفية اختيار غرفة التجارة في موقع وزارة الصناعة والتكنولوجيا المتقدمة وذلك إذا لم تظهر له في القائمة',
      content: [
        { type: 'paragraph', value: 'Select the chamber mentioned on the COO if it was not available kindly select "other" and proceed further even if this will not attest Certificate of Origin ' }
      ],
      content_ar:[{
        type:'paragraph',value:'حدد غرفة التجارة المذكورة في شهادة المنشأ، و إذا لم تكن متوفرة فيرجى تحديد "أخرى" والمضي قدمًا حتى إذا كان الإجراء يؤدي إلى عدم تصديق شهادة المنشأ'
      }]
    }, //5  Add more entries as needed
    {
      title: '5.	The customer received an Invalid API from MOIAT system or Incorrect date notification',
      title_ar: 'تلقى المتعامل إشعار API غير صالح من نظام وزارة الصناعة والتكنولوجيا المتقدمة أو إشعار تاريخ غير صحيح',

      content: [
        { type: 'paragraph', value: 'The documents or the clients concern should be sent to Eattestation.CSD@mofaic.gov.ae  or via CRM to EDAS – Consular, So we can check the transaction and provide the best solution accordingly ' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يجب إرسال المستندات أو شكوى المتعامل إلى Eattestation.CSD@mofaic.gov.ae أو عبر برنامج CRM إلى إدارة الخدمات القنصلية EDAS–Consular، حتى تتمكن الإدارة من التحقق من المعاملة وتقديم أفضل الحلول وفقًا لذلك ' },
      ],
    }, //6 Add more entries as needed
    {
      title: '6.	The customer is asking How to process a transaction with 1 Certificate Of Origin and 1 Commercial Invoice in eDAS Program',
      title_ar: '  يسأل المتعامل عن كيفية تحميل  شهادة منشأ واحدة و فاتورة تجارية واحدة في برنامج التصديق الإلكتروني إيداس',
      content: [
        {
          type: 'steps',
          value: [
            'Step 1: Scan the document COO and Commercial Invoice separately in PDF format with high resolution.',
            'Step 2: Login to your account and start a new application',
            'Step 3: Add the accurate details of the documents to the eDAS portal',
            'Step 4: Upload the documents and click on submit ',
            'Note: you can use EDAS user guides for more detailed instructions',
          ],
        },
      ],
      content_ar: [
        {
          type: 'steps',
          value: [
            'الخطوة 1: قم بمسح ضوئي لشهادة المنشأ والفاتورة التجارية كل مستند في ملف منفصل بصيغة PDF وبدقة عالية.',
            'الخطوة 2: قم بتسجيل الدخول إلى حسابك واختر تطبيق جديد',
            'الخطوة 3: أضف معلومات المستندات إلى بوابة ايداس بشكل دقيق',
            'الخطوة 4: قم بتحميل المستندات وانقر فوق التقديم',
            'ملاحظة: لمزيد من التفاصيل يمكنك استخدام دليل المستخدم لبرنامج التصديق الإلكتروني',
          ],
        },
      ],
    }, //7 Add more entries as needed
    {
      title: '7.	The customer is asking How to process a transaction with 1 COO only in eDAS Program ',
      title_ar: 'يسأل المتعامل عن كيفية تحميل  شهادة منشأ واحدة فقط في برنامج التصديق الإلكتروني إيداس',
      content: [
        {
          type: 'steps',
          value: [
            'Step 1: Scan the document COO and Commercial Invoice separately in PDF format with high resolution.',
            'Step 2: Login and start a new application',
            'Step 3: Select the type Certificate of Origin ',
            'Step 4: Add the accurate details of the document to the eDAS portal',
            'Step 5: upload the document and click on submit',
            'Note: you can use EDAS user guides for more detailed instructions',
          ],
        },
      ], 
      content_ar: [
        {
          type: 'steps',
          value: [
            'الخطوة 1: قم بمسح ضوئي لشهادة المنشأ والفاتورة التجارية كل مستند في ملف منفصل بصيغة PDF وبدقة عالية.',
            'الخطوة 2: قم بتسجيل الدخول لحسابك وافتح تطبيق جديد',
            'الخطوة 3: حدد اختيار شهادة المنشأ',
            'الخطوة 4: أضف التفاصيل الدقيقة للمستند إلى بوابة ايداس ',
            'الخطوة 5: قم بتحميل المستند وانقر فوق التقديم',
            'ملاحظة: لمزيد من التفاصيل يمكنك استخدام دليل المستخدم لبرنامج التصديق الإلكتروني',
          ],
        },
      ],
    },
    //8 Add more entries as needed
    {
      title: '8.	The customer is asking How to process a transaction with 1 COO and Multiple Invoices in eDAS Program',
      title_ar: 'يسأل المتعامل عن كيفية تحميل شهادة منشأ واحدة وفواتير تجارية متعددة في برنامج التصديق الإلكتروني إيداس',
      content: [
        {
          type: 'steps',
          value: [
            'Step 1: Scan the document COO and Commercial Invoice separately in PDF format with high resolution.',
            'Step 2: Login to your account and start a new application',
            'Step 3: Add the accurate details of the documents to the eDAS portal',
            'Step 4: Upload the documents accordingly and click on submit',
            'Step 5: Click the replicate option for the remaining invoices ',
            'Step 6: Do necessary edits on the replicated transactions ',
            'Step 7: Submit the transaction ',
            'Note: you can use EDAS user guides for more detailed instructions',
          ],
        },
      ],
      content_ar: [
        {
          type: 'steps',
          value: [
            'الخطوة 1: قم بمسح ضوئي لشهادة المنشأ والفواتير التجارية كل مستند في ملف منفصل بصيغة PDF وبدقة عالية.',
            'الخطوة 2: قم بتسجيل الدخول إلى حسابك واختر تطبيق جديد',
            'الخطوة 3: أضف معلومات المستندات إلى بوابة ايداس بشكل دقيق',
            'الخطوة 4: قم بتحميل المستندات وفقًا لذلك وانقر فوق إرسال',
            'الخطوة 5: انقر فوق خيار النسخ المتماثل Replicate للفواتير المتبقية ',
            'الخطوة 6: قم بالتعديلات اللازمة على المعاملات المنسوخة ',
            'الخطوة السابعة: قم بتقديم المعاملة',
            'ملاحظة: لمزيد من التفاصيل يمكنك استخدام دليل المستخدم لبرنامج التصديق الإلكتروني',
          ],
        },
      ],
    },  //9 Add more entries as needed
    {
      title: '9.	The customer is asking How to process a transaction with 1 Commercial Invoice with Multiple COO in eDAS Program ',
      title_ar: 'يسأل المتعامل عن كيفية تحميل فاتورة تجارية واحدة بشهادات منشأ متعددة في برنامج التصديق الإلكتروني إيداس',
      content: [
        {
          type: 'steps',
          value: [
            'Step 1: Scan the document COO and Commercial Invoice separately in PDF format with high resolution.',
            'Step 2: Login to your account and start a new application',
            'Step 3: Add the accurate details of the documents to the eDAS portal',
            'Step 4: Upload the documents accordingly and click on submit',
            'Step 5: COO must be uploaded individually and it cannot be uploaded using replicate option.',
            'Note: you can use EDAS user guides for more detailed instructions',
          ],
        },
      ],
      content_ar: [
        {
          type: 'steps',
          value: [
            'الخطوة 1: قم بمسح مستند شهادة المنشأ والفاتورة التجارية بشكل منفصل كل مستند في ملف منفصل بصيغة PDF وبدقة عالية',
            'الخطوة 2: قم بتسجيل الدخول إلى حسابك واختر تطبيق جديد',
            'الخطوة 3: أضف معلومات المستندات إلى بوابة ايداس بشكل دقيق',
            'الخطوة الرابعة: قم بتقديم المعاملة ',
            'الخطوة 5: يجب تحميل شهادة المنشأ بشكل فردي ولا يمكن تحميلها باستخدام خيار النسخ المتماثل',
            'ملاحظة: لمزيد من التفاصيل يمكنك استخدام دليل المستخدم لبرنامج التصديق الإلكتروني',
          ],
        },
      ],
    }, //10 Add more entries as needed
    {
      title: '10.	The customer is asking about the types of invoices that they DO NOT have to upload in eDAS system',
      title_ar: '  يسأل المتعامل عن أنواع الفواتير التي لا يجب تحميلها في برنامج التصديق الإلكتروني ',
      content: [
        { type: 'paragraph', value: 'All invoices have to be uploaded in eDAS system with the exception of the following:' },
        {
          type: 'list',
          value: ['If the documents have already been attested and have a clear MOFAIC Stamp (No other stamp will be accepted and will be treated as noncompliance).',
           'Invoices or imports of Military goods - Please do not upload these into the system.', 
           'Any invoice that shows a national purchase so movement of goods is from onshore U.A.E to on Shore U.A.E – this does not include movements from free zones to onshore these must be uploaded.',
           '3rd Country Shipment that comes from a country and goes to another country.'],
        }
      ],
      content_ar: [
        { type: 'paragraph', value: 'يجب تحميل جميع الفواتير في النظام باستثناء التالي:' },
        {
          type: 'list',
          value: [' إذا تم التصديق على المستندات بالفعل ولديها ختم وزارة الخارجية (لن يتم قبول أي ختم غير ختم الخارجية وسيتم التعامل مع غير ذلك على أنه غير مصدق).',
           ' فواتير أو واردات البضائع العسكرية - يرجى عدم تحميلها في النظام.', 
           ' أي فاتورة توضح عملية شراء داخلية بحيث تكون حركة البضائع من داخل دولة الإمارات العربية المتحدة إلى داخل دولة الإمارات العربية المتحدة - وهذا لا يشمل التحركات من المناطق الحرة إلى داخل دولة الإمارات العربية المتحدة حيث أن تحرك الشحنات من المناطق الحرة إلى داخل الدولة يخضع للتصديق.',
           ' الشحنات العابرة عبر موانئ ومطارات والنقاط الحدودية للدولة ولن تدخل أراضيها.'],
        }
      ],
    },//11 Add more entries as needed
    {
      title: '11.	The customer is asking about the types of invoices that they have to upload in eDAS system',
      title_ar: ' يسأل المتعامل عن أنواع الفواتير التي يجب تحميلها في برنامج التصديق الإلكتروني',
      content: [
        {
          type: 'list',
          value: ['If the shipment came from Rest of the world (ROW) to UAE mainland', 
          'If the shipment came from a Free Zone to UAE mainland', 
          'If the shipment came from GCC countries to UAE mainland', 
          'If the shipment is Import for Re-export'],
        },
      ],
      content_ar: [
        {
          type: 'list',
          value: ['	إذا كانت الشحنة مستوردة من باقي دول العالم ROW إلى داخل دولة الإمارات العربية المتحدة', 
          '	إذا كانت حركة الشحنة من المنطقة الحرة إلى داخل دولة الإمارات العربية المتحدة', 
          '	إذا كانت الشحنة مستوردة من دول الخليج إلى داخل دولة الإمارات العربية المتحدة', 
          '	إذا كانت الشحنة مستوردة بغرض إعادة التصدير'],
        },
      ],
    },//12 Add more entries as needed
    {
      title: '12.	The customer is asking What should I do if I don’t have the COO and I have Commercial Invoice if he attested COO instead of invoice?',
      title_ar: 'يسأل المتعامل ماذا لو لم يكن لدي شهادة منشأ ولكن عندي فاتورة تجارية أو صدق العميل على شهادة المنشأ فقط بدلاً من الفاتورة التجارية؟',
      content: [
        { type: 'paragraph', value: 'Kindly go ahead and select the attestation for both invoice and COO and once filling out the application do the following:' },
        {
          type: 'list',
          value: ['Make sure that “Attest Certificate of Origin” option is UNTICKED', 
          'In the field source chamber please select the option “Others”, then in the field of chamber name type coo not available ', 
          'In the field of source country please list the exporters country',
          'In the field of COO file upload, please upload a copy of the invoice you need to attest.'],
        },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يرجى فتح معاملة جديدة وتحديد اختيار تصديق الفاتورة وشهادة المنشأ، وبمجرد البدء بملء الطلب، قم بما يلي:' },
        {
          type: 'list',
          value: ['•	تأكد بأنه لم يتم تحديد مربع "تصديق شهادة المنشأ" كاختيار', 
          '•	في مكان غرفة تجارة المصدر يرجى تحديد الخيار "أخرى" و في مكان نوع شهادة المنشأ اختر "غير متوفر" ', 
          '•	في مكان بلد المصدر يرجى ذكر الدولة المصدرة',
          '•	في مكان تحميل ملف شهادة المنشأ يرجى تحميل نسخة من الفاتورة التي تحتاجها مصدقة.'],
        },
        {type:'paragraph', value:'ملاحظة: لمزيد من التفاصيل يمكنك استخدام دليل المستخدم لبرنامج التصديق الإلكتروني'}
      ],
    },//13 Add more entries as needed
    {
      title: '13.	The customer is asking if GCC goods are exempted or not',
      title_ar: 'يسأل المتعامل هل هناك إعفاء عن الت لو كانت البضاعة من دول مجلس التعاون الخليجي؟',
      content: [
        { type: 'paragraph', value: 'GCC manufactured goods are exempted and it must be uploaded into the system along with Certificate Of Origin (COO must be uploaded for exemption but does not need to be attested)' },
        { type: 'paragraph', value: 'Note that if you need to attest it to get other services such as “MOIAT duty exemption” you can upload it and attest it' },
       
      ],
      content_ar: [
        { type: 'paragraph', value: 'البضائع المصنعة في دول مجلس التعاون الخليجي معفاة ويجب تحميلها في النظام مع شهادة المنشأ حيث يجب تحميل شهادة المنشأ للحصول على الإعفاء ولكن لا يلزم تصديقها' },
        { type: 'paragraph', value: 'مع ملاحظة أنه إذا كنت بحاجة إلى التصديق على المستندات للبضاعة التي تم صناعتها في الخليج للحصول على خدمات أخرى مثل "الإعفاء من الرسوم الجمركية من وزارة الصناعة والتكنولوجيا المتقدمة"، فيمكنك تحميل المستندات والتصديق عليها' },
       
      ],
    },//14 Add more entries as needed
    {
      title: '14.	The Customer is asking Do I have to upload the bill of landing or delivery documents or any other documents?',
      title_ar: 'يسأل المتعامل هل يجب عليه تحميل بوليصة الشحن أو مستندات تسليم البضاعة أو أي مستندات أخرى؟',
      content: [
        { type: 'paragraph', value: 'No, kindly just upload the Commercial invoice and Certificate Of Origin. If the other documents are needed you will receive a feed back from MOFAIC about it' },
        
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا تقم بتحميل الفاتورة التجارية وشهادة المنشأ. إذا كانت هناك حاجة إلى المستندات الأخرى، فسيتم التواصل معك من وزارة الخارجية والتعاون الدولي حول هذا الموضوع' },
        
      ],
    },// Add more entries as needed
    {
      title: '15.	Bank User Asks How do we collect credit fees?',
      title_ar: 'يسأل موظف البنك كيف نقوم بتحصيل رسوم المعاملات؟',
      content: [
        { type: 'paragraph', value: 'The same way as you have always been doing, payment & revenue remains the same.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'بنفس الطريقة السابقة لجمع الرسوم، يظل الدفع والإيرادات كما كان سابقا عن طريق المقاصة' },
      ],
    },//16 Add more entries as needed
    {
      title: '16.	Customer asks Is there any preference in using browsers?',
      title_ar: 'يسأل المتعامل هل هناك تفضيل في استخدام متصفحات الإنترنت؟',
      content: [
        { type: 'paragraph', value: 'Chrome, version 97.0 or later, Edge, version 97 or later' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'قوقل كروم ، الإصدار 97.0 أو الأحدث ، برنامج إدج الإصدار 97 أو الأحدث   Edge ، الإصدار 97 أو الأحدث ' },
      ],
    },//17 Add more entries as needed
    {
      title: '17.	Customer is asking If origin of goods is not available is it ok to mention beneficiary country?',
      title_ar: 'يسأل المتعامل إذا كان بلد منشأ البضائع غير متوفر، فهل يجوز ذكر البلد المستفيد؟',
      content: [
        { type: 'paragraph', value: 'Kindly mention the country of origin specified in the commercial invoice. If there is no country of origin mentioned in the commercial invoice, then you can mention the country of exporter.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يرجى ذكر بلد المنشأ المحدد في الفاتورة التجارية وفي حال عدم وجود بلد منشأ مذكور في الفاتورة التجارية ، فيمكنك ذكر بلد المصدر' },
      ],
    },//18 Add more entries as needed
    {
      title: '18.	Customer asks If certificate of origin not presented by chamber of commerce what should be selected under Source Chamber in eDAS system?',
      title_ar: 'يسأل المتعامل إذا لم يتم تقديم شهادة المنشأ من قبل غرفة التجارة ، فماذا يجب أن يتم اختياره في إطار غرفة المصدر في نظام eDAS؟',
      content: [
        { type: 'paragraph', value: 'Choose others and mention COO not available.' },
       
      ],
      content_ar: [
        { type: 'paragraph', value: 'اختر اخرى واذكر أن شهادة المنشأ غير متوفرة' },
       
      ],
    },//19 Add more entries as needed
    {
      title: '19.	Customer is asking If the port of discharge is free zone, does the document need to be attested?',
      title_ar: 'يسأل المتعامل إذا كان ميناء التفريغ منطقة حرة ، فهل يلزم تصديق الوثيقة؟',
      content: [
        { type: 'paragraph', value: 'No need to attest it and No need to upload it in the system but if it was uploaded in the system it will be attested upon customer request' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا حاجة للتصديق عليه ولا حاجة لتحميله في النظام ولكن في حال تم رفعه في النظام سيتم تصديقه بناء على طلب العميل' },
      ],
    },//20 Add more entries as needed
    {
      title: '20.	Customer asks If COO shows multiple country of origins, is it ok to mention only one country of origin as there is no multiple option available in the eDAS system.',
      title_ar: 'يسأل المتعامل إذا ظهر في شهادة المنشأ أن منشأ البضاعة من عدة بلدان، فهل من المقبول ذكر بلد منشأ واحد فقط حيث لا يوجد خيار متعدد متاح في نظام التصديق الإلكتروني لذلك',
      content: [
        { type: 'paragraph', value: 'Simply select one of the origins from the list you do not have to list all.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'ما عليك سوى اختيار أحد بلدان المنشأ من القائمة ولا يتعين عليك سردها كلها.' },
      ],
    },//21 Add more entries as needed
    {
      title: '21.	Customer asks If country of origin is not available in the eDAS system drop down list. How to proceed for such cases?',
      title_ar: 'يسأل المتعامل إذا لم يكن بلد المنشأ متاحًا في القائمة المنسدلة لنظام eDAS. كيف يتم المضي قدما في مثل هذه الحالات؟',
      content: [
        { type: 'paragraph', value: 'Select the nearest country (Example: for Taiwan select China).' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'حدد أقرب دولة (مثال: لو كان بلد المنشأ تايوان اختر الصين).' },
      ],
    },//22 Add more entries as needed
    {
      title: '22.	Customer is asking If Commercial Invoice and Certificate or Origin are already legalized by the UAE embassy in the Origin/Exporting country and documents shows the Stamp of attestation (which means that relevant attestation fees have been paid to UAE embassy). Do we still need to upload the same in eDAS and complete the process?',
      title_ar: 'يسأل المتعامل إذا كانت الفاتورة التجارية وشهادة المنشأ مصدقة بالفعل من قبل سفارة دولة الإمارات العربية المتحدة في بلد المنشأ / بلد التصدير والمستندات تثبت ختم التصديق (مما يعني أنه تم دفع رسوم التصديق ذات الصلة إلى سفارة دولة الإمارات العربية المتحدة) هل ما زلنا بحاجة إلى تحميله في eDAS وإكمال العملية؟',
      content: [
        { type: 'paragraph', value: 'No need to attest, but if the customer needs an electronic attestation for other purposes such as MOIAT duty exemption, let him send clear scans of the documents showing the official and request the Customer to send them to eattestation.csd@mofaic.gov.ae and they will contact him about it' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا حاجة للتصديق، ولكن إذا كان العميل بحاجة إلى شهادة إلكترونية مصدقة لأغراض أخرى مثل الإعفاء من الرسوم الجمركية لوزارة الصناعة والتكنولوجيا المتقدمة، دعه يرسل صور للوثائق التي تظهر طوابع التصديق ويطلب من العميل إرسالها إلى eattestation.csd@mofaic.gov.ae وسيتصلون به بخصوص ذلك' },
      ],
    },//23 Add more entries as needed
    {
      title: '23.	Customer is asking If consignee name is not available in the documents how to proceed further?',
      title_ar: 'يسأل المتعامل إذا كان اسم المرسل إليه غير متوفر في المستندات، فكيف يمكن المضي قدمًا؟',
      content: [
        { type: 'paragraph', value: 'List the Buyer as consignee.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'اختر المشتري على أنه المرسل إليه.' },
      ],
    },//24 Add more entries as needed
    {
      title: '24.	Customer is asking If the fee amount shown in eDAS system is different from the amount calculated by the Bank then how to handle this scenario?',
      title_ar: 'يسأل المتعامل إذا كان مبلغ الرسوم الموضح في نظام التصديق الإلكتروني eDAS مختلفًا عن المبلغ الذي يحسبه البنك، فكيف يتم التعامل مع هذا السيناريو؟',
      content: [
        { type: 'paragraph', value: 'The charge is on the basis of the amount that is calculated by the eDAS system. Kindly avoid calculating by yourself and raise it to consular services department ' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'سيتم حساب الرسوم على أساس المبلغ الذي يحسبه نظام التصديق الإلكتروني ولكن يتم رفع الموضوع إلى إدارة الخدمات القنصلية' },
      ],
    },//25 Add more entries as needed
    {
      title: '25.	The Customer is asking if we receive a single invoice with multiple pages (2 – 80 pages) in some transactions, in this case should we only scan the summary page (1st and the last page) where the general description of goods, amount, party names are provided?',
      title_ar: 'يسأل المتعامل عما إذا كنا قد تلقينا فاتورة واحدة متعددة الصفحات (2 - 80 صفحة) في بعض المعاملات ، في هذه الحالة هل يجب علينا فقط مسح صفحة الملخص (الصفحة الأولى والأخيرة) حيث يكون الوصف العام للبضائع، والقيمة، وأسماء وبيانات المعنيين بالشحنة؟',
      content: [
        { type: 'paragraph', value: 'Yes' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'نعم' },
      ],
    },//26 Add more entries as needed
    {
      title: '26.	The Customer is asking If we receive multiple set of invoices / certificate of origins from one Client, can we scan and update the fields as one transaction in e- Das portal or each invoice and certificate of origin the scanned separately?',
      title_ar: 'يسأل المتعامل إذا تلقينا مجموعة متعددة من الفواتير / شهادات المنشأ من متعامل واحد ، فهل يمكننا نسخ الحقول وتحديثها كمعاملة واحدة في بوابة التصديق الإلكتروني أم تحميل كل فاتورة وشهادة منشأ يتم مسحها ضوئيًا بشكل منفصل؟',
      content: [
        { type: 'paragraph', value: 'No, it must be done individually, every shipment in an individual transaction' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا ، يجب أن يتم ذلك بشكل منفصل بحيث تكون كل شحنة في معاملة منفصلة' },
      ],
    },//27 Add more entries as needed
    {
      title: '27.	Can a customer advise the bank’s not to take legalization for any transactions that are routed through the banks?',
      title_ar: 'هل يمكن للعميل أن يطلب من البنك بعدم تصديق أي معاملات يتم توجيهها من خلال البنوك؟',
      content: [
        { type: 'paragraph', value: 'No, it is mandatory if the client wants to challenge or request a refund he can reach out on.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا ، إنه إلزامي إذا أراد العميل الشكوى أو طلب استرداد يمكنه التواصل معنا' },
      ],
    },//28 Add more entries as needed
    {
      title: '28.	Can a customer approach the bank to reverse (refund) the charges on a later stage or they have to approach MOFAIC?',
      title_ar: ' هل يمكن للعميل الاتصال بالبنك لعكس الرسوم (الاسترداد) في مرحلة لاحقة أم يجب عليه الاتصال بوزارة الخارجية والتعاون الدولي؟',
      content: [
        { type: 'paragraph', value: 'They have to approach MoFAIC on 06 506 8888 or email us on eattestation.csd@mofaic.gov.ae' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يجب عليهم التواصل مع وزارة الخارجية والتعاون الدولي على 065068888 أو مراسلتنا عبر البريد الإلكتروني على eattestation.csd@mofaic.gov.ae' },
      ],
    },//29 Add more entries as needed
    {
      title: '29.	If there are any disputes from the customer on the charges, should the customer approach MOFAIC directly or through the bank?',
      title_ar: 'في حالة وجود أي نزاع مع العميل بشأن الرسوم ، هل يجب على العميل التواصل مع وزارة الخارجية والتعاون الدولي مباشرة أو من خلال البنك؟',
      content: [
        { type: 'paragraph', value: 'Customer will have to approach MoFAIC 06 506 8888 or email us on   eattestation.csd@mofaic.gov.ae' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يجب عليهم التواصل مع وزارة الخارجية والتعاون الدولي على 065068888 أو مراسلتنا عبر البريد الإلكتروني على eattestation.csd@mofaic.gov.ae' },
      ],
    },//30 Add more entries as needed
    {
      title: '30.	Customer is asking about invoices related to services and installation/construction need to be uploaded?',
      title_ar: 'هل يجب تحميل الفواتير المتعلقة بالخدمات والتركيب \ البناء؟',
      content: [
        { type: 'paragraph', value: 'No ' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا ' },
      ],
    },//31 Add more entries as needed
    {
      title: '31.	Customer is asking if the goods are already cleared by customes, should those documents be attested as well?',
      title_ar: 'يسأل المتعامل عما إذا كان قد تم تخليص البضائع بالفعل من قبل الجمارك ، فهل يجب تصديق هذه المستندات أيضًا؟',
      content: [
        { type: 'paragraph', value: 'Yes, kindly upload the documents as attestation is mandatory for imported goods to UAE.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'نعم ، تصديق المستندات إلزامي لجميع البضائع المستوردة إلى دولة الإمارات العربية المتحدة.' },
      ],
    },//32 Add more entries as needed
    {
      title: '32.	Customer is asking if Some Commercial Invoices or Certificates of Origin received with Chamber of Commerce or chamber of Industry stamps with names in languages other than English which we are unable to identify, what is the action to be taken in such cases',
      title_ar: 'يسأل المتعامل إذا كانت بعض الفواتير التجارية أو شهادات المنشأ المستلمة مع طوابع غرفة التجارة والصناعة أو أسماء بلغات أخرى غير الإنجليزية والتي لا يمكننا تحديدها، ما هو الإجراء الذي يجب اتخاذه في مثل هذه الحالات؟',
      content: [
        { type: 'paragraph', value: 'The signatures and stamps of the foreign countries are always in English or Arabic. However, if the details mentioned on the document is in some foreign language other than English or Arabic. You still have to upload it and MOFAIC will guide you on such cases through eDAS or through CRM and Call Center' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'توقيعات وطوابع الدول الأجنبية تكون دائمًا باللغة الإنجليزية أو العربية. ومع ذلك ، إذا كانت التفاصيل المذكورة في المستند بلغة أجنبية غير الإنجليزية أو العربية. لا يزال يتعين عليك تحميلها وسيتم توجيهك في هذه الحالة من خلال النظام نفسه أو عن طريق الاتصال بك من مركز الاتصال 065068888' },
      ],
    },//33 Add more entries as needed
    {
      title: '33.	The customer is asking If a consignee on Bill of Lading is different from buyer in invoice, should we input invoice’s buyer in eDAS?',
      title_ar: 'يسأل المتعامل إذا كان المرسل إليه في بوليصة الشحن مختلفًا عن المشتري في الفاتورة ، فهل يجب علينا إدخال مشتري الفاتورة في برنامج التصديق الإلكتروني؟',
      content: [
        { type: 'paragraph', value: 'Mention the exact details mentioned on the commercial invoice. Incase if the details are not mentioned you can refer supporting documents.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'اذكر التفاصيل المذكورة في الفاتورة التجارية بالضبط. وفي حالة عدم وجودها في الفاتورة التجارية، يمكنك الرجوع إلى المستندات الداعمة.' },
      ],
    },
    //34 Add more entries as needed
    {
      title: '34.	The customer asks if invoices are received in grey color and user has no option but to upload them, Can eDAS system accept such invoices?',
      title_ar: 'يسأل المتعامل عما إذا كانت الفواتير قد تم استلامها غير ملونة، وليس أمام المستخدم خيار سوى تحميلها ، هل يمكن لنظام التصديق الإلكتروني قبول هذه الفواتير؟.',
      content: [
        { type: 'paragraph', value: 'Yes, and if the quality is not clear enough the system will send a notification requesting a clearer copy.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'نعم يقبل بشرط وضوح الصورة، وإذا لم تكن الجودة واضحة بما يكفي، فسيرسل النظام إشعارًا بطلب نسخة أوضح.' },
      ],
    },//35 Add more entries as needed
    {
      title: '35.	The customer asks if his goods are Prepred for re-export, is he still obligated to Attest those invoices, or are these categories exempted?',
      title_ar: 'يسأل المتعامل إذا كانت بضاعته معدة لإعادة التصدير هل ما زلنا ملزمين بالتصديق على تلك الفواتير أو أن هذه الفئات معفاة؟',
      content: [
        { type: 'paragraph', value: 'This transaction must be submitted and exemption can be granted based on the final destination of the goods.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يجب تقديم هذه المعاملة ويمكن منح الإعفاء بناءً على الوجهة النهائية للبضائع.' },
      ],
    },//36 Add more entries as needed
    {
      title: '36.	Customer is asking at which stage of handling should we upload the documents?',
      title_ar: 'يسأل المتعامل في أي مرحلة من مراحل المناولة يجب علينا تحميل المستندات؟ ',
      content: [
        { type: 'paragraph', value: 'It is up to the user but we generally advise that the documents are uploaded when they are accepted.' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'الأمر متروك للمستخدم ولكننا ننصح عمومًا بتحميل المستندات عند قبولها.' },
      ],
    },//37 Add more entries as needed
    {
      title: '37.	Customer is asking about a document received of zero value consisting of advertising materials  or else, is it required to upload the invoice in eDAS?',
      title_ar: 'يسأل المتعامل في حال تم استلام وثيقة بقيمة صفرية (مبلغ الفاتورة يساوي صفر) تتكون من مواد إعلانية أو غيرها وهل يلزم تحميل الفاتورة في برنامج التصديق الإلكتروني؟',
      content: [
        { type: 'paragraph', value: 'No' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'لا' },
      ],
    },//38 Add more entries as needed
    {
      title: '38.	Customer is asking to share schedule of e-legalization charges (slap of charges).',
      title_ar: 'يسأل المتعامل عن جدول رسوم التصديق الإلكتروني. (نظام الشرائح)',
      content: [
        { type: 'paragraph', value: 'Please refer to the Mofaic Website for rate cards and pricing. Note that the flat rate of document attestation 150 dirhams + service fees will be applied from the beginning of February 2023' },
      ],
      content_ar: [
        { type: 'paragraph', value: 'يرجى الرجوع إلى موقع وزارة الخارجية والتعاون الدولي للحصول على جدول رسوم تصديق الفواتير (نظام الشرائح) مع العلم بأنه سيتم تطبيق القيمة الثابتة لتصديق المستندات 150 درهم + رسوم الخدمة من بداية شهر فبراير 2023' },
      ],
    },
  ];

  // getGlossaryContent(): GlossaryEntry[] {
  //   return this.glossaryContent;
  // }


  getGlossaryContent(): GlossaryEntry[] {
    return this.glossaryContent.map(entry => {
      return {
        ...entry,
        content: this.boldKeywords(entry.content),
      };
    });
  }

  private boldKeywords(content: any[]): any[] {
    const keywordsToBold: string[] = ['attestation of document of imported goods', 'Commercial Invoices for imported goods', 'Certificates of Origin', 'we also provide a 24/7 Business Relation Support Team', 'MoFAIC website', 'eDAS', 'is the serial number of eDAS barcode', 'will not appear on manually attested', 'EDAS user guides','MOFAIC Stamp','Military goods','national purchase', '3rd Country Shipment', '150 dirhams + service fees','February 2023', '06 506 8888','Commercial invoice and Certificate Of Origin','“MOIAT duty exemption” '];

    return content.map(element => {
      if (element.type === 'paragraph') {
        element.value = this.applyBold(element.value, keywordsToBold);
      }
      return element;
    });
  }

  private applyBold(value: string, keywords: string[]): string {
    return value.replace(new RegExp(`(${keywords.join('|')})`, 'gi'), '<strong>$1</strong>');
  }
  // private applyLinks(value: string): string {
  //   return value.replace(/(https?:\/\/\S+)/gi, '<a href="$1" target="_blank">$1</a>');
  // }

  setLanguage(language: string) {
    sessionStorage.setItem('language', language);
    this.languageSubject.next(language);
  }
  
}
