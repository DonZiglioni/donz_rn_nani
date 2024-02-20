import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
const song1 = require('../assets/song1.mp3');
const song2 = require('../assets/song2.mp3');
const song3 = require('../assets/song3.mp3');

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Welcome: undefined;
    Game: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: Props) => {
    const [playing, setPlaying] = useState(true);
    Sound.setCategory('Playback');
    const intro2 = new Sound(song2, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        intro2.setVolume(.33)
    })
    const intro3 = new Sound(song3, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        intro3.setVolume(.33)
    })

    const introSong = new Sound(song1, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        introSong.setVolume(.33)
        introSong.setNumberOfLoops(-1)
        introSong.play((success) => {
            if (success) {
                console.log('Looping');
            }
        })
    });


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#00000000'} />
            <Image source={require('../assets/logo1.png')} style={styles.logo} />
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game')}>
                <Text style={styles.txt}>Play Now!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A1627',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})