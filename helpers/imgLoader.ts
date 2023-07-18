export default function imgLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return quality
    ? `https://image.tmdb.org/t/p/w250_and_h141_face${src}`
    : src === "null" ?
      "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" : `https://image.tmdb.org/t/p/original${src}`;
};