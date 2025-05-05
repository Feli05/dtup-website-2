import type { StatisticsData } from "./types";

// Static dataset for statistics
export const STATISTICS: StatisticsData = {
  totalMembers: 52000,
  demographics: { women: 83, men: 17 },
  ageGroups: { young: 16, middle: 60, older: 23 },
  countries: [
    { name: "Costa Rica",     rank: 1 },
    { name: "Estados Unidos", rank: 2 },
    { name: "España",         rank: 3 },
    { name: "Nicaragua",      rank: 4 },
    { name: "México",         rank: 5 },
  ],
  engagement: { publications: 1800, comments: 24500 },
  activity:   { activeMembers: 38700, reactions: 37500 },
};