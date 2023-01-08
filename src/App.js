import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import Charts from "./Charts";

import S3 from "./S3";
import Compute from "./Compute";
function App() {
  return (
    <div className="App">

      <link rel="stylesheet" type="text/css" href="loading-bar.css"/>
      <script type="text/javascript" src="loading-bar.js"></script>

      <div style={{ display: 'block', padding: 30 }}>
        <h1>AWS Management Tool</h1>
        <Tabs defaultActiveKey="first" style={{margin:"30px"}}>
          <Tab eventKey="first" title="S3 Buckets">
            <S3></S3>
          </Tab>
          <Tab eventKey="second" title="EC2 Compute">
            <Compute />
          </Tab>
          <Tab eventKey="third" title="Monitor">
            <Charts></Charts>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
