let todoNextUniqueKey = 0;

class TodoObj {
	text: string;
	editable: boolean;
	uniqueKey: number;

	constructor(text: string, editable: boolean) {
		this.text = text;
		this.editable = editable;
		this.uniqueKey = todoNextUniqueKey++;
	}
}

export default TodoObj;
