class Document {
    toJSON() {
        return 'json string';
    }
    fromJSON(data) {
        return this;
    }
    print() {
        console.log("print function called");
    }
    getDisplayName() {
        return 'LG';
    }
    validate() {
        return true;
    }
}
const serialObj = {
    data: 'a string value',
    toJSON() {
        return 'string';
    },
    fromJSON(data) {
        return this;
    }
};
function checkStructuralTyping(data) {
    console.log("called function with", data);
}
checkStructuralTyping(serialObj);
// export {};
