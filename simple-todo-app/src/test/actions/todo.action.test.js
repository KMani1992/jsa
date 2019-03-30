import { expect } from "chai";
import { TYPES } from "../../../src/actions/todo.types"
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk"
import { defaultState } from "../../reducers/todo.reducers";
import * as toDoActionCreators from "../../actions/todo.actions";

const mockStore = configureMockStore([thunk]);
const store = mockStore(defaultState)

describe("todo action testing", () => {
    
    afterEach(() => {
        store.clearActions();
    })

    it("should check the ADD_TODO case", async () => {             
        await store.dispatch(toDoActionCreators.addTodo("buy fruits"));
        const result= store.getActions()[0];
        expect(result.type).to.eql(TYPES.ADD_TODO);
    });

    it("should check the EDIT_TODO case", async () => {             
        await store.dispatch(toDoActionCreators.editTodo(1,"buy banana"));
        const result= store.getActions()[0];
        expect(result.type).to.eql(TYPES.EDIT_TODO);
    });

    it("should check the TOGGLE_TODO case", async () => {             
        await store.dispatch(toDoActionCreators.toggleTodo(1));
        const result= store.getActions()[0];
        expect(result.type).to.eql(TYPES.TOGGLE_TODO);
    });

    it("should check the DELETE_TODO case", async () => {             
        await store.dispatch(toDoActionCreators.deleteTodo(1));
        const result= store.getActions()[0];
        expect(result.type).to.eql(TYPES.DELETE_TODO);
    });
});
