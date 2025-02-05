class MovieCharacter {
  #name: string | null = null;
  #side: string | null = null;
  #actor: string | null = null;

  constructor(name: string | null, side: string | null, actor: string | null) {
    this.#name = name;
    this.#side = side;
    this.#actor = actor;
  }

  get side(): string | null {
    return this.#side;
  }

  get name(): string | null {
    return this.#name;
  }

  get actor(): string | null {
    return this.#actor;
  }

}

export default MovieCharacter;
