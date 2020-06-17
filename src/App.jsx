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

  async loadData() {
    const query = `query {
      issueList {
        id title status owner created effort due
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query})
    });

    const result = await response.json();
    this.setState({issueList: result.data.issueList});
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




function IssueTable(props) {
  const issueRows = props.issueList.map(issue => 
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




function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.title}</td>
      <td>{issue.created}</td>
      <td>{issue.due}</td>
      <td>{issue.owner}</td>
      <td>{issue.effort}</td>
    </tr>
  )
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