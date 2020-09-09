class Csv {
	#_filename;
	#_content;
	#_file = {};

	#_getRow = (employee, type) => Object[type](employee).join(',');

	#_parseDocs = (documents) => documents.map(doc => {
		const { _id, ...rest } = doc.toObject();
		return rest;
	})

	generate = (documents, payday) => {
		let employees = this.#_parseDocs(documents);
		this.#_filename = `PAYROLL${payday.replace('-', '')}`
		this.#_file.head = this.#_getRow(employees[0], 'keys');
		this.#_file.rows = employees.map(e => this.#_getRow(e, 'values')).join('\n');
		this.#_content = Object.values(this.#_file).join('\n');
		return { filename: this.#_filename, content: this.#_content }
	}
}


module.exports = new Csv().generate;