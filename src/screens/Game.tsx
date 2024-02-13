import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import GameGrid from '../components/GameGrid';
import axios from 'axios';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Welcome: undefined;
    Game: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;



const Game = ({ navigation }: Props) => {
    const [deckId, setDeckId] = useState('');
    const [cardCount, setCardCount] = useState(52);

    const getDeck = async () => {
        const res = await axios.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        setDeckId(res.data.deck_id);
        setCardCount(res.data.remaining);
    };

    useEffect(() => {
        getDeck();
    }, []);

    return (
        <View style={styles.container} >
            <ImageBackground
                source={require('../assets/dark-green-felt.jpg')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.header}>

                </View>
                <GameGrid deckId={deckId} cardCount={cardCount} shuffle={getDeck} />
                <View style={styles.footer}>

                </View>

            </ImageBackground>
        </View>
    )
}

export default Game

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,

        alignItems: 'center'
    },
    header: {
        backgroundColor: 'transparent',
        width: "100%",
        height: 76,
    },
    footer: {
        backgroundColor: 'transparent',
        width: "100%",
        height: 52,
    },
})