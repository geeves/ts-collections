import TreeSet from "../src/TreeSet";
import MovieCharacter from "./MovieCharacter";

const movieCharacters: string[] = [
	"Anakin",
	"Obi-Wan",
	"Yoda",
	"Sidious",
	"Vader",
	"Maul",
	"Kylo Ren",
	"Ben Solo",
	"Han Solo",
	"Chewie",
	"Leia",
	"Rey",
	"General Hux",
	"Galen",
	"Hello There"
];

// @ts-ignore
const myTree: TreeSet<string> = new TreeSet<string>();

beforeAll(() => {
	movieCharacters.forEach((mc: string) => {
		// @ts-ignore
		myTree.add(mc);
	});
});

test("First TreeSet Test", () => {

	// const ts: TreeSet<string> = new TreeSet<string>(null, null, null, null);


});

