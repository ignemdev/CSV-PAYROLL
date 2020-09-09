const { mongoose } = require('../');

const EmployeeSchema = new mongoose.Schema({
	idcard: Number,
	account: Number,
	amount: Number
});

module.exports = mongoose.model('employees', EmployeeSchema);