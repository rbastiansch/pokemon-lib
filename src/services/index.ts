const req = (query: string) => {
  const result = fetch('https://graphql-pokemon.now.sh/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(res => res.data);
  return result;
};


export const getPokemons = () => {
  const query = `{
    pokemons(first: 10) {
      id
      name
      number
      types
    }
  }`;
  return req(query);
};

export const getPokemon = (id: string) => {
  const query = `{
    pokemon(id: "${id}") {
      name
      maxCP
      maxHP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }`;
  return req(query);
};
