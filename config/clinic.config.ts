import { ThemePreset } from "./theme.config";

export interface DoctorConfig {
  id: string;
  slug: string;
  name: string;
  nameMr: string;
  qualification: string;
  qualificationMr: string;
  specialty: string;
  specialtyMr: string;
  role: string;
  roleMr: string;
  /**
   * Set to "male" or "female" to flip the generic SVG avatar representation.
   */
  avatar: "male" | "female";
  phone: string;
  phoneRaw: string;
  enabled: boolean;
  needsVerification?: string[];
}

export interface TreatmentItem {
  id: string;
  slug: string;
  title: string;
  titleMr: string;
  badge: string;
  badgeMr: string;
  shortDesc: string;
  shortDescMr: string;
  oneLineDesc: string;
  oneLineDescMr: string;
  tagline: string;
  taglineMr: string;
  image: string;
  symptoms: string[];
  symptomsMr: string[];
  howTreated: string;
  howTreatedMr: string;
  careAdvice: string[];
  careAdviceMr: string[];
  clinicalNote: string;
  clinicalNoteMr: string;
  startingPrice?: string;
  duration?: string;
  sessions?: string;
  faqs: Array<{ q: string; qMr: string; a: string; aMr: string }>;
  enabled: boolean;
}

export interface ClinicConfig {
  name: string;
  nameMr: string;
  shortName: string;
  shortNameMr: string;
  tagline: string;
  taglineMr: string;
  legalName: string;
  subtitle: string;
  subtitleMr: string;

  phones: {
    primary: string;
    secondary: string;
    primaryRaw: string;
    secondaryRaw: string;
  };
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;

  address: {
    street: string;
    streetMr: string;
    landmark: string;
    landmarkMr: string;
    city: string;
    cityMr: string;
    district: string;
    districtMr: string;
    state: string;
    stateMr: string;
    pincode: string;
    fullAddress: string;
    fullAddressMr: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  landmark: string;
  mapsLink: string;
  embeddedMapUrl: string;

  hours: {
    weekday: string;
    weekdayMr: string;
    weekend: string;
    weekendMr: string;
    display: string;
    displayMr: string;
    emergency: string;
    emergencyMr: string;
  };

  doctors: DoctorConfig[];
  leadDoctor: DoctorConfig;

  theme: ThemePreset;

  sections: {
    showDoctors: boolean;
    showGallery: boolean;
    showReviews: boolean;
    showStats: boolean;
    showMap: boolean;
    showEmi: boolean;
  };

  sampleMode: boolean;
  logoImage?: string;
  exteriorImage: string;
  callbackNotice: string;
  callbackNoticeMr: string;

  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };

  // Optional / uncertain procedures kept disabled until confirmed
  advancedProcedures: {
    laserProctology: {
      enabled: boolean;
      title: string;
      titleMr: string;
      note: string;
    };
  };

  treatments: TreatmentItem[];

  whenToSeeDoctor: {
    badge: string;
    badgeMr: string;
    title: string;
    titleMr: string;
    subtitle: string;
    subtitleMr: string;
    symptoms: Array<{
      id: string;
      title: string;
      titleMr: string;
      description: string;
      descriptionMr: string;
      icon: string;
    }>;
    reassuranceNote: string;
    reassuranceNoteMr: string;
  };

  privacyAndComfort: {
    badge: string;
    badgeMr: string;
    title: string;
    titleMr: string;
    subtitle: string;
    subtitleMr: string;
    points: Array<{
      id: string;
      title: string;
      titleMr: string;
      description: string;
      descriptionMr: string;
      icon: string;
    }>;
  };

  faqs: Array<{
    q: string;
    qMr: string;
    a: string;
    aMr: string;
  }>;

  disclaimer: {
    en: string;
    mr: string;
  };
}

