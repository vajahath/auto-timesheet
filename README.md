# auto-timesheet
Add redmine timesheet automatically and periodically.

[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/auto-timesheet/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)


> **Important:** This package is pre-configured for [Cubet Technolabs](http://cubettech.com/) Policies. If you need to configure this app for your workstation, please [rise an issue](https://github.com/vajahath/auto-timesheet/issues) and I'll reach you back.

*Created and maintained at free times for fun.*

![](media/arrived.jpg)

## Why?
- Adds activities to timesheet automatically and periodically.
- Integrated with your Github repo. So activity messages are constructed from your commit messages.
- Supports Github and Gitlab.

## Install
```
npm i -g auto-timesheet
```
verify with `auto-timesheet --version`.

## Configure
```
auto-timesheet conf
```
It opens up a config file. Alter it and save.
Make sure you didn't made any syntax mistakes with the opened json file.

> By default it will open the editor mentioned in the $EDITOR env_var. If none, be prepared for vi.

## some important conf file properties

### General configurations
- `projectId` : The timesheet project id in which you are working on. You should find this by inspecting the web interface. If you need any assistance, feel free to open an issue.
- `activityInterval` : Interval in milliseconds.
- `defaultIssue` : If `auto-timesheet` couldn't extract any issues from your commit messages, this issue will be used.
- `git-service`: selected git service. Possible options: `github` and `gitlab`. Based on this value, corresponding git configuration is used.
### Github specific
- `config.github.url`: Github api url to fetch commits of your repo.
- `config.github.commitAuthorEmail` : email of the committer. commit messages are extracted based on this email.
- `config.github.username`: Github username.

### Gitlab specific
- `config.gitlab.url`: Gitlab api url to fetch commits of your repo.
here is an example template: 
```
http://<host(eg:192.168.1.55)>/api/v4/projects/<project_id(eg: 80. look this at the settings page of your repo OR ask repo owner)>/repository/commits
```
eg: `http://192.168.1.55/api/v4/projects/80/repository/commits`
- `config.gitlab.commitAuthorEmail` : email of the committer. commit messages are extracted based on this email.

### Advanced configs
- `issueMatchingInsensitivity` **[Recommended `3`]** : For best results, this should be an integer in between `0` and `10`. Lesser the value, it is more likely that the package will create new issues. Higher the value, the package will try to match the extracted issue with existing issues and if both are matching (the degree of matching is based on the `issueMatchingInsensitivity` value), the existing issue will be reused. **In other words,** accuracy of the matchness is based on this value. Lesser the value means more accurate and higher the value means less accurate.

## Usage
### modify your future commit messages:
use star-tags (`*thisIsStarTag`) to mention the timesheet-issue/issues you are addressing with this commit.
An example commit message be like:
```
Improves *login security and updates *documentation 
```
Here `login` and `documentation` are timesheet issues. The package will choose one randomly and create/use that issue for this commit message.

### start application
```
auto-timesheet start
```

## Handy commands
run the following to see all available commands.
```
auto-timesheet help
```
will give you:
```
Usage: auto-timesheet [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    conf        configure stuff
    start       start application
    reset       reset this package [config will be deleted]
    migrate     migrate configuration file version to compatible version
                without loosing current configurations
    help [cmd]  display help for [cmd]
```
## Found any issues/ need help?
Please report it at [github issues](https://github.com/vajahath/auto-timesheet/issues)


# Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
