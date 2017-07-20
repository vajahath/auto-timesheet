# auto-timesheet
> :warning: Package is in Beta! You are warned!

Add redmine timesheet automatically and periodically.

> **Important:** This package is pre-configured for [Cubet Technolabs](http://cubettech.com/) Policies. If you need to configure this app for your workstation, please [rise an issue](https://github.com/vajahath/auto-timesheet/issues) and I'll reach you back.


[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/auto-timesheet/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

![](media/coming-soon.jpg)


# Draft

here is the proposed checklist:
- [x] initial prototype for adding entry in timesheet.
- [x] inspect login process and mock it with program
- [x] mock the timesheet adding process via program
- [x] fetch commits from github
- [x] make periodic function
- [x] integrate the entire workflow into the periodic function
- [x] use those commits as messages
- [x] automatically detect issues and attach it
- [x] add start-time, end-time & date in the request programmatically.
- [x] better dir structure
- [x] make highly configurable
- [x] export the entire app into a cli
- [x] cli tests
- [x] some final tests :arrow_left:
- [ ] beautify a little bit.
- [ ] Typescript-ify

## How to get started with this?
> So you want to ride in the bleeding edge? Awesome :star:

### install
```
npm i -g auto-timesheet
```
verify with `auto-timesheet --version`.

### configure
```
auto-timesheet conf
```
It opens up a config file. Alter it and save.
Make sure you didn't made any syntax mistakes with the opened json file.

> By default it will open the editor mentioned in the $EDITOR env_var. If none, be prepared for vi.

### start
```
auto-timesheet start
```

## Found any issues?
Please report it at [github issues](https://github.com/vajahath/auto-timesheet/issues)


# Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
