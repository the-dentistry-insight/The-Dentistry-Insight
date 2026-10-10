import type { NormalizedItem } from "@/lib/sections";

export const COUNTRY_KEYWORDS: Record<string, string[]> = {
  pakistan: [
    "pakistan", "karachi", "lahore", "islamabad", "rawalpindi", "faisalabad", "multan", "peshawar",
    "quetta", "sialkot", "gujranwala", "sargodha", "rawat", "sadiqabad", "bahawalpur", "sukkur",
    "larkana", "sheikhupura", "jhang", "rahim yar khan", "gujrat", "kasur", "mardan", "mingora",
    "nawabshah", "sahiwal", "okara", "wah cantonment", "wah cantt", "dera ghazi khan", "dg khan",
    "mirpur khas", "kohat", "hyderabad", "abbottabad", "muzaffarabad", "gilgit", "skardu",
    "chiniot", "kamoke", "hafizabad", "burewala", "jacobabad", "attock", "vehari", "chakwal",
    "mandi bahauddin", "jhelum", "toba tek singh", "layyah", "muzaffargarh", "khanewal", "kot addu",
    "nowshera", "charsadda", "swat", "bannu", "dera ismail khan", "bahawalnagar", "daska", "gojra",
    "pattoki", "shikarpur", "khairpur", "dadu", "sanghar", "badin", "tando adam", "mirpur azad kashmir",
    "kotli", "chishtian", "ghotki",
  ],
  usa: [
    "usa", "u.s.a", "united states", "america", "u.s.", "new york", "los angeles", "chicago",
    "houston", "phoenix", "philadelphia", "san antonio", "san diego", "dallas", "san jose",
    "austin", "jacksonville", "fort worth", "columbus", "charlotte", "san francisco", "indianapolis",
    "seattle", "denver", "washington", "boston", "nashville", "detroit", "portland", "memphis",
    "las vegas", "louisville", "baltimore", "milwaukee", "albuquerque", "tucson", "fresno",
    "sacramento", "atlanta", "miami", "oakland", "minneapolis", "tulsa", "cleveland", "wichita",
    "arlington", "california", "texas", "florida", "ohio", "georgia", "michigan", "virginia",
    "new jersey", "north carolina",
  ],
  indonesia: [
    "indonesia", "jakarta", "surabaya", "bandung", "medan", "semarang", "makassar", "palembang",
    "depok", "tangerang", "bekasi", "bali", "denpasar", "yogyakarta", "malang", "bogor",
  ],
  uae: [
    "uae", "u.a.e", "united arab emirates", "dubai", "sharjah", "abu dhabi", "ajman",
    "ras al khaimah", "fujairah", "umm al quwain", "al ain",
  ],
  "saudi arabia": [
    "saudi", "ksa", "riyadh", "jeddah", "mecca", "makkah", "medina", "madinah", "dammam",
    "khobar", "al khobar", "taif", "tabuk", "abha", "jubail", "yanbu", "najran", "hail", "buraidah",
  ],
  australia: [
    "australia", "sydney", "melbourne", "brisbane", "perth", "adelaide", "gold coast",
    "canberra", "newcastle nsw", "hobart", "darwin",
  ],
  qatar: ["qatar", "doha", "al rayyan", "al wakrah", "umm salal"],
  uk: [
    "uk", "u.k", "united kingdom", "england", "london", "scotland", "wales", "britain",
    "great britain", "manchester", "birmingham", "liverpool", "leeds", "glasgow", "edinburgh",
    "bristol", "sheffield", "cardiff", "belfast", "newcastle upon tyne", "nottingham", "leicester",
  ],
  newzealand: [
    "new zealand", "nz", "auckland", "wellington", "christchurch", "hamilton nz", "kiwi",
    "dunedin", "tauranga",
  ],
  canada: [
    "canada", "canadian", "toronto", "vancouver", "montreal", "calgary", "ottawa", "edmonton",
    "winnipeg", "ontario", "alberta", "quebec", "british columbia", "manitoba",
  ],
  india: [
    "india", "indian", "delhi", "new delhi", "mumbai", "bangalore", "bengaluru", "chennai",
    "hyderabad india", "kolkata", "pune", "ahmedabad", "jaipur", "surat", "lucknow",
  ],
};

export const COUNTRY_LABELS: Record<string, string> = {
  pakistan: "Pakistan",
  usa: "USA",
  indonesia: "Indonesia",
  uae: "UAE",
  "saudi arabia": "Saudi Arabia",
  australia: "Australia",
  qatar: "Qatar",
  uk: "UK",
  newzealand: "New Zealand",
  canada: "Canada",
  india: "India",
  other: "Other",
};

export const COUNTRY_CODE_MAP: Record<string, string> = {
  PK: "pakistan",
  US: "usa",
  ID: "indonesia",
  AE: "uae",
  SA: "saudi arabia",
  AU: "australia",
  QA: "qatar",
  GB: "uk",
  NZ: "newzealand",
  CA: "canada",
  IN: "india",
};

export function itemMatchesCountry(item: NormalizedItem, countryKey: string): boolean {
  const text = `${item.subtitle || ""} ${item.title || ""}`.toLowerCase();
  if (countryKey === "other") {
    return !Object.values(COUNTRY_KEYWORDS).some((words) =>
      words.some((w) => text.includes(w))
    );
  }
  const words = COUNTRY_KEYWORDS[countryKey] || [countryKey];
  return words.some((w) => text.includes(w));
}

export function itemMatchesAnyCountry(item: NormalizedItem, countryKeys: string[]): boolean {
  return countryKeys.some((countryKey) => itemMatchesCountry(item, countryKey));
}
