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
    const style = this.props.rowStyle;
    const issue = this.props.issue;

    return (
      <tr>
        <td style={style}>{issue.id}</td>
        <td style={style}>{issue.title}</td>
        <td style={style}>{issue.created.toDateString()}</td>
        <td style={style}>{issue.due ? issue.due.toDateString() : ''}</td>
        <td style={style}>{issue.owner}</td>
        <td style={style}>{issue.effort}</td>
      </tr>
    )
  }
}
class IssueTable extends React.Component {
  render() {
    const rowStyle = {border: "1px solid silver", padding: 4};
    const issueRows = issueList.map(issue => 
    <IssueRow key={issue.id} rowStyle={rowStyle} issue={issue} />);
    return (
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th style={rowStyle}>ID</th>
            <th style={rowStyle}>Title</th>
            <th style={rowStyle}>Created</th>
            <th style={rowStyle}>Due date</th>
            <th style={rowStyle}>Author</th>
            <th style={rowStyle}>Effort</th>
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