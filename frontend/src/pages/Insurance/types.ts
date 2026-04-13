export interface ComparisonFeature {
  name: string;
  description: string;
  standardValue: string;
  eliteValue: string;
  standardStatus: 'check' | 'warning' | 'cancel';
  eliteStatus: 'check' | 'warning' | 'cancel';
  isEliteHighlight?: boolean;
}

export interface ComparisonCategory {
  title: string;
  features: ComparisonFeature[];
}
