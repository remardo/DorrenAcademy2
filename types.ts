export interface NavItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AudienceRole {
  id: string;
  title: string;
  description: string;
  microCase: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons?: Lesson[];
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  imagePrompt?: string; // For placeholder visualization
  interactiveLabel?: string;
}

export interface Risk {
  title: string;
  tooltip: string;
}
