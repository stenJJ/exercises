function Pokedex(props) {
  return (
    <div className="pokedex">
      <h2>Total EXP: {props.exp}</h2>

      {props.pokemon.map(p => (
        <Pokecard
          key={p.id}
          id={p.id}
          name={p.name}
          type={p.type}
          base_experience={p.base_experience}
        />
      ))}

      {props.isWinner && <h3 className="winner">THIS HAND WINS!</h3>}
    </div>
  );
}