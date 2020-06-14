const initialIssueList = [
  {
  id:1, status: 'New', owner: 'Vincenzo', effort: 10,
  created: new Date('2020-06-08'), due: undefined,
  title: 'Display the user name on the home page'},
  {id:2, status: 'Assigned', owner: 'Mark', effort: 5,
  created: new Date('2020-06-01'), due: new Date('2020-06-05'),
  title: 'Add user nationality'}
];

const sampleIssue = {
  status: 'New', owner: 'Pieta', title: 'Issue list should be updated after a change'
};



class IssueList extends React.Component {
  
  constructor() {
    super();
    this.state = {issueList: []}
    this.createIssue = this.createIssue.bind(this)
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({issueList: initialIssueList});
    }, 1000);
  }

  createIssue(issue) {
    issue.id = this.state.issueList.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issueList.slice();
    newIssueList.push(issue)
    this.setState({issueList: newIssueList});
  }

  render() {
    return (
    <React.Fragment>
      <h1>Issue List</h1>
      <IssueFilter />
      <hr />
      <IssueTable issueList={this.state.issueList} />
      <hr />
      <IssueAdd createIssue={this.createIssue}/>
    </React.Fragment>
    );
  }
}



class IssueFilter extends React.Component {
    render() {
      return <div>ISSUE FILTER</div>
    }
}



class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issueList.map(issue => 
    <IssueRow key={issue.id} issue={issue} />);
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created</th>
            <th>Due date</th>
            <th>Author</th>
            <th>Effort</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    )
  }
}



class IssueRow extends React.Component {

  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.title}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.owner}</td>
        <td>{issue.effort}</td>
      </tr>
    )
  }
}



class IssueAdd extends React.Component {
  
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: "New"
    };
    this.props.createIssue(issue);
    form.owner = "";
    form.title = "";
  }

  render() {
    return <form name="issueAdd" onSubmit={this.handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" />
      <input type="text" name="title" placeholder="Title" />
      <button>Add</button>
    </form>
  }
}

const element = <IssueList />

ReactDOM.render(element, document.getElementById('contents'));