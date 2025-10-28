// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        try {
            // Prepare the pipeline data
            const pipeline = {
                nodes: nodes.map(node => ({
                    id: node.id
                })),
                edges: edges.map(edge => ({
                    id: edge.id || null,
                    source: edge.source,
                    target: edge.target
                }))
            };
console.log(pipeline);
            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipeline)
            });
console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Show alert with the results
            alert(
                `Pipeline Analysis Results:\n\n` +
                `Number of Nodes: ${result.num_nodes}\n` +
                `Number of Edges: ${result.num_edges}\n` +
                `Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Please make sure the backend is running on http://localhost:8000');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <button 
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
