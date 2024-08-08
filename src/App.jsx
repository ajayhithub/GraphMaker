import React, { useState } from 'react';
import GraphView from './components/GraphView'; 
import './App.css';
import dijkstra from './components/ShortestPath.js';

const App = () => {
  const [numNodes, setNumNodes] = useState(4);
  const [ch, setch] = useState(0);
  const [tt, settt] = useState(0);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [link, setLink] = useState([]);
  const [node, setNode] = useState([]);
  const [nodeLink, setNodeLink] = useState([]);
  const [nodeshort, setnodeshort] = useState([]);
  const [nodeshort2, setnodeshort2] = useState([]);
  const [nodeshort3, setnodeshort3] = useState([]);
 
  const [start, setstart] = useState();
  const [end, setend] = useState();

  let temp; 
   const shortPath = () => {
    setch(0);
    settt(0);
    const result = dijkstra(numNodes,nodeshort.length, nodeshort,start,end);
     temp = result[0];
     setnodeshort2([]);

     if(result[0]!=="IMPOSSIBLE")
     {
     for(let i=1;i<=numNodes;i++)
     {
       if(result[1].indexOf(i)!== -1)
        setnodeshort2((prev)=> [...prev, {id:i, label: `Node ${i}`, title: `node ${i} tooltip text`, color: "red",shape: "box"}])
       else
       setnodeshort2((prev)=> [...prev, {id:i, label: `Node ${i}`, title: `node ${i} tooltip text`}]) 
     }
         console.log(nodeshort2)
         if(nodeshort2.length !== 0 && tt===0)
         {
            settt(1);
            setnodeshort3(nodeshort2);
            console.log("rrr");
         }
     }
     else
     {
       alert("IMPOSSIBLE");
     }
   }

  const addLink = () => {
    
    setch(0);
    settt(0);
      if (source && target){
        setLink(prev => [...prev, { from: `${source}`, to: `${target}` }]);
        setNodeLink(prev => [...prev, `<h5>${source} ---- ${target}</h5>`]);
        setnodeshort(prev => [...prev, [source,target]]); 
      }
       setch(1);  
  };

  const addNode = () => {
    if (numNodes) {
      setNodeLink([]);
      for(let i=1;i<=numNodes;i++)
      {
        setNode((prev)=> [...prev, {id:i, label: `Node ${i}`, title: `node ${i} tooltip text`}])
      }
    }
  };

  return (
    <div className="App">
      <div className='left_box'>
      <h1>Graph</h1>
      <div className="inputbox">
        <label>No of nodes</label>
        <div className='node'>
        <input
          type='number'
          placeholder='No of nodes'
          value={numNodes}
          onChange={(e) => setNumNodes(Number(e.target.value))}
        />
        <button className='Add_Node' onClick={addNode}>Add Node</button>
        </div>
        <div className='source'>
        <input
           className='source_input'
          type='number'
          placeholder='Source'
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
        className='source_input'
          type='number'
          placeholder='Target'
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        </div> 
        <button className='Add_Link' onClick={addLink}>Add Link</button>
        <button className='makegraph' onClick={()=> {
          settt(0);
          if(ch===0)
          setch(1);
          else
          setch(0);
        }}>makegraph</button> 
       <div className="start_end">
        <input
        className='start'
          type='number'
          placeholder='start'
          value={start}
          onChange={(e) => setstart(e.target.value)}
        />
        <input
        className='end'
          type='number'
          placeholder='end'
          value={end}
          onChange={(e) => setend(e.target.value)}
        />
        </div>
        <button className='shortPath' onClick={shortPath}>shortPath</button>
        </div>
        <div className='Nodelink'>
        {nodeLink.length === 0 ? ("") : 
        (nodeLink.map((htmlString, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />))
        )}
       </div>
      </div>
        {           
          (ch===0) ? (""):(<GraphView className="Graph" nodes={node} links={link}/>)
        }
        {
          (tt===0) ? (""):(<GraphView className="Graph" nodes={nodeshort3} links={link}/>)
        }
    </div>
  );
};

export default App;
