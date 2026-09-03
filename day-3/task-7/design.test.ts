import { describe, it, expect , vi } from 'vitest';
import { Command, CommandHistory } from './design.js';

describe("CommandHistory test", () => {
    it("history test", () => {
        let command1: Command = {
            execute: vi.fn(),
            undo: vi.fn()
        }

        let command2: Command = {
            execute: vi.fn(),
            undo: vi.fn()
        }

        let command3: Command = {
            execute: vi.fn(),
            undo: vi.fn()
        }

        let command4: Command = {
            execute: vi.fn(),
            undo: vi.fn()
        }

        let command5: Command = {
            execute: vi.fn(),
            undo: vi.fn()
        }

        let history = new CommandHistory()

        history.executeCommand(command1)
        history.executeCommand(command2)
        history.executeCommand(command3)
        history.executeCommand(command4)
        history.executeCommand(command5)

        history.undo()
        history.undo()
        history.undo()
        history.undo()
        history.undo()

        expect(command1.undo).toHaveBeenCalledOnce()
    })
    
})