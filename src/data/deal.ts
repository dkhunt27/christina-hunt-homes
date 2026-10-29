/** Sample deal for the My Hub preview. Real deals come from the `deals` table. */
export const SAMPLE_DEAL = {
  address: "1118 Vinsetta Blvd, Royal Oak",
  /** Days from today; negative means the step is done. */
  steps: [
    { title: "Offer accepted", desc: "You and the sellers agreed on terms.", offset: -12 },
    { title: "Earnest money sent", desc: "Deposited with the title company.", offset: -11 },
    {
      title: "Home inspection",
      desc: "Done. The sellers agreed to fix the furnace venting.",
      offset: -6,
    },
    {
      title: "Appraisal",
      desc: "The appraiser visits the home. You don't need to be there.",
      offset: 3,
    },
    {
      title: "Loan approval",
      desc: 'Your lender issues final approval, called "clear to close."',
      offset: 10,
    },
    {
      title: "Final walk-through",
      desc: "We'll walk the house together the day before closing.",
      offset: 20,
    },
    { title: "Closing day", desc: "Sign, get your keys, and celebrate.", offset: 21 },
  ],
};
