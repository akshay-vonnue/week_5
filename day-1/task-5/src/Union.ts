type Shape =
    { kind: 'circle', radius: number } |
    { kind: 'rect', w: number, h: number } |
    { kind: 'triangle', h: number, b: number };

function getArea(obj:Shape) {
    switch (obj.kind) {
        case 'circle':
            console.log(`area:${Math.PI * obj.radius * obj.radius}`)
            break;
    
        case 'rect':
            console.log(`area:${obj.w * obj.h}`)
            break;
        
        case 'triangle':
            console.log(`area:${obj.b * obj.h}`)
            break;

        default:
            // Type '{ kind: "triangle"; h: number; base: number; }' is not assignable to type 'never'.
            const exhausetedValue : never = obj
            console.log("could not find shape",exhausetedValue)
            break;
    }
}

let shape1:Shape = {
    kind: 'circle',
    radius:2
}

let shape2:Shape = {
    kind: 'rect',
    w: 12,
    h:2
}

getArea(shape1)
getArea(shape2)


// https://dev.to/darkmavis1980/what-are-typescript-discriminated-unions-5hbb