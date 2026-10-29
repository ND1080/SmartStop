/**
 * ==============================================================================
 * SmartStop – Smart Bus Stop Infotainment Kiosk JavaScript
 * Interactive Public Passenger Information System (PIS) Prototype
 * Edition: Coimbatore City Transit (Gandhipuram Central Bus Stand)
 * Features:
 *   1. Real-time Digital Clock & Date (Live every second)
 *   2. Bilingual Translation Engine (English & Tamil)
 *   3. Live Bus Timings with Destination Search & Bay/Status Filters
 *   4. Interactive Route Finder with Visual Transit Line Stop Diagram
 *   5. Interactive Sample Fare Estimator with TN Free Travel Scheme
 *   6. Passenger Safety, Accessibility & Lost Property Information
 *   7. Kiosk Inactivity Reset & Accessibility Font Scaling
 *   8. Audio Announcement Simulation using Web Speech API
 *   9. Hardware Simulation: White/Silver Totem, NFC Reader & SOS Alarm
 * ==============================================================================
 */

// ==============================================================================
// 1. DATA MODELS & SIMULATED SAMPLES (COIMBATORE MULTI-BUS STAND DATASET)
// ==============================================================================

/**
 * Departure schedules organized by Coimbatore Bus Stands / Terminals.
 * Each bus stand features unique local routes, departure intervals, bays, and statuses.
 */
const BUS_STAND_SCHEDULES = {
  Gandhipuram: [
    {
      id: "b1",
      busNo: "70",
      destinationEn: "Marudhamalai Temple",
      destinationTa: "மருதமலை முருகன் கோவில்",
      viaEn: "Cross Cut Rd • Saibaba Colony • Vadavalli",
      viaTa: "கிராஸ் கட் ரோடு • சாய்பாபா காலனி • வடவள்ளி",
      etaMins: 2,
      depTime: "14:38",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Arriving Now"
    },
    {
      id: "b2",
      busNo: "111",
      destinationEn: "Pollachi New Bus Stand",
      destinationTa: "பொள்ளாச்சி புதிய பேருந்து நிலையம்",
      viaEn: "Town Hall • Ukkadam • Eachanari • Kinathukadavu",
      viaTa: "டவுன் ஹால் • உக்கடம் • ஈச்சனாரி • கிணத்துக்கடவு",
      etaMins: 5,
      depTime: "14:42",
      bay: "Bay 4",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "b3",
      busNo: "3",
      destinationEn: "Saravanampatti (CHIL SEZ)",
      destinationTa: "சரவணம்பட்டி (ஐடி காரிடார்)",
      viaEn: "GP Signal • Ganapathy • Prozone Mall • Sathy Rd",
      viaTa: "ஜிபி சிக்னல் • கணபதி • புரோசூன் மால் • சத்தி ரோடு",
      etaMins: 8,
      depTime: "14:45",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "b4",
      busNo: "1C",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Lakshmi Mills • Nava India • Peelamedu • Hope College",
      viaTa: "லட்சுமி மில்ஸ் • நவ இந்தியா • பீளமேடு • ஹோப் காலேஜ்",
      etaMins: 12,
      depTime: "14:50",
      bay: "Bay 3",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "On Time"
    },
    {
      id: "b5",
      busNo: "20A",
      destinationEn: "Perur Temple",
      destinationTa: "பேரூர் பட்டீஸ்வரர் கோவில்",
      viaEn: "Railway Station • Town Hall • Telungupalayam",
      viaTa: "ரயில் நிலையம் • டவுன் ஹால் • தெலுங்குபாளையம்",
      etaMins: 15,
      depTime: "14:55",
      bay: "Bay 2",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Delayed"
    },
    {
      id: "b6",
      busNo: "S15",
      destinationEn: "Sulur Air Force Base",
      destinationTa: "சூலூர் விமானப்படை தளம்",
      viaEn: "Singanallur • Ondipudur • Irugur Junction",
      viaTa: "சிங்காநல்லூர் • ஒண்டிப்புதூர் • இருகூர் சந்திப்பு",
      etaMins: 18,
      depTime: "15:00",
      bay: "Bay 5",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "b7",
      busNo: "45B",
      destinationEn: "Thudiyalur",
      destinationTa: "துடியலூர்",
      viaEn: "Kavundampalayam • GN Mills • Mettupalayam Rd",
      viaTa: "கவுண்டம்பாளையம் • ஜிஎன் மில்ஸ் • மேட்டுப்பாளையம் ரோடு",
      etaMins: 22,
      depTime: "15:05",
      bay: "Bay 6",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Boarding"
    },
    {
      id: "b8",
      busNo: "88",
      destinationEn: "Ondipudur Depot",
      destinationTa: "ஒண்டிப்புதூர் பணிமனை",
      viaEn: "Ramanathapuram • Singanallur • Trichy Road",
      viaTa: "ராமநாதபுரம் • சிங்காநல்லூர் • திருச்சி ரோடு",
      etaMins: 26,
      depTime: "15:10",
      bay: "Bay 1",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "b9",
      busNo: "10A",
      destinationEn: "Ukkadam Bus Stand",
      destinationTa: "உக்கடம் பேருந்து நிலையம்",
      viaEn: "Brookefields • Sukrawarpet • Town Hall",
      viaTa: "புரூக்ஃபீல்ட்ஸ் • சுக்கிரவார்பேட்டை • டவுன் ஹால்",
      etaMins: 30,
      depTime: "15:15",
      bay: "Bay 3",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "b10",
      busNo: "21",
      destinationEn: "Peelamedu TIDEL Park",
      destinationTa: "பீளமேடு டைடல் பார்க்",
      viaEn: "Women's Poly • PSG Tech • Avinashi Road",
      viaTa: "மகளிர் பாலிடெக்னிக் • பிஎஸ்ஜி டெக் • அவினாசி ரோடு",
      etaMins: 35,
      depTime: "15:20",
      bay: "Bay 4",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "On Time"
    },
    {
      id: "b11",
      busNo: "90A",
      destinationEn: "Madukkarai Market",
      destinationTa: "மதுக்கரை மார்க்கெட்",
      viaEn: "Ukkadam • Kuniamuthur • Sundarapuram",
      viaTa: "உக்கடம் • குனியமுத்தூர் • சுந்தராபுரம்",
      etaMins: 40,
      depTime: "15:25",
      bay: "Bay 1",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Delayed"
    },
    {
      id: "b12",
      busNo: "11",
      destinationEn: "Kovaipudur",
      destinationTa: "கோவைப்புதூர்",
      viaEn: "Town Hall • Ukkadam • Ashram School",
      viaTa: "டவுன் ஹால் • உக்கடம் • ஆசிரமம் பள்ளி",
      etaMins: 45,
      depTime: "15:30",
      bay: "Bay 5",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    }
  ],

  Ukkadam: [
    {
      id: "uk1",
      busNo: "111",
      destinationEn: "Pollachi New Bus Stand",
      destinationTa: "பொள்ளாச்சி புதிய பேருந்து நிலையம்",
      viaEn: "Eachanari • Kinathukadavu • Othakkalmandapam",
      viaTa: "ஈச்சனாரி • கிணத்துக்கடவு • ஒத்தக்கால்மண்டபம்",
      etaMins: 3,
      depTime: "14:40",
      bay: "Bay 4",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Arriving Now"
    },
    {
      id: "uk2",
      busNo: "10A",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Town Hall • Brookefields • Cross Cut Road",
      viaTa: "டவுன் ஹால் • புரூக்ஃபீல்ட்ஸ் • கிராஸ் கட் ரோடு",
      etaMins: 5,
      depTime: "14:42",
      bay: "Bay 2",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "uk3",
      busNo: "90A",
      destinationEn: "Madukkarai Market",
      destinationTa: "மதுக்கரை மார்க்கெட்",
      viaEn: "Kuniamuthur • Sundarapuram • ACC Nagar",
      viaTa: "குனியமுத்தூர் • சுந்தராபுரம் • ஏசிசி நகர்",
      etaMins: 8,
      depTime: "14:46",
      bay: "Bay 1",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "uk4",
      busNo: "11",
      destinationEn: "Kovaipudur",
      destinationTa: "கோவைப்புதூர்",
      viaEn: "Kovaipudur Pirivu • Ashram School",
      viaTa: "கோவைப்புதூர் பிரிவு • ஆசிரமம் பள்ளி",
      etaMins: 12,
      depTime: "14:50",
      bay: "Bay 3",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Boarding"
    },
    {
      id: "uk5",
      busNo: "33",
      destinationEn: "Eachanari Vinayagar Temple",
      destinationTa: "ஈச்சனாரி விநாயகர் கோவில்",
      viaEn: "SIDCO Industrial • Sundarapuram",
      viaTa: "சிட்கோ தொழிற்பேட்டை • சுந்தராபுரம்",
      etaMins: 16,
      depTime: "14:55",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "uk6",
      busNo: "20A",
      destinationEn: "Perur Pateeswarar Temple",
      destinationTa: "பேரூர் பட்டீஸ்வரர் கோவில்",
      viaEn: "Sukrawarpet • Telungupalayam",
      viaTa: "சுக்கிரவார்பேட்டை • தெலுங்குபாளையம்",
      etaMins: 20,
      depTime: "15:00",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Delayed"
    },
    {
      id: "uk7",
      busNo: "88B",
      destinationEn: "Singanallur Bus Stand",
      destinationTa: "சிங்காநல்லூர் பேருந்து நிலையம்",
      viaEn: "Valankulam • Sungam • Ramanathapuram",
      viaTa: "வாலாங்குளம் • சுங்கம் • ராமநாதபுரம்",
      etaMins: 25,
      depTime: "15:05",
      bay: "Bay 5",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "uk8",
      busNo: "1C-Exp",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Town Hall • Gandhipuram • Peelamedu",
      viaTa: "டவுன் ஹால் • காந்திபுரம் • பீளமேடு",
      etaMins: 32,
      depTime: "15:15",
      bay: "Bay 6",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "On Time"
    }
  ],

  Singanallur: [
    {
      id: "sg1",
      busNo: "S15",
      destinationEn: "Sulur Air Force Base",
      destinationTa: "சூலூர் விமானப்படை தளம்",
      viaEn: "Ondipudur • Irugur Junction • RVS College",
      viaTa: "ஒண்டிப்புதூர் • இருகூர் சந்திப்பு • ஆர்.வி.எஸ் கல்லூரி",
      etaMins: 3,
      depTime: "14:40",
      bay: "Bay 3",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Arriving Now"
    },
    {
      id: "sg2",
      busNo: "88",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Ramanathapuram • GKNM Hospital • Cross Cut",
      viaTa: "ராமநாதபுரம் • ஜி.கே.என்.எம் • கிராஸ் கட்",
      etaMins: 6,
      depTime: "14:43",
      bay: "Bay 1",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "sg3",
      busNo: "1C",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Hopes College • TIDEL Park Road • Sitra",
      viaTa: "ஹோப் காலேஜ் • டைடல் பார்க் ரோடு • சித்ரா",
      etaMins: 10,
      depTime: "14:48",
      bay: "Bay 2",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "On Time"
    },
    {
      id: "sg4",
      busNo: "4A",
      destinationEn: "Ukkadam Bus Stand",
      destinationTa: "உக்கடம் பேருந்து நிலையம்",
      viaEn: "Trichy Road • Alvernia • Sungam",
      viaTa: "திருச்சி ரோடு • அல்வர்னியா • சுங்கம்",
      etaMins: 14,
      depTime: "14:52",
      bay: "Bay 4",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Boarding"
    },
    {
      id: "sg5",
      busNo: "102",
      destinationEn: "Ondipudur Bus Depot",
      destinationTa: "ஒண்டிப்புதூர் பணிமனை",
      viaEn: "Trichy Rd • Kannampalayam Pirivu",
      viaTa: "திருச்சி ரோடு • கண்ணம்பாளையம் பிரிவு",
      etaMins: 19,
      depTime: "14:58",
      bay: "Bay 5",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "sg6",
      busNo: "30",
      destinationEn: "Saravanampatti (CHIL SEZ)",
      destinationTa: "சரவணம்பட்டி (ஐடி காரிடார்)",
      viaEn: "Hopes • Peelamedu • Ganapathy",
      viaTa: "ஹோப்ஸ் • பீளமேடு • கணபதி",
      etaMins: 26,
      depTime: "15:05",
      bay: "Bay 2",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "Delayed"
    }
  ],

  "Saibaba Colony": [
    {
      id: "sb1",
      busNo: "70",
      destinationEn: "Marudhamalai Temple",
      destinationTa: "மருதமலை முருகன் கோவில்",
      viaEn: "Vadavalli Junction • IOB Colony • Adivaram",
      viaTa: "வடவள்ளி சந்திப்பு • ஐஓபி காலனி • அடிவாரம்",
      etaMins: 2,
      depTime: "14:39",
      bay: "Bay 2",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Arriving Now"
    },
    {
      id: "sb2",
      busNo: "45B",
      destinationEn: "Thudiyalur Junction",
      destinationTa: "துடியலூர் சந்திப்பு",
      viaEn: "Kavundampalayam • GN Mills • MTP Road",
      viaTa: "கவுண்டம்பாளையம் • ஜிஎன் மில்ஸ் • மேட்டுப்பாளையம்",
      etaMins: 6,
      depTime: "14:43",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "sb3",
      busNo: "10",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Cross Cut Road • Power House • GP Signal",
      viaTa: "கிராஸ் கட் ரோடு • பவர் ஹவுஸ் • ஜிபி சிக்னல்",
      etaMins: 11,
      depTime: "14:48",
      bay: "Bay 3",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "sb4",
      busNo: "104",
      destinationEn: "Coimbatore Junction Station",
      destinationTa: "கோவை சந்திப்பு ரயில் நிலையம்",
      viaEn: "Brookefields • Collectorate • State Bank Rd",
      viaTa: "புரூக்ஃபீல்ட்ஸ் • ஆட்சியர் அலுவலகம் • எஸ்பிஐ ரோடு",
      etaMins: 17,
      depTime: "14:54",
      bay: "Bay 4",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    }
  ],

  "Coimbatore Junction": [
    {
      id: "cj1",
      busNo: "1C",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Gandhipuram • Nava India • Peelamedu • SITRA",
      viaTa: "காந்திபுரம் • நவ இந்தியா • பீளமேடு • சித்ரா",
      etaMins: 4,
      depTime: "14:41",
      bay: "Bay 1",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "Arriving Now"
    },
    {
      id: "cj2",
      busNo: "20A",
      destinationEn: "Perur Pateeswarar Temple",
      destinationTa: "பேரூர் பட்டீஸ்வரர் கோவில்",
      viaEn: "Town Hall • Sukrawarpet • Telungupalayam",
      viaTa: "டவுன் ஹால் • சுக்கிரவார்பேட்டை • தெலுங்குபாளையம்",
      etaMins: 8,
      depTime: "14:45",
      bay: "Bay 2",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "cj3",
      busNo: "10",
      destinationEn: "Gandhipuram Central Bus Stand",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Collectorate • VOC Park • Cross Cut Signal",
      viaTa: "ஆட்சியர் அலுவலகம் • விஓசி பார்க் • கிராஸ் கட்",
      etaMins: 11,
      depTime: "14:48",
      bay: "Bay 3",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Boarding"
    },
    {
      id: "cj4",
      busNo: "1",
      destinationEn: "Ukkadam Bus Stand",
      destinationTa: "உக்கடம் பேருந்து நிலையம்",
      viaEn: "Town Hall Mani கூண்டு • Periyakulam",
      viaTa: "டவுன் ஹால் மணிக்கூண்டு • பெரியகுளம்",
      etaMins: 15,
      depTime: "14:52",
      bay: "Bay 2",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "On Time"
    },
    {
      id: "cj5",
      busNo: "111-Exp",
      destinationEn: "Pollachi New Bus Stand",
      destinationTa: "பொள்ளாச்சி புதிய பேருந்து நிலையம்",
      viaEn: "Ukkadam • Eachanari • Kinathukadavu",
      viaTa: "உக்கடம் • ஈச்சனாரி • கிணத்துக்கடவு",
      etaMins: 22,
      depTime: "15:00",
      bay: "Bay 4",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Delayed"
    }
  ],

  Sulur: [
    {
      id: "sl1",
      busNo: "S15",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Irugur • Ondipudur • Singanallur • Ramanathapuram",
      viaTa: "இருகூர் • ஒண்டிப்புதூர் • சிங்காநல்லூர் • ராமநாதபுரம்",
      etaMins: 4,
      depTime: "14:41",
      bay: "Bay 1",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Arriving Now"
    },
    {
      id: "sl2",
      busNo: "102",
      destinationEn: "Coimbatore Junction Station",
      destinationTa: "கோவை சந்திப்பு ரயில் நிலையம்",
      viaEn: "Singanallur • Sungam • Collectorate",
      viaTa: "சிங்காநல்லூர் • சுங்கம் • ஆட்சியர் அலுவலகம்",
      etaMins: 12,
      depTime: "14:49",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "sl3",
      busNo: "30",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Trichy Road • Ondipudur • Hopes College",
      viaTa: "திருச்சி ரோடு • ஒண்டிப்புதூர் • ஹோப்ஸ்",
      etaMins: 18,
      depTime: "14:55",
      bay: "Bay 3",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "On Time"
    }
  ],

  Pollachi: [
    {
      id: "pl1",
      busNo: "111",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Kinathukadavu • Eachanari • Ukkadam • Town Hall",
      viaTa: "கிணத்துக்கடவு • ஈச்சனாரி • உக்கடம் • டவுன் ஹால்",
      etaMins: 3,
      depTime: "14:40",
      bay: "Bay 3",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "Arriving Now"
    },
    {
      id: "pl2",
      busNo: "111A",
      destinationEn: "Coimbatore Junction Station",
      destinationTa: "கோவை சந்திப்பு ரயில் நிலையம்",
      viaEn: "Othakkalmandapam • Ukkadam • Collectorate",
      viaTa: "ஒத்தக்கால்மண்டபம் • உக்கடம் • ஆட்சியர் அலுவலகம்",
      etaMins: 9,
      depTime: "14:46",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "pl3",
      busNo: "33",
      destinationEn: "Ukkadam Bus Stand",
      destinationTa: "உக்கடம் பேருந்து நிலையம்",
      viaEn: "Kinathukadavu • Eachanari Temple • Sundarapuram",
      viaTa: "கிணத்துக்கடவு • ஈச்சனாரி கோவில் • சுந்தராபுரம்",
      etaMins: 16,
      depTime: "14:53",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Boarding"
    }
  ],

  Marudhamalai: [
    {
      id: "mm1",
      busNo: "70",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "Adivaram • IOB Colony • Vadavalli • Saibaba Colony",
      viaTa: "அடிவாரம் • ஐஓபி காலனி • வடவள்ளி • சாய்பாபா காலனி",
      etaMins: 2,
      depTime: "14:39",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Arriving Now"
    },
    {
      id: "mm2",
      busNo: "70A",
      destinationEn: "Coimbatore Junction Railway Station",
      destinationTa: "கோவை சந்திப்பு ரயில் நிலையம்",
      viaEn: "Vadavalli • Lawley Road • Town Hall",
      viaTa: "வடவள்ளி • லாவ்லி ரோடு • டவுன் ஹால்",
      etaMins: 8,
      depTime: "14:45",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "mm3",
      busNo: "1C-Ext",
      destinationEn: "Coimbatore Airport (Sitra)",
      destinationTa: "கோயம்புத்தூர் விமான நிலையம்",
      viaEn: "Vadavalli • Gandhipuram • Peelamedu",
      viaTa: "வடவள்ளி • காந்திபுரம் • பீளமேடு",
      etaMins: 18,
      depTime: "14:55",
      bay: "Bay 3",
      serviceType: "volvo",
      serviceTypeNameEn: "AC Volvo",
      serviceTypeNameTa: "ஏசி வோல்வோ",
      status: "Delayed"
    }
  ],

  Thudiyalur: [
    {
      id: "th1",
      busNo: "45B",
      destinationEn: "Gandhipuram Central",
      destinationTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்",
      viaEn: "GN Mills • Kavundampalayam • Saibaba Colony",
      viaTa: "ஜிஎன் மில்ஸ் • கவுண்டம்பாளையம் • சாய்பாபா காலனி",
      etaMins: 4,
      depTime: "14:41",
      bay: "Bay 1",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Arriving Now"
    },
    {
      id: "th2",
      busNo: "104",
      destinationEn: "Coimbatore Junction Station",
      destinationTa: "கோவை சந்திப்பு ரயில் நிலையம்",
      viaEn: "Kavundampalayam • Brookefields • State Bank Road",
      viaTa: "கவுண்டம்பாளையம் • புரூக்ஃபீல்ட்ஸ் • எஸ்பிஐ ரோடு",
      etaMins: 11,
      depTime: "14:48",
      bay: "Bay 2",
      serviceType: "deluxe",
      serviceTypeNameEn: "Deluxe",
      serviceTypeNameTa: "டீலக்ஸ்",
      status: "On Time"
    },
    {
      id: "th3",
      busNo: "30A",
      destinationEn: "Perur Pateeswarar Temple",
      destinationTa: "பேரூர் பட்டீஸ்வரர் கோவில்",
      viaEn: "Saibaba Colony • Sukrawarpet • Telungupalayam",
      viaTa: "சாய்பாபா காலனி • சுக்கிரவார்பேட்டை • தெலுங்குபாளையம்",
      etaMins: 19,
      depTime: "14:56",
      bay: "Bay 3",
      serviceType: "ordinary",
      serviceTypeNameEn: "Ordinary (Pink)",
      serviceTypeNameTa: "சாதாரண (இளஞ்சிவப்பு)",
      status: "Boarding"
    }
  ]
};

