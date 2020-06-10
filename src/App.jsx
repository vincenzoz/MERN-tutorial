
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
class IssueTable extends React.Component {
  render() {
    return <div>ISSUE TABLE</div>
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