//Action Creators
// We will need 3 action creators that we can declare in friends/slice.js

// 1) creates an action to populate the state with the current list of friends and wannabees
export function receiveFriendsAndWannabees(friends) {
    return {
        type: "friends/received",
        payload: { friends },
    };
}

// 2) creates an action to accept a wannabee as a friend, the id should be in the payload

export function acceptFriendRequest(id) {
    return {
        type: "friends/accepted",
        payload: id,
    };
}

// 3) creates an action to end a friendship, the id should be in the payload

export function unfriend(id) {
    return {
        type: "friends/unfriended",
        payload: id,
    };
}

// The friends reducer in friends/slice.js will need to include 3 if blocks to deal with
// our 3 different types of actions:

// 1)friends/received: should set the state to be the array of friends and wannabees

// 2)friends/accepted: one of the users in the existing array of friends and wannabees should have
// their accepted property set to true. (you may want to use the .map() method)

// 3)friends/unfriended: one of the users in the existing array of friends and wannabees should be
// removed. (you may want to use the .filter() method)

export default function friendsReducer(state = [], action) {
    // console.log("action in slice.js:", action);
    if (action.type == "friends/received") {
        state = action.payload.friends;
    }
    if (action.type == "friends/accepted") {
        state = state.map((friend) => {
            if (friend.id === action.payload.id) {
                return { ...friend, accepted: true };
            } else {
                return friend;
            }
        });
    }
    // if (action.type == "friends/unfriended") {
    //     state = state.map((friend) => {
    //         if (friend.id === action.payload.id) {
    //             return {};
    //         }
    //     });
    // }
    // return state;
    if (action.type == "friends/unfriended") {
        state = state.map((friend) => {
            if (friend.id === action.payload) {
                return { ...friend, accepted: false };
            } else {
                return friend;
            }
        });
    }
    return state;
}
