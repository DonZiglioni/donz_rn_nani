import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, Image, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import GameOver from './GameOver';
import axios from 'axios';


const GameGrid = (props) => {
    const [card, setCard] = useState({});
    const [cardCount, setCardCount] = useState(props.cardCount);
    const [gameState, setGameState] = useState([]);
    const [isGridFull, setIsGridFull] = useState(false);
    const [isLastMove, setIsLastMove] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [discardPile, setDiscardPile] = useState([]);

    const cardOne = useRef(null);
    const isSelectingSecond = useRef(null);
    const isPairingMode = useRef(false);

    const cardBack = 'https://www.deckofcardsapi.com/static/img/back.png';
    const gameArray = ['KING', 'QUEEN', 'QUEEN', 'KING', 'JACK', 'FREE', 'FREE', 'JACK', 'JACK', 'FREE', 'FREE', 'JACK', 'KING', 'QUEEN', 'QUEEN', 'KING']

    //  **  SET INITIAL GAME STATE  **
    useEffect(() => {
        let initialState = [];
        for (let i = 0; i < gameArray.length; i++) {
            initialState.push({
                value: gameArray[i],
                isEmpty: true,
                image: null,
            });
        };
        setGameState(initialState);
    }, []);

    //  **  Called from handlePress() - Creates new card obj and populates game grid
    const addCard = (item) => {
        const idx = item.index;
        const newArray = gameState.slice();
        let addCard = {
            value: card.value,
            isEmpty: false,
            image: card.image,
        };
        newArray[idx] = addCard;
        setGameState(newArray);
        if (!isLastMove) {
            getCard();
        }
    }

    //  ** Check to make sure the game can continue onto matching pair round
    const countMoves = (tempArr) => {
        const checkArray = [];

        for (let obj of tempArr) {
            console.log(obj.value);
            checkArray.push(obj.value)
        }
        let moreRounds;
        let count = 0;
        console.log("CHECK ARRAY: ", checkArray);
        //console.log("INDEX FUCKER: ", checkArray.indexOf(2));

        if (checkArray.indexOf('ACE') >= 0) {
            let aceIdx = checkArray.indexOf('ACE');
            let nineIdx = checkArray.indexOf('9');
            if (checkArray.indexOf('9') >= 0) {
                count++;
                console.log("COUNT BITCH: ", count);
                // checkArray.splice(aceIdx, 1);
                // checkArray.splice(nineIdx, 1);
            }
        }
        if (checkArray.indexOf('2') >= 0) {
            let twoIdx = checkArray.indexOf('2');
            let eightIdx = checkArray.indexOf('8');
            if (checkArray.indexOf('8') >= 0) {
                count++;
                console.log("COUNT BITCH: ", count);
                // checkArray.splice(twoIdx, 1);
                // checkArray.splice(eightIdx, 1);
            }
        }
        if (checkArray.indexOf('3') >= 0) {
            let threeIdx = checkArray.indexOf('3');
            let sevenIdx = checkArray.indexOf('7');
            if (checkArray.indexOf('7') >= 0) {
                count++;
                console.log("COUNT BITCH: ", count);
                // checkArray.splice(threeIdx, 1);
                // checkArray.splice(sevenIdx, 1);
            }
        }
        if (checkArray.indexOf('4') >= 0) {
            let fourIdx = checkArray.indexOf('4');
            let sixIdx = checkArray.indexOf('6');
            if (checkArray.indexOf('6') >= 0) {
                count++;
                console.log("COUNT BITCH: ", count);
                // checkArray.splice(fourIdx, 1);
                // checkArray.splice(sixIdx, 1);
            }
        }
        if (checkArray.indexOf('5') >= 0) {
            let fiveIdx = checkArray.indexOf('5');
            for (let i = fiveIdx + 1; i < checkArray.length; i++) {
                if (checkArray[i] === '5') {
                    count++;
                    console.log("COUNT BITCH: ", count);
                    // checkArray.splice(i, 1);
                    // checkArray.splice(fiveIdx, 1);
                }
            }
        }

        console.log("COUNT ALL DAY BITCH: ", count);
        if (checkArray.every(item => item.isEmpty === false)) {
            console.log("COUNTING... : ...Grid FULL : MoreRounds - False");
            moreRounds = false;
        } else {
            console.log("COUNTING... : ...Theres GAPS now : MoreRounds MAYBE - True");
            moreRounds = true;
        }
        // **  If there are no cards that make pairs of 10, GAME OVER
        if (count === 0 && moreRounds === false) {
            console.log("NO PAIRS TO MAKE, GAME OVER!");
            setGameOver(true);
            return;
        } else if (count > 0 && moreRounds === true) {
            console.log("MORE ROUNDS IS TRUE: RETURNING : ", count);
            return count;
        }
        console.log("IDFK: RETURNING : ", count);
        return count;
    }

    //  **  Main Functionalities  
    useEffect(() => {
        //  **  Check to see if the grid is FULL or EMPTY - and switches to Pairing Mode
        const checkRound = () => {
            let checkArray = [];
            gameState.map((e) => { checkArray.push(e.isEmpty) })
            if (checkArray.every(i => i === true)) {
                setIsGridFull(false);
            } else if (checkArray.every(i => i === false)) {
                setIsGridFull(true);
                isPairingMode.current = true;
                countMoves();
            }
        }
        //  **  Check to see if game has been LOST
        const checkForLoss = () => {
            if (card.value === 'KING') {
                const corners = [gameState[0], gameState[3], gameState[12], gameState[15]];
                const checkCorners = [];
                corners.forEach((c) => {
                    if (c.isEmpty) {
                        checkCorners.push(true)
                        return;
                    }
                })
                if (checkCorners.length === 0) {
                    console.log("GAME OVER");
                    setGameOver(true)
                }
            }
            if (card.value === 'QUEEN') {
                const queens = [gameState[1], gameState[2], gameState[13], gameState[14]];
                const checkQueens = [];
                queens.forEach((q) => {
                    if (q.isEmpty) {
                        checkQueens.push(true)
                        return;
                    }
                })
                if (checkQueens.length === 0) {
                    console.log("GAME OVER");
                    setGameOver(true)
                }
            }
            if (card.value === 'JACK') {
                const jacks = [gameState[4], gameState[8], gameState[7], gameState[11]];
                const checkJacks = [];
                jacks.forEach((j) => {
                    if (j.isEmpty) {
                        checkJacks.push(true)
                        return;
                    }
                })
                if (checkJacks.length === 0) {
                    console.log("GAME OVER");
                    setGameOver(true)
                }
            }
        }
        //  **  Check to see if game has been WON
        const checkForWin = () => {
            let checkArray = [];
            gameState.map((e) => { checkArray.push(e.value) })
            if (checkArray === gameArray) {
                console.log("You win");
            };
        };
        //  **  Check to see if a 10 has been drawn, and automatically discards 10's
        const checkForTen = () => {
            if (card.value === '10') {
                const tempCard = card;
                const tempPile = discardPile.slice();
                tempPile.push(tempCard);
                setDiscardPile(tempPile);
                getCard();
            };
        };

        checkRound();
        checkForLoss();
        checkForWin();
        checkForTen();

    }, [card]);

    //  ** Main Click Handler Fucntion for Clicking Card Slots
    const handlePress = async (item) => {
        if (cardCount === 52) {
            return;
        };

        if (isPairingMode.current === true && item.item.isEmpty === true) {
            return;
        }

        let copyGame = gameState.slice();
        let moveCount = [];
        for (let slot of copyGame) {
            if (slot.isEmpty === false) {
                moveCount.push(slot);
            }
        }
        if (moveCount.length === 14) {
            setIsLastMove(true)
        }
        if (moveCount.length === 15) {
            console.log("FULL GRID");
            isSelectingSecond.current = false;
            isPairingMode.current = true;
            setIsGridFull(true);
        }


        //  **  If Grid is FULL, Start Selecting Cards for Matching Sums of 10
        if (isGridFull) {
            if (isSelectingSecond.current === false) {
                cardOne.current = item;
                isSelectingSecond.current = true;
            } else if (isSelectingSecond.current === true && cardOne.current) {
                let choiceA;
                let choiceB;

                if (cardOne.current.item.value === 'ACE') {
                    choiceA = 1;
                } else {
                    choiceA = parseInt(cardOne.current.item.value);
                }

                if (item.item.value === 'ACE') {
                    choiceB = 1;
                } else {
                    choiceB = parseInt(item.item.value);;
                }
                console.log("Card 1 is: ", choiceA);
                console.log("Card 2 is: ", choiceB);
                if (choiceA + choiceB === 10) {
                    console.log("They Match!");
                    //  Handle MATCHES - Copy game state and discard piles, move cards accordingly
                    const tempDiscardPile = discardPile.slice();
                    const tempBoard = gameState.slice();
                    //  **** CARD A ****
                    tempBoard.splice(cardOne.current.index, 1, {
                        value: gameArray[cardOne.current.index],
                        isEmpty: true,
                        image: null,
                    });
                    tempDiscardPile.push(cardOne.current);
                    //  ****  CARD B  ****
                    tempBoard.splice(item.index, 1, {
                        value: gameArray[item.index],
                        isEmpty: true,
                        image: null,
                    });
                    tempDiscardPile.push(item.item);
                    //  Update States
                    setGameState(tempBoard);
                    setDiscardPile(tempDiscardPile);
                    //  Reset Pairing Mode
                    let moreMoves = await countMoves(tempBoard);
                    console.log("RETURNED FROM COUNT MOVES", moreMoves);
                    if (moreMoves > 0) {
                        console.log("WE HAVE MORE MATCHES");
                        cardOne.current = null;
                        isSelectingSecond.current = false;
                        isPairingMode.current = true;
                    } else {
                        console.log("NOOO MORE MATCHES - MOVE TO NEXT ROUND");
                        cardOne.current = null;
                        isSelectingSecond.current = null;
                        isPairingMode.current = false;
                        setIsGridFull(false);
                        setIsLastMove(false);
                        getCard();
                    }
                } else {
                    console.log("They Don't Match!");
                    cardOne.current = null;
                    isSelectingSecond.current = false;
                }
                // if ((parseInt(cardOne.current.item.value) + parseInt(item.item.value)) === 10) {


                // } else {
                //     console.log("Cards do not add up to 10");
                //     setCardOne('')
                // }
            }

        }

        //  RUN main game functions as long as game is not over
        if (gameOver) {
            return;
        } else {
            // const item.index = e.target.getAttribute('data-id');
            //console.log(item.item);
            // let filledId = e.target.parentElement;
            // let imgIndex = filledId.getAttribute('data-id');

            if (gameState[item.index].isEmpty === false) {
                console.log("NOT EMPTY", item.index);
                return;
            }
            if (card.value === 'KING' && gameState[item.index].value !== 'KING') {
                console.log("NOT CORNER");
                return;
            }
            if (card.value === 'QUEEN' && gameState[item.index].value !== 'QUEEN') {
                console.log("NOT QUEEN");
                return;
            }
            if (card.value === 'JACK' && gameState[item.index].value !== 'JACK') {
                console.log("NOT JACK");
                return;
            }
            if (gameState[item.index]) {
                addCard(item);
            }
        }
    }

    //  **  Draws a new card from the Game API, updates remaining card count, and sets image on top of Draw Pile
    const drawCard = async () => {
        if (cardCount === 52) {
            const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${props.deckId}/draw/?count=1`);
            setCard(res.data.cards[0]);
            setCardCount(res.data.remaining)
            return res.data.cards[0];
        } else {
            return;
        }
    }

    //  **  Draws a new card from the Game API and setis image on top of Draw Pile
    const getCard = async () => {
        if (!gameOver) {
            const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${props.deckId}/draw/?count=1`);
            setCard(res.data.cards[0]);
            setCardCount(res.data.remaining);
            return res.data.cards[0];
        } else {
            return;
        }
    }

    const shuffleDeck = async () => {
        const res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${props.deckId}/shuffle/`);
        console.log("Deck Shuffled! - ", res.data.remaining);
        setCardCount(res.data.remaining);
    }

    //  Restart a new game from game over screen
    const startGame = () => {
        setDiscardPile([]);
        setCard({});
        setIsGridFull(false);
        shuffleDeck();
        setIsLastMove(false);

        let initialState = [];
        for (let i = 0; i < gameArray.length; i++) {
            initialState.push({
                value: gameArray[i],
                isEmpty: true,
                image: null,
            });
        };
        setGameState(initialState);
        setGameOver(false);
    }


    return (
        <View style={styles.container}>
            {gameOver ? <GameOver startGame={startGame}></GameOver> : null}
            <View style={styles.grid}>
                <FlatList
                    data={gameState}
                    key={Math.random()}
                    numColumns={4}
                    renderItem={(item) => {
                        // console.log(item.item);
                        return (
                            <TouchableOpacity onPress={() => {
                                handlePress(item);
                            }} >
                                <View style={styles.card}>
                                    {
                                        item.item.isEmpty ?
                                            <Text style={styles.phTxt}>{item.item.value}</Text>
                                            :
                                            <Image source={{ uri: item.item.image }} style={styles.cardImg2} />
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
            <View style={styles.containerBottom}>
                <TouchableHighlight onPress={drawCard}>
                    <View style={styles.cardPile}>
                        {
                            cardCount >= 52 || cardCount === undefined || isGridFull || isPairingMode.current === true ?
                                <Image source={{ uri: cardBack }} style={styles.cardImg} />
                                :
                                <Image source={{ uri: card.image }} style={styles.cardImg} />
                        }
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => console.log(discardPile.length)}>
                    <View style={styles.discardPile}>
                        {
                            discardPile.length > 0 ?
                                <Image source={{ uri: discardPile[discardPile.length - 1].image }} style={styles.cardImg} />
                                :
                                <Text style={styles.phTxt}>Discard Pile</Text>
                        }
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default GameGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    containerBottom: {
        // borderWidth: 2,
        // borderColor: 'aqua',
        marginTop: 8,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    card: {
        height: 135,
        width: 100,
        elevation: 2,
        borderRadius: 4,
        margin: 1,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.25)'
    },
    grid: {
        display: 'flex',
        // borderWidth: 2,
        // borderColor: 'aqua',
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    cardPile: {
        height: 150,
        width: 110,
        padding: 2,
        backgroundColor: 'rgba(0,0,0,.25)',
        elevation: 2,
        borderRadius: 3,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    discardPile: {
        height: 150,
        width: 110,
        padding: 2,
        backgroundColor: 'rgba(0,0,0,.25)',
        elevation: 2,
        borderRadius: 4,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImg: {
        height: 150,
        width: 115,
        objectFit: 'contain'
    },
    cardImg2: {
        height: 135,
        width: 100,
        objectFit: 'contain'
    },
    phTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgba(255,255,255,.9)',

        textShadowOffset: {
            height: 2,
            width: 3,
        },
        textShadowColor: 'rgba(0,0,0,.15)',
        textShadowRadius: 8,
        textAlign: 'center',
    },
})