/* Sämtliche Lerninhalte der Schulung — 1:1 aus der ursprünglichen Single-File-Version. */

export const LEVEL_TITLES: Record<number, string> = {
  1: "Willkommen in der KI-Welt",
  2: "Wie KI „denkt“",
  3: "Ihre Daten, Ihre Verantwortung",
  4: "Die Spielregeln der EU",
  5: "Verantwortung im Alltag",
  6: "Abschluss-Check",
};

export const VIDEOS: Record<number, string> = {
  1: "/media/l1.mp4",
  2: "/media/l2.mp4",
  3: "/media/l3.mp4",
  4: "/media/l4.mp4",
  5: "/media/l5.mp4",
};

export const IMAGES = {
  hero: "/media/hero.jpg",
  final: "/media/final.jpg",
  scenes: ["/media/sz_a.jpg", "/media/sz_b.jpg", "/media/sz_c.jpg"],
} as const;

/* ---------- Level 2: Irrtum oder Fakt ---------- */
export type Flip = { q: string; fakt: boolean; res: string };

export const FLIPS: Flip[] = [
  {
    q: "„ChatGPT schlägt die Antwort in einer geprüften Datenbank nach.“",
    fakt: false,
    res: "Irrtum. Es berechnet Wort für Wort die wahrscheinlichste Fortsetzung — eine Faktenprüfung findet nicht statt.",
  },
  {
    q: "„Eine KI kann Quellen und Gerichtsurteile erfinden, die es nie gab.“",
    fakt: true,
    res: "Fakt. Die klassische Halluzination — damit sind schon Anwälte vor Gericht aufgeflogen.",
  },
  {
    q: "„Wenn die Antwort flüssig und selbstbewusst klingt, stimmt sie meistens.“",
    fakt: false,
    res: "Irrtum. Der überzeugende Ton ist eingebaut — er sagt nichts über die Wahrheit aus.",
  },
  {
    q: "„KI-Systeme können Vorurteile aus ihren Trainingsdaten übernehmen.“",
    fakt: true,
    res: "Fakt. Bias ist ein bekanntes Risiko — etwa bei Bewerbungs- oder Kreditentscheidungen.",
  },
  {
    q: "„Dieselbe Frage kann heute eine andere Antwort ergeben als morgen.“",
    fakt: true,
    res: "Fakt. Die Berechnung enthält Zufall — Antworten sind nicht exakt reproduzierbar.",
  },
  {
    q: "„Für wichtige Zahlen und Rechtsfragen reicht die KI-Antwort als Beleg.“",
    fakt: false,
    res: "Irrtum. Genau hier ist der Faktencheck gegen Originalquellen Pflicht.",
  },
];

/* ---------- Level 3: Finde die 4 Fehler ---------- */
export type Token = { t: string; err: number; why?: string };

export const TOKENS: Token[] = [
  { t: "Schreibe eine freundliche Zahlungserinnerung an ", err: 0 },
  {
    t: "Herrn Thomas Berger (t.berger@krausegmbh.de)",
    err: 1,
    why: "Klarname + E-Mail = personenbezogene Daten. Anonymisieren: „unser Kunde“.",
  },
  { t: ". Er schuldet uns noch ", err: 0 },
  {
    t: "12.400 € für das Projekt Phoenix",
    err: 2,
    why: "Konkrete Beträge und Projektnamen sind Geschäftsdaten — Platzhalter verwenden.",
  },
  { t: ". Zur Info: Wir geben ihm nur noch bis Monatsende, weil ", err: 0 },
  {
    t: "unsere Firma gerade in Liquiditätsproblemen steckt",
    err: 3,
    why: "Interne Finanzlage ist ein Geschäftsgeheimnis — geht kein externes Tool etwas an.",
  },
  { t: ". Unser Login fürs Buchhaltungsportal ist übrigens ", err: 0 },
  {
    t: "rechnung2026!",
    err: 4,
    why: "Zugangsdaten niemals eingeben — die KI kann sie weder nutzen noch vergessen.",
  },
  { t: ", falls du die Rechnung nachschauen willst.", err: 0 },
];

/* ---------- Level 4: Risikoklassen ---------- */
export type RiskCat = "verboten" | "hoch" | "transp" | "min";
export type DdItem = { t: string; cat: RiskCat; why: string };

export const DD: DdItem[] = [
  {
    t: "Software bewertet automatisch eingehende Bewerbungen",
    cat: "hoch",
    why: "Hochrisiko: KI bei der Personalauswahl — nur mit menschlicher Aufsicht und Dokumentation.",
  },
  {
    t: "Chatbot beantwortet Kundenfragen auf der Website",
    cat: "transp",
    why: "Begrenztes Risiko: Der Chatbot muss sich als KI zu erkennen geben (Transparenzpflicht).",
  },
  {
    t: "Punktesystem bewertet Bürger nach Sozialverhalten",
    cat: "verboten",
    why: "Social Scoring ist in der EU verboten.",
  },
  {
    t: "Spamfilter im E-Mail-Postfach",
    cat: "min",
    why: "Minimales Risiko: frei nutzbar.",
  },
  {
    t: "Kamera erkennt Emotionen der Mitarbeitenden im Büro",
    cat: "verboten",
    why: "Emotionserkennung am Arbeitsplatz ist verboten.",
  },
  {
    t: "KI-generiertes Produktbild für die Werbekampagne",
    cat: "transp",
    why: "Begrenztes Risiko: KI-Bilder müssen gekennzeichnet werden.",
  },
];

export const DD_CATS: { cat: RiskCat; label: string; cls: string }[] = [
  { cat: "verboten", label: "🚫 Verboten", cls: "cat-verboten" },
  { cat: "hoch", label: "⚠️ Hochrisiko", cls: "cat-hoch" },
  { cat: "transp", label: "👁️ Begrenzt (Transparenz)", cls: "cat-transp" },
  { cat: "min", label: "✅ Minimal", cls: "cat-min" },
];

/* ---------- Level 5: Branching-Story ---------- */
export type Grade = "best" | "okay" | "risky";
export type SceneOption = { t: string; grade: Grade; xp: number; fb: string };
export type Scene = { title: string; img: number; text: string; opts: SceneOption[] };

export const SCENES: Scene[] = [
  {
    title: "Szene 1: Die Präsentation",
    img: 0,
    text: "Die KI hat Ihnen eine Marktanalyse mit beeindruckenden Zahlen geschrieben. Ihr Chef wartet auf die Präsentation — in 20 Minuten.",
    opts: [
      {
        t: "Ich prüfe die Zahlen stichprobenartig gegen die Originalquellen — und bitte notfalls um 10 Minuten Aufschub.",
        grade: "best",
        xp: 15,
        fb: "Genau richtig: Lieber kurz später als falsch präsentiert. Ungeprüfte KI-Zahlen sind die teuersten Fehler.",
      },
      {
        t: "Ich präsentiere, sage aber dazu, dass die Zahlen KI-generiert und ungeprüft sind.",
        grade: "okay",
        xp: 8,
        fb: "Transparenz ist gut — aber ungeprüfte Zahlen gehören in keine Entscheidungsvorlage. Prüfen schlägt Warnhinweis.",
      },
      {
        t: "Ich präsentiere direkt — die KI-Analyse klang absolut plausibel.",
        grade: "risky",
        xp: 0,
        fb: "Riskant: Plausibel ist nicht korrekt. Genau so entstehen Halluzinations-Blamagen vor versammelter Runde.",
      },
    ],
  },
  {
    title: "Szene 2: Das Newsletter-Bild",
    img: 1,
    text: "Sie haben mit KI ein fotorealistisches Bild für den Kunden-Newsletter erstellt.",
    opts: [
      {
        t: "Ich kennzeichne es als KI-generiert und versende den Newsletter.",
        grade: "best",
        xp: 15,
        fb: "Richtig: Die KI-VO verlangt Kennzeichnung von KI-Bildern — und ehrlich gegenüber der Kundschaft ist es obendrein.",
      },
      {
        t: "Ich versende ohne Hinweis — ist doch nur ein Deko-Bild.",
        grade: "risky",
        xp: 0,
        fb: "Riskant: Fotorealistische KI-Bilder ohne Kennzeichnung können gegen die Transparenzpflicht der KI-VO verstoßen.",
      },
      {
        t: "Ich verzichte sicherheitshalber ganz auf das KI-Bild.",
        grade: "okay",
        xp: 8,
        fb: "Erlaubt wäre es — mit Kennzeichnung. Verzicht ist unnötig vorsichtig, aber immerhin regelkonform.",
      },
    ],
  },
  {
    title: "Szene 3: Der Fehler",
    img: 2,
    text: "Ihnen fällt auf: Vorgestern haben Sie versehentlich eine Kundenliste in ein öffentliches KI-Tool kopiert.",
    opts: [
      {
        t: "Ich informiere sofort die interne Ansprechstelle bzw. den Datenschutz.",
        grade: "best",
        xp: 15,
        fb: "Stark: Bei Personendaten laufen Meldefristen — schnelle Meldung ist Pflicht und ein Zeichen von Kompetenz, nicht von Schwäche.",
      },
      {
        t: "Ich lösche den Chat-Verlauf und hoffe, dass nichts passiert.",
        grade: "risky",
        xp: 0,
        fb: "Riskant: Löschen im Chat holt die Daten nicht zurück — und verschleppt die vorgeschriebene Meldung.",
      },
      {
        t: "Ich erwähne es beiläufig beim nächsten Teammeeting.",
        grade: "okay",
        xp: 8,
        fb: "Besser als schweigen — aber bei Personendaten zählt jede Stunde. Direkt melden!",
      },
    ],
  },
];

