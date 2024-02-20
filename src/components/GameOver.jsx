import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Sound from 'react-native-sound';
import sadFx from '../assets/awwSound.mp3';

const GameOver = ({ startGame }) => {
    Sound.setCategory('Playback');
    const awwSound = new Sound(sadFx, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        awwSound.play();
    });
    awwSound.play();

    return (
        <View style={styles.container}>
            <Text style={styles.gameOver}>
                Game
                Over
            </Text>
            <TouchableOpacity style={styles.btn} onPress={startGame}>
                <Text style={styles.txt}>Play Again!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GameOver

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '80%',
        width: '90%',
        backgroundColor: '#0A1627E6',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        top: 50,
        left: 20,
        borderRadius: 50,
        transform: [{ rotate: '-8deg' }],
        borderWidth: 2,
        borderColor: '#DDDDDD',
        elevation: 8,
    },
    gameOver: {
        fontWeight: 'bold',
        fontSize: 56,
        fontFamily: 'impact',
        color: '#DDDDDD',
        textShadowOffset: {
            height: 2,
            width: 3,
        },
        textShadowColor: 'rgba(255,255,255,.25)',
        textShadowRadius: 8,
    },
    logo: {
        objectFit: 'contain',
        height: 250,
    },
    btn: {
        marginTop: 24,
        paddingHorizontal: 48,
        paddingVertical: 12,
        borderRadius: 16,
        elevation: 4,
        backgroundColor: '#FE0039'
    },
    txt: {
        color: 'white',
        textShadowOffset: {
            height: 2,
            width: 3,
        },
        textShadowColor: 'rgba(0,0,0,.15)',
        textShadowRadius: 8,
    },
})