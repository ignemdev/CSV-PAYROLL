const { express, parser, env } = require('./dependencies');
const db = require('./db/');
const Employees = require('./db/models/employees');
const csv = require('./core/csv');

//app setup
app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({ extended: true }));
env.config();

//db setup
db.connect(process.env.DBSTR);

//index
app.get('/', async (req, res) => {
	const foundEmployees = await Employees.find({}).exec();
	res.render('payrolls/', { employees: foundEmployees });
});

// export
app.post('/export', async (req, res) => {
	const { payday } = req.body;
	const foundEmployees = await Employees.find().exec();
	const { filename, content } = csv(foundEmployees, payday);
	res.attachment(`${filename}.csv`)
	res.type('csv')
	res.send(content)
});

//not found route
app.get('*', (req, res) => res.render('notfound'));

//listener
app.listen(process.env.PORT, () => { });