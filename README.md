# types-components
Universal component props types

> Idea was to create single type system that will be adopted to all popular UI Kit's components properties. To use same element tree for a different UI systems. That will simplify generation of UI by AI agents or visual editors.

## Example


```javascript
import { Button } from '<your favorite ui kit>' 
...
<Button size="small">Click me</Button>
```

Use _[in progress]_ or create your own kit based on your favorite CSS library that aligns with this interface.

**Using Bootstrap:**

```html
<button class="btn btn-sm ...">Click me</Button>
```

**Using Material UI:**

```html
<button class="MuiButtonBase-root MuiButton-sizeSmall ...">Click me</Button>
```

**Using Tailwind:**

```html
<button class="bg-blue-500 hover:bg-blue-700 ...">Click me</Button>
```

**Using React Native Elements:**

```html
<div class="css-901oao ...">Click me</Button>
```

*...or native element*

