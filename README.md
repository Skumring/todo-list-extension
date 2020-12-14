# React Chrome Extension - TODO List

## Features
- Used ReactJs&MobX to write chrome extension
- Injecting extension to host page as content script
- Isolated extension CSS using Iframe
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
git clone git@github.com:Skumring/todo-list-extension.git
```
Go to `todo-list-extension` directory run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

To avoid running `yarn build` after updating any file, you can run

```
yarn watch
```

which listens to any local file changes, and rebuilds automatically.

## Adding React app extension to Chrome
- In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

- Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install the React app as a Chrome extension.
When you go to `https://banana-pudding-27625.herokuapp.com` or `http://localhost` website and click on extension icon, injected page will toggle.

## License
The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