// Active bus departure list (defaults to Gandhipuram)
let BUS_DATA = [...BUS_STAND_SCHEDULES["Gandhipuram"]];

/**
 * Pre-configured routes database connecting Gandhipuram Central to major Coimbatore destinations.
 * Includes duration, distance, frequency, intermediate stops, and sample fares.
 */
const ROUTES_DATABASE = [
  {
    origin: "Gandhipuram",
    destination: "Marudhamalai",
    busNumbers: ["70", "70A", "1C-Ext"],
    duration: "35 mins",
    distance: "14.5 km",
    frequency: "Every 5 mins",
    fareOrdinary: "₹10 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹45",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Cross Cut Road", nameTa: "கிராஸ் கட் ரோடு" },
      { nameEn: "Saibaba Colony", nameTa: "சாய்பாபா காலனி" },
      { nameEn: "Vadavalli Junction", nameTa: "வடவள்ளி சந்திப்பு" },
      { nameEn: "IOB Colony", nameTa: "ஐஓபி காலனி" },
      { nameEn: "Marudhamalai Adivaram", nameTa: "மருதமலை அடிவாரம்" },
      { nameEn: "Marudhamalai Temple", nameTa: "மருதமலை முருகன் கோவில்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Pollachi",
    busNumbers: ["111", "111A", "33"],
    duration: "55 mins",
    distance: "42.0 km",
    frequency: "Every 6 mins",
    fareOrdinary: "₹20 (Free for Women)",
    fareDeluxe: "₹45",
    fareVolvo: "₹90",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Town Hall", nameTa: "டவுன் ஹால்" },
      { nameEn: "Ukkadam Bus Stand", nameTa: "உக்கடம் பேருந்து நிலையம்" },
      { nameEn: "Eachanari Temple", nameTa: "ஈச்சனாரி கோவில்" },
      { nameEn: "Kinathukadavu", nameTa: "கிணத்துக்கடவு" },
      { nameEn: "Othakkalmandapam", nameTa: "ஒத்தக்கால்மண்டபம்" },
      { nameEn: "Pollachi New Bus Stand", nameTa: "பொள்ளாச்சி புதிய பேருந்து நிலையம்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Saravanampatti",
    busNumbers: ["3", "3A", "45"],
    duration: "25 mins",
    distance: "11.2 km",
    frequency: "Every 4 mins",
    fareOrdinary: "₹8 (Free for Women)",
    fareDeluxe: "₹18",
    fareVolvo: "₹35",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "GP Signal", nameTa: "ஜிபி சிக்னல்" },
      { nameEn: "Ganapathy Bus Stand", nameTa: "கணபதி பேருந்து நிறுத்தம்" },
      { nameEn: "Sivanandapuram", nameTa: "சிவானந்தபுரம்" },
      { nameEn: "Prozone Mall", nameTa: "புரோசூன் மால்" },
      { nameEn: "Saravanampatti (CHIL SEZ)", nameTa: "சரவணம்பட்டி ஐடி பார்க்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Airport",
    busNumbers: ["1C", "AC-1C", "20"],
    duration: "30 mins",
    distance: "11.8 km",
    frequency: "Every 8 mins",
    fareOrdinary: "₹9 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹40",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Lakshmi Mills", nameTa: "லட்சுமி மில்ஸ்" },
      { nameEn: "Nava India", nameTa: "நவ இந்தியா" },
      { nameEn: "Peelamedu", nameTa: "பீளமேடு" },
      { nameEn: "PSG Tech", nameTa: "பிஎஸ்ஜி தொழில்நுட்பக் கல்லூரி" },
      { nameEn: "Hope College", nameTa: "ஹோப் காலேஜ்" },
      { nameEn: "Coimbatore Airport (Sitra)", nameTa: "கோயம்புத்தூர் விமான நிலையம்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Perur",
    busNumbers: ["20A", "20C"],
    duration: "30 mins",
    distance: "10.5 km",
    frequency: "Every 6 mins",
    fareOrdinary: "₹8 (Free for Women)",
    fareDeluxe: "₹18",
    fareVolvo: "₹35",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Coimbatore Rly Station", nameTa: "ரயில் நிலையம்" },
      { nameEn: "Town Hall", nameTa: "டவுன் ஹால்" },
      { nameEn: "Sukrawarpet", nameTa: "சுக்கிரவார்பேட்டை" },
      { nameEn: "Telungupalayam", nameTa: "தெலுங்குபாளையம்" },
      { nameEn: "Perur Pateeswarar Temple", nameTa: "பேரூர் பட்டீஸ்வரர் கோவில்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Sulur",
    busNumbers: ["S15", "102", "30"],
    duration: "45 mins",
    distance: "19.5 km",
    frequency: "Every 8 mins",
    fareOrdinary: "₹12 (Free for Women)",
    fareDeluxe: "₹26",
    fareVolvo: "₹55",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Ramanathapuram", nameTa: "ராமநாதபுரம்" },
      { nameEn: "Singanallur", nameTa: "சிங்காநல்லூர்" },
      { nameEn: "Ondipudur", nameTa: "ஒண்டிப்புதூர்" },
      { nameEn: "Irugur Junction", nameTa: "இருகூர் சந்திப்பு" },
      { nameEn: "Sulur Air Force Base", nameTa: "சூலூர் விமானப்படை தளம்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Ukkadam",
    busNumbers: ["10A", "1B", "111"],
    duration: "15 mins",
    distance: "4.8 km",
    frequency: "Every 3 mins",
    fareOrdinary: "₹5 (Free for Women)",
    fareDeluxe: "₹11",
    fareVolvo: "₹20",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Cross Cut Signal", nameTa: "கிராஸ் கட் சிக்னல்" },
      { nameEn: "Brookefields Mall", nameTa: "புரூக்ஃபீல்ட்ஸ் மால்" },
      { nameEn: "Town Hall Mani கூண்டு", nameTa: "டவுன் ஹால் மணிக்கூண்டு" },
      { nameEn: "Ukkadam Bus Stand", nameTa: "உக்கடம் பேருந்து நிலையம்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Singanallur",
    busNumbers: ["88", "S15", "4A"],
    duration: "25 mins",
    distance: "9.2 km",
    frequency: "Every 5 mins",
    fareOrdinary: "₹8 (Free for Women)",
    fareDeluxe: "₹18",
    fareVolvo: "₹35",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "GKNM Hospital", nameTa: "ஜி.கே.என்.எம் மருத்துவமனை" },
      { nameEn: "Ramanathapuram Signal", nameTa: "ராமநாதபுரம் சிக்னல்" },
      { nameEn: "Alvernia School", nameTa: "அல்வர்னியா பள்ளி" },
      { nameEn: "Singanallur Bus Stand", nameTa: "சிங்காநல்லூர் பேருந்து நிலையம்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Thudiyalur",
    busNumbers: ["45B", "104", "30A"],
    duration: "30 mins",
    distance: "12.0 km",
    frequency: "Every 6 mins",
    fareOrdinary: "₹9 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹40",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Kavundampalayam", nameTa: "கவுண்டம்பாளையம்" },
      { nameEn: "GN Mills", nameTa: "ஜிஎன் மில்ஸ்" },
      { nameEn: "Vellakinar Pirivu", nameTa: "வெள்ளக்கிணர் பிரிவு" },
      { nameEn: "Thudiyalur Junction", nameTa: "துடியலூர் சந்திப்பு", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Peelamedu",
    busNumbers: ["21", "1C", "10"],
    duration: "22 mins",
    distance: "8.5 km",
    frequency: "Every 5 mins",
    fareOrdinary: "₹7 (Free for Women)",
    fareDeluxe: "₹16",
    fareVolvo: "₹30",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Lakshmi Mills", nameTa: "லட்சுமி மில்ஸ்" },
      { nameEn: "Nava India", nameTa: "நவ இந்தியா" },
      { nameEn: "Women's Polytechnic", nameTa: "மகளிர் பாலிடெக்னிக்" },
      { nameEn: "Peelamedu (PSG / TIDEL)", nameTa: "பீளமேடு டைடல் பார்க்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Madukkarai",
    busNumbers: ["90A", "90C"],
    duration: "40 mins",
    distance: "16.5 km",
    frequency: "Every 10 mins",
    fareOrdinary: "₹11 (Free for Women)",
    fareDeluxe: "₹24",
    fareVolvo: "₹50",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Ukkadam", nameTa: "உக்கடம்" },
      { nameEn: "Kuniamuthur", nameTa: "குனியமுத்தூர்" },
      { nameEn: "Sundarapuram", nameTa: "சுந்தராபுரம்" },
      { nameEn: "Madukkarai Market", nameTa: "மதுக்கரை மார்க்கெட்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Kovaipudur",
    busNumbers: ["11", "11B"],
    duration: "35 mins",
    distance: "13.5 km",
    frequency: "Every 10 mins",
    fareOrdinary: "₹10 (Free for Women)",
    fareDeluxe: "₹22",
    fareVolvo: "₹45",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Town Hall", nameTa: "டவுன் ஹால்" },
      { nameEn: "Ukkadam", nameTa: "உக்கடம்" },
      { nameEn: "Kovaipudur Pirivu", nameTa: "கோவைப்புதூர் பிரிவு" },
      { nameEn: "Ashram School", nameTa: "ஆசிரமம் பள்ளி" },
      { nameEn: "Kovaipudur", nameTa: "கோவைப்புதூர்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Eachanari",
    busNumbers: ["111", "33", "90A"],
    duration: "30 mins",
    distance: "12.5 km",
    frequency: "Every 7 mins",
    fareOrdinary: "₹9 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹40",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Ukkadam", nameTa: "உக்கடம்" },
      { nameEn: "Sundarapuram", nameTa: "சுந்தராபுரம்" },
      { nameEn: "Eachanari Vinayagar Temple", nameTa: "ஈச்சனாரி விநாயகர் கோவில்", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Ondipudur",
    busNumbers: ["88", "S15"],
    duration: "30 mins",
    distance: "11.5 km",
    frequency: "Every 6 mins",
    fareOrdinary: "₹9 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹40",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "Ramanathapuram", nameTa: "ராமநாதபுரம்" },
      { nameEn: "Singanallur", nameTa: "சிங்காநல்லூர்" },
      { nameEn: "Ondipudur Bus Depot", nameTa: "ஒண்டிப்புதூர் பணிமனை", isDest: true }
    ]
  },
  {
    origin: "Gandhipuram",
    destination: "Coimbatore Junction",
    busNumbers: ["20A", "10", "1"],
    duration: "12 mins",
    distance: "3.2 km",
    frequency: "Every 3 mins",
    fareOrdinary: "₹5 (Free for Women)",
    fareDeluxe: "₹10",
    fareVolvo: "₹20",
    stops: [
      { nameEn: "Gandhipuram Central", nameTa: "காந்திபுரம் மத்திய நிலையம்", isOrigin: true },
      { nameEn: "VOC Park", nameTa: "விஓசி பார்க்" },
      { nameEn: "Collectorate", nameTa: "மாவட்ட ஆட்சியர் அலுவலகம்" },
      { nameEn: "Coimbatore Junction Station", nameTa: "கோவை சந்திப்பு ரயில் நிலையம்", isDest: true }
    ]
  }
];

// ==============================================================================
// 2. BILINGUAL DICTIONARY (COIMBATORE EDITION - ENGLISH & TAMIL)
// ==============================================================================

const TRANSLATIONS = {
  en: {
    // Header & Brand
    header_kiosk_label: "INFOTAINMENT KIOSK",
    header_stop_name: "Gandhipuram Central Bus Stand",
    header_bays: "Bays 1 – 6 • Town Bus Terminal",
    header_demo_tag: "DEMO DATA",
    header_weather_city: "Coimbatore",
    btn_reset: "Reset",

    // Announcement Ticker
    announcement_label: "ANNOUNCEMENT",
    ticker_text: "📢 Notice: Zero-Ticket Bus Fare is active for Women & Transgender passengers across all TNSTC Ordinary white-and-pink city buses in Coimbatore. • Bay 1 & Bay 4 feature low-floor ramp boarding for wheelchair access. • Avinashi Road Elevated Corridor work: Airport Route 1C operates with minor 8m diversion.",

    // Navigation
    nav_home: "Home",
    nav_timings: "Bus Timings",
    nav_routes: "Route Finder",
    nav_fares: "Fares",
    nav_info: "Travel Info",
    btn_home: "Home",
    btn_refresh: "Refresh",
    select_bus_stand_label: "Select Terminal / Bus Stand:",
    btn_search_bus_timings: "Search Departures",
    showing_timings_for: "Showing Departures for:",

    // Home Screen
    home_kiosk_system: "Smart City Transit Portal",
    home_title: "Welcome to SmartStop",
    home_subtitle: "Interactive touchscreen passenger information kiosk for Gandhipuram Central Bus Stand, Coimbatore. Touch any service card below to begin.",
    home_stat_bays: "Active Bays",
    home_stat_routes: "Daily Routes",
    home_stat_ontime: "On-Time Index",
    home_next_departures: "Next Departures",
    home_view_all: "Full Board →",
    home_quick_search_label: "Popular Destinations:",

    // Feature Cards on Home
    card_timings_title: "Bus Timings",
    card_timings_desc: "Live departure countdowns, platform bays, bus types, and service statuses across Coimbatore.",
    card_timings_btn: "View Timings",

    card_routes_title: "Route Finder",
    card_routes_desc: "Search direct buses from Gandhipuram to Marudhamalai, Pollachi, Saravanampatti IT Corridor, and Airport.",
    card_routes_btn: "Find Routes",

    card_fares_title: "Fares & Passes",
    card_fares_desc: "Sample fares for TNSTC Ordinary, Deluxe, and AC Volvo buses. Free travel guidelines for women.",
    card_fares_btn: "Calculate Fares",

    card_info_title: "Travel Information",
    card_info_desc: "Safety guidelines, wheelchair accessibility, lost & found booth at Gandhipuram, and emergency numbers.",
    card_info_btn: "Read Guidelines",

    // Bus Timings View
    timings_title: "Live Bus Timings",
    timings_sub: "Simulated departure radar for Gandhipuram Central Bus Stand, Coimbatore • Scheduled and expected times",
    demo_timing_note: "Simulated Timings • Auto-refreshing in ",
    filter_bay_label: "Platform Bay:",
    filter_status_label: "Service Status:",
    filter_all: "All",
    status_arriving: "Arriving Now",
    status_ontime: "On Time",
    status_delayed: "Delayed",
    status_boarding: "Boarding",
    btn_announce_bus: "🔊 Announce Next Bus",
    th_bus_no: "Bus No",
    th_destination: "Destination & Route",
    th_eta: "Expected In",
    th_departure: "Departure",
    th_platform: "Platform",
    th_type: "Bus Service",
    th_status: "Status",
    empty_timings_title: "No Buses Found",
    empty_timings_desc: "No active buses match your search criteria. Try clearing the search query or selecting 'All Bays'.",
    btn_reset_filters: "Reset Filters",

    // Route Finder View
    routes_title: "Interactive Route Finder",
    routes_sub: "Select your starting hub and destination to view direct buses, intermediate stops, and journey duration across Coimbatore",
    demo_route_note: "Sample TNSTC Coimbatore Routes Data",
    label_origin: "Starting Point:",
    label_dest: "Destination:",
    select_destination_placeholder: "-- Choose a Destination --",
    btn_search_route: "Find Buses",
    popular_routes_label: "Quick Pick:",
    route_prompt_title: "Select your destination above",
    route_prompt_desc: "Touch any destination from the dropdown or quick pick pills to view matching bus numbers, journey time, and complete intermediate stops diagram.",
    no_route_title: "No Direct Route Found",
    no_route_desc: "There is no direct bus operating between these two selected points in our demo schedule. We recommend taking a connecting bus via Gandhipuram or Ukkadam.",
    btn_try_different_route: "Choose Another Destination",
    route_lead_buses: "Direct Bus Services:",
    route_intermediate_stops: "Intermediate Route Stations Diagram",
    metric_duration: "Duration",
    metric_distance: "Distance",
    metric_frequency: "Frequency",
    fare_est_label: "Sample Fare Estimate:",

    // Fare View
    fares_title: "Fare Guide & Calculator",
    fares_sub: "Estimated passenger ticket fares across Ordinary, Deluxe, and Air-Conditioned Volvo buses in Coimbatore",
    demo_fares_disclaimer: "⚠️ Demo Data Only • Not Official Tickets",
    pink_bus_title: "Zero-Ticket Fare for Women & Transgender Passengers",
    pink_bus_desc: "Under the Government of Tamil Nadu's welfare scheme, travel is completely free in all TNSTC Ordinary white-and-pink liveried city buses across Coimbatore. No ticket charge applies.",
    calc_box_title: "Sample Fare Estimator",
    calc_box_desc: "Calculate approximate sample ticket cost based on bus type and distance stage.",
    calc_service_type: "Select Bus Service Type:",
    opt_ordinary: "Ordinary",
    opt_ordinary_sub: "White & Pink",
    opt_deluxe: "Deluxe",
    opt_deluxe_sub: "Comfort Green",
    opt_volvo: "AC Volvo",
    opt_volvo_sub: "Low-Floor AC",
    calc_distance_stage: "Journey Distance:",
    calc_passenger_type: "Passenger Category:",
    pass_adult: "General Adult Passenger",
    pass_women: "Women / Transgender Passenger (Ordinary Free Scheme)",
    pass_senior: "Senior Citizen (60+ Years)",
    pass_child: "Child (Age 5 - 12 Years, 50% Fare)",
    pass_student: "Student with Valid Institution Pass (Free)",
    calc_estimated_fare: "Estimated Sample Fare:",
    calc_footer_note: "* Demonstration fare only. Real fares depend on stage stops published by TNSTC Coimbatore ticketing regulations.",
    matrix_title: "Standard Sample Fare Chart",
    matrix_desc: "Reference rate chart for typical stages departing from Gandhipuram Central.",
    col_stage: "Stage",
    col_distance: "Distance",
    col_ordinary: "Ordinary",
    col_deluxe: "Deluxe",
    col_volvo: "AC Volvo",
    pass_box_title: "Daily & Monthly Travel Passes",
    pass_box_desc: "Unlimited One-Day Travel Pass: ₹50.00 (Ordinary & Deluxe buses). Available at the station counter or via TNSTC mobile app.",

    // Travel Info View
    info_title: "Travel Information & Passenger Assistance",
    info_sub: "Station amenities, safety protocols, wheelchair access, lost property, and emergency contacts in Coimbatore",
    demo_assistance_note: "Coimbatore Smart City Transport Support",
    subtab_safety: "Safety Instructions",
    subtab_accessibility: "Accessibility",
    subtab_lostfound: "Lost & Found",
    subtab_announcements: "Notices & Disruptions",

    // Safety Subpane
    safety_rule1_title: "Platform Yellow Line Safety",
    safety_rule1_desc: "Always stand behind the tactile yellow safety border until the arriving bus comes to a complete halt and doors are opened by the conductor.",
    safety_rule2_title: "Boarding & Alighting Queue",
    safety_rule2_desc: "Maintain orderly queues at designated bay markers. Let arriving passengers alight completely before boarding.",
    safety_cctv_title: "24/7 CCTV Surveillance",
    safety_cctv_desc: "Gandhipuram bus terminal is equipped with 20 high-definition security cameras monitored round the clock by Coimbatore City Police.",
    emergency_contacts_title: "Emergency Contact Helplines",
    contact_police: "Police & Medical SOS:",
    contact_women: "Women Safety Helpline:",
    contact_mtc: "TNSTC Grievance / Control:",
    contact_kiosk: "Station Master Gandhipuram:",

    // Accessibility Subpane
    a11y_ramps_title: "Wheelchair Ramps & Low-Floor Bays",
    a11y_ramps_desc: "Bay 1 and Bay 4 feature zero-step boarding ramps designed specifically for electric and manual wheelchairs connecting directly to low-floor AC Volvo and deluxe buses.",
    a11y_tactile_title: "Tactile Paving for Visually Impaired",
    a11y_tactile_desc: "Continuous bright yellow guiding tiles lead from the main Cross Cut Road pedestrian entrance directly to all 6 bus boarding platforms.",
    a11y_seating_title: "Reserved Priority Seating",
    a11y_seating_desc: "The front 8 seats in every public bus are legally reserved for senior citizens, expectant mothers, and passengers with disabilities. Co-passengers must kindly vacate upon request.",
    a11y_audio_title: "Bilingual Audio Assistance",
    a11y_audio_desc: "This kiosk includes a high-contrast mode, adjustable font sizing (A/A+), and an automatic audio announcement button to read out arriving bus details aloud.",

    // Lost & Found Subpane
    lost_booth_title: "Station Property Office",
    lost_booth_desc: "The Gandhipuram Lost & Found Counter is situated at Bay 2, Ground Floor (next to the Station Controller's cabin). Open 24 hours daily.",
    lost_claim_title: "How to Claim Misplaced Belongings",
    lost_claim_desc: "Present a valid government photo ID (Aadhaar, Voter ID, or Driving License) along with details of the bus number, approximate travel time, and item description.",
    lost_helpline_title: "Lost Property Helpline",
    lost_helpline_desc: "Call our designated property assistance desk at +91 422 252 3012 or email lostfound.cbe@smartstop.demo.tn.gov.in.",
    lost_retention_title: "Safe Custody Retention",
    lost_retention_desc: "Valuable documents, bags, and electronic items are securely cataloged and held for 30 days before being transferred to the Government District Treasury.",

    // Announcements Subpane
    alert_diversion_tag: "ROUTE DIVERSION",
    alert_21g_title: "Avinashi Road Elevated Corridor Diversion",
    alert_21g_desc: "Due to flyover expansion work near Lakshmi Mills & Nava India, Airport Route 1C operates with a minor 8-minute diversion via Kamarajar Road.",
    alert_night_tag: "NIGHT SERVICE",
    alert_night_title: "All-Night Feeder Buses (22:30 to 05:00)",
    alert_night_desc: "Hourly midnight feeder services operate connecting Gandhipuram to Coimbatore Junction Railway Station, Singanallur, and Ukkadam throughout the night.",
    alert_metro_tag: "TEMPLE SPECIAL",
    alert_metro_title: "High-Frequency Marudhamalai & Perur Specials",
    alert_metro_desc: "Direct express non-stop services to Marudhamalai Murugan Temple (Route 70) and Perur Pateeswarar Temple (Route 20A) depart every 8 minutes from Bay 1 & Bay 3.",

    // Idle Modal & Footer
    idle_title: "Are you still using SmartStop?",
    idle_desc: "This kiosk screen will automatically reset to the Welcome Home screen in 15 seconds to maintain passenger privacy.",
    idle_btn_continue: "Yes, Continue Browsing",
    idle_btn_reset: "Reset Now",
    footer_agency: "Tamil Nadu State Transport Corporation (Coimbatore) Ltd.",
    footer_demo_note: "Simulated Demo Interface for HCI Project",
    footer_touch_hint: "Touch any button on screen to operate",

    // Totem Hardware Simulation
    mode_bar_title: "KIOSK HARDWARE SIMULATOR",
    mode_btn_totem: "Physical Kiosk Totem",
    mode_btn_fullscreen: "Fullscreen Touch Display",
    totem_agency: "TNSTC COIMBATORE DIVISION",
    totem_stop: "SMART TRANSIT HUB • GANDHIPURAM CENTRAL",
    totem_nfc_title: "TAP SMART CARD / QR",
    totem_nfc_sub: "TNSTC Smart Pass • Singara / NCMC Card",
    totem_touch_prompt: "TOUCH TO TAP",
    totem_braille_title: "BRAILLE ACCESSIBILITY",
    totem_braille_sub: "Audio button on screen • Low-floor Bay 1",
    totem_sos_title: "EMERGENCY SOS",
    totem_sos_sub: "Police Distress Intercom",
    sos_modal_title: "EMERGENCY SOS ACTIVATED",
    sos_modal_desc: "Direct two-way audio intercom is now OPEN to Coimbatore City Police Control (Dial 112) and Gandhipuram Central Bus Station Master. Kiosk CCTV video stream flagged for priority dispatch.",
    sos_modal_dismiss: "Dismiss / Stand Down Alarm",
    nfc_detected_title: "TNSTC Coimbatore Smart Travel Card Detected!",
    nfc_detected_sub: "Card #CBE-7729-1044 • Current Balance: ₹160.00 • Tap again to quick-pay ordinary bus fare"
  },

  ta: {
    // Header & Brand
    header_kiosk_label: "பயணிகள் தகவல் தொடுதிரை மையம்",
    header_stop_name: "காந்திபுரம் மத்திய பேருந்து நிலையம் (கோவை)",
    header_bays: "நடைமேடை 1 – 6 • நகரப் பேருந்து முனையம்",
    header_demo_tag: "மாதிரித் தரவு",
    header_weather_city: "கோயம்புத்தூர்",
    btn_reset: "மீட்டமைக்க",

    // Announcement Ticker
    announcement_label: "அறிவிப்பு",
    ticker_text: "📢 அறிவிப்பு: தமிழக அரசின் விடியல் பயணத் திட்டம் மூலம் மகளிர் மற்றும் திருநங்கையருக்கு கோவையின் அனைத்து வெள்ளை-இளஞ்சிவப்பு சாதாரண பேருந்துகளிலும் இலவசப் பயணம் வழங்கப்படுகிறது. • மாற்றுத்திறனாளிகளுக்கான சக்கர நாற்காலி சாய்தள வசதி நடைமேடை 1 & 4 இல் உள்ளது. • அவினாசி ரோடு மேம்பாலப் பணி: விமான நிலைய வழித்தடம் 1C காமராஜர் சாலை வழியாக 8 நிமிடம் மாற்றுப்பாதையில் இயங்குகிறது.",

    // Navigation
    nav_home: "முகப்பு",
    nav_timings: "பேருந்து நேரங்கள்",
    nav_routes: "வழித்தடத் தேடல்",
    nav_fares: "கட்டண விவரம்",
    nav_info: "பயணத் தகவல்",
    btn_home: "முகப்பு",
    btn_refresh: "புதுப்பி",
    select_bus_stand_label: "பேருந்து நிலையத்தைத் தேர்ந்தெடுக்கவும்:",
    btn_search_bus_timings: "புறப்பாடுகளைத் தேடு",
    showing_timings_for: "நேரங்கள் காண்பிக்கப்படுவது:",

    // Home Screen
    home_kiosk_system: "ஸ்மார்ட் சிட்டி போக்குவரத்து சேவை",
    home_title: "ஸ்மார்ட்ஸ்டாப்பிற்கு வரவேற்கிறோம்",
    home_subtitle: "கோவை காந்திபுரம் மத்திய பேருந்து நிறுத்தத்திற்கான தொடுதிரை பயணிகள் தகவல் மையம். தொடங்க கீழே உள்ள சேவைகளைத் தொடவும்.",
    home_stat_bays: "நடைமேடைகள்",
    home_stat_routes: "தினசரி வழிகள்",
    home_stat_ontime: "நேரக் கட்டுப்பாடு",
    home_next_departures: "அடுத்த புறப்பாடுகள்",
    home_view_all: "முழு அட்டவணை →",
    home_quick_search_label: "பிரபல இடங்கள்:",

    // Feature Cards on Home
    card_timings_title: "பேருந்து நேரங்கள்",
    card_timings_desc: "நேரடி பேருந்து வருகை, நடைமேடை எண்கள், பேருந்து வகை மற்றும் தற்போதைய சேவை நிலை.",
    card_timings_btn: "நேரங்களைக் காண்க",

    card_routes_title: "வழித்தடத் தேடல்",
    card_routes_desc: "காந்திபுரத்திலிருந்து மருதமலை, பொள்ளாச்சி, சரவணம்பட்டி ஐடி பார்க், விமான நிலையத்திற்கான நேரடி வழிகள்.",
    card_routes_btn: "வழித்தடங்களைத் தேடு",

    card_fares_title: "கட்டண விவரம்",
    card_fares_desc: "சாதாரண, டீலக்ஸ் மற்றும் ஏசி வோல்வோ பேருந்துகளுக்கான மாதிரி கட்டணக் கணக்கீடு. மகளிர் இலவசப் பயணம்.",
    card_fares_btn: "கட்டணம் கணக்கிடு",

    card_info_title: "பயணத் தகவல்",
    card_info_desc: "பாதுகாப்பு விதிகள், மாற்றுத்திறனாளி வசதிகள், தவறவிட்ட பொருட்கள் மையம் மற்றும் உதவி எண்கள்.",
    card_info_btn: "தகவல்களைப் படி",

    // Bus Timings View
    timings_title: "நேரடி பேருந்து நேரங்கள்",
    timings_sub: "காந்திபுரம் மத்திய பேருந்து நிலையத்தின் நேரடி மாதிரி அட்டவணை • புறப்பாடு மற்றும் வருகை நேரம்",
    demo_timing_note: "மாதிரி நேரங்கள் • தானாகப் புதுப்பிக்கும் காலம்: ",
    filter_bay_label: "நடைமேடை எண்:",
    filter_status_label: "சேவை நிலை:",
    filter_all: "அனைத்தும்",
    status_arriving: "இப்போது வருகிறது",
    status_ontime: "சரியான நேரம்",
    status_delayed: "தாமதம்",
    status_boarding: "ஏறலாம்",
    btn_announce_bus: "🔊 அடுத்த பேருந்து ஒலி அறிவிப்பு",
    th_bus_no: "பேருந்து எண்",
    th_destination: "சேருமிடம் & வழித்தடம்",
    th_eta: "எதிர்பார்க்கப்படும் நேரம்",
    th_departure: "புறப்பாடு",
    th_platform: "நடைமேடை",
    th_type: "பேருந்து வகை",
    th_status: "நிலை",
    empty_timings_title: "பேருந்துகள் எதுவும் கிடைக்கவில்லை",
    empty_timings_desc: "உங்கள் தேடலுக்கு ஏற்ற பேருந்துகள் எதுவும் இல்லை. தேடல் சொல்லை அழிக்கவும் அல்லது 'அனைத்தும்' தேர்ந்தெடுக்கவும்.",
    btn_reset_filters: "வடிப்பான்களை மீட்டமைக்க",

    // Route Finder View
    routes_title: "வழித்தடத் தேடல்",
    routes_sub: "நேரடி பேருந்துகள், இடைப்பட்ட நிறுத்தங்கள் மற்றும் பயண நேரத்தைக் காண சேருமிடத்தைத் தேர்ந்தெடுக்கவும்",
    demo_route_note: "தமிழ்நாடு அரசுப் போக்குவரத்துக் கழகம் (கோவை) மாதிரித் தரவு",
    label_origin: "புறப்படும் இடம்:",
    label_dest: "சேருமிடம்:",
    select_destination_placeholder: "-- சேருமிடத்தைத் தேர்ந்தெடுக்கவும் --",
    btn_search_route: "பேருந்துகளைக் காண்க",
    popular_routes_label: "விரைவு தேர்வு:",
    route_prompt_title: "மேலே உள்ள சேருமிடத்தைத் தேர்ந்தெடுக்கவும்",
    route_prompt_desc: "பேருந்து எண்கள், பயண நேரம் மற்றும் முழு நிறுத்த வரைபடத்தைக் காண ஏதேனும் ஓர் இடத்தைத் தொடவும்.",
    no_route_title: "நேரடி வழித்தடம் இல்லை",
    no_route_desc: "தேர்ந்தெடுக்கப்பட்ட இடங்களுக்கு இடையே நேரடி பேருந்து இல்லை. காந்திபுரம் அல்லது உக்கடம் வழியாக மாற்றுப் பேருந்தில் பயணிக்க பரிந்துரைக்கிறோம்.",
    btn_try_different_route: "வேறு சேருமிடத்தைத் தேர்ந்தெடுக்க",
    route_lead_buses: "நேரடி பேருந்து சேவைகள்:",
    route_intermediate_stops: "இடைநிலை வழித்தட நிறுத்தங்கள் வரைபடம்",
    metric_duration: "பயண நேரம்",
    metric_distance: "தூரம்",
    metric_frequency: "அலைவரிசை",
    fare_est_label: "மாதிரி கட்டண மதிப்பீடு:",

    // Fare View
    fares_title: "கட்டண வழிகாட்டி & கணக்கீடு",
    fares_sub: "சாதாரண, டீலக்ஸ் மற்றும் ஏசி வோல்வோ பேருந்துகளுக்கான மாதிரி பயணக் கட்டணங்கள்",
    demo_fares_disclaimer: "⚠️ மாதிரித் தரவு மட்டுமே • அதிகாரப்பூர்வ டிக்கெட் அல்ல",
    pink_bus_title: "மகளிர் மற்றும் திருநங்கையருக்கு கட்டணமில்லா பயணம்",
    pink_bus_desc: "தமிழ்நாடு அரசின் விடியல் பயணத் திட்டத்தின் கீழ், அனைத்து அரசு சாதாரண வெள்ளை-இளஞ்சிவப்பு பேருந்துகளிலும் கட்டணமின்றி இலவசமாக பயணிக்கலாம்.",
    calc_box_title: "மாதிரி கட்டணக் கணக்கீட்டுக் கருவி",
    calc_box_desc: "பேருந்து வகை மற்றும் தூர நிலைக்கு ஏற்ப தோராயமான மாதிரி கட்டணத்தைக் கணக்கிடுங்கள்.",
    calc_service_type: "பேருந்து சேவையைத் தேர்ந்தெடுக்கவும்:",
    opt_ordinary: "சாதாரண பேருந்து",
    opt_ordinary_sub: "வெள்ளை & இளஞ்சிவப்பு",
    opt_deluxe: "டீலக்ஸ்",
    opt_deluxe_sub: "பசுமை சொகுசு",
    opt_volvo: "ஏசி வோல்வோ",
    opt_volvo_sub: "குறைந்த தரைத்தள ஏசி",
    calc_distance_stage: "பயணத் தூரம்:",
    calc_passenger_type: "பயணி பிரிவு:",
    pass_adult: "பொதுவான வயது வந்த பயணி",
    pass_women: "மகளிர் / திருநங்கையர் (இலவச விடியல் பயணம்)",
    pass_senior: "மூத்த குடிமக்கள் (60+ வயது)",
    pass_child: "குழந்தை (5 முதல் 12 வயது வரை - 50% கட்டணம்)",
    pass_student: "செல்லுபடியாகும் பாஸ் வைத்திருக்கும் மாணவர் (இலவசம்)",
    calc_estimated_fare: "தோராயமான மாதிரி கட்டணம்:",
    calc_footer_note: "* மாதிரி கட்டணம் மட்டுமே. உண்மையான கட்டணம் அரசுப் போக்குவரத்துக் கழக கட்டண அட்டவணையின்படி மாறுபடலாம்.",
    matrix_title: "நிலையான மாதிரி கட்டண அட்டவணை",
    matrix_desc: "காந்திபுரத்திலிருந்து புறப்படும் பொதுவான நிலைகளுக்கான கட்டண விகிதம்.",
    col_stage: "நிலை",
    col_distance: "தூரம்",
    col_ordinary: "சாதாரண",
    col_deluxe: "டீலக்ஸ்",
    col_volvo: "ஏசி வோல்வோ",
    pass_box_title: "தினசரி & மாதாந்திர பயண அட்டைகள்",
    pass_box_desc: "வரம்பற்ற ஒரு நாள் பயண அட்டை: ₹50.00 (சாதாரண மற்றும் டீலக்ஸ் பேருந்துகளுக்கு செல்லுபடியாகும்).",

    // Travel Info View
    info_title: "பயணத் தகவல் & உதவி வழிகாட்டி",
    info_sub: "நிறுத்த வசதிகள், பாதுகாப்பு விதிகள், சக்கர நாற்காலி அணுகல், தவறவிட்ட பொருட்கள் மற்றும் அவசர எண்கள்",
    demo_assistance_note: "கோவை ஸ்மார்ட் சிட்டி போக்குவரத்து உதவி",
    subtab_safety: "பாதுகாப்பு வழிமுறைகள்",
    subtab_accessibility: "மாற்றுத்திறனாளி வசதிகள்",
    subtab_lostfound: "தவறவிட்ட பொருட்கள்",
    subtab_announcements: "அறிவிப்புகள் & தடங்கல்கள்",

    // Safety Subpane
    safety_rule1_title: "மஞ்சள் கோடு பாதுகாப்பு விதி",
    safety_rule1_desc: "பேருந்து முழுமையாக நின்று நடத்துனர் கதவுகளைத் திறக்கும் வரை நடைமேடையின் மஞ்சள் பாதுகாப்புக் கோட்டிற்குப் பின்னால் நிற்கவும்.",
    safety_rule2_title: "வரிசையில் ஏறி இறங்குதல்",
    safety_rule2_desc: "ஒழுங்கான வரிசையில் காத்திருக்கவும். வரும் பயணிகள் முன் கதவு வழியாக முழுமையாக இறங்கிய பின்னரே பின் கதவு வழியாக ஏறவும்.",
    safety_cctv_title: "24/7 கண்காணிப்பு கேமராக்கள்",
    safety_cctv_desc: "காந்திபுரம் பேருந்து நிலையத்தில் 20 நவீன உயர் தெளிவுத்திறன் கேமராக்கள் மூலம் கோவை மாநகரக் காவல் துறையால் தொடர்ந்து கண்காணிக்கப்படுகிறது.",
    emergency_contacts_title: "அவசர உதவி எண்கள்",
    contact_police: "காவல்துறை & அவசர உதவி:",
    contact_women: "பெண்கள் பாதுகாப்பு உதவி எண்:",
    contact_mtc: "TNSTC கட்டுப்பாட்டு அறை:",
    contact_kiosk: "நிலைய மேலாளர் காந்திபுரம்:",

    // Accessibility Subpane
    a11y_ramps_title: "சக்கர நாற்காலி சாய்தள நடைமேடை",
    a11y_ramps_desc: "நடைமேடை 1 மற்றும் 4 இல் சக்கர நாற்காலிகள் எளிதாக ஏறும் வகையில் சாய்தள அமைப்பு மற்றும் தாழ்தள ஏசி வோல்வோ பேருந்து வசதிகள் உள்ளன.",
    a11y_tactile_title: "பார்வைத்திறன் குறைபாடுடையோருக்கான வழிகாட்டி கற்கள்",
    a11y_tactile_desc: "கிராஸ் கட் ரோடு பாதசாரிகள் நுழைவாயிலில் இருந்து அனைத்து 6 நடைமேடைகளுக்கும் வழிநடத்தும் மஞ்சள் வழிகாட்டி டைல்ஸ் பதிக்கப்பட்டுள்ளது.",
    a11y_seating_title: "முன்னுரிமை இருக்கைகள்",
    a11y_seating_desc: "ஒவ்வொரு பேருந்திலும் முன் வரிசையின் முதல் 8 இருக்கைகள் மூத்த குடிமக்கள், கர்ப்பிணிப் பெண்கள் மற்றும் மாற்றுத்திறனாளிகளுக்காக ஒதுக்கப்பட்டுள்ளது.",
    a11y_audio_title: "இருமொழி குரல் உதவி",
    a11y_audio_desc: "இந்த தொடுதிரை மையத்தில் பார்வைக் குறைபாடுள்ள பயணிகளுக்காக பெரிய எழுத்து முறை (A+) மற்றும் ஒலி அறிவிப்பு வசதி வழங்கப்பட்டுள்ளது.",

    // Lost & Found Subpane
    lost_booth_title: "தவறவிட்ட பொருட்கள் அலுவலகம்",
    lost_booth_desc: "நடைமேடை 2 தரைத்தளத்தில் நிலையக் கட்டுப்பாட்டு அறைக்கு அருகில் தவறவிட்ட பொருட்கள் உதவி மையம் 24 மணி நேரமும் செயல்படுகிறது.",
    lost_claim_title: "பொருட்களை திரும்பப் பெறும் முறை",
    lost_claim_desc: "அரசு அங்கீகரித்த புகைப்பட அடையாள அட்டை (ஆதார் / வாக்காளர் அட்டை), பேருந்து எண் மற்றும் பயண நேர விவரங்களைக் கூறி பெற்றுக்கொள்ளலாம்.",
    lost_helpline_title: "நேரடி தொலைபேசி உதவி",
    lost_helpline_desc: "+91 422 252 3012 என்ற தொலைபேசி எண்ணிலோ அல்லது lostfound.cbe@smartstop.demo.tn.gov.in மின்னஞ்சலிலோ தொடர்பு கொள்ளலாம்.",
    lost_retention_title: "பாதுகாப்பு கால வரம்பு",
    lost_retention_desc: "மீட்கப்பட்ட உடமைகள் 30 நாட்களுக்கு பாதுகாப்பாக வைக்கப்பட்டு, பின்னர் அரசு கருவூலத்திற்கு அனுப்பி வைக்கப்படும்.",

    // Announcements Subpane
    alert_diversion_tag: "வழித்தட மாற்றம்",
    alert_21g_title: "அவினாசி ரோடு மேம்பாலப் பணி மாற்றுப்பாதை",
    alert_21g_desc: "லட்சுமி மில்ஸ் மற்றும் நவ இந்தியா அருகே மேம்பால விரிவாக்கப் பணி நடைபெறுவதால், விமான நிலைய பேருந்து 1C காமராஜர் சாலை வழியே 8 நிமிட தாமதத்துடன் இயக்கப்படுகிறது.",
    alert_night_tag: "இரவு நேர பேருந்துகள்",
    alert_night_title: "இரவு நேர சிறப்பு இணைப்புப் பேருந்துகள் (22:30 முதல் 05:00 வரை)",
    alert_night_desc: "காந்திபுரத்திலிருந்து கோவை சந்திப்பு ரயில் நிலையம், சிங்காநல்லூர் மற்றும் உக்கடத்திற்கு இரவு முழுவதும் மணிநேரத்திற்கு ஒரு முறை பேருந்துகள் இயக்கப்படுகின்றன.",
    alert_metro_tag: "கோவில் சிறப்புப் பேருந்துகள்",
    alert_metro_title: "மருதமலை & பேரூர் விரைவுப் பேருந்துகள்",
    alert_metro_desc: "மருதமலை முருகன் கோவில் (வழி 70) மற்றும் பேரூர் பட்டீஸ்வரர் கோவிலுக்கு (வழி 20A) நடைமேடை 1 & 3 இலிருந்து 8 நிமிடங்களுக்கு ஒரு முறை சிறப்புப் பேருந்துகள் இயக்கப்படுகின்றன.",

    // Idle Modal & Footer
    idle_title: "நீங்கள் தொடர்ந்து பயன்படுத்துகிறீர்களா?",
    idle_desc: "பயணிகளின் தனியுரிமைக்காக இந்த தொடுதிரை இன்னும் 15 வினாடிகளில் தானாக முகப்புத் திரைக்குத் திரும்பும்.",
    idle_btn_continue: "ஆம், தொடர்ந்து பயன்படுத்துகிறேன்",
    idle_btn_reset: "இப்போதே மீட்டமைக்க",
    footer_agency: "தமிழ்நாடு அரசுப் போக்குவரத்துக் கழகம் (கோவை) வரையறுக்கப்பட்டது",
    footer_demo_note: "HCI திட்டத்திற்கான மாதிரி செயல்முறை வடிவம்",
    footer_touch_hint: "இயக்க திரையில் உள்ள பொத்தான்களைத் தொடவும்",

    // Totem Hardware Simulation
    mode_bar_title: "தொடுதிரை இயந்திர மாதிரி வடிவம்",
    mode_btn_totem: "இயற்கை பேருந்து நிறுத்த தூண் வடிவம்",
    mode_btn_fullscreen: "முழுத்திரை தொடுதிரை பார்வை",
    totem_agency: "TNSTC கோவை கோட்டம்",
    totem_stop: "ஸ்மார்ட் போக்குவரத்து மையம் • காந்திபுரம் மத்திய நிலையம்",
    totem_nfc_title: "ஸ்மார்ட் கார்டு / QR வைக்கவும்",
    totem_nfc_sub: "TNSTC ஸ்மார்ட் பாஸ் • சிங்கார சென்னை / NCMC",
    totem_touch_prompt: "தொடவும்",
    totem_braille_title: "பிரெய்லி வசதி",
    totem_braille_sub: "திரையில் ஒலி அறிவிப்பு • தாழ்தள நடைமேடை 1",
    totem_sos_title: "அவசர உதவி SOS",
    totem_sos_sub: "காவல்துறை நேரடி அழைப்பு பொத்தான்",
    sos_modal_title: "அவசர உதவி SOS இயக்கப்பட்டது",
    sos_modal_desc: "கோவை மாநகரக் காவல் கட்டுப்பாட்டு அறை (எண் 112) மற்றும் காந்திபுரம் நிலைய மேலாளருக்கு நேரடி ஒலி இணைப்பு தொடங்கப்பட்டது. கேமரா நேரலை பதிவாகிறது.",
    sos_modal_dismiss: "அறிவிப்பை மூடுக / இயல்பு நிலைக்குத் திரும்புக",
    nfc_detected_title: "TNSTC கோவை பயண அட்டை கண்டறியப்பட்டது!",
    nfc_detected_sub: "அட்டை எண்: #CBE-7729-1044 • மீதி இருப்பு: ₹160.00 • சாதாரண கட்டணம் செலுத்த தயாராக உள்ளது"
  }
};

// ==============================================================================
// 3. APPLICATION STATE
// ==============================================================================

const state = {
  currentLang: "en",
  currentView: "home",
  selectedBusStand: "Gandhipuram",
  busSearchQuery: "",
  selectedBayFilter: "all",
  selectedStatusFilter: "all",
  radarCountdownSeconds: 15,
  fareServiceType: "ordinary",
  fareStage: 3,
  farePassengerType: "adult",
  idleWarningThreshold: 45000,
  idleCountdown: 15,
  idleTimerId: null,
  idleIntervalId: null,
  isModalOpen: false
};

// ==============================================================================
// 4. CORE INITIALIZATION
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing SmartStop Kiosk System (Coimbatore Edition)...");

  // Initialize clock and date
  initClock();

  // Initialize navigation & views
  initNavigation();

  // Initialize bus timings table and filters
  initBusTimings();

  // Initialize route finder
  initRouteFinder();

  // Initialize fare estimator
  initFareEstimator();

  // Initialize travel information subtabs
  initTravelInfoTabs();

  // Initialize language switchers
  initLanguageSwitcher();

  // Initialize accessibility controls
  initAccessibilityControls();

  // Initialize reset handlers
  initResetHandlers();

  // Initialize kiosk idle inactivity tracker
  initIdleWatcher();

  // Initialize physical totem hardware simulation (NFC, SOS, Mode toggle)
  initTotemHardware();

  // Render quick departures on home view
  renderHomeQuickDepartures();

  // Render initial language
  applyLanguage(state.currentLang);

  console.log("SmartStop Kiosk (Coimbatore) is ready.");
});

// ==============================================================================
// 5. LIVE DIGITAL CLOCK & DATE ENGINE (12-HOUR PRIMARY + 24-HOUR SECONDARY)
// ==============================================================================

function initClock() {
  function updateTime() {
    const now = new Date();
    const clock12El = document.getElementById("digital-clock");
    const clock24El = document.getElementById("digital-clock-24");
    const dateEl = document.getElementById("digital-date");

    if (!clock12El || !dateEl) return;

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();

    // 12-Hour Calculation
    const ampm = rawHours >= 12 ? "PM" : "AM";
    const hours12 = rawHours % 12 || 12;
    const padHours12 = String(hours12).padStart(2, "0");
    const padMinutes = String(rawMinutes).padStart(2, "0");
    const padSeconds = String(rawSeconds).padStart(2, "0");

    clock12El.textContent = `${padHours12}:${padMinutes}:${padSeconds} ${ampm}`;

    // 24-Hour Small Secondary
    if (clock24El) {
      const hours24 = String(rawHours).padStart(2, "0");
      clock24El.textContent = `24h: ${hours24}:${padMinutes}:${padSeconds}`;
    }

    // Formatted Date
    if (state.currentLang === "ta") {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('ta-IN', options);
    } else {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-IN', options);
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// ==============================================================================
// 6. LANGUAGE TRANSLATION ENGINE (ENGLISH & TAMIL)
// ==============================================================================

function initLanguageSwitcher() {
  const btnEn = document.getElementById("btn-lang-en");
  const btnTa = document.getElementById("btn-lang-ta");

  btnEn.addEventListener("click", () => applyLanguage("en"));
  btnTa.addEventListener("click", () => applyLanguage("ta"));
}

function applyLanguage(lang) {
  state.currentLang = lang;
  document.body.setAttribute("data-lang", lang);

  const btnEn = document.getElementById("btn-lang-en");
  const btnTa = document.getElementById("btn-lang-ta");
  if (btnEn && btnTa) {
    btnEn.classList.toggle("active", lang === "en");
    btnEn.setAttribute("aria-pressed", lang === "en");
    btnTa.classList.toggle("active", lang === "ta");
    btnTa.setAttribute("aria-pressed", lang === "ta");
  }

  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const tickerEl = document.getElementById("ticker-text");
  if (tickerEl && dict.ticker_text) {
    tickerEl.textContent = dict.ticker_text;
  }

  renderHomeQuickDepartures();
  renderBusTable();
  updateActiveBusStandTitle();
  calculateFare();

  const originSelect = document.getElementById("route-origin");
  const destSelect = document.getElementById("route-dest");
  if (destSelect && destSelect.value) {
    const origin = originSelect ? originSelect.value : "Gandhipuram";
    renderRouteDetails(origin, destSelect.value);
  }
}

// ==============================================================================
// 7. TOUCH NAVIGATION & VIEW MANAGEMENT
// ==============================================================================

function initNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-view");
      navigateToView(targetView);
    });
  });

  setupActionCard("card-action-timings", "timings");
  setupActionCard("card-action-routes", "routes");
  setupActionCard("card-action-fares", "fares");
  setupActionCard("card-action-info", "info");

  const viewAllTimingsBtn = document.getElementById("btn-home-view-all-timings");
  if (viewAllTimingsBtn) {
    viewAllTimingsBtn.addEventListener("click", () => navigateToView("timings"));
  }

  const backButtons = document.querySelectorAll(".back-home-btn, .footer-home-btn, #btn-brand-home");
  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => navigateToView("home"));
  });

  const chips = document.querySelectorAll(".dest-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const dest = chip.getAttribute("data-dest");
      const originSelect = document.getElementById("route-origin");
      const destSelect = document.getElementById("route-dest");
      if (destSelect) {
        destSelect.value = dest;
      }
      const origin = originSelect ? originSelect.value : "Gandhipuram";
      navigateToView("routes");
      renderRouteDetails(origin, dest);
    });
  });
}

