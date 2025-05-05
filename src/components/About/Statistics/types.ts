/** Demographics breakdown */
export interface DemographicData {
    women: number;
    men: number;
}
  
// Age group percentages
export interface AgeData {
    young: number;  // 18-34
    middle: number; // 35-54
    older: number;  // 55-65+
}

// Country ranking info
export interface CountryData {
    name: string;
    rank: number;
}

// Monthly engagement metrics
export interface EngagementData {
    publications: number;
    comments: number;
}

// Monthly activity metrics
export interface ActivityData {
    activeMembers: number;
    reactions: number;
}

// Full statistics dataset
export interface StatisticsData {
    totalMembers: number;
    demographics: DemographicData;
    ageGroups: AgeData;
    countries: CountryData[];
    engagement: EngagementData;
    activity: ActivityData;
}