import ImageCarouselBasic, {
  CarouselImages,
} from '@/components/commerce-ui/image-carousel-basic';

// const images: Props= [
//   {
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-02.jpg',
//   },
//   {
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-03.jpg',
//   },
//   {
//     url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-04.jpg',
//   },
// ];

interface Props {
  images: { url: string }[];
}

export default function Carousel({ images }: Props) {
  return <ImageCarouselBasic images={images} imageFit='contain' />;
}