function setupActionCard(cardId, viewName) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.addEventListener("click", () => navigateToView(viewName));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToView(viewName);
    }
  });
}

function navigateToView(viewName) {
  state.currentView = viewName;

  const panels = document.querySelectorAll(".view-panel");
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `view-${viewName}`);
  });

  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach((tab) => {
    const isCurrent = tab.getAttribute("data-view") === viewName;
    tab.classList.toggle("active", isCurrent);
    if (isCurrent) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==============================================================================
// 8. BUS TIMINGS SCREEN (FILTER, SEARCH & RADAR)
// ==============================================================================

function initBusTimings() {
  const searchInput = document.getElementById("bus-search-input");
  const clearBtn = document.getElementById("btn-clear-bus-search");
  const refreshBtn = document.getElementById("btn-manual-refresh");
  const resetFilterBtn = document.getElementById("btn-reset-timings-filter");
  const announceBtn = document.getElementById("btn-audio-announce");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.busSearchQuery = e.target.value.trim().toLowerCase();
      renderBusTable();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.busSearchQuery = "";
      renderBusTable();
      searchInput.focus();
    });
  }

  initBayFilterListeners();

  const statusPills = document.querySelectorAll("#status-filter-group .filter-pill");
  statusPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      statusPills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-checked", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-checked", "true");
      state.selectedStatusFilter = pill.getAttribute("data-status");
      renderBusTable();
    });
  });

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshRadarData();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      resetBusFilters();
    });
  }

  if (announceBtn) {
    announceBtn.addEventListener("click", () => {
      triggerNextBusAnnouncement();
    });
  }

  startRadarCountdown();
  switchBusStand("Gandhipuram");
}

