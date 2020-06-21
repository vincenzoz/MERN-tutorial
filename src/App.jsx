const sampleIssue = {
  status: 'New', owner: 'Pieta', title: 'Issue list should be updated after a change'
};


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if(dateRegex.test(value))
        return new Date(value);
    return value;
}

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

    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver)
    this.setState({issueList: result.data.issueList});
  }

  async createIssue(issue) {
    const query = `
    mutation {
      issueAdd( issue: {
        title:"${issue.title}",
        owner:"${issue.owner}",
        due:"${issue.due.toISOString()}"
      }) {
        id
      }
    }
    `;
    const response = await fetch('/graphql', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({query})
    });

    this.loadData();
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
      <td>{issue.created.toDateString()}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
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
      due: new Date(new Date().getTime() + 1000*60*60*24*10),
    };
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
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