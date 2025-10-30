export declare const enum Status {
    TODO = "todo",
    INPROGRESS = "in-progress",
    DONE = "done"
}
export type Task = {
    id: number;
    description: string;
    status: Status;
    createdAt: string;
    updateAt: string | null;
};
//# sourceMappingURL=alias.d.ts.map