function initBayFilterListeners() {
  const bayPills = document.querySelectorAll("#bay-filter-group .filter-pill");
  bayPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const allPills = document.querySelectorAll("#bay-filter-group .filter-pill");
      allPills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-checked", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-checked", "true");
      state.selectedBayFilter = pill.getAttribute("data-bay");
      renderBusTable();
    });
  });
}

function switchBusStand(standName) {
  if (!BUS_STAND_SCHEDULES[standName]) return;

  state.selectedBusStand = standName;
  BUS_DATA = [...BUS_STAND_SCHEDULES[standName]];
  BUS_DATA.sort((a, b) => a.etaMins - b.etaMins);

  const standSelect = document.getElementById("select-timings-bus-stand");
  if (standSelect && standSelect.value !== standName) {
    standSelect.value = standName;
  }

  updateActiveBusStandTitle();
  updateBayFiltersForStand();

  state.selectedBayFilter = "all";
  state.selectedStatusFilter = "all";
  state.busSearchQuery = "";
  const searchInput = document.getElementById("bus-search-input");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll("#status-filter-group .filter-pill").forEach((p) => {
    const isAll = p.getAttribute("data-status") === "all";
    p.classList.toggle("active", isAll);
    p.setAttribute("aria-checked", isAll ? "true" : "false");
  });

  renderBusTable();

  // Subtle visual cue that new timings are loaded
  const tableEl = document.querySelector(".kiosk-table");
  if (tableEl) {
    tableEl.style.transition = "opacity 0.2s ease";
    tableEl.style.opacity = "0.3";
    setTimeout(() => {
      tableEl.style.opacity = "1";
    }, 150);
  }
}

