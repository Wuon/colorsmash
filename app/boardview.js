'use strict';

import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

var {width, height} = require('Dimensions').get('window');
var SIZE = 4; // four-by-four grid
var CELL_SIZE = Math.floor(width * .225); // 20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 5;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .75);

var BoardView = React.createClass({
  render() {
    return <View style={styles.container}>
             {this.renderTiles()}
           </View>;
  },

  getInitialState() {
    var tilt = new Array(SIZE * SIZE);
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    return {tilt};
  },


  renderTiles() {
  var result = [];
  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      var id = row * SIZE + col;
      var letter = String.fromCharCode(65 + id);
      var tilt = this.state.tilt[id].interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-30deg']
      });
      var style = {
        left: col * CELL_SIZE + CELL_PADDING,
        top: row * CELL_SIZE + CELL_PADDING,
        transform: [{perspective: CELL_SIZE * 8},
                    {rotateX: tilt}]
      };
        result.push(this.renderTile(id, style, letter));
      }
    }
    return result;
  },

  renderTile(id, style, letter) {
    return <Animated.View key={id} style={[styles.tile, style]}
               onStartShouldSetResponder={() => this.clickTile(id)}>
             <Text style={styles.letter}>{letter}</Text>
           </Animated.View>;
  },

  clickTile(id) {
    var tilt = this.state.tilt[id];
    tilt.setValue(1); // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start();
  },


});

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333537',
  },
  letter: {
   fontFamily: 'Montserrat-Black',
   color: '#fff',
   fontSize: LETTER_SIZE,
   backgroundColor: 'transparent',
 },
});

module.exports = BoardView;
