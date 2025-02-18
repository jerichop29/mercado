import React, { useState, useEffect } from 'react';
import stallHandler from '../backend/handler_js/stallHandler';

const StallForm = ({ editData, onClose, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        stallName: '',
        buildingName: '',
        type: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (editData) {
            setFormData({
                stallName: editData.StallCode || '',
                buildingName: editData.BuildingName || '',
                type: editData.Name || '',
                id: editData.Stall_Id
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            stallHandler.validateStallData(formData);
            const result = editData 
                ? await stallHandler.updateStall(editData.Stall_Id, formData)
                : await stallHandler.addStall(formData);
            
            setMessage({ text: result.message, type: 'success' });
            if (onSubmitSuccess) onSubmitSuccess();
            
            if (!editData) {
                setFormData({ stallName: '', buildingName: '', type_Id: '' });
            }
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ 
                color: '#2c3e50',
                borderBottom: '2px solid #3498db',
                paddingBottom: '10px',
                marginBottom: '20px'
            }}>
                {editData ? 'Edit Stall' : 'Add New Stall'}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stall Name:</label>
                    <input
                        type="text"
                        name="stallName"
                        value={formData.stallName}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Building Name:</label>
                    <input
                        type="text"
                        name="buildingName"
                        value={formData.buildingName}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button 
                        type="submit"
                        style={{
                            backgroundColor: '#3498db',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1,
                            transition: '0.3s'
                        }}
                        onMouseOver={e => e.target.style.backgroundColor = '#2980b9'}
                        onMouseOut={e => e.target.style.backgroundColor = '#3498db'}
                    >
                        {editData ? 'Update' : 'Submit'}
                    </button>
                    
                    {onClose && (
                        <button 
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#95a5a6',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                flex: 1,
                                transition: '0.3s'
                            }}
                            onMouseOver={e => e.target.style.backgroundColor = '#7f8c8d'}
                            onMouseOut={e => e.target.style.backgroundColor = '#95a5a6'}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {message.text && (
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24',
                    transition: 'all 0.3s ease'
                }}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default StallForm; 