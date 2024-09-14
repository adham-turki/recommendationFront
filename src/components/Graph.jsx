

// export default ForceDirectedGraph;
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import GraphSidebar from './graphSidebar';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';



const ForceDirectedGraph = ({ darkMode }) => {
  const [blueNodes, setBlueNodes] = useState([]);
  const [orangeNodes, setOrangeNodes] = useState([]);
  const [draggedNodeData, setDraggedNodeData] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [graph, setGraph] = useState(null);
  const [userData, setUserData] = useState(null);

 
  fetchData();
  useEffect(() => {

    const width = 928;
    const height = 890;
    
    const color = d3.scaleOrdinal(d3.schemeCategory10);
   
    

   
    d3.json("../graph.json").then(() => {
      const links = graph.links.map((d) => ({ ...d }));
      const nodes = graph.nodes.map((d) => ({ ...d }));

      const blue = nodes.filter((d) => d.group === 'Categories');
      const orange = nodes.filter((d) => d.group === 'Users');
      setBlueNodes(blue);
      setOrangeNodes(orange);

      d3.select('#chart').selectAll('svg').remove();
      const svgContainer = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

      svgContainer.append('defs')
        .append('clipPath')
        .attr('id', 'circleClip')
        .append('circle')
        .attr('r', 20)
        .attr('cx', 0)
        .attr('cy', 0);

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id((d) => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('collision', d3.forceCollide().radius(40))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      const link = svgContainer.append('g')
        .attr('stroke', 'orange')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', 3);

      const node = svgContainer.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('.node')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .style('cursor', 'pointer');

      node.filter((d) => d.group === 'Categories')
        .append('circle')
        .attr('r', 30)
        .attr('fill', (d) => color(d.group));

      node.filter((d) => d.group === 'Categories')
        .append('text')
        .attr('dy', '.3em')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', '15px')
        .text((d) => d.id.charAt(0));

      node.filter((d) => d.group === 'Users')
        .append('image')
        .attr('xlink:href', (d) => d.img)
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', -20)
        .attr('y', -20)
        .attr('clip-path', 'url(#circleClip)');

      node.append('title').text((d) => d.id);

      node.call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
        .on('click', (event, d) => {
          setSelectedNodeData(d);
          console.log(d);
          if(d.group == "Users"){
            fetchUserData(d.userId);
          }  
          setDraggedNodeData(null);  // Clear dragged data when clicking
           // Create a ripple effect
  const ripple = svgContainer.append('circle')
  .attr('cx', d.x)
  .attr('cy', d.y)
  .attr('r', 0)  // Start with a small radius
  .style('fill', 'none')
  .style('stroke', '#007BFF')  
  .style('stroke-width', 3)
  .style('opacity', 0.8);

ripple.transition()
  .duration(1000)  // Duration of the ripple effect
  .attr('r', 80)  // Final size of the ripple
  .style('opacity', 0)  // Fade out
  .remove();  // Remove the ripple after the animation completes
        });

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        node
          .attr('transform', (d) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        setDraggedNodeData(event.subject);
        if(event.subject.group == "Users"){
          fetchUserData(event.subject.userId);
        } 
        setSelectedNodeData(null);  // Clear selected data when dragging
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }).catch((error) => {
      console.error('Error fetching or parsing the JSON data:', error);
    });
    return () => {
      d3.select('#chart').selectAll('svg').remove();
    };
    
  }, [graph]);
  async function fetchData() {
    if (graph == null) {
      try {
        const res = await fetch(import.meta.env.VITE_API+"/graph");
  
        // Check response status
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const text = await res.text();  // Fetch as text to inspect content
        console.log("Response text:", text);  // Log the raw response text
  
        // Try parsing as JSON
        const data = JSON.parse(text);
        setGraph(data);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    }
  }
  async function fetchUserData(userId){
    try {
    const res  = await fetch(import.meta.env.VITE_API+"/user/"+userId);
    const data = await res.json();
    setUserData(data);
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
  }
  if (!graph) {
    return (
      <div className={`layout-content-container flex flex-col min-h-screen items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'text-black'}`}>
        <ClipLoader speedMultiplier={0.7} color={darkMode ? "#ffffff" : "#000000"} loading={true} size={60} />
      </div>
    );
  }
  
  
  return (
    <div className="flex h-full">
      <div className="w-full relative">
        <div className="sticky top-16 flex items-center">
          <div id="chart" className='w-3/4' />
        </div>

       {/* Display dragged node data */}
{draggedNodeData && (
  <div className={`fixed bottom-80 top-20 right-72 2xl:right-1/4 w-96 p-6 shadow-lg border overflow-auto rounded-3xl mt-6 
    ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-[#F8F9FA] border-[#E0E0E0]'}`}>

    {/* Profile Image and ID */}
    <div className="mb-4 flex flex-col items-center">
      {draggedNodeData.group === 'Users' && (
        <img
          src={draggedNodeData.img}
          alt="Node"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#007BFF]"
        />
      )}
      {draggedNodeData.group === 'Categories' && (
        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${darkMode ? 'bg-blue-500 border-[#3b82f6]' : 'bg-[#1f77b4] border-[#007BFF]'}`}>
          <span className="text-4xl text-white">
            {draggedNodeData.id.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <h3 className={`mt-4 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{draggedNodeData.id}</h3>
    </div>

    {/* Display user data if available */}
    {draggedNodeData.group === 'Users' && userData && (
      <ul className={`mt-2 space-y-2 max-h- ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {Object.entries(userData)
          .filter(([key]) => key !== 'user_id' && key !== 'profilePicture' && key !== 'role' && key !== 'firstName' && key !== 'lastName' && key !== 'interest') // Remove unnecessary fields
          .map(([key, value]) => {
            if (key === 'enabled') {
              return (
                <li key={key} className="mb-1 flex items-center space-x-2">
                  <strong>Status:</strong>
                  <span className={`font-semibold ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? 'Active' : 'Inactive'}
                  </span>
                </li>
              );
            } else if (key === 'interests' && Array.isArray(value)) {
              return (
                <li key={key} className="mb-1">
                  <strong>Interests:</strong>
                  <ul className="mt-1 ml-5 list-disc space-y-1 ">
                    {value.map((interest) =>
                      Object.keys(interest).map((interestKey) => (
                        <li key={interestKey} className="text-blue-500"> {interestKey}</li>
                      ))
                    )}
                  </ul>
                </li>
              );
            } else {
              return (
                
                <li key={key} className="mb-1">
                  <strong>{key}:</strong> {value!=null && value.toString()}
                </li>
              );
            }
          })}
      </ul>
    )}

    <button onClick={() => setDraggedNodeData(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors">✕</button>
  </div>
)}


{/* Display selected node data */}
{selectedNodeData && (
  <div className={`fixed bottom-80 top-20 right-72 2xl:right-1/4 w-96 p-6 shadow-lg border overflow-auto rounded-3xl mt-6 
    ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-[#F8F9FA] border-[#E0E0E0]'}`}>
    
    {/* Profile Image and ID */}
    <div className="mb-4 flex flex-col items-center">
      {selectedNodeData.group === 'Users' && (
        <img
          src={selectedNodeData.img}
          alt="Node"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#007BFF]"
        />
      )}
      {selectedNodeData.group === 'Categories' && (
        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${darkMode ? 'bg-blue-500 border-[#3b82f6]' : 'bg-[#1f77b4] border-[#007BFF]'}`}>
          <span className="text-4xl text-white">
            {selectedNodeData.id?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <h3 className={`mt-4 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedNodeData.id}</h3>
    </div>

    {/* Display user data only if available */}
    {selectedNodeData.group === 'Users' && userData && (
      <ul className={`mt-2 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {Object.entries(userData)
        .filter(([key, value]) => key !== 'user_id' && key !== 'profilePicture'&& key !== 'role'&& key !== 'firstName'&& key !== 'lastName'&& key !== 'interest') // Remove duplicate interest
        .map(([key, value]) => {
          if (key === 'enabled') {
            // Handling "enabled" to show Active/Inactive with color
            return (
              <li key={key} className="mb-1 flex items-center space-x-2">
                <strong>Status:</strong>
                <span
                  className={`font-semibold ${
                    value ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {value ? 'Active' : 'Inactive'}
                </span>
              </li>
            );
          } else if (key === 'interests' && Array.isArray(value)) {
            // Handling interests: Show only keys
            return (
              <li key={key} className="mb-1">
                <strong>Interests:</strong>
                <ul className="mt-1 ml-5 list-disc space-y-1">
                  {value.map((interest, index) =>
                    Object.keys(interest).map((interestKey) => (
                      <li key={index} className="text-blue-500">{interestKey}</li>
                    ))
                  )}
                </ul>
              </li>
            );
          } else {
            // Handling other fields, excluding nulls
            return (
              <li key={key} className="mb-1">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value ? value.toString() : 'N/A'}
              </li>
            );
          }
        })}
    </ul>
    
    )}

   

    <button onClick={() => setSelectedNodeData(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors">✕</button>
  </div>
)}




      </div>
      <GraphSidebar blueNodes={blueNodes} orangeNodes={orangeNodes} darkMode={darkMode} />
    </div>
  );
};
ForceDirectedGraph.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default ForceDirectedGraph;
