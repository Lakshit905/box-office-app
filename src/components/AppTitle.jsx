export default function AppTitle(prop) {
  const {
    title = 'Box Office',
    subtitle = 'Are you looking for a movie or an actor ?',
  } = prop;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