export const clinicConfig: ClinicConfig = {
  name: "Kore Hospital – Piles Centre",
  nameMr: "कोरे हॉस्पिटल – मूळव्याध सेंटर",
  shortName: "Kore Hospital",
  shortNameMr: "कोरे हॉस्पिटल",
  tagline: "Specialist care for piles, fissure & fistula",
  taglineMr: "मूळव्याध, फिशर, फिस्टुला – विश्वासार्ह उपचार",
  legalName: "Kore Hospital – Piles & Ksharsutra Centre",
  subtitle: "Piles (Mūlvyādh) & Anorectal Care Centre",
  subtitleMr: "मुळव्याध सेंटर · स्त्रीरोग व जनरल फिजिशियन",

  phones: {
    primary: "9421873077",
    secondary: "8888575671",
    primaryRaw: "+919421873077",
    secondaryRaw: "+918888575671",
  },
  phone: "+91 94218 73077",
  phoneRaw: "+919421873077",
  whatsappNumber: "919421873077",
  email: "korehospitalgangakhed@gmail.com",

  address: {
    street: "Near Chandak Hospital, Doctor Lane (Dr. Lane)",
    streetMr: "चांडक हॉस्पिटलच्या शेजारी, डॉ. लेन",
    landmark: "Beside Chandak Hospital, Dr. Lane",
    landmarkMr: "चांडक हॉस्पिटल शेजारी",
    city: "Gangakhed",
    cityMr: "गंगाखेड",
    district: "Dist. Parbhani",
    districtMr: "जि. परभणी",
    state: "Maharashtra",
    stateMr: "महाराष्ट्र",
    pincode: "431514",
    fullAddress: "Near Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani, Maharashtra 431514",
    fullAddressMr: "चांडक हॉस्पिटलच्या शेजारी, डॉ. लेन, गंगाखेड, जि. परभणी, महाराष्ट्र ४३१५१४",
    coordinates: {
      lat: 18.9698392,
      lng: 76.7479928,
    },
  },

  city: "Gangakhed",
  state: "Maharashtra",
  pincode: "431514",
  fullAddress: "Near Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani, Maharashtra 431514",
  landmark: "Beside Chandak Hospital, Dr. Lane",
  mapsLink: "https://maps.app.goo.gl/vgc7iU8wHEm4EJLY7",
  embeddedMapUrl: "https://maps.google.com/maps?q=18.9698392,76.7479928&hl=en&z=16&output=embed",

  hours: {
    weekday: "Mon – Sat: 9:00 AM – 8:00 PM (Please verify)",
    weekdayMr: "सोम – शनि: सकाळी ९:०० ते रात्री ८:०० (तपासणी आवश्यक)",
    weekend: "Sunday: 9:00 AM – 2:00 PM (Emergency on-call)",
    weekendMr: "रविवार: सकाळी ९:०० ते दुपारी २:०० (आपत्कालीन)",
    display: "Mon – Sat: 9:00 AM – 8:00 PM · Sun: 9:00 AM – 2:00 PM",
    displayMr: "सोम – शनि: स. ९:०० ते रा. ८:०० · रवि: स. ९:०० ते दु. २:००",
    emergency: "Emergency Medical On-Call Service",
    emergencyMr: "तातडीच्या सेवेसाठी ऑन-कॉल उपलब्ध",
  },

  /**
   * DOCTORS CONFIGURATION
   * Exactly two doctors from the signboard.
   * Generic male/female SVG avatar icons are rendered dynamically in theme colors.
   * No photos or fabricated claims used.
   */
  doctors: [
    {
      id: "dr-anant-kore",
      slug: "dr-anant-kore",
      name: "Dr. Anant Kamaji Kore",
      nameMr: "डॉ. अनंत कामाजी कोरे",
      qualification: "BAMS, Fellowship in Ksharsutra",
      qualificationMr: "BAMS, Fellowship in Ksharsutra",
      specialty: "Ano-rectal & Ksharsutra care",
      specialtyMr: "गुदशल्य चिकित्सक व जनरल फिजिशियन",
      role: "Senior Ano-rectal & Ksharsutra care",
      roleMr: "गुदशल्य चिकित्सक",
      avatar: "male",
      phone: "9421873077",
      phoneRaw: "+919421873077",
      enabled: true,
      needsVerification: [],
    },
    {
      id: "dr-kiran-kore",
      slug: "dr-kiran-kore",
      name: "Dr. Kiran Anant Kore",
      nameMr: "डॉ. किरण अनंत कोरे (पुलमंतार)",
      qualification: "MS, PGDEMS, DGO (Pune)",
      qualificationMr: "MS, PGDEMS, DGO (Pune)",
      specialty: "Ano-rectal & Ksharsutra care",
      specialtyMr: "गुदशल्य व स्त्रीरोग तज्ञ",
      role: "Ano-rectal & Ksharsutra care, Gynecologist",
      roleMr: "गुदशल्य व स्त्रीरोग तज्ञ",
      avatar: "female", // Easily flipped to "male" or "female" as needed
      phone: "8888575671",
      phoneRaw: "+918888575671",
      enabled: true,
      needsVerification: [
        "Exact degree spelling (MS, PGDEMS, DGO Pune vs MS Ayu)",
        "Avatar gender preference (configured as female)",
      ],
    },
  ],

  get leadDoctor() {
    return this.doctors[0];
  },

  theme: "ayurveda-teal",

  sections: {
    showDoctors: true,
    showGallery: false, // Hidden: no fabricated cases
    showReviews: false, // Hidden: no fabricated ratings
    showStats: false,   // Hidden: no fabricated numbers
    showMap: true,
    showEmi: false,
  },

  sampleMode: false,
  logoImage: "",
  exteriorImage: "/images/clinic-exterior.jpg",
  callbackNotice: "We will contact you promptly on WhatsApp or call to confirm your appointment.",
  callbackNoticeMr: "तुमच्या भेटीची वेळ निश्चित करण्यासाठी आम्ही लवकरच व्हॉट्सॲप किंवा फोनद्वारे संपर्क करू.",

  socials: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  advancedProcedures: {
    laserProctology: {
      enabled: false,
      title: "Laser Proctology Procedures",
      titleMr: "लेझर मुळव्याध उपचार",
      note: "Disabled by default. Can be enabled if laser equipment is confirmed at the hospital.",
    },
  },

  /**
   * TREATMENTS LIST (8 Requested Treatments)
   * All written in reassuring, careful, non-guaranteed language adhering to medical advertising ethics.
   */
  treatments: [
    {
      id: "piles",
      slug: "piles-hemorrhoids",
      title: "Piles / Hemorrhoids",
      titleMr: "मुळव्याध (Hemorrhoids)",
      badge: "Internal & External",
      badgeMr: "सर्व प्रकारच्या मुळव्याध",
      shortDesc: "Comprehensive assessment and evidence-based Ayurvedic/Ksharsutra management for internal and external hemorrhoids across all clinical grades.",
      shortDescMr: "अंतर्गत व बाह्य मुळव्याधीच्या सर्व टप्प्यांसाठी अचूक तपासणी, औषधोपचार व योग्य क्षणी क्षारसूत्र चिकित्सा.",
      oneLineDesc: "Careful clinical evaluation and individualized management for all grades of piles.",
      oneLineDescMr: "मुळव्याधीच्या सर्व टप्प्यांसाठी तज्ज्ञ डॉक्टरांकडून सुरक्षित व विश्वासार्ह उपचार.",
      tagline: "Gentle, non-judgmental evaluation and targeted relief for piles.",
      taglineMr: "मुळव्याधीपासून आराम मिळवण्यासाठी तज्ज्ञ डॉक्टरांचा सल्ला.",
      image: "/images/treatments/piles-treatment.svg",
      symptoms: [
        "Painless or painful bleeding during defecation",
        "Prolapsing lump or swelling around the anal opening",
        "Itching, irritation, or burning sensation",
        "Discomfort while sitting or passing stool",
      ],
      symptomsMr: [
        "शौचाच्या वेळी रक्तस्त्राव होणे",
        "गुदभागाच्या ठिकाणी कोंब किंवा गाठ जाणवणे",
        "गुदभागात खाज, आग किंवा जळजळ होणे",
        "बसताना किंवा शौचाच्या वेळी अस्वस्थता",
      ],
      howTreated:
        "Treatment strategy depends on proper examination and staging (Grade I to IV). Early stages are managed with dietary fiber optimization, local Ayurvedic formulations, and stool regulation. For non-responsive or advanced cases, Ksharsutra therapy or minor surgical ligation may be advised after direct evaluation.",
      howTreatedMr:
        "उपचार पद्धती मुळव्याधीच्या प्रकार व टप्प्यावर (Grade I ते IV) अवलंबून असते. प्राथमिक अवस्थेत योग्य आहार, औषधोपचार व जीवनशैलीतील बदलांनी आराम मिळतो. गरज भासल्यास तपासणीअंती क्षारसूत्र किंवा योग्य उपचार केले जातात.",
      careAdvice: [
        "Increase dietary fiber with whole grains, vegetables, and fruits",
        "Drink adequate water throughout the day to soften stools",
        "Avoid prolonged sitting or excessive straining on the toilet",
        "Take warm water sitz baths if advised by the doctor",
      ],
      careAdviceMr: [
        "आहारात भरपूर फायबर, पालेभाज्या व फळांचा समावेश करा",
        "शौचाचा त्रास कमी होण्यासाठी दिवसभरात पुरेसे पाणी प्या",
        "शौचालयात जास्त वेळ बसणे व जोर लावणे टाळा",
        "डॉक्टरांच्या सल्ल्यानुसार कोमट पाण्याच्या टबमध्ये बसा (Sitz Bath)",
      ],
      clinicalNote:
        "Treatment selection and outcomes depend on direct clinical examination, grade of piles, and individual health factors.",
      clinicalNoteMr:
        "प्रत्यक्ष तपासणी, मुळव्याधीचा प्रकार आणि रुग्णाची प्रकृती यावर योग्य उपचार पद्धती अवलंबून असते.",
      faqs: [
        {
          q: "Is surgery always required for piles?",
          qMr: "मुळव्याधीसाठी नेहमी शस्त्रक्रिया करावीच लागते का?",
          a: "No. Many patients improve with conservative medical management, dietary modifications, and Ayurvedic care when diagnosed early. Procedural intervention is only considered when indicated.",
          aMr: "नाही. सुरुवातीच्या काळात तपासणी झाल्यास औषधोपचार, पथ्य आणि आहारातील बदलांनी बराच आराम मिळू शकतो. गरज असल्यासच पुढील उपचार सुचवले जातात.",
        },
        {
          q: "Can piles return after treatment?",
          qMr: "उपचारानंतर मुळव्याध पुन्हा होऊ शकते का?",
          a: "Maintaining regular bowel habits, high-fiber nutrition, and preventing chronic constipation helps significantly reduce recurrence.",
          aMr: "बद्धकोष्ठता टाळणे, आहारात फायबर ठेवणे आणि भरपूर पाणी पिणे यामुळे मुळव्याध पुन्हा उद्भवण्याची शक्यता बरीच कमी होते.",
        },
      ],
      enabled: true,
    },
    {
      id: "fissure",
      slug: "anal-fissure",
      title: "Anal Fissure (Fissure-in-Ano)",
      titleMr: "फिशर (Anal Fissure)",
      badge: "Acute & Chronic",
      badgeMr: "तीव्र व जुनाट फिशर",
      shortDesc: "Gentle management of tears in the anal canal lining caused by hard bowel movements, focusing on sphincter relaxation and tissue healing.",
      shortDescMr: "शौचाच्या वेळी होणाऱ्या तीव्र वेदना, जळजळ व भेगांवर (Fissure) आराम देणारे आयुर्वेदिक व सुरक्षित उपचार.",
      oneLineDesc: "Relief from sharp pain, burning sensations, and tears in the anal lining.",
      oneLineDescMr: "शौचाच्या वेळेस होणाऱ्या तीव्र वेदना व जळजळीवर वेळेवर उपचार.",
      tagline: "Rapid symptomatic relief and holistic healing for anal fissures.",
      taglineMr: "फिशरच्या वेदनांपासून आराम आणि सुरक्षित उपचार.",
      image: "/images/treatments/anal-fissure.svg",
      symptoms: [
        "Sharp, tearing pain during and for hours after bowel movements",
        "Streaks of bright red blood on stool or tissue paper",
        "Visible small crack or tear around the anal margin",
        "Sphincter spasm causing difficulty passing motions",
      ],
      symptomsMr: [
        "शौचाच्या वेळी आणि नंतर तासनतास होणाऱ्या तीव्र कात्रीने कापल्यासारख्या वेदना",
        "शौचाच्या वेळी थोडे ताजे लाल रक्त दिसणे",
        "गुदभागाजवळ भेग पडल्यासारखे जाणवणे",
        "गुदद्वाराचे स्नायू आखडल्यामुळे शौचास त्रास होणे",
      ],
      howTreated:
        "Conservative therapy focuses on relieving internal sphincter spasm and preventing hard stools with specialized soothing medicated oils, sitz baths, and dietary counseling. For chronic non-healing fissures with a sentinel tag, gentle Ksharsutra application or minor relaxation procedures may be recommended after clinical assessment.",
      howTreatedMr:
        "गुदभागाच्या स्नायूंना शिथिल करणे, वेदना कमी करणे आणि शौच मऊ करणे हे प्राथमिक उद्दिष्ट असते. कोमट पाण्याचा शेक आणि औषधांनी आराम मिळतो. जुनाट फिशरसाठी डॉक्टरांच्या सल्ल्याने पुढील उपचार केले जातात.",
      careAdvice: [
        "Never suppress the natural urge to pass stools",
        "Avoid spicy, oily, and highly processed foods",
        "Use prescribed soothing ointments and medicated oils as directed",
        "Maintain clean and dry local hygiene",
      ],
      careAdviceMr: [
        "शौचाचा वेग कधीही अडवून धरू नका",
        "अति तिखट, तेलकट आणि जंक फूड टाळा",
        "डॉक्टरांनी दिलेली औषधे व तेलाचा वापर वेळेवर करा",
        "स्वच्छता राखा",
      ],
      clinicalNote:
        "Most acute fissures respond well to medical and lifestyle measures under proper doctor supervision.",
      clinicalNoteMr:
        "योग्य मार्गदर्शन व औषधोपचाराने तीव्र फिशरमध्ये लवकर आराम मिळतो.",
      faqs: [
        {
          q: "Why is anal fissure so painful?",
          qMr: "फिशरमध्ये इतक्या तीव्र वेदना का होतात?",
          a: "The lower anal canal has an abundant supply of sensitive nerve endings. Straining triggers sphincter spasms which prolong the pain.",
          aMr: "गुदभागातील त्वचा अतिशय संवेदनशील असते. शौच कडक झाल्याने पडलेली चीर व स्नायूंचा ताण यामुळे तीव्र वेदना होतात.",
        },
      ],
      enabled: true,
    },
    {
      id: "fistula",
      slug: "anal-fistula",
      title: "Anal Fistula (Fistula-in-Ano)",
      titleMr: "भगंदर / फिस्टुला (Anal Fistula)",
      badge: "Ksharsutra care",
      badgeMr: "क्षारसूत्र विशेष उपचार",
      shortDesc: "Specialized Ayurvedic Ksharsutra and surgical management for abnormal tracts connecting the anal canal to the perianal skin.",
      shortDescMr: "गुदभागातील पू वाहणाऱ्या नळीसारख्या मार्गावर (Fistula) जगन्मान्य व सुरक्षित क्षारसूत्र चिकित्सा.",
      oneLineDesc: "Gold-standard Ksharsutra therapy for simple and complex anal fistulas.",
      oneLineDescMr: "फिस्टुलावर क्षारसूत्र तंत्रज्ञानाने मुळापासून सुरक्षित उपचार.",
      tagline: "Safe tract healing with minimal sphincter disturbance.",
      taglineMr: "गुदभागाच्या स्नायूंना इजा न पोहोचवता फिस्टुलावर उपचार.",
      image: "/images/treatments/anal-fistula.svg",
      symptoms: [
        "Recurrent pus, foul-smelling fluid, or blood discharge near the anus",
        "Constant perianal throbbing pain, especially during sitting or coughing",
        "Small external opening near the anus that crusts over and re-opens",
        "Periodic low-grade fever or swelling",
      ],
      symptomsMr: [
        "गुदभागाजवळून सतत किंवा अधूनमधून पू, पाणी किंवा रक्त येणे",
        "गुदभागात सतत ठसठस किंवा दुखणे",
        "गुदभागाजवळ बारीक छिद्र दिसणे व ते पुन्हा पुन्हा भरणे/फुटणे",
        "अधूनमधून ताप येणे किंवा सूज येणे",
      ],
      howTreated:
        "Fistula does not typically heal with oral antibiotics alone because the internal tract persists. Ksharsutra therapy—a specialized medicated thread prepared with Ayurvedic herbs—is placed through the tract. It cuts and cures the tract gradually while allowing healthy granulation from the base without damaging the continence mechanism.",
      howTreatedMr:
        "फिस्टुला फक्त गोळ्या-औषधांनी पूर्ण बरा होत नाही कारण आतील मार्ग शिल्लक राहतो. यासाठी क्षारसूत्र ही अत्यंत प्रभावी पद्धती मानली जाते. औषधी धाग्याच्या मदतीने आतील मार्ग हळूहळू कापला जातो आणि स्वच्छ होऊन भरून येतो.",
      careAdvice: [
        "Attend periodic thread change appointments as scheduled by the doctor",
        "Maintain regular sitz baths to keep the area drained and clean",
        "Wear breathable, loose cotton clothing",
        "Follow prescribed antiseptic dressing protocols",
      ],
      careAdviceMr: [
        "डॉक्टरांनी दिलेल्या तारखेला वेळेवर तपासणी व थ्रेड बदलून घ्या",
        "दिवसातून २-३ वेळा कोमट पाण्याच्या टबमध्ये बसा",
        "सैल व सुती कपडे वापरा",
        "स्वच्छतेची काळजी घ्या",
      ],
      clinicalNote:
        "Tract length and branching require clinical probing or imaging to determine exact Ksharsutra duration.",
      clinicalNoteMr:
        "फिस्टुलाचा मार्ग आणि खोली यानुसार उपचाराचा कालावधी ठरवला जातो.",
      faqs: [
        {
          q: "What makes Ksharsutra preferable for fistula?",
          qMr: "फिस्टुलासाठी क्षारसूत्र का उत्तम मानले जाते?",
          a: "Ksharsutra cuts and heals simultaneously, minimizing the risk of sphincter incontinence and offering lower recurrence rates compared to conventional wide excision.",
          aMr: "क्षारसूत्रामध्ये गुदभागाच्या स्नायूंना इजा पोहोचत नाही, त्यामुळे शौचावरचे नियंत्रण अबाधित राहते आणि आजार पुन्हा होण्याची शक्यता कमी असते.",
        },
      ],
      enabled: true,
    },
    {
      id: "ksharsutra",
      slug: "ksharsutra-therapy",
      title: "Ksharsutra Therapy",
      titleMr: "क्षारसूत्र चिकित्सा (Ksharsutra Therapy)",
      badge: "Ayurvedic Parasurgical",
      badgeMr: "आयुर्वेदिक प्रमाणित तंत्र",
      shortDesc: "Time-tested, scientifically validated Ayurvedic medicated thread therapy for safe and effective management of fistula, high piles, and sinus tracts.",
      shortDescMr: "मुळव्याध व फिस्टुलासाठी जगप्रसिद्ध, सुरक्षित आणि शास्त्रोक्त आयुर्वेदिक औषधी धागा उपचार पद्धती.",
      oneLineDesc: "Ayurvedic Ksharsutra treatment administered by experienced practitioners.",
      oneLineDescMr: "अनुभवी डॉक्टरांच्या देखरेखीखाली शास्त्रोक्त क्षारसूत्र चिकित्सा.",
      tagline: "Ancient Ayurvedic surgical wisdom meeting modern hygienic precision.",
      taglineMr: "पारंपरिक आयुर्वेदिक ज्ञान आणि आधुनिक स्वच्छता.",
      image: "/images/treatments/ksharsutra-therapy.svg",
      symptoms: [
        "Chronic or recurring anal fistula",
        "High-grade or bleeding piles unsuitable for plain conservative care",
        "Persistent pilonidal sinus tracts",
        "Recurring perianal abscesses",
      ],
      symptomsMr: [
        "वारंवार होणारा फिस्टुला किंवा भगंदर",
        "औषधांनी पूर्ण बरी न होणारी जुनाट मुळव्याध",
        "पायलोनिडल सायनस (केसांची गाठ)",
        "वारंवार पू भरणारा मार्ग",
      ],
      howTreated:
        "Ksharsutra is formulated by coating sterile surgical linen thread with natural alkaline herbs (Snuhi latex, Apamarga Kshara, and Haridra powder). Once placed into the affected tract, the herbs provide continuous chemical debridement, anti-microbial action, and sustained healing from depth outward.",
      howTreatedMr:
        "क्षारसूत्र हा विशिष्ट औषधी वनस्पतींच्या (उदा. अपामार्ग क्षार, हळद) थरांनी तयार केलेला धागा असतो. हा धागा रोगग्रस्त भागात सोडला जातो. यामुळे आतील अशुद्ध भाग निघून जाऊन नवीन निरोगी त्वचा तयार होते.",
      careAdvice: [
        "Continue normal light daily activities without heavy weight lifting",
        "Keep the dressing dry and clean between consultations",
        "Follow dietary recommendations strictly to avoid loose or hard motions",
      ],
      careAdviceMr: [
        "दैनंदिन हलकी कामे सुरू ठेवता येतात, जड वजन उचलणे टाळा",
        "पट्टी स्वच्छ व कोरडी ठेवा",
        "पोटाची पचनक्रिया व्यवस्थित राहण्यासाठी सांगितलेला आहार घ्या",
      ],
      clinicalNote:
        "Ksharsutra therapy is an OPD-friendly or short-stay procedure practiced strictly in accordance with classical Ayurvedic surgical tenets.",
      clinicalNoteMr:
        "क्षारसूत्र उपचार प्रक्रियेत रुग्णालयात जास्त दिवस राहावे लागत नाही आणि रुग्ण लवकर कामावर परतू शकतो.",
      faqs: [
        {
          q: "Does Ksharsutra require prolonged hospital stay?",
          qMr: "क्षारसूत्रानंतर रुग्णालयात जास्त दिवस राहावे लागते का?",
          a: "Usually, patients can return home on the same day or following day depending on individual clinical stability and doctor advice.",
          aMr: "बहुतांश प्रकरणांमध्ये रुग्ण त्याच दिवशी किंवा दुसऱ्या दिवशी घरी जाऊ शकतात.",
        },
      ],
      enabled: true,
    },
    {
      id: "abscess",
      slug: "perianal-abscess",
      title: "Perianal Abscess",
      titleMr: "पेरीएनल ॲब्सेस / पू चा फोड (Perianal Abscess)",
      badge: "Prompt Clinical Care",
      badgeMr: "तातडीने लक्ष देण्याची गरज",
      shortDesc: "Timely clinical drainage and antiseptic care for painful collections of pus in the tissue around the anus to prevent fistula formation.",
      shortDescMr: "गुदभागाजवळ पू भरून आलेल्या वेदनादायी फोडावर योग्य वेळी सुरक्षित निचरा व औषधोपचार.",
      oneLineDesc: "Prompt diagnosis, safe drainage, and compassionate pain relief.",
      oneLineDescMr: "पू चा सुरक्षित निचरा करून वेदनेतून तात्काळ आराम.",
      tagline: "Timely medical intervention prevents chronic complications.",
      taglineMr: "वेळेवर उपचार केल्यास फिस्टुला होण्याचा धोका टळतो.",
      image: "/images/treatments/perianal-abscess.svg",
      symptoms: [
        "Throbbing, constant, and severe pain in the anal area",
        "Visible tender red swelling near the anal verge",
        "Fever, chills, or generalized malaise",
        "Difficulty sitting or walking comfortably",
      ],
      symptomsMr: [
        "गुदभागात सतत ठसठसणारी तीव्र वेदना",
        "गुदद्वाराजवळ लालसर, गरम आणि दुखरी सूज येणे",
        "ताप येणे, थंडी वाजणे किंवा अस्वस्थ वाटणे",
        "बसताना किंवा चालताना खूप त्रास होणे",
      ],
      howTreated:
        "An abscess requires timely surgical drainage under local or regional anesthesia to evacuate pus. Antibiotics alone cannot drain encapsulated infection. Post-drainage, proper wound care is maintained to monitor tract healing and ensure an underlying fistula is detected early if present.",
      howTreatedMr:
        "फोडामध्ये पू साचल्यामुळे फक्त गोळ्यांनी तो जात नाही; त्याचा वेळेवर निचरा (Drainage) करणे आवश्यक असते. यामुळे वेदना लगेच कमी होतात आणि जखम स्वच्छ ठेवून पुढील औषधे दिली जातात.",
      careAdvice: [
        "Do not squeeze or self-puncture any perianal swelling",
        "Complete all prescribed antiseptic washes and antibiotics",
        "Follow up promptly for wound dressings",
      ],
      careAdviceMr: [
        "गुदभागातील फोड स्वतः दाबण्याचा किंवा फोडण्याचा प्रयत्न करू नका",
        "दिलेली औषधे पूर्ण वेळ घ्या",
        "नियमित ड्रेसिंगसाठी डॉक्टरांकडे जा",
      ],
      clinicalNote:
        "Early evaluation of perianal swellings prevents spontaneous ruptures that can lead to complex fistulas.",
      clinicalNoteMr:
        "फोड जास्त दिवस तसाच राहिल्यास फुटून फिस्टुला तयार होऊ शकतो, म्हणून सुरुवातीलाच डॉक्टरकडे जावे.",
      faqs: [
        {
          q: "Can antibiotics cure an abscess without drainage?",
          qMr: "केवळ अँटिबायोटिक्सने फोड बरा होऊ शकतो का?",
          a: "No, antibiotics cannot penetrate a walled-off pus cavity adequately. Safe drainage is standard medical protocol.",
          aMr: "नाही, साचलेल्या पूचा निचरा केल्याशिवाय केवळ गोळ्यांनी आराम मिळत नाही.",
        },
      ],
      enabled: true,
    },
    {
      id: "pilonidal",
      slug: "pilonidal-sinus",
      title: "Pilonidal Sinus",
      titleMr: "पायलोनिडल सायनस (Pilonidal Sinus)",
      badge: "Ksharsutra / Excision",
      badgeMr: "नाडीव्रण / केसांची गाठ",
      shortDesc: "Specialized Ayurvedic Ksharsutra and surgical management for recurrent hair-follicle sinus tracts located at the upper crease of the buttocks.",
      shortDescMr: "माकडहाडाजवळ (buttock crease) केस अडकून पू व पाणी येणाऱ्या नाडीव्रणावर सुरक्षित उपचार.",
      oneLineDesc: "Tract eradication and thorough cleaning to prevent painful recurrence.",
      oneLineDescMr: "केसांच्या मुळांमुळे होणाऱ्या इन्फेक्शनवर मुळापासून उपचार.",
      tagline: "Focused tract resolution designed for young, active individuals.",
      taglineMr: "तरुण व बैठ्या काम करणाऱ्या व्यक्तींसाठी योग्य सल्ला व उपचार.",
      image: "/images/treatments/pilonidal-sinus.svg",
      symptoms: [
        "Swelling, tenderness, or pain at the top of the buttocks crease",
        "Intermittent discharge of blood, pus, or foul fluid through tiny pits",
        "Pain exacerbated by prolonged sitting or cycling",
        "Small hair tufts protruding from the skin opening",
      ],
      symptomsMr: [
        "माकडहाडाजवळ सूज, दुखणे किंवा फोड येणे",
        "छिद्रातून पू, पाणी किंवा रक्त येणे",
        "जास्त वेळ बसल्यावर किंवा बाईक चालवल्यावर वेदना वाढणे",
        "त्वचेच्या छिद्रामध्ये केस अडकलेले दिसणे",
      ],
      howTreated:
        "Treatment involves clearing all embedded hair, debriding the sinus wall, and placing Ksharsutra or performing clean excision so the cavity heals from the deepest plane outward.",
      howTreatedMr:
        "आतील अडकलेले केस व दूषित त्वचा काढून टाकली जाते. क्षारसूत्राच्या साहाय्याने हा मार्ग कापून स्वच्छ केला जातो जेणेकरून तो पुन्हा उद्भवत नाही.",
      careAdvice: [
        "Keep the lower back and natal cleft region hair-free by gentle shaving or depilation",
        "Avoid continuous sitting on hard surfaces for long stretches",
        "Maintain impeccable local hygiene and cleanliness",
      ],
      careAdviceMr: [
        "माकडहाडाच्या भागातील केस नियमितपणे स्वच्छ ठेवा",
        "एकाच जागी सलग जास्त वेळ कडक पृष्ठभागावर बसणे टाळा",
        "रोज स्वच्छ आंघोळ व कोरडेपणा राखा",
      ],
      clinicalNote:
        "Preventive hygiene after healing is critical to prevent new hairs from burrowing into the skin.",
      clinicalNoteMr:
        "उपचार पूर्ण झाल्यावरही स्वच्छता ठेवल्यास आजार पुन्हा होत नाही.",
      faqs: [
        {
          q: "Who is most prone to pilonidal sinus?",
          qMr: "पायलोनिडल सायनस कोणाला जास्त होतो?",
          a: "It is most common in young adults with dense body hair and those who sit for extended periods like drivers, students, and office workers.",
          aMr: "हा त्रास प्रामुख्याने तरुणांमध्ये, ज्यांचे केस दाट असतात किंवा ज्यांचे बसण्याचे काम जास्त असते (ड्रायव्हर्स, विद्यार्थी) अशांमध्ये जास्त आढळतो.",
        },
      ],
      enabled: true,
    },
    {
      id: "skin-tags",
      slug: "anal-skin-tags-polyps",
      title: "Anal Skin Tags & Polyps",
      titleMr: "स्किन टॅग्ज व पॉलिप्स (Skin Tags & Polyps)",
      badge: "Clinical Removal",
      badgeMr: "बारीक कोंब व गाठी",
      shortDesc: "Careful examination and gentle minor procedural removal of painless external skin folds, sentinel tags, or hypertrophied anal papillae.",
      shortDescMr: "गुदभागाजवळ आलेल्या अतिरिक्त त्वचेच्या घड्या (Skin tags) किंवा गाठींचे योग्य निदान व सुरक्षित निराकरण.",
      oneLineDesc: "Differentiating harmless skin tags from active piles with gentle treatment.",
      oneLineDescMr: "त्वचेचे कोंब आणि मुळव्याध यातील फरक ओळखून योग्य मार्गदर्शन.",
      tagline: "Restoring comfort and local hygiene with minimal downtime.",
      taglineMr: "गुदभागाची स्वच्छता व आराम राखण्यासाठी साधे व सोपे उपचार.",
      image: "/images/treatments/skin-tags.svg",
      symptoms: [
        "Painless excess skin flap or flesh fold outside the anus",
        "Difficulty cleaning thoroughly after bowel movements",
        "Mild irritation or skin chafing from underwear rubbing",
        "Accompanying sentinel tag near a past fissure site",
      ],
      symptomsMr: [
        "गुदभागाबाहेर आलेली वाढीव त्वचा किंवा चामखीळसारखा भाग",
        "शौचानंतर स्वच्छ करताना त्रास होणे किंवा अडथळा जाणवणे",
        "कपड्यांच्या घर्षणाने बारीक खाज किंवा जळजळ",
        "जुनाट फिशरच्या ठिकाणी तयार झालेला कोंब",
      ],
      howTreated:
        "Not all skin tags require intervention. When they interfere with hygiene or cause recurring irritation, minor excision or Ayurvedic Kshara application can be performed comfortably under local anesthesia.",
      howTreatedMr:
        "प्रत्येक स्किन टॅग काढण्याची गरज नसते. पण जर त्यामुळे स्वच्छता राखण्यात अडचण येत असेल किंवा सतत जळजळ होत असेल तर स्थानिक भूल देऊन तो सहज काढता येतो.",
      careAdvice: [
        "Gently pat the area dry after washing; avoid abrasive rubbing",
        "Wear soft cotton undergarments to minimize friction",
        "Consult the doctor if any sudden change in size or color occurs",
      ],
      careAdviceMr: [
        "धुतल्यानंतर हळुवारपणे कोरडे करा, घासू नका",
        "सैल व सुती अंतर्वस्त्रे वापरा",
        "कोणताही बदल दिसल्यास डॉक्टरांचा सल्ला घ्या",
      ],
      clinicalNote:
        "A proper clinical inspection confirms whether a tag is benign or related to an underlying fissure.",
      clinicalNoteMr:
        "डॉक्टरांच्या तपासणीने हे कोंब साधे आहेत की फिशरशी संबंधित आहेत हे स्पष्ट होते.",
      faqs: [
        {
          q: "Are anal skin tags dangerous?",
          qMr: "असे स्किन टॅग्ज धोकादायक असतात का?",
          a: "Most are completely benign skin folds, often left behind after a swollen hemorrhoid or fissure resolves. However, a doctor examination is always recommended to confirm diagnosis.",
          aMr: "बहुतांश स्किन टॅग्ज निरुपद्रवी असतात. तरीही अचूक खात्रीसाठी डॉक्टरांकडून तपासणी करून घेणे चांगले.",
        },
      ],
      enabled: true,
    },
    {
      id: "constipation",
      slug: "constipation-anorectal-pain",
      title: "Constipation & Pain Management",
      titleMr: "बद्धकोष्ठता व गुदशूल निवारण",
      badge: "Digestive & Preventive",
      badgeMr: "पचन सुधार व प्रतिबंधक",
      shortDesc: "Root-cause Ayurvedic assessment, bowel habit retraining, and individualized herbal-dietary plans to prevent and relieve chronic anorectal strain.",
      shortDescMr: "बद्धकोष्ठतेचे मूळ कारण ओळखून पचन सुधारणा, आहारातील बदल व आयुर्वेदिक औषधांच्या साहाय्याने सुरक्षित निवारण.",
      oneLineDesc: "Preventing anorectal disorders through healthy bowel regulation.",
      oneLineDescMr: "पोटाची साफ स्वच्छता आणि गुदभागातील त्रासापासून कायमचा आराम.",
      tagline: "Healthy digestion is the foundation of anorectal wellness.",
      taglineMr: "पचनक्रिया निरोगी तर मुळव्याध व फिशरपासून कायमचे संरक्षण.",
      image: "/images/treatments/constipation-care.svg",
      symptoms: [
        "Fewer than 3 bowel movements per week or hard, lumpy stools",
        "Excessive straining, sensation of incomplete evacuation",
        "Abdominal bloating, heaviness, or sluggish digestion",
        "Fear of passing motions due to anticipated anorectal pain",
      ],
      symptomsMr: [
        "आठवड्यातून ३ पेक्षा कमी वेळा शौचास होणे किंवा कडक खडे होणे",
        "शौचाच्या वेळी खूप जोर लावावा लागणे, पोट साफ न झाल्याची भावना",
        "पोटात गॅस, जडपणा किंवा भूक मंदावणे",
        "वेदनांच्या भीतीमुळे शौचास जाणे टाळणे",
      ],
      howTreated:
        "Therapy combines personalized dietary fiber restructuring, hydration schedules, and gentle Ayurvedic digestive aids (such as Triphala, Haritaki, or Isabgol formulations under medical guidance). Stool softening prevents the trauma that initiates piles and fissures.",
      howTreatedMr:
        "आहारात फायबरचे प्रमाण वाढवणे, योग्य प्रमाणात पाणी पिणे आणि गरजेनुसार त्रिफळा किंवा इसबगोलसारखी सुरक्षित आयुर्वेदिक औषधे डॉक्टरांच्या सल्ल्याने दिली जातात.",
      careAdvice: [
        "Eat fixed meals with adequate seasonal vegetables, salads, and water",
        "Engage in daily brisk walking to stimulate intestinal peristalsis",
        "Do not overuse over-the-counter chemical laxatives without supervision",
      ],
      careAdviceMr: [
        "जेवणाच्या वेळा नियमित ठेवा आणि आहारात फळे, पालेभाज्यांचा वापर करा",
        "पचन सुधारण्यासाठी रोज किमान २०-३० मिनिटे चाला",
        "डॉक्टरांच्या सल्ल्याशिवाय बाजारातील तीव्र रेचक गोळ्या सतत घेऊ नका",
      ],
      clinicalNote:
        "Chronic constipation is the primary trigger for fissures and piles; addressing it directly provides lasting relief.",
      clinicalNoteMr:
        "बद्धकोष्ठता हे मुळव्याध व फिशरचे मुख्य कारण असल्याने पोट साफ राहणे सर्वात महत्त्वाचे आहे.",
      faqs: [
        {
          q: "What dietary changes help immediately?",
          qMr: "बद्धकोष्ठतेवर त्वरित काय आहार बदल करावा?",
          a: "Gradually increase dietary fiber with oats, green leafy vegetables, soaked figs, and drink 2.5 to 3 liters of warm water daily.",
          aMr: "दररोज २.५ ते ३ लिटर पाणी, आहारात हिरव्या पालेभाज्या, फळे आणि भिजवलेले अंजीर किंवा मनुका खाल्ल्याने पोट साफ होण्यास मदत होते.",
        },
      ],
      enabled: true,
    },
  ],

  whenToSeeDoctor: {
    badge: "Clinical Awareness",
    badgeMr: "वैद्यकीय जनजागृती",
    title: "When Should You See a Doctor?",
    titleMr: "डॉक्टरांचा सल्ला कधी घ्यावा?",
    subtitle:
      "Anorectal symptoms are common and highly treatable. Do not let embarrassment delay your consultation.",
    subtitleMr:
      "गुदभागाचे आजार सामान्य असून वेळेवर उपचार केल्यास सहज बरे होतात. संकोच न बाळगता वेळीच तपासणी करा.",
    symptoms: [
      {
        id: "bleeding",
        title: "Rectal Bleeding",
        titleMr: "शौचाच्या वेळी रक्त येणे",
        description:
          "Any drops or streaks of blood during or after passing stool should be clinically evaluated.",
        descriptionMr:
          "शौचाच्या वेळी रक्त पडणे हे मुळव्याध किंवा फिशरचे लक्षण असू शकते. वेळीच डॉक्टरांना दाखवा.",
        icon: "droplet",
      },
      {
        id: "pain",
        title: "Pain or Burning Sensation",
        titleMr: "तीव्र वेदना किंवा जळजळ",
        description:
          "Sharp cutting pain, burning, or throbbing during or after bowel movements.",
        descriptionMr:
          "शौचाच्या वेळी किंवा नंतर होणाऱ्या वेदना व जळजळ दुर्लक्षित करू नका.",
        icon: "flame",
      },
      {
        id: "lump",
        title: "Lump or Swelling",
        titleMr: "कोंब, गाठ किंवा सूज",
        description:
          "A painful or painless protrusion around the anal verge that may slip out during motions.",
        descriptionMr:
          "गुदभागाजवळ आलेली गाठ, कोंब किंवा सूज ज्याने बसताना त्रास होतो.",
        icon: "circle-dot",
      },
      {
        id: "discharge",
        title: "Pus or Fluid Discharge",
        titleMr: "पू किंवा पाण्याचा स्त्राव",
        description:
          "Recurrent fluid or pus staining your garments, which may point to an underlying fistula tract.",
        descriptionMr:
          "गुदभागाजवळून सतत पू किंवा पाणी येणे हे फिस्टुलाचे लक्षण असू शकते.",
        icon: "shield-alert",
      },
      {
        id: "constipation",
        title: "Chronic Straining",
        titleMr: "तीव्र बद्धकोष्ठता व जोर लावणे",
        description:
          "Persistent difficulty passing stool, hard pellets, and straining causing tissue damage.",
        descriptionMr:
          "शौचास कडक होणे व पोट साफ न होणे यामुळे आजार वाढू शकतो.",
        icon: "activity",
      },
    ],
    reassuranceNote:
      "Early diagnosis enables simple, conservative medical and dietary management, minimizing the need for procedures.",
    reassuranceNoteMr:
      "सुरुवातीच्या टप्प्यात तपासणी झाल्यास शस्त्रक्रियेशिवाय साध्या औषधोपचाराने व पथ्याने आजार बरा होऊ शकतो.",
  },

  privacyAndComfort: {
    badge: "Patient-Centred Care",
    badgeMr: "रुग्णांची गोपनीयता व आदर",
    title: "Your Privacy & Personal Comfort",
    titleMr: "तुमची गोपनीयता व सुरक्षित वातावरण",
    subtitle:
      "We understand that anorectal concerns are personal. Our clinic provides a dignified, private, and respectful environment for every patient.",
    subtitleMr:
      "गुदभागाच्या समस्यांबद्दल बोलताना रुग्णाला संकोच वाटू नये यासाठी आमच्याकडे पूर्ण गोपनीयता व आदराचे वातावरण ठेवले जाते.",
    points: [
      {
        id: "confidential",
        title: "Private consultations",
        titleMr: "पूर्णपणे खाजगी व गोपनीय तपासणी",
        description:
          "One-on-one clinical evaluations in private consultation chambers with total discretion.",
        descriptionMr:
          "स्वतंत्र कक्षात सुरक्षित व गोपनीय वैद्यकीय तपासणी केली जाते.",
        icon: "lock",
      },
      {
        id: "female-doctor",
        title: "Comfortable for Women Patients",
        titleMr: "महिला रुग्णांसाठी विशेष सोय",
        description:
          "Female doctor (Dr. Kiran Kore) available to ensure female patients feel completely at ease and supported.",
        descriptionMr:
          "महिला रुग्णांसाठी महिला तज्ज्ञ डॉक्टर (डॉ. किरण कोरे) उपलब्ध असल्याने महिलांना संकोच वाटत नाही.",
        icon: "user-check",
      },
      {
        id: "elderly",
        title: "Gentle Care for Senior Citizens",
        titleMr: "ज्येष्ठ नागरिकांची विशेष काळजी",
        description:
          "Patient, respectful hearing and gentle examinations tailored for elderly individuals.",
        descriptionMr:
          "ज्येष्ठ रुग्णांच्या समस्या शांतपणे ऐकून त्यांना सहज व सौम्य पद्धतीने तपासले जाते.",
        icon: "heart-handshake",
      },
      {
        id: "cleanliness",
        title: "Hygienic & Sanitized Environment",
        titleMr: "स्वच्छ व निर्जंतुक क्लिनिक",
        description:
          "High standards of clinical sanitation, sterile procedure equipment, and comfortable examination facilities.",
        descriptionMr:
          "रुग्णालयात उच्च दर्जाची स्वच्छता, निर्जंतुकीकरण व आरामदायी सुविधा पुरवल्या जातात.",
        icon: "sparkles",
      },
    ],
  },

  faqs: [
    {
      q: "Is surgery always needed for piles?",
      qMr: "मुळव्याधीवर नेहमी शस्त्रक्रिया करावीच लागते का?",
      a: "No. A large number of patients improve with conservative medical treatment, dietary fiber adjustment, and Ayurvedic formulations when diagnosed early. Surgery or Ksharsutra is only recommended for advanced or non-responsive cases.",
      aMr: "नाही. बहुतांश रुग्णांना सुरुवातीच्या टप्प्यात औषधोपचार, योग्य आहार व जीवनशैलीतील बदलांनी पूर्ण आराम मिळतो. आजार जास्त वाढलेला असल्यास किंवा औषधांनी फरक न पडल्यासच पुढील प्रक्रिया सुचवली जाते.",
    },
    {
      q: "What is Ksharsutra therapy and is it safe?",
      qMr: "क्षारसूत्र चिकित्सा म्हणजे काय आणि ती सुरक्षित आहे का?",
      a: "Ksharsutra is a time-tested Ayurvedic parasurgical technique recognized globally for fistula and piles. It uses a specially prepared medicated herbal thread to cut and heal the tract gradually without damaging sphincter continence.",
      aMr: "क्षारसूत्र ही आयुर्वेदातील प्रमाणित व अत्यंत सुरक्षित उपचार पद्धती आहे. यात औषधी वनस्पतींनी युक्त धाग्याच्या साहाय्याने फिस्टुलाचा मार्ग हळूहळू कापला व भरून काढला जातो, ज्यामुळे शौचावरचे नियंत्रण सुरक्षित राहते.",
    },
    {
      q: "What should I eat to avoid constipation?",
      qMr: "बद्धकोष्ठता टाळण्यासाठी आहारात काय बदल करावेत?",
      a: "Drink at least 2.5 to 3 liters of warm water daily, consume whole grains, green leafy vegetables, papayas, and fiber-rich foods. Avoid excessive maida, red chilies, alcohol, and deeply fried food.",
      aMr: "दररोज २.५ ते ३ लिटर कोमट पाणी प्या. आहारात हिरव्या पालेभाज्या, फळे, दलिया व फायबरयुक्त अन्नाचा समावेश करा. अति तिखट, तेलकट आणि बेकरीचे पदार्थ टाळा.",
    },
    {
      q: "How long is the recovery after Ksharsutra treatment?",
      qMr: "क्षारसूत्र उपचारानंतर कामावर परतण्यास किती वेळ लागतो?",
      a: "Most patients resume routine light activities within 24 to 48 hours. The total duration depends on the length of the tract, with regular follow-up visits for thread adjustment.",
      aMr: "बहुतेक रुग्ण १ ते २ दिवसांत आपली हलकी दैनंदिन कामे सुरू करू शकतात. आजाराच्या खोलीनुसार काही आठवडे नियमित तपासणीसाठी यावे लागते.",
    },
    {
      q: "Are female doctors available for women patients?",
      qMr: "महिला रुग्णांसाठी महिला डॉक्टर उपलब्ध आहेत का?",
      a: "Yes. Dr. Kiran Anant Kore is available for specialized consultation, ensuring that female patients receive respectful, comfortable, and discreet medical care.",
      aMr: "होय, महिला रुग्णांच्या सोयीसाठी डॉ. किरण अनंत कोरे उपलब्ध आहेत, ज्यामुळे महिला संकोच न बाळगता तपासणी करून घेऊ शकतात.",
    },
  ],

  disclaimer: {
    en: "Medical Disclaimer: Information on this website is for educational awareness only and is not a substitute for professional medical advice, diagnosis, or clinical consultation. Treatment selection and outcomes depend on proper individual examination by the doctor.",
    mr: "वैद्यकीय सूचना: या संकेतस्थळावरील माहिती केवळ जनसामान्यांच्या जनजागृतीसाठी असून तो प्रत्यक्ष वैद्यकीय तपासणी, निदान किंवा उपचारांचा पर्याय नाही. प्रत्यक्ष तपासणीअंती डॉक्टर योग्य तो सल्ला देतात.",
  },
};
