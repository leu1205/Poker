var deck,deck1,deck2,type1,type2;

function RandomDeck() {
    let deck = [];
    let card = {};
    let card_list = [];
    let card_suit = ["spade","heart","diamond","club"];
    
    for(let i = 0; i < 10; i++){
        do{
            card = {point:getRandom(15,3),suit:card_suit[getRandom(3,0)]};
        }while(card_list.find(sameCard) || card_list.filter(samePoint).length == 4);
        card_list.push(card);
        
        deck[i] = card;
    }

    return deck;

    function sameCard(element) {
        return element.point === card.point && element.suit === card.suit;
    }

    function samePoint(element) {
        return element.point === card.point;
    }
}

function getRandom(max,min) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function deck_type(deck){
    deck.sort((a,b)=>{return a.point - b.point});
    
    if(Flush(deck)){
        if(Straight(deck)){
            return "StraightFlush";
        }
        return "Flush";
    } 
    else if(Straight(deck)){
        if(Flush(deck)){
            return "StraightFlush";
        }
        return "Straight";
    }
    else {
        return SameCard(deck);
    } 
}

function Flush(deck){
    for(let key in deck){
        if(deck[0].suit !== deck[key].suit){
            return false;
        }
    }
    return true;
}

function Straight(deck){
    for(let i = deck.length-2; i >= 0; i--){
        if(deck[i+1].point - deck[i].point != 1){
            return false
        }
    }
    return true;
}

function SameCard(deck){
    let count = 0;
    let cnt_list = [];
    let tmp = deck[0].point;
    for(let i = 1; i < deck.length; i++){
        if(tmp - deck[i].point == 0){
            count++;
        } else {
            tmp = deck[i].point;
            cnt_list.push(count);
            count = 0;
        }
    }
    if(cnt_list.find(four)){
        return "Four_of_a_kind"
    } else if (cnt_list.find(pair) && cnt_list.find(three)){
        return "FullHouse"
    }
    return "HighCard";

    function pair(element) {
        return element === 1;
    }
    function three(element) {
        return element === 2;
    }
    function four(element) {
        return element === 3;
    }
}

function whoWin(deck1,deck2) {
    let GameRule = {
        "HighCard":0,
        "Straight":1,
        "Flush":2,
        "FullHouse":3,
        "Four_of_a_kind":4,
        "StraightFlush":5
    }

    type1 = deck_type(deck1);
    type2 = deck_type(deck2);

    console.log("deck1:",type1);
    console.log(deck1);
    console.log("deck2:",type2);
    console.log(deck2);

    if(GameRule[type1] > GameRule[type2]){
        return "DECK 1 Win！"
    } else if (GameRule[type1] < GameRule[type2]){
        return "DECK 2 Win！"
    } else {
        let i = 4;

        while(i >= 0){
            if(deck1[i].point - deck2[i].point > 0){
                return "DECK 1 Win！"
            } else if(deck1[i].point - deck2[i].point == 0){
                suitPK(deck1[i].suit,deck2[i].suit);
            } else if (deck1[i].point - deck2[i].point < 0){
                return "DECK 2 Win！"
            }
            i--;
        }
    }

    function suitPK(suit1,suit2){
        let SuitRule = {
            "club":0,
            "diamond":1,
            "heart":2,
            "spade":3
        }
        if(SuitRule[suit1] > SuitRule[suit2]){
            return "DECK 1 Win！"
        } else if (SuitRule[suit1] < SuitRule[suit2]){
            return "DECK 2 Win！"
        }
    }
}
deck = RandomDeck();
deck1 = deck.slice(0,5);
deck2 = deck.slice(5);

console.log(whoWin(deck1,deck2));