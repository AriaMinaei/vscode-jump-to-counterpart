# vscode-jump-to-counterpart

Jump between `.css`/`.js` files with a keyboard shortcut, or define your own pairs of counterparts.

## Installation

Look for `Jump to counterpart` in the extensions directory, or run `ext install vscode-jump-to-counterpart`

## Set up

### Configure your counterparts

Add the following configuration to your user/workspace settings and cusmotize it to your needs:

```json
{
  "jumpToCounterpart.pairs": {
    ".js": ".css",
    ".tsx": ".module.css"
  }
```

### Define a keybinding

Open keybindings and define a shortcut for `jumpToCounterpart.jump`

## Usage

Once things are set up, open (for example) a `.js` file and perform the keyboard shortut you defined earlier. If the file's name is `foo.js`, this extension will open the `foo.css` file that sits next to `foo.js`. If the counterpart doesn't exist, it'll be created.

## License

MIT