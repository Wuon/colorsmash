'use strict';

import React from 'react';

import {
    Text,
    View,
    StyleSheet,
} from 'react-native';


var BoardView = require('./boardview.js');

var Main = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          <BoardView/>
        </View>
      </View>
         );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d4b63',
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    backgroundColor: 'transparent',
  },
});

module.exports = Main;
