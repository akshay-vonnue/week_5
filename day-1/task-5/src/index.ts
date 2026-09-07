function processInput(value: string | number | boolean | null | undefined) {
    switch (typeof value) {
        case "string":
            console.log("string")
            break;
        case "number":
            console.log("number")
            break;
        case "boolean":
            console.log("boolean")
            break;
        default:
            break;
    }

    if (value === null) {
        console.log("null")
    }

    if (value === undefined) {
        console.log("undefined")
    }

    return "unknown input value"
}

processInput("akshay")
processInput(1)
processInput(true)

processInput(null)
processInput(undefined)