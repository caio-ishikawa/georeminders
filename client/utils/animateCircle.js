import {Animated, Easing} from 'react-native';


export const animateCircle = (scaleAnimationRef, opacityAnimationRef) => {
    Animated.loop(
        Animated.timing(scaleAnimationRef, {
        toValue: 20,
        duration: 2000,
        useNativeDriver: true
        })
    ).start()

    Animated.loop(
        Animated.timing(opacityAnimationRef, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true
        })
    ).start()
};