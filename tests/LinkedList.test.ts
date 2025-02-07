import LinkedList, { LinkedListNode } from "../src/LinkedList";

const list: LinkedList<string> = LinkedList.of(
	"foo",
	"bar",
	"baz",
	"Anakin",
	"Ahsoka",
	"Vader",
	"Mace Windu",
	"Yoda",
	"Obi-Wan"
);

const testList: LinkedList<string> = LinkedList.of("foo", "bar", "baz");

test("check size", () => {
	const list: LinkedList<string> = new LinkedList<string>();

	list.add("foo");
	list.add("bar");
	list.add("baz");

	expect(list.size()).toBe(3);

});

test("check size while adding from LinkList.of()", () => {

	expect(list.size()).toBe(9);
});

test("check that Ahsoka exists in list", () => {
	expect(list.contains("Ahsoka")).toBe(true);
	expect(list.indexOf("Ahsoka")).toBe(4);
});

test("Add Baylan Skoll to first node", () => {
	list.addFirst("Baylan Skoll");
	expect(list.getFirst()).toBe("Baylan Skoll");
});

test("Test Remove First (foo)", () => {
	list.removeFirst(); // Remove Baylan Skoll
	expect(list.getFirst()).toEqual("foo");
	expect(list.length()).toEqual(9);
});

test("Test Remove Last (Obi-Wan)", () => {
	list.removeLast(); // Remove ObiWan
	expect(list.getLast()).toEqual("Yoda");
	expect(list.length()).toEqual(8);
});

test("Get Anakin", () => {
	const item = list.get(3);
	// @ts-ignore
	expect(item).toEqual("Anakin");
});

test("Get Anakin", () => {
	const x = list.getByValue("Anakin");
	// @ts-ignore
	expect(x.item).toEqual("Anakin");
});

test("Remove Anakin", () => {
	const x: LinkedListNode<string> | null = list.getByValue("Anakin");

	// @ts-ignore
	const f: string | null = list.remove(x); // remove Anakin

	expect(f).toEqual("Anakin");
	expect(list.size()).toEqual(7);
});

test("Reverse List", () => {
	testList.reverse();
	const x: string = testList.toString();
	expect(x).toEqual("baz,bar,foo");
});

