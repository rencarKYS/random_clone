interface Iprops {
  src: string;
  name: string;
}

export default function LazyImage({ src, name }: Iprops) {
  return <img src={src} alt={name} />;
}
