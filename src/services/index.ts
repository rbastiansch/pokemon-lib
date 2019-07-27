const req = (query: string) => {
  fetch('https://graphql-pokemon.now.sh/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
};


export const getPokemons = () => {
  const query = `{
    pokemons(first: 10) {
      name
    }
  }`;
  req(query);
};