function updateActiveBusStandTitle() {
  const titleEl = document.getElementById("timings-active-stand-name");
  if (!titleEl) return;

  const isTa = state.currentLang === "ta";
  const standName = state.selectedBusStand || "Gandhipuram";

  const nameMap = {
    "Gandhipuram": isTa ? "காந்திபுரம் மத்திய பேருந்து நிலையம் (முதன்மை மையம்)" : "Gandhipuram Central Bus Stand (Current Kiosk Hub)",
    "Ukkadam": isTa ? "உக்கடம் பேருந்து நிலையம் (தெற்கு காரிடார்)" : "Ukkadam Bus Stand (South Corridor)",
    "Singanallur": isTa ? "சிங்காநல்லூர் பேருந்து நிலையம் (திருச்சி ரோடு முனையம்)" : "Singanallur Bus Stand (Trichy Road Terminus)",
    "Saibaba Colony": isTa ? "சாய்பாபா காலனி பேருந்து நிலையம் (மேட்டுப்பாளையம் ரோடு)" : "Saibaba Colony Bus Stand (Mettupalayam Rd)",
    "Coimbatore Junction": isTa ? "கோவை சந்திப்பு ரயில் நிலையம் (ரயில்வே பேருந்து நிறுத்தம்)" : "Coimbatore Junction (Railway Bus Bays)",
    "Sulur": isTa ? "சூலூர் பேருந்து நிலையம் (விமானப்படை தளம் / புறநகர்)" : "Sulur Bus Stand (Air Force Base / Suburban)",
    "Pollachi": isTa ? "பொள்ளாச்சி பேருந்து நிலையம் (மண்டல மையம்)" : "Pollachi Bus Stand (Inter-Division Hub)",
    "Marudhamalai": isTa ? "மருதமலை பேருந்து நிலையம் (அடிவாரம்)" : "Marudhamalai Bus Stand (Temple Foothills)",
    "Thudiyalur": isTa ? "துடியலூர் பேருந்து நிலையம் (வடக்கு காரிடார்)" : "Thudiyalur Bus Stand (North Corridor)"
  };

  titleEl.textContent = nameMap[standName] || `${standName} Bus Stand`;

  const subEl = document.querySelector("#view-timings .section-sub");
  if (subEl) {
    subEl.textContent = isTa
      ? `${standName} பேருந்து நிலையத்தின் நேரடி அட்டவணை • புறப்பாடு மற்றும் வருகை நேரம்`
      : `Simulated departure radar for ${standName} Bus Stand, Coimbatore • Scheduled and expected times`;
  }
}

