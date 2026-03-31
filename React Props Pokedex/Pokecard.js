function Pokecard(props) {

  const imgSrc =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;

  return (
    <div className="pokecard">
      <h4>{props.name}</h4>
      <img src={imgSrc} alt={props.name}/>
      <p>Type: {props.type}</p>
      <p>EXP: {props.base_experience}</p>
    </div>
  );
}