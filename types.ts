
export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AnimationVariant {
  FADE_IN = 'fadeIn',
  SLIDE_UP = 'slideUp',
  STAGGER_CHILDREN = 'staggerChildren'
}
