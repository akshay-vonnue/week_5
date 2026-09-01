type ValidationResult = string | boolean

interface Serializable{
    toJSON(): string;
    fromJSON(data:string):this
}

interface Printable{
    print(): void;
    getDisplayName(): string;
} 

interface Validatable{
    validate(): ValidationResult;
}

class Document implements Serializable, Printable, Validatable{
    toJSON(): string {
        return 'json string'
    }

    fromJSON(data: string): this {
        return this
    }

    print(): void {
        console.log("print function called")
    }

    getDisplayName(): string {
        return 'LG'
    }

    validate(): ValidationResult {
        return true
    }


}

const serialObj = {
    data:'a string value',
    
    toJSON() {
        return 'string'
    },
    fromJSON(data:string) {
        return this
    }
}

function checkStructuralTyping(data: Serializable) {
    console.log("called function with",data)
}

checkStructuralTyping(serialObj);

export{}