import { Request, Response } from "express"

interface todo {
    id : number;
    text: string;
    completedAt?: Date;
}

const todos: todo[] = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: new Date() },
    { id: 3, text: 'Buy eggs', completedAt: new Date() },
];

export class TodosController {

    // ! DI
    constructor() {}

    public getTodos = ( req: Request, res: Response ) => {
        return res.json( todos );
    }

    public getTodoById = ( req: Request, res: Response ) => {

        // ! El "+" es para hacer una conversión rápido de str a number.
        const id = +req.params.id;
        console.log(id, 1)

        const todo = todos.find( todo => todo.id === id );

        if( !todo ) {
            return res.status(404).json({ msg: 'todo not found' });
        }

        return res.status(200).json( { todo } );
    }

    public createTodo = ( req: Request, res: Response ) => {
        const { text } = req.body;

        if( !text ) return res.status(400).json({ msg: 'text property requried' })

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date(),
        };

        todos.push( newTodo );

        res.status(201).json({ todos });
    }

    public updateTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if( !id ) return res.status(400).json({ msg: 'id is required' });

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status(404).json({ msg: 'todo not found' });

        const { text, completedAt } = req.body;

        ( completedAt === 'null' )
        ? todo.completedAt = undefined
        : todo.completedAt = new Date( completedAt || todo.completedAt );

        if( completedAt ) todo.completedAt = completedAt;


        todo.text = text || todo.text;
        // ! por referencia, es decir, actualizamos directamente el todo

        res.status(201).json( todos );

    }

    public deleteTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if( !id ) return res.status(400).json({ msg: 'id is required' });

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status(404).json({ msg: 'todo not found' });


        todos.splice( todos.indexOf( todo ), 1 );

        res.status(201).json({
            msg: 'todo deleted',
            todos,
        })

    }

}