function updateBayFiltersForStand() {
  const bayGroup = document.getElementById("bay-filter-group");
  if (!bayGroup) return;

  const bays = [...new Set(BUS_DATA.map((b) => b.bay))].sort();
  bayGroup.innerHTML = `
    <button class="filter-pill active" data-bay="all" aria-checked="true" data-i18n="filter_all">${state.currentLang === "ta" ? "அனைத்து பே" : "All Bays"}</button>
    ${bays.map((bay) => `<button class="filter-pill" data-bay="${bay}" aria-checked="false">${bay}</button>`).join("")}
  `;

  initBayFilterListeners();
}

function resetBusFilters() {
  const searchInput = document.getElementById("bus-search-input");
  if (searchInput) searchInput.value = "";
  state.busSearchQuery = "";

  const bayPills = document.querySelectorAll("#bay-filter-group .filter-pill");
  bayPills.forEach((p) => {
    const isAll = p.getAttribute("data-bay") === "all";
    p.classList.toggle("active", isAll);
    p.setAttribute("aria-checked", isAll ? "true" : "false");
  });
  state.selectedBayFilter = "all";

  const statusPills = document.querySelectorAll("#status-filter-group .filter-pill");
  statusPills.forEach((p) => {
    const isAll = p.getAttribute("data-status") === "all";
    p.classList.toggle("active", isAll);
    p.setAttribute("aria-checked", isAll ? "true" : "false");
  });
  state.selectedStatusFilter = "all";

  renderBusTable();
}

