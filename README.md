# `json-numeric-diff`

> A very simple CLI + module that shows the difference between numeric values in two objects.

![preview](http://i.imgur.com/OSdx2kn.png)

### Options

* `--invert` - green for decreased values, red for increased
* `--format` - how to show changed values: `ratio`, `percent`, `delta`, or `difference`
* `--percent` - shortcut for `--format percent`
* `--colors` - termcolors for increase and decrease. Default: `green,red`


### Example

```sh
json-numeric-diff test/one.json test/two.json --invert --format percent

{
  "a": "-50.00%",
  "b": "Infinity",
  "c": "99.90%",
  "d": "Infinity"
}
```

### License

MIT
