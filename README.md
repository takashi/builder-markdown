# builder-markdown

Markdown plugin for [component/builder2.js](https://github.com/component/builder2.js).

- Caches compilations
- Compiles the debugging version in development environment

## Example

```js
var fs = require('fs');
var build = require('component-builder');
var markdown = require('builder-markdown');

build.scripts(nodes)
  .use('scripts', build.plugins.js())
  .use('templates', build.plugins.string())
  .use('templates', markdown())
  .use('markdown', markdown())
  .build(function (err, string) {
    if (err) throw err;

    fs.writeFileSync('build.js', string);
  })
```

## Options

Plugin options:

- `string` - compile the template as an HTML string instead of a function.

Markdown(marked) options:

- `renderer`
- `gfm`
- `tables`
- `breaks`
- `pedantic`
- `sanitize`
- `smartLists`
- `smartypants`

## License

The MIT License (MIT)

Copyright (c) 2014 Takashi Nakagawa tak1240@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
