
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const scaleOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 0,
    scale: 1.5,
  },
};

function Pulse({ duration }) {

  return (
    <Animatable.View
      duration={duration}
      animation={scaleOut}
      useNativeDriver={true}
    >
      <View
        style={[styles.pulse]}
      >
      </View>
    </Animatable.View>
  )

}

function App() {

  const [pulses, setPulses] = useState([]);
  const [nbPulse, setNbPulse] = useState(3);
  const [duration, setDuration] = useState(3000);

  useEffect(() => {
    setDelay(duration / nbPulse);
  }, [duration, nbPulse])

  const [delay, setDelay] = useState(duration / nbPulse);

  useEffect(() => {
    const interval = setInterval(() => {

      setPulses((prevState) => {

        // create a new pulse
        let pulse = { 
          id: String(Date.now()),
          duration: duration
        }

        let newState = [...prevState];
        // remove the first object when the limite of the length's array is reached
        if (newState.length >= nbPulse) { 
          newState.splice(0, newState.length - nbPulse);

        }
        // increase the size of the array
        newState.push(pulse); 

        return (newState);
      });

    }, delay);

    return () => {
      clearInterval(interval)
    };
  }, [delay]) // create a new intervale when delay is change

  return (

    <View
      style={{
        width: "100%",
        flex: 1
      }}>
      <Button
        onPress={() => { setNbPulse(nbPulse + 1) }}
        title="more pulse"
        color="#841584"
      />

      <Button
        onPress={() => {
          if (nbPulse > 1) {
            setNbPulse(nbPulse - 1)
          }
        }}
        title="less pulse"
        color="#841584"
      />

      <Button
        onPress={() => {
          setDuration(duration + 1000)
        }}
        title="pulse live increase"
        color="#841584"
      />

      <Button
        onPress={() => {
          if (duration > 1000) {
            setDuration(duration - 1000)
          }
        }}
        title="pulse live decrease"
        color="#841584"
      />

      {pulses.map((item) => (
        <Pulse
          key={item.id} // key to avoid rerender
          id={item.id}
          duration={item.duration} />
      ))}

    </View>

  );
}
const styles = StyleSheet.create({
  pulse: {
    backgroundColor: "red",
    position: 'absolute',
    top: 100,
    left: 100,
    height: 200,
    width: 200,
    borderRadius: 200
  }
});

export default App;
