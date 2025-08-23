export interface Activity {
  id: number;
  vendorId: number;
  name: string;
  description: string;
  categoryId: number;
  duration: string;
  price: number;
  capacity: number;
  location: string;
  availability: {
    type: 'weekly' | 'monthly' | 'dates' | 'range';
    dates?: { date: string; time: { start: string; end: string } }[];
    range?: {
      date: { start: string; end: string };
      time: {
        end: string;
        start: string;
      };
    };
    weekly?: {
      date: {
        end: string;
        start: string;
      };
      days: number[];
      time: {
        end: string;
        start: string;
      };
    };
    monthly?: {
      date: {
        end: string;
        start: string;
      };
      days: number[];
      time: {
        end: string;
        start: string;
      };
    };
    exclusions: string[];
  };
  images: {
    video: string;
    images: string[];
    thumbnail: string;
  };
  quota: number;
  discount: number;
  timestamp: string;
  vendor: {
    id: number;
    name: string;
  };
}
