
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
    return (
      <tr>
        <td style={style}>{this.props.issueId}</td>
        <td style={style}>{this.props.children}</td>
      </tr>
    )
  }
}
class IssueTable extends React.Component {
  render() {
    const rowStyle = {border: "1px solid silver", padding: 4};
    return (
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th style={rowStyle}>ID</th>
            <th style={rowStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow rowStyle={rowStyle} issueId={1}>
            Show user name
          </IssueRow>
          <IssueRow rowStyle={rowStyle} issueId={2}>
            Add user nationality
          </IssueRow>
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