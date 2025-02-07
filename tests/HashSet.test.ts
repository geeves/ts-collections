import HashSet from "../src/HashSet";
import MovieCharacter from "./MovieCharacter";


const starwarsCharacters = [
	["Anakin", new MovieCharacter("Anakin Skywalker", "Jedi", "Hayden")],
	["Obi-Wan", new MovieCharacter("Obi-Wan Kenobi", "Jedi", "Alec Guiness")],
	["Yoda", new MovieCharacter("Yoda", "Jedi", "Frank Oz")],
	["Sidious", new MovieCharacter("Sheeve Palpatine", "Sith", "Dew It")],
	["Vader", new MovieCharacter("Darth Vader", "Sith", "James Earl Jones")],
	["Maul", new MovieCharacter("Darth Maul", "Sith", "Ray Park")],
	["Kylo Ren", new MovieCharacter("Kylo Ren", "First Order", "Adam Driver")],
	["Ben Solo", new MovieCharacter("Ben Solo", "Jedi", "Adam Driver")],
	["Han Solo", new MovieCharacter("Han Solo", "Smuggler", "Harrison Ford")],
	["Chewie", new MovieCharacter("Chewbacca", "Smuggler", "Chewbacca")],
	["Leia", new MovieCharacter("General Leia Organa", "Resistance", "Carrie Fisher")],
	["Rey", new MovieCharacter("Rey Palpatine", "Jedi", "Daisy Ridley")],
	["General Hux", new MovieCharacter("General Hugs", "First Order", "Bill Weasley")],
	["Galen", new MovieCharacter("Galen Erso", "Empire Spy", "Mads Mikkleson")]
];

const hashset: HashSet<string, MovieCharacter> = new HashSet(3);

beforeAll(() => {
	for (let i = 0; i < starwarsCharacters.length; i++) {
		const c = starwarsCharacters[i];
		hashset.put(<string>c[0], <MovieCharacter>c[1]);
	}
});

test("Check for Chewie! [get]", () => {

	const c: MovieCharacter | null = hashset.get("Chewie");
	expect(c?.side).toEqual("Smuggler");
	expect(c?.name).toEqual("Chewbacca");

});
test("Add Bail Organa [put]", () => {
	expect(hashset.hasKey("Bail Organa")).toEqual(false);
	hashset.put("Bail", new MovieCharacter("Bail Organa", "Senate", "Jimmy Smits"));
	expect(hashset.get("Bail")?.actor).toEqual("Jimmy Smits");
});

test("Test Cassian Andor & Jyn Erso [getOrDefault]", () => {
	const mc: MovieCharacter = hashset.getOrDefault(
		"Andor",
		new MovieCharacter("Cassian Andor", "Rebel Alliance", "Diego Luna")
	);
	expect(mc?.actor).toEqual("Diego Luna");
	hashset.put("Andor", mc);
	hashset.put(
		"Jyn",
		new MovieCharacter(
			"Jyn Erso",
			"Saw Gerrera",
			"Felicity Jones")
	);
});

test("Remove Galen Erso [remove]", () => {
	hashset.remove("Galen");
	const mc: MovieCharacter | null = hashset.get("Galen");
	expect(mc).toBeNull();
});
