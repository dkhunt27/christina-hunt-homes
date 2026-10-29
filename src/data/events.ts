import type { Season, SiteEvent } from "../types";

export const EVENTS: Record<Season, SiteEvent[]> = {
  fall: [
    {
      name: "Cider mill season",
      when: "Sep–Nov",
      where: "Orchards across Oakland, Macomb & Livingston",
    },
    { name: "Arts, Beats & Eats", when: "Labor Day", where: "Downtown Royal Oak" },
    { name: "America's Thanksgiving Parade", when: "Nov", where: "Woodward Ave, Detroit" },
    { name: "Big Bright Light Show begins", when: "Late Nov", where: "Downtown Rochester" },
  ],
  winter: [
    { name: "Ice skating at Campus Martius", when: "Nov–Mar", where: "Downtown Detroit" },
    { name: "Plymouth Ice Festival", when: "Winter", where: "Kellogg Park, Plymouth" },
    { name: "Big Bright Light Show", when: "Thru early Jan", where: "Downtown Rochester" },
    { name: "Pączki Day", when: "Fat Tuesday", where: "Hamtramck bakeries" },
  ],
  spring: [
    { name: "Ann Arbor Film Festival", when: "Mar", where: "Downtown Ann Arbor" },
    { name: "Tigers Opening Day", when: "Late Mar / Apr", where: "Comerica Park, Detroit" },
    { name: "Flower Day", when: "May", where: "Eastern Market, Detroit" },
    {
      name: "Farmers markets reopen outdoors",
      when: "May",
      where: "Royal Oak, Plymouth, Ann Arbor & more",
    },
  ],
  summer: [
    { name: "Ford Fireworks", when: "Jun", where: "Detroit riverfront" },
    { name: "Ann Arbor Art Fair", when: "Jul", where: "Downtown Ann Arbor" },
    { name: "Woodward Dream Cruise", when: "Aug", where: "Woodward Ave, Ferndale to Pontiac" },
    { name: "Concerts in the park", when: "Summer Fri", where: "Kellogg Park, Plymouth" },
  ],
};