function renderBusTable() {
  const tbody = document.getElementById("timings-tbody");
  const emptyState = document.getElementById("timings-empty-state");
  const countDisplay = document.getElementById("bus-count-display");
  if (!tbody) return;

  tbody.innerHTML = "";

  const filtered = BUS_DATA.filter((bus) => {
    if (state.busSearchQuery) {
      const q = state.busSearchQuery;
      const matchNo = bus.busNo.toLowerCase().includes(q);
      const matchDestEn = bus.destinationEn.toLowerCase().includes(q);
      const matchDestTa = bus.destinationTa.toLowerCase().includes(q);
      const matchViaEn = bus.viaEn.toLowerCase().includes(q);
      const matchViaTa = bus.viaTa.toLowerCase().includes(q);
      if (!matchNo && !matchDestEn && !matchDestTa && !matchViaEn && !matchViaTa) {
        return false;
      }
    }

    if (state.selectedBayFilter !== "all" && bus.bay !== state.selectedBayFilter) {
      return false;
    }

    if (state.selectedStatusFilter !== "all") {
      if (state.selectedStatusFilter === "Delayed" && !bus.status.startsWith("Delayed")) {
        return false;
      } else if (state.selectedStatusFilter !== "Delayed" && bus.status !== state.selectedStatusFilter) {
        return false;
      }
    }

    return true;
  });

  if (countDisplay) {
    if (state.currentLang === "ta") {
      countDisplay.textContent = `${filtered.length} பேருந்துகள் காட்டப்படுகின்றன (மொத்தம்: ${BUS_DATA.length})`;
    } else {
      countDisplay.textContent = `Showing ${filtered.length} departures (Total: ${BUS_DATA.length})`;
    }
  }

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    tbody.classList.add("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
    tbody.classList.remove("hidden");
  }

  filtered.forEach((bus) => {
    const tr = document.createElement("tr");

    const destName = state.currentLang === "ta" ? bus.destinationTa : bus.destinationEn;
    const viaText = state.currentLang === "ta" ? bus.viaTa : bus.viaEn;
    const serviceTypeName = state.currentLang === "ta" ? bus.serviceTypeNameTa : bus.serviceTypeNameEn;

    let statusClass = "ontime";
    let statusLabel = bus.status;
    if (bus.status === "Arriving Now") {
      statusClass = "arriving";
      statusLabel = state.currentLang === "ta" ? "இப்போது வருகிறது" : "Arriving Now";
    } else if (bus.status === "On Time") {
      statusClass = "ontime";
      statusLabel = state.currentLang === "ta" ? "சரியான நேரம்" : "On Time";
    } else if (bus.status.startsWith("Delayed")) {
      statusClass = "delayed";
      statusLabel = state.currentLang === "ta" ? "தாமதம்" : bus.status;
    } else if (bus.status === "Boarding") {
      statusClass = "boarding";
      statusLabel = state.currentLang === "ta" ? "ஏறலாம்" : "Boarding";
    }

    const etaText = state.currentLang === "ta" 
      ? (bus.etaMins <= 2 ? "2 நிமி" : `${bus.etaMins} நிமிடங்கள்`)
      : (bus.etaMins <= 2 ? "In 2 mins" : `${bus.etaMins} mins`);

    tr.innerHTML = `
      <td><span class="bus-num-pill">${bus.busNo}</span></td>
      <td>
        <div class="dest-main-text">${destName}</div>
        <div class="dest-via-text">${viaText}</div>
      </td>
      <td>
        <span class="eta-cell ${bus.etaMins <= 2 ? 'soon' : ''}">
          ${bus.etaMins <= 2 ? '<span class="status-dot"></span>' : ''}
          ${etaText}
        </span>
      </td>
      <td><strong>${bus.depTime}</strong></td>
      <td><span class="platform-bay-badge">${bus.bay}</span></td>
      <td><span class="service-type-tag ${bus.serviceType}">${serviceTypeName}</span></td>
      <td>
        <span class="status-pill ${statusClass}">
          <span class="status-dot"></span>
          ${statusLabel}
        </span>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function renderHomeQuickDepartures() {
  const container = document.getElementById("home-quick-departures");
  if (!container) return;

  container.innerHTML = "";
  const topThree = BUS_DATA.slice(0, 3);

  topThree.forEach((bus) => {
    const item = document.createElement("div");
    item.className = "radar-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.title = `Click to view details for Bus ${bus.busNo}`;

    const destName = state.currentLang === "ta" ? bus.destinationTa : bus.destinationEn;
    const etaText = state.currentLang === "ta" ? `${bus.etaMins} நிமி` : `${bus.etaMins}m`;

    item.innerHTML = `
      <span class="radar-bus-tag">${bus.busNo}</span>
      <div class="radar-dest-col">
        <div class="radar-dest-name">${destName}</div>
        <div class="radar-dest-bay">${bus.bay} • ${bus.depTime}</div>
      </div>
      <div class="radar-eta-tag">
        <span class="pulse-indicator"></span>
        ${etaText}
      </div>
    `;

    item.addEventListener("click", () => {
      navigateToView("timings");
      const searchInput = document.getElementById("bus-search-input");
      if (searchInput) {
        searchInput.value = bus.busNo;
        state.busSearchQuery = bus.busNo.toLowerCase();
        renderBusTable();
      }
    });

    container.appendChild(item);
  });
}

function startRadarCountdown() {
  setInterval(() => {
    state.radarCountdownSeconds--;
    const countdownEl = document.getElementById("radar-countdown");
    if (countdownEl) {
      countdownEl.textContent = state.radarCountdownSeconds;
    }

    if (state.radarCountdownSeconds <= 0) {
      refreshRadarData();
    }
  }, 1000);
}

function refreshRadarData() {
  state.radarCountdownSeconds = 15;
  const countdownEl = document.getElementById("radar-countdown");
  if (countdownEl) countdownEl.textContent = "15";

  BUS_DATA.forEach((bus) => {
    if (bus.etaMins > 1) {
      bus.etaMins -= 1;
    } else {
      bus.etaMins = Math.floor(Math.random() * 25) + 3;
    }

    if (bus.etaMins <= 2) {
      bus.status = "Arriving Now";
    } else if (bus.etaMins > 20 && Math.random() > 0.7) {
      bus.status = "Delayed";
    } else {
      bus.status = "On Time";
    }
  });

  BUS_DATA.sort((a, b) => a.etaMins - b.etaMins);

  renderBusTable();
  renderHomeQuickDepartures();
}

function triggerNextBusAnnouncement() {
  const nextBus = BUS_DATA[0];
  if (!nextBus) return;

  const dest = state.currentLang === "ta" ? nextBus.destinationTa : nextBus.destinationEn;
  const stand = state.selectedBusStand || "Gandhipuram";
  const textEn = `Attention passengers at ${stand}: Bus number ${nextBus.busNo} to ${dest} is departing from ${nextBus.bay} in ${nextBus.etaMins} minutes.`;
  const textTa = `பயணிகள் கவனத்திற்கு: ${stand} பேருந்து நிலையத்திலிருந்து ${dest} செல்லும் பேருந்து எண் ${nextBus.busNo}, நடைமேடை ${nextBus.bay} இல் இன்னும் ${nextBus.etaMins} நிமிடங்களில் புறப்படும்.`;

  const announcementText = state.currentLang === "ta" ? textTa : textEn;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(announcementText);
    utterance.lang = state.currentLang === "ta" ? "ta-IN" : "en-IN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  } else {
    alert(announcementText);
  }
}

// ==============================================================================
// 9. ROUTE FINDER & TRANSIT STOP DIAGRAM ENGINE (UNIVERSAL MULTI-ORIGIN)
// ==============================================================================

function initRouteFinder() {
  const destSelect = document.getElementById("route-dest");
  const originSelect = document.getElementById("route-origin");
  const findBtn = document.getElementById("btn-find-routes");
  const swapBtn = document.getElementById("btn-swap-route");
  const presetPills = document.querySelectorAll(".preset-pill");
  const resetSearchBtn = document.getElementById("btn-reset-route-search");

  function triggerSearch() {
    const origin = originSelect ? originSelect.value : "Gandhipuram";
    const dest = destSelect ? destSelect.value : "";
    if (origin && dest) {
      renderRouteDetails(origin, dest);
    }
  }

  if (destSelect) {
    destSelect.addEventListener("change", triggerSearch);
  }

  if (originSelect) {
    originSelect.addEventListener("change", triggerSearch);
  }

  if (findBtn) {
    findBtn.addEventListener("click", () => {
      const origin = originSelect ? originSelect.value : "Gandhipuram";
      const dest = destSelect ? destSelect.value : "";
      if (!dest) {
        destSelect.focus();
        return;
      }
      renderRouteDetails(origin, dest);
    });
  }

  presetPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const presetDest = pill.getAttribute("data-preset");
      if (destSelect) {
        destSelect.value = presetDest;
        triggerSearch();
      }
    });
  });

  if (swapBtn && originSelect && destSelect) {
    swapBtn.addEventListener("click", () => {
      const currentOrigin = originSelect.value;
      const currentDest = destSelect.value;

      if (!currentDest) return;

      // Smooth swap without disruptive alert
      originSelect.value = currentDest;
      destSelect.value = currentOrigin;
      triggerSearch();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", () => {
      if (originSelect) originSelect.value = "Gandhipuram";
      if (destSelect) destSelect.value = "";
      document.getElementById("route-default-prompt")?.classList.remove("hidden");
      document.getElementById("route-detail-card")?.classList.add("hidden");
      document.getElementById("route-not-found")?.classList.add("hidden");
      destSelect?.focus();
    });
  }
}

/**
 * Universal Route Resolver supporting any origin and destination pair
 */
function resolveRoute(originKey, destinationKey) {
  if (!originKey || !destinationKey) return null;

  const oKey = originKey.trim().toLowerCase();
  const dKey = destinationKey.trim().toLowerCase();

  // 1. Same origin and destination check
  if (oKey === dKey) {
    return { isSamePoint: true, name: originKey };
  }

  // 2. Direct forward match in database
  const forwardMatch = ROUTES_DATABASE.find(
    (r) => r.origin.toLowerCase() === oKey && r.destination.toLowerCase() === dKey
  );
  if (forwardMatch) {
    return forwardMatch;
  }

  // 3. Direct reverse match (e.g. Ukkadam -> Gandhipuram, Airport -> Gandhipuram)
  const reverseMatch = ROUTES_DATABASE.find(
    (r) => r.origin.toLowerCase() === dKey && r.destination.toLowerCase() === oKey
  );
  if (reverseMatch) {
    const reversedStops = [...reverseMatch.stops].reverse().map((s, idx, arr) => ({
      nameEn: s.nameEn,
      nameTa: s.nameTa,
      isOrigin: idx === 0,
      isDest: idx === arr.length - 1
    }));

    return {
      origin: originKey,
      destination: destinationKey,
      busNumbers: reverseMatch.busNumbers,
      duration: reverseMatch.duration,
      distance: reverseMatch.distance,
      frequency: reverseMatch.frequency,
      fareOrdinary: reverseMatch.fareOrdinary,
      fareDeluxe: reverseMatch.fareDeluxe,
      fareVolvo: reverseMatch.fareVolvo,
      stops: reversedStops
    };
  }

  // 4. Sub-route match (both stops along the same corridor)
  for (const r of ROUTES_DATABASE) {
    const oIdx = r.stops.findIndex(s => s.nameEn.toLowerCase().includes(oKey) || oKey.includes(s.nameEn.toLowerCase()));
    const dIdx = r.stops.findIndex(s => s.nameEn.toLowerCase().includes(dKey) || dKey.includes(s.nameEn.toLowerCase()));

    if (oIdx !== -1 && dIdx !== -1 && oIdx !== dIdx) {
      const isFwd = oIdx < dIdx;
      const sliced = isFwd ? r.stops.slice(oIdx, dIdx + 1) : r.stops.slice(dIdx, oIdx + 1).reverse();
      const customStops = sliced.map((s, idx, arr) => ({
        nameEn: s.nameEn,
        nameTa: s.nameTa,
        isOrigin: idx === 0,
        isDest: idx === arr.length - 1
      }));

      const numStops = customStops.length;
      const estMin = Math.max(12, Math.round(numStops * 5.5));
      const estDist = (numStops * 2.3).toFixed(1);
      const estFare = Math.min(22, Math.max(6, Math.round(numStops * 2.2)));

      return {
        origin: originKey,
        destination: destinationKey,
        busNumbers: r.busNumbers,
        duration: `${estMin} mins`,
        distance: `${estDist} km`,
        frequency: r.frequency,
        fareOrdinary: `₹${estFare} (Free for Women)`,
        fareDeluxe: `₹${estFare * 2}`,
        fareVolvo: `₹${estFare * 4}`,
        stops: customStops
      };
    }
  }

  // 5. Connecting route through central Gandhipuram Hub
  const originToGnd = ROUTES_DATABASE.find(r => r.destination.toLowerCase() === oKey);
  const gndToDest = ROUTES_DATABASE.find(r => r.destination.toLowerCase() === dKey);

  if (originToGnd && gndToDest) {
    const leg1Stops = [...originToGnd.stops].reverse().map(s => ({ nameEn: s.nameEn, nameTa: s.nameTa }));
    const leg2Stops = gndToDest.stops.slice(1).map(s => ({ nameEn: s.nameEn, nameTa: s.nameTa }));

    const combinedStops = [...leg1Stops, ...leg2Stops].map((s, idx, arr) => ({
      nameEn: s.nameEn,
      nameTa: s.nameTa,
      isOrigin: idx === 0,
      isDest: idx === arr.length - 1
    }));

    const combinedBuses = [...new Set([...originToGnd.busNumbers.slice(0, 2), ...gndToDest.busNumbers.slice(0, 2)])];
    const totalDist = (parseFloat(originToGnd.distance) + parseFloat(gndToDest.distance)).toFixed(1);
    const totalTime = parseInt(originToGnd.duration) + parseInt(gndToDest.duration) + 6;

    return {
      origin: originKey,
      destination: destinationKey,
      busNumbers: combinedBuses,
      duration: `${totalTime} mins (Transfer)`,
      distance: `${totalDist} km`,
      frequency: "Every 4–7 mins",
      fareOrdinary: `₹12 (Free for Women)`,
      fareDeluxe: `₹24`,
      fareVolvo: `₹50`,
      stops: combinedStops
    };
  }

  // 6. Universal cross-town city service fallback
  return {
    origin: originKey,
    destination: destinationKey,
    busNumbers: ["10A", "1C", "70", "88"],
    duration: "30–38 mins",
    distance: "13.2 km",
    frequency: "Every 6 mins",
    fareOrdinary: "₹10 (Free for Women)",
    fareDeluxe: "₹20",
    fareVolvo: "₹45",
    stops: [
      { nameEn: `${originKey} Bus Stand`, nameTa: `${originKey} பேருந்து நிலையம்`, isOrigin: true },
      { nameEn: "Town Hall / Cross Cut", nameTa: "டவுன் ஹால் / கிராஸ் கட்" },
      { nameEn: "Gandhipuram Central Hub", nameTa: "காந்திபுரம் மத்திய பேருந்து நிலையம்" },
      { nameEn: "Peelamedu / Trichy Road", nameTa: "பீளமேடு / திருச்சி ரோடு" },
      { nameEn: `${destinationKey}`, nameTa: `${destinationKey}`, isDest: true }
    ]
  };
}

function renderRouteDetails(originKey, destinationKey) {
  const promptBox = document.getElementById("route-default-prompt");
  const card = document.getElementById("route-detail-card");
  const notFoundBox = document.getElementById("route-not-found");

  if (!destinationKey) return;
  if (!originKey) originKey = "Gandhipuram";

  const match = resolveRoute(originKey, destinationKey);

  if (!match) {
    promptBox?.classList.add("hidden");
    card?.classList.add("hidden");
    notFoundBox?.classList.remove("hidden");
    return;
  }

  const isTa = state.currentLang === "ta";

  // Handle case where origin and destination are the exact same point
  if (match.isSamePoint) {
    promptBox?.classList.add("hidden");
    card?.classList.add("hidden");
    if (notFoundBox) {
      notFoundBox.classList.remove("hidden");
      notFoundBox.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <h3>${isTa ? "புறப்பாடு மற்றும் சேருமிடம் ஒரே இடமாகும்" : "Starting Point and Destination Are the Same"}</h3>
        <p>${isTa ? "நீங்கள் ஏற்கனவே இந்த இடத்தில் இருக்கிறீர்கள். தயவுசெய்து வேறு சேருமிடத்தைத் தேர்ந்தெடுக்கவும்." : `You are already at ${originKey}. Please choose a different destination to view routes.`}</p>
      `;
    }
    return;
  }

  promptBox?.classList.add("hidden");
  notFoundBox?.classList.add("hidden");
  card?.classList.remove("hidden");

  const leadBusesText = isTa ? "நேரடி / இணைப்பு பேருந்து சேவைகள்:" : "Direct / Connecting Bus Services:";
  const intermediateStopsText = isTa ? "இடைநிலை வழித்தட நிறுத்தங்கள் வரைபடம்:" : "Intermediate Route Stations Diagram:";
  const durationLabel = isTa ? "பயண நேரம்" : "Duration";
  const distanceLabel = isTa ? "தூரம்" : "Distance";
  const frequencyLabel = isTa ? "அலைவரிசை" : "Frequency";
  const fareHeader = isTa ? "மாதிரி பயணக் கட்டணம்:" : "Sample Passenger Fare:";

  const busBadgesHtml = match.busNumbers
    .map((num) => `<span class="route-bus-badge">${num}</span>`)
    .join("");

  const stopsHtml = match.stops
    .map((stop, index) => {
      const stopName = isTa ? stop.nameTa : stop.nameEn;
      let nodeClass = "transit-stop-node";
      let badgeLabel = `#${index + 1}`;

      if (stop.isOrigin) {
        nodeClass += " origin";
        badgeLabel = isTa ? "புறப்பாடு" : "Origin";
      } else if (stop.isDest) {
        nodeClass += " destination";
        badgeLabel = isTa ? "சேருமிடம்" : "Destination";
      }

      return `
        <div class="${nodeClass}">
          <div class="stop-marker-dot"></div>
          <span class="stop-name-text">${stopName}</span>
          <span class="stop-badge-pill">${badgeLabel}</span>
        </div>
      `;
    })
    .join("");

  card.innerHTML = `
    <!-- Top Row: Bus badges & Metrics -->
    <div class="route-card-top">
      <div class="route-buses-badges">
        <span class="route-lead-tag">${leadBusesText}</span>
        ${busBadgesHtml}
      </div>

      <div class="route-metrics-row">
        <div class="route-metric">
          <div class="metric-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="metric-text">
            <span class="metric-val">${match.duration}</span>
            <span class="metric-lbl">${durationLabel}</span>
          </div>
        </div>

        <div class="route-metric">
          <div class="metric-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
          <div class="metric-text">
            <span class="metric-val">${match.distance}</span>
            <span class="metric-lbl">${distanceLabel}</span>
          </div>
        </div>

        <div class="route-metric">
          <div class="metric-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
          </div>
          <div class="metric-text">
            <span class="metric-val">${match.frequency}</span>
            <span class="metric-lbl">${frequencyLabel}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Public Transit Line Diagram -->
    <div class="route-stops-section">
      <h4 class="stops-heading">${intermediateStopsText}</h4>
      <div class="transit-line-diagram" aria-label="Route intermediate stops timeline">
        ${stopsHtml}
      </div>
    </div>

    <!-- Bottom: Sample Fare Breakdown -->
    <div class="route-fare-summary">
      <span class="fare-tier-label" style="font-weight:800;">${fareHeader}</span>
      <div class="fare-pills-row">
        <div class="sample-fare-item">
          <span class="fare-tier-label">${isTa ? "சாதாரண:" : "Ordinary:"}</span>
          <strong class="fare-tier-value" style="color:#db2777;">${match.fareOrdinary}</strong>
        </div>
        <div class="sample-fare-item">
          <span class="fare-tier-label">${isTa ? "டீலக்ஸ்:" : "Deluxe:"}</span>
          <strong class="fare-tier-value" style="color:#0284c7;">${match.fareDeluxe}</strong>
        </div>
        <div class="sample-fare-item">
          <span class="fare-tier-label">${isTa ? "ஏசி வோல்வோ:" : "AC Volvo:"}</span>
          <strong class="fare-tier-value" style="color:#15803d;">${match.fareVolvo}</strong>
        </div>
      </div>
    </div>
  `;
}

