import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Welcome: undefined;
    Game: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
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