interface MeditationImageProps {
  image: string;
  title: string;
}

export const MeditationImage = ({ image, title }: MeditationImageProps) => (
  <div className="relative h-48">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
    />
  </div>
);