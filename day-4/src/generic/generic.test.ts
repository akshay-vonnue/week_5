import { describe, it, expect } from "vitest";
import { Queue } from "./generic";

describe("queue test", () => {
    let q: Queue<number> = new Queue<number>()
    let qs:Queue<string> = new Queue<string>()

    it("queue method test with number", () => {
        q.enqueue(1)

        expect(q.que.length).toBe(1)

        let value = q.peek()
        expect(value).toBe(1)

        q.dequeue()
        expect(q.que.length).toBe(0)

        let empty = q.isEmpty()

        expect(empty).toBeTruthy()
    })

    it("queue method test with string", () => {
        qs.enqueue("akshay")

        expect(qs.que.length).toBe(1)

        let value = qs.peek()
        expect(value).toBe("akshay")

        qs.dequeue()
        expect(qs.que.length).toBe(0)

        let empty = qs.isEmpty()

        expect(empty).toBeTruthy()
    })
})