/* ---------- Level 6: Abschluss-Check (a[0] ist jeweils die richtige Antwort) ---------- */
export type Question = { q: string; topic: string; a: string[] };

export const QUESTIONS: Question[] = [
  {
    q: "Warum bietet unser Unternehmen diese Schulung an?",
    topic: "Artikel 4 (Level 1)",
    a: [
      "Artikel 4 der KI-Verordnung verlangt, die KI-Kompetenz der Beschäftigten zu fördern",
      "Weil KI-Nutzung am Arbeitsplatz grundsätzlich verboten ist",
      "Nur Führungskräfte müssen KI verstehen",
    ],
  },
  {
    q: "Wie erzeugt ein Sprachmodell wie ChatGPT seine Antworten?",
    topic: "Funktionsweise (Level 2)",
    a: [
      "Es berechnet Wort für Wort die wahrscheinlichste Fortsetzung",
      "Es schlägt in einer geprüften Faktendatenbank nach",
      "Es fragt im Hintergrund menschliche Experten",
    ],
  },
  {
    q: "Was ist eine „Halluzination“?",
    topic: "Halluzinationen (Level 2)",
    a: [
      "Die KI erfindet überzeugend klingende, aber falsche Fakten oder Quellen",
      "Ein Bildfehler bei KI-generierten Fotos",
      "Eine absichtliche Lüge der KI, um zu gefallen",
    ],
  },
  {
    q: "Welche Eingabe wäre in einem öffentlichen KI-Tool in Ordnung?",
    topic: "Datenschutz (Level 3)",
    a: [
      "„Formuliere eine freundliche Zahlungserinnerung an einen Kunden (Platzhalter: [Name])“",
      "„Fasse den beigefügten Vertrag der Krause GmbH zusammen“",
      "„Schreibe eine Absage an Bewerberin Julia Sommer, geb. 12.3.1990“",
    ],
  },
  {
    q: "Ein Chatbot berät Kundschaft auf Ihrer Website. Was verlangt die KI-VO?",
    topic: "Transparenz (Level 4)",
    a: [
      "Er muss als KI erkennbar sein (Transparenzpflicht)",
      "Er ist als Hochrisiko-System genehmigungspflichtig",
      "Er ist in der EU verboten",
    ],
  },
  {
    q: "Welche KI-Praxis ist in der EU verboten?",
    topic: "Verbotene Praktiken (Level 4)",
    a: [
      "Emotionserkennung der Beschäftigten am Arbeitsplatz",
      "KI-gestützte Rechtschreibprüfung",
      "Automatische Übersetzung von E-Mails",
    ],
  },
  {
    q: "KI hat Bewerbungen vorsortiert. Was gilt?",
    topic: "Hochrisiko (Level 4)",
    a: [
      "Hochrisiko-Anwendung: Ein Mensch muss die Entscheidung überwachen und verantworten",
      "Die Vorsortierung darf automatisch endgültig entscheiden, das spart Zeit",
      "Solche Systeme fallen unter minimales Risiko",
    ],
  },
  {
    q: "Sie haben versehentlich Kundendaten in ein öffentliches Tool eingegeben. Was tun?",
    topic: "Vorfall melden (Level 5)",
    a: [
      "Sofort die interne Ansprechstelle bzw. den Datenschutz informieren",
      "Chatverlauf löschen — dann sind die Daten wieder weg",
      "Nichts — Eingaben in KI-Tools sind immer anonym",
    ],
  },
  {
    q: "Was bleibt bei jeder KI-Nutzung Ihre Aufgabe?",
    topic: "Verantwortung (Level 5)",
    a: [
      "Ergebnisse prüfen, KI-Inhalte kennzeichnen, Verantwortung behalten",
      "Nichts — für freigegebene Tools haftet der Anbieter",
      "Nur die Rechtschreibung der KI-Texte kontrollieren",
    ],
  },
];

export const MERKSAETZE: string[] = [
  "KI ist längst Teil Ihres Arbeitsalltags — wer sie versteht, arbeitet sicherer und besser.",
  "KI rät brillant — aber sie weiß nichts. Prüfen Sie, bevor Sie vertrauen.",
  "Was Sie in eine öffentliche KI eingeben, haben Sie aus der Hand gegeben. (Postkarten-Regel!)",
  "Je größer das Risiko, desto strenger die Regeln: verboten · Hochrisiko · Transparenz · minimal.",
  "KI liefert Entwürfe — die Entscheidung und die Verantwortung bleiben bei Ihnen.",
  "Bei Unsicherheit: erst die interne KI-Ansprechstelle fragen, dann handeln. Fehler sofort melden.",
];
