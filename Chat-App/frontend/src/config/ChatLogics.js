export const getSender = (loggedUser , users)=>{
    if (users && users.length >= 2) {
        if (users[0] && users[0]._id === loggedUser?._id) {
            return users[1].name;
        } else if (users[1] && users[1]._id === loggedUser?._id) {
            return users[0].name;
        }
    }
}

export const getSenderFull = (loggedUser , users)=>{
    return users[0]?._id === loggedUser?._id ? users[1]: users[0];
}