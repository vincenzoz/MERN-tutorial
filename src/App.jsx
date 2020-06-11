const issueList = [
  {
  id:1, status: 'New', owner: 'Vincenzo', effort: 10,
  created: new Date('2020-06-08'), due: undefined,
  title: 'Display the user name on the home page'},
  {id:2, status: 'Assigned', owner: 'Mark', effort: 5,
  created: new Date('2020-06-01'), due: new Date('2020-06-05'),
  title: 'Add user nationality'}
];

class IssueFilter extends React.Component {
    render() {
      return <div>ISSUE FILTER</div>
    }
  }
class IssueAdd extends React.Component {
  render() {
    return <div>ISSUE ADD</div>
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
class IssueTable extends React.Component {
  render() {
    const issueRows = issueList.map(issue => 
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
class IssueList extends React.Component {
  render() {
    return (
    <React.Fragment>
      <h1>Issue List</h1>
      <IssueFilter />
      <hr />
      <IssueTable />
      <hr />
      <IssueAdd />
    </React.Fragment>
    );
  }
}

const element = <IssueList />

ReactDOM.render(element, document.getElementById('contents'));