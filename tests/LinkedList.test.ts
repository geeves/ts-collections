import LinkedList from "../src/LinkedList";

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

test("check size", () => {
  const list: LinkedList<string> = new LinkedList<string>();

  list.add("foo");
  list.add("bar");
  list.add("baz");

  expect(list.getSize()).toBe(3);

});

test("check size while adding from LinkList.of()", () => {

  expect(list.getSize()).toBe(9);
});

test("check that Ahsoka exists in list", () => {
  expect(list.contains("Ahsoka")).toBe(true);
  expect(list.indexOf("Ahsoka")).toBe(4);
});
