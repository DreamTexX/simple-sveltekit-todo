import Dexie, { type Table } from "dexie";

export interface Task {
    id?: number;
    content: string;
    done: boolean;
};

class _TaskDB extends Dexie {
    public tasks!: Table<Task, number>;

    public constructor() {
        super("task-database");
        this.version(1).stores({
            tasks: "++id,content,done"
        });
    }
}

export const TaskDB = new _TaskDB();