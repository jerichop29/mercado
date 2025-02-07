import { useState, useEffect } from 'react';
import stallHandler from './handler_js/stallHandler';
import StallForm from './forms/StallForm';

const StallData = () => {
    // State variables to manage stall data, search term, filtered data, and editing state
    const [data, setData] = useState({ status: '', message: '', data: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [editingStall, setEditingStall] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Fetch initial data when the component mounts
    useEffect(() => {
        handleFetchData();
    }, []);

    // Function to fetch stall data from the server
    const handleFetchData = async () => {
        try {
            const result = await stallHandler.getStalls();
            setData(result);
            setFilteredData(result.data);
        } catch (error) {
            setMessage(error)
            console.error('Error fetching data:', error);
        }
    };

    // Handle search input and filter stalls based on the search term
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        const filtered = data.data.filter(stall => 
            stall.StallName.toLowerCase().includes(term)
        );
        setFilteredData(filtered);
    };

    // Function to delete a stall after user confirmation
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this stall?')) {
            try {
                await stallHandler.deleteStall(id);
                handleFetchData();
            } catch (error) {
                console.error('Error deleting stall:', error);
            }
        }
    };

    // Function to set the stall to be edited
    const handleEdit = (stall) => {
        setEditingStall(stall);
    };

    // Function to handle successful form submission
    const handleSubmitSuccess = () => {
        handleFetchData();
        setEditingStall(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {editingStall ? (
                <StallForm 
                    editData={editingStall}
                    onClose={() => setEditingStall(null)}
                    onSubmitSuccess={handleSubmitSuccess}
                />
            ) : (
                <>
                    {/* Search input for filtering stalls */}
                    <input
                        type="text"
                        placeholder="Search by Stall Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            marginBottom: '20px'
                        }}
                    />

                    {/* Message display for success or error notifications */}
                    {message.text && (
                        <div style={{
                            padding: '10px',
                            marginBottom: '20px',
                            borderRadius: '4px',
                            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                            color: message.type === 'success' ? '#155724' : '#721c24'
                        }}>
                            {message.text}
                        </div>
                    )}

                    {/* Grid display for filtered stalls */}
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        {filteredData.map((stall) => (
                            <div key={stall.Stall_Id} style={{
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                                    {stall.StallName}
                                </h3>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    <strong>Building:</strong> {stall.BuildingName}
                                </p>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    <strong>Type:</strong> {stall.Name}
                                </p>
                                <div style={{ 
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '15px'
                                }}>
                                    {/* Edit and Delete buttons for each stall */}
                                    <button
                                        onClick={() => handleEdit(stall)}
                                        style={{
                                            backgroundColor: '#2ecc71',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            flex: 1
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(stall.Stall_Id)}
                                        style={{
                                            backgroundColor: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            flex: 1
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message for no stalls found */}
                    {filteredData.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                            No stalls found matching "{searchTerm}"
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StallData; 