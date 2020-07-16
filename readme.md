## React-Native GitHub Favorits

### About:

This project is a small app where the users can search by a user/repository and save as a favorite in the app. The app was developed to understand how a mobile app using react native can communicate with a server using GraphQL. A simple demo could be observed on the gif bellow:

<p align="center">
  <img src="./.github/demo.gif" width="250"/>
</p>

### Technologies and libraries used:

- React-Native to create the application
- Apollo Client to make queries using GraphQL
- React Context API in order to provide a shared state between the list item (each item is a repository) to show the 'remove button';
- LayoutAnimation to create the slide effect when a repository is removed.

### How to execute:

Warning: this project was developed using the iPhone Simulator, running iOS 13. The code was not tested on Android devices.

After cloning this project and opened the downloaded folder:

- Install all the projects dependencies by using:

```
  yarn
```

- Next, install all the native ios dependencies. For that, execute:

```
  cd ios
  pod install
  cd ..
```

- Finally, start the project using the command:

```
yarn react-native run-ios
```

### Credits

The icon used on home screen when the list is empty was created by [freepik](https://www.flaticon.com/br/autores/freepik).

### License

MIT