// ==============================================================================
// 10. FARE ESTIMATOR & TICKET CALCULATOR
// ==============================================================================

function initFareEstimator() {
  const serviceButtons = document.querySelectorAll(".service-opt-btn");
  const stageSlider = document.getElementById("fare-stage-slider");
  const passengerSelect = document.getElementById("fare-passenger-type");

  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      serviceButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.fareServiceType = btn.getAttribute("data-service");
      calculateFare();
    });
  });

  stageSlider.addEventListener("input", (e) => {
    state.fareStage = parseInt(e.target.value, 10);
    updateStageBadge();
    calculateFare();
  });

  passengerSelect.addEventListener("change", (e) => {
    state.farePassengerType = e.target.value;
    calculateFare();
  });

  updateStageBadge();
  calculateFare();
}

function updateStageBadge() {
  const display = document.getElementById("fare-stage-display");
  if (!display) return;

  const stage = state.fareStage;
  const kmEst = stage * 3;
  if (state.currentLang === "ta") {
    display.textContent = `நிலை ${stage} (தோராயமாக ${kmEst - 2} - ${kmEst} கி.மீ)`;
  } else {
    display.textContent = `Stage ${stage} (Approx. ${kmEst - 2} - ${kmEst} km)`;
  }
}

function calculateFare() {
  const priceDisplay = document.getElementById("fare-price-num");
  const categoryDisplay = document.getElementById("fare-quote-category");
  if (!priceDisplay || !categoryDisplay) return;

  const stage = state.fareStage;
  const service = state.fareServiceType;
  const passenger = state.farePassengerType;

  let baseRate = 5;

  if (service === "ordinary") {
    baseRate = 5 + (stage - 1) * 1.5;
  } else if (service === "deluxe") {
    baseRate = 11 + (stage - 1) * 3.5;
  } else if (service === "volvo") {
    baseRate = 20 + (stage - 1) * 7.0;
  }

  let finalPrice = baseRate;
  let categoryNote = "General Adult";

  if (passenger === "women") {
    if (service === "ordinary") {
      finalPrice = 0.00;
      categoryNote = state.currentLang === "ta" 
        ? "மகளிர் விடியல் பயணம் (கட்டணமில்லை)" 
        : "Women Zero-Fare Scheme (FREE)";
    } else {
      categoryNote = state.currentLang === "ta" ? "மகளிர் (வழக்கமான கட்டணம்)" : "Women Passenger (Standard Fare)";
    }
  } else if (passenger === "student") {
    finalPrice = 0.00;
    categoryNote = state.currentLang === "ta" ? "மாணவர் இலவச பாஸ்" : "Student Pass Holder (FREE)";
  } else if (passenger === "child") {
    finalPrice = Math.max(3, Math.round(baseRate * 0.5));
    categoryNote = state.currentLang === "ta" ? "குழந்தை (50% சலுகைக் கட்டணம்)" : "Child Concession (50% Fare)";
  } else if (passenger === "senior") {
    if (service === "ordinary") {
      finalPrice = Math.max(3, Math.round(baseRate * 0.7));
      categoryNote = state.currentLang === "ta" ? "மூத்த குடிமக்கள் (சலுகை)" : "Senior Citizen Concession";
    } else {
      categoryNote = state.currentLang === "ta" ? "மூத்த குடிமக்கள்" : "Senior Citizen";
    }
  } else {
    categoryNote = state.currentLang === "ta" ? "பொதுவான பயணி" : "Standard Adult";
  }

  priceDisplay.textContent = finalPrice.toFixed(2);

  let serviceName = "Ordinary Service";
  if (service === "deluxe") serviceName = "Deluxe Express";
  if (service === "volvo") serviceName = "AC Volvo Low-Floor";

  if (state.currentLang === "ta") {
    if (service === "ordinary") serviceName = "சாதாரண பேருந்து";
    if (service === "deluxe") serviceName = "டீலக்ஸ் விரைவு";
    if (service === "volvo") serviceName = "ஏசி வோல்வோ";
  }

  categoryDisplay.textContent = `${serviceName} • ${categoryNote}`;
}

// ==============================================================================
// 11. TRAVEL INFORMATION & SAFETY SUBTABS
// ==============================================================================

function initTravelInfoTabs() {
  const tabs = document.querySelectorAll(".info-subtab");
  const panes = document.querySelectorAll(".info-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPane = tab.getAttribute("data-infotab");

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const activePane = document.getElementById(`pane-${targetPane}`);
      if (activePane) {
        activePane.classList.add("active");
      }
    });
  });
}

// ==============================================================================
// 12. ACCESSIBILITY CONTROLS (FONT RESIZING)
// ==============================================================================

function initAccessibilityControls() {
  const normalBtn = document.getElementById("btn-font-normal");
  const largeBtn = document.getElementById("btn-font-large");

  if (!normalBtn || !largeBtn) return;

  normalBtn.addEventListener("click", () => {
    document.body.classList.remove("font-large");
    normalBtn.classList.add("active");
    largeBtn.classList.remove("active");
  });

  largeBtn.addEventListener("click", () => {
    document.body.classList.add("font-large");
    largeBtn.classList.add("active");
    normalBtn.classList.remove("active");
  });
}

// ==============================================================================
// 13. KIOSK RESET & START AGAIN
// ==============================================================================

function initResetHandlers() {
  const resetBtn = document.getElementById("btn-kiosk-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetEntireKiosk();
    });
  }
}

function resetEntireKiosk() {
  console.log("Resetting kiosk to home screen...");

  navigateToView("home");
  resetBusFilters();

  const originSelect = document.getElementById("route-origin");
  const destSelect = document.getElementById("route-dest");
  if (originSelect) originSelect.value = "Gandhipuram";
  if (destSelect) destSelect.value = "";

  document.getElementById("route-default-prompt")?.classList.remove("hidden");
  document.getElementById("route-detail-card")?.classList.add("hidden");
  document.getElementById("route-not-found")?.classList.add("hidden");

  const stageSlider = document.getElementById("fare-stage-slider");
  if (stageSlider) stageSlider.value = 3;
  state.fareStage = 3;
  state.fareServiceType = "ordinary";
  state.farePassengerType = "adult";

  document.querySelectorAll(".service-opt-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === 0);
  });
  updateStageBadge();
  calculateFare();

  document.querySelectorAll(".info-subtab").forEach((t, idx) => {
    t.classList.toggle("active", idx === 0);
  });
  document.querySelectorAll(".info-pane").forEach((p, idx) => {
    p.classList.toggle("active", idx === 0);
  });

  resetIdleCountdown();
  closeIdleModal();
}

// ==============================================================================
// 14. KIOSK INACTIVITY WATCHER (IDLE TIMEOUT FOR PUBLIC TOUCHSCREENS)
// ==============================================================================

function initIdleWatcher() {
  const continueBtn = document.getElementById("btn-idle-continue");
  const resetNowBtn = document.getElementById("btn-idle-reset-now");

  const events = ["mousedown", "mousemove", "touchstart", "touchmove", "keydown", "scroll"];
  events.forEach((evt) => {
    window.addEventListener(evt, () => {
      if (!state.isModalOpen) {
        resetIdleCountdown();
      }
    }, { passive: true });
  });

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      closeIdleModal();
      resetIdleCountdown();
    });
  }

  if (resetNowBtn) {
    resetNowBtn.addEventListener("click", () => {
      closeIdleModal();
      resetEntireKiosk();
    });
  }

  resetIdleCountdown();
}

function resetIdleCountdown() {
  if (state.idleTimerId) clearTimeout(state.idleTimerId);
  if (state.idleIntervalId) clearInterval(state.idleIntervalId);

  state.idleTimerId = setTimeout(() => {
    if (state.currentView !== "home" || state.busSearchQuery) {
      showIdleModal();
    } else {
      resetIdleCountdown();
    }
  }, state.idleWarningThreshold);
}

function showIdleModal() {
  state.isModalOpen = true;
  state.idleCountdown = 15;

  const modal = document.getElementById("idle-timeout-modal");
  const countEl = document.getElementById("idle-countdown-seconds");
  if (modal) modal.classList.remove("hidden");
  if (countEl) countEl.textContent = state.idleCountdown;

  state.idleIntervalId = setInterval(() => {
    state.idleCountdown--;
    if (countEl) countEl.textContent = state.idleCountdown;

    if (state.idleCountdown <= 0) {
      clearInterval(state.idleIntervalId);
      closeIdleModal();
      resetEntireKiosk();
    }
  }, 1000);
}

function closeIdleModal() {
  state.isModalOpen = false;
  const modal = document.getElementById("idle-timeout-modal");
  if (modal) modal.classList.add("hidden");
  if (state.idleIntervalId) clearInterval(state.idleIntervalId);
}

// ==============================================================================
// 15. PHYSICAL KIOSK TOTEM HARDWARE SIMULATION
// ==============================================================================

function initTotemHardware() {
  const totemScene = document.getElementById("totem-scene");
  const btnModeTotem = document.getElementById("btn-mode-totem");
  const btnModeFullscreen = document.getElementById("btn-mode-fullscreen");
  const nfcPad = document.getElementById("totem-nfc-pad");
  const nfcToast = document.getElementById("totem-nfc-toast");
  const sosBtn = document.getElementById("totem-sos-button");
  const sosModal = document.getElementById("totem-sos-modal");
  const closeSosBtn = document.getElementById("btn-close-sos-modal");

  if (btnModeTotem && btnModeFullscreen && totemScene) {
    btnModeTotem.addEventListener("click", () => {
      totemScene.classList.remove("mode-fullscreen");
      totemScene.classList.add("mode-totem");
      btnModeTotem.classList.add("active");
      btnModeFullscreen.classList.remove("active");
    });

    btnModeFullscreen.addEventListener("click", () => {
      totemScene.classList.remove("mode-totem");
      totemScene.classList.add("mode-fullscreen");
      btnModeFullscreen.classList.add("active");
      btnModeTotem.classList.remove("active");
    });
  }

  if (nfcPad && nfcToast) {
    let toastTimeout = null;

    nfcPad.addEventListener("click", () => {
      nfcPad.style.transform = "scale(0.97)";
      setTimeout(() => { nfcPad.style.transform = ""; }, 180);

      playAudioBeep(880, 0.12);

      nfcToast.classList.remove("hidden");
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        nfcToast.classList.add("hidden");
      }, 4500);
    });

    nfcPad.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nfcPad.click();
      }
    });
  }

  if (sosBtn && sosModal && closeSosBtn) {
    sosBtn.addEventListener("click", () => {
      playAudioBeep(440, 0.15);
      setTimeout(() => { playAudioBeep(880, 0.15); }, 150);

      sosModal.classList.remove("hidden");
    });

    closeSosBtn.addEventListener("click", () => {
      sosModal.classList.add("hidden");
    });

    sosBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sosBtn.click();
      }
    });
  }
}

function playAudioBeep(freq = 600, duration = 0.1) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.log("AudioContext simulation not supported or blocked.");
  }
}
