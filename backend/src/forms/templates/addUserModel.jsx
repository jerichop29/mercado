export default function AddUserModel({ formData, setFormData, editData, onSubmitSuccess }) {

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const user = await UserHandler.addUser(formData);
            setUser(user.data);
            handleClose();
        } catch (error) {
            console.error('Error adding user:', error);
        }

        const [formData, setFormData] = useState({
            stallName: '',
            buildingName: '',
            type: ''
        });}
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
        return {FName,MName,LName,Email,Phone,Password,handleAddUser , handleSubmit , message};
    }

