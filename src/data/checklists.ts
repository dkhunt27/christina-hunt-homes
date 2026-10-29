import type { ChecklistKey, ChecklistPhase } from "../types";

export const CHECKLISTS: Record<ChecklistKey, ChecklistPhase[]> = {
  buy: [
    {
      title: "Get ready",
      when: "2–3 months out",
      items: [
        [
          "Check your credit score",
          "Free at annualcreditreport.com. Higher scores mean better rates.",
        ],
        [
          "Get pre-approved by a lender",
          "Sellers take your offer seriously. I can introduce you to local lenders.",
        ],
        [
          "Set a budget that includes closing costs",
          "Plan on about 2–5% of the price, plus moving.",
        ],
        ["List your must-haves vs. nice-to-haves", "Bedrooms, commute, yard, schools. Rank them."],
      ],
    },
    {
      title: "Go shopping",
      when: "Weeks 1–6",
      items: [
        [
          "Save a search here so new homes text you",
          "Good homes in Southeast Michigan can go in a weekend.",
        ],
        ["Tour homes and use tour notes", "Rate each home on its listing page while you're there."],
        [
          "Ask about taxes, utilities and HOA fees",
          "Taxes vary a lot from city to city here. I'll pull the real numbers.",
        ],
      ],
    },
    {
      title: "Under contract",
      when: "About 30–45 days",
      items: [
        ["Send earnest money", "Usually within 1–2 days of acceptance."],
        ["Schedule the home inspection", "Within your inspection window. I'll attend with you."],
        ["Lock your rate and finish the loan file", "Respond to lender requests quickly."],
        ["Shop homeowner's insurance", "Your lender needs proof before closing."],
      ],
    },
    {
      title: "Closing & move-in",
      when: "Final week",
      items: [
        ["Do the final walk-through", "Make sure agreed repairs were done."],
        [
          "Bring photo ID and certified funds",
          "Wire instructions only from your title company. Call to confirm.",
        ],
        ["Transfer utilities", "See the Moving day tab for the full list."],
        ["Change the locks and celebrate", "You're home!"],
      ],
    },
  ],
  sell: [
    {
      title: "Prep the house",
      when: "4–6 weeks out",
      items: [
        ["Declutter one room at a time", "Pack up off-season things early. You're moving anyway."],
        ["Handle small repairs", "Leaky faucets, sticky doors, burnt-out bulbs."],
        ["Deep clean, including windows", "Buyers notice light."],
        [
          "Ask about a point-of-sale inspection",
          "Some Southeast Michigan cities require one before you sell. I'll check yours.",
        ],
      ],
    },
    {
      title: "Get listed",
      when: "1–2 weeks out",
      items: [
        ["Pricing chat with me", "We'll look at recent sales on your street together."],
        ["Professional photos and staging", "I schedule these for you."],
        ["Fill out the Seller's Disclosure Statement", "Be honest. It protects you."],
      ],
    },
    {
      title: "Showings & offers",
      when: "Weeks 1–4",
      items: [
        ["Keep it showing-ready", "A quick 10-minute tidy each morning."],
        ["Step out during showings", "Buyers relax when owners aren't home."],
        ["Review offers with me", "Price is only one part. Terms matter too."],
      ],
    },
    {
      title: "Closing",
      when: "About 30–45 days",
      items: [
        ["Schedule movers", "Book early, especially in summer."],
        ["Cancel or transfer utilities", "Set the end date for closing day."],
        ["Leave keys, garage remotes and manuals", "A little welcome note is a kind touch."],
      ],
    },
  ],
  move: [
    {
      title: "Book & sort",
      when: "3–4 weeks out",
      items: [
        ["Book movers or reserve a truck", "Summer weekends and month-end fill up fast."],
        ["Start a donate pile", "Many donation centers will pick up furniture for free."],
        ["Gather boxes and print room labels", "Labels are at the bottom of this page."],
      ],
    },
    {
      title: "Set up utilities",
      when: "2 weeks out",
      items: [
        [
          "Electric and gas",
          "Most of the area is DTE Energy; some addresses use Consumers Energy. Check yours.",
        ],
        ["Water and sewer", "Set up with your city or township."],
        ["Internet", "Schedule install for move-in day or earlier."],
        ["Trash & recycling day", "Your city's website will have the pickup schedule."],
      ],
    },
    {
      title: "Update your address",
      when: "1–2 weeks out",
      items: [
        ["USPS change of address", "Takes about five minutes online."],
        [
          "Driver's license & voter registration",
          "Update through the Michigan Secretary of State.",
        ],
        ["Banks, employer, and subscriptions", "Don't forget pharmacy and vet records."],
      ],
    },
    {
      title: "Move-in day",
      when: "The big day",
      items: [
        ["Photograph meters at both homes", "Proof of final and starting readings."],
        ["Find the water shut-off and breaker panel", "Before you need them."],
        ["Make the beds first", "Future you will thank you."],
        ["Say hi to a neighbor", "The best part of a new street."],
      ],
    },
  ],
};

export const CHECKLIST_TABS: [ChecklistKey, string][] = [
  ["buy", "I'm buying"],
  ["sell", "I'm selling"],
  ["move", "Moving day"],
];

/** Labels for the home page's to-do progress panel. */
export const CHECKLIST_PROGRESS_LABELS: Record<ChecklistKey, string> = {
  buy: "Buying a home",
  sell: "Selling a home",
  move: "Moving day",
};

export const BOX_LABELS = [
  "Kitchen",
  "Living room",
  "Primary bedroom",
  "Bedroom 2",
  "Bathroom",
  "Office",
  "Basement",
  "Garage",
